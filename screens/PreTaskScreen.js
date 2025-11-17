import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Modal,
  TextInput,
} from 'react-native';
import { colors } from '../theme/colors';
import { spacing, instructionBoxStyles, buttonStyles } from '../theme/spacing';
import Header from '../components/Header';
import { preTaskQuestions } from '../data/fakeData';

export default function PreTaskScreen({ navigation }) {
  const [answers, setAnswers] = useState({});
  const [showWarning, setShowWarning] = useState(false);
  const [warningType, setWarningType] = useState(null);
  const [noPermissionReason, setNoPermissionReason] = useState('');
  const [showReasonModal, setShowReasonModal] = useState(false);

  const handleAnswer = (questionId, answer) => {
    setAnswers({ ...answers, [questionId]: answer });
  };

  const handleNext = () => {
    // Check if permission question is answered "No"
    if (answers.permission === 'no') {
      setWarningType('permission');
      setShowReasonModal(true);
      return;
    }

    // Check if any required question is answered "No"
    const hasNo = Object.values(answers).some((answer) => answer === 'no');
    if (hasNo) {
      setWarningType('general');
      setShowWarning(true);
      return;
    }

    // All good, proceed to next screen
    navigation.navigate('PhotoUpload');
  };

  const handleWarningSubmit = () => {
    setShowWarning(false);
    setShowReasonModal(false);
    // In a real app, this would send the information to the office
    alert('Se ha notificado a la oficina. Por favor espere autorización.');
  };

  return (
    <View style={styles.container}>
      <Header
        onHelpPress={() => alert('Ayuda')}
        onExitPress={() => alert('Salir')}
      />

      <ScrollView style={styles.content} contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Condiciones Básicas de Seguridad y Permiso de Trabajo</Text>

        <View style={styles.instructionBox}>
          <Text style={styles.instructionTitle}>📋 Instrucciones</Text>
          <Text style={styles.instructionText}>
            Primero, verifique que tiene todo lo que necesita para completar la tarea de servicio de manera segura y profesional.
            Todas las respuestas deben basarse en las condiciones reales del sitio.
          </Text>
        </View>

        {preTaskQuestions.map((question) => (
          <View key={question.id} style={styles.questionContainer}>
            <Text style={styles.questionText}>{question.question}</Text>

            <View style={styles.answersRow}>
              <TouchableOpacity
                style={[
                  styles.radioButton,
                  answers[question.id] === 'yes' && styles.radioButtonSelected,
                ]}
                onPress={() => handleAnswer(question.id, 'yes')}
              >
                <View style={styles.radioCircle}>
                  {answers[question.id] === 'yes' && (
                    <View style={styles.radioInner} />
                  )}
                </View>
                <Text style={styles.radioLabel}>Sí</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.radioButton,
                  answers[question.id] === 'no' && styles.radioButtonSelected,
                ]}
                onPress={() => handleAnswer(question.id, 'no')}
              >
                <View style={styles.radioCircle}>
                  {answers[question.id] === 'no' && (
                    <View style={styles.radioInner} />
                  )}
                </View>
                <Text style={styles.radioLabel}>No</Text>
              </TouchableOpacity>

              {question.hasNA && (
                <TouchableOpacity
                  style={[
                    styles.radioButton,
                    answers[question.id] === 'na' && styles.radioButtonSelected,
                  ]}
                  onPress={() => handleAnswer(question.id, 'na')}
                >
                  <View style={styles.radioCircle}>
                    {answers[question.id] === 'na' && (
                      <View style={styles.radioInner} />
                    )}
                  </View>
                  <Text style={styles.radioLabel}>N/A</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        ))}

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.buttonText}>← Atrás</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
            <Text style={styles.buttonText}>Siguiente →</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Warning Modal for No Permission */}
      <Modal
        visible={showReasonModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowReasonModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.warningModal}>
            <Text style={styles.warningTitle}>
              ¿Qué le impide tener permiso para realizar el trabajo?
            </Text>

            <TextInput
              style={styles.reasonInput}
              placeholder="El gerente de instalación no está presente."
              placeholderTextColor="#999"
              value={noPermissionReason}
              onChangeText={setNoPermissionReason}
              multiline
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.modalBackButton}
                onPress={() => setShowReasonModal(false)}
              >
                <Text style={styles.modalButtonText}>← Atrás</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.modalNextButton}
                onPress={handleWarningSubmit}
              >
                <Text style={styles.modalButtonText}>Siguiente →</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* General Warning Modal */}
      <Modal
        visible={showWarning}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowWarning(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.stopModal}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setShowWarning(false)}
            >
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>

            <Text style={styles.stopTitle}>ADVERTENCIA - No Continúe Con El Trabajo</Text>

            <View style={styles.stopSign}>
              <Text style={styles.stopHand}>✋</Text>
              <Text style={styles.stopText}>ALTO</Text>
            </View>

            <Text style={styles.stopMessage}>
              La Evaluación de Riesgos Ha Sido Completada
            </Text>

            <Text style={styles.stopInstructions}>
              Llame a la oficina inmediatamente para informarles que no tiene la
              autorización/aprobación del cliente para continuar con el trabajo planificado.
            </Text>

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.stopBackButton}
                onPress={() => setShowWarning(false)}
              >
                <Text style={styles.stopButtonText}>← Atrás</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.stopSubmitButton}
                onPress={handleWarningSubmit}
              >
                <Text style={styles.stopButtonText}>✓ Enviar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: spacing.containerPadding,
    paddingTop: spacing.sectionPadding,
    paddingBottom: spacing.largeMargin,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.white,
    marginBottom: spacing.xl,
    textAlign: 'center',
    lineHeight: 28,
  },
  instructionBox: {
    ...instructionBoxStyles,
    borderLeftColor: colors.secondary,
    marginHorizontal: 0,
    marginBottom: spacing.formFieldMargin,
  },
  instructionTitle: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: spacing.smallMargin,
  },
  instructionText: {
    color: colors.white,
    fontSize: 13,
    lineHeight: 20,
  },
  questionContainer: {
    marginBottom: spacing.formFieldMargin,
  },
  questionText: {
    color: colors.white,
    fontSize: 14,
    marginBottom: spacing.elementMargin,
    lineHeight: 22,
  },
  answersRow: {
    flexDirection: 'row',
    gap: spacing.xl,
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.sm,
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.white,
  },
  radioLabel: {
    color: colors.white,
    fontSize: 15,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: spacing.elementMargin,
    marginTop: spacing.largeMargin,
  },
  backButton: {
    ...buttonStyles,
    flex: 1,
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: colors.white,
  },
  nextButton: {
    ...buttonStyles,
    flex: 1,
    backgroundColor: colors.white,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.sectionPadding,
  },
  warningModal: {
    backgroundColor: colors.primary,
    borderRadius: spacing.cardBorderRadius,
    padding: spacing.containerPadding,
    width: '90%',
    maxWidth: 400,
  },
  warningTitle: {
    color: colors.white,
    fontSize: 16,
    marginBottom: spacing.xl,
    textAlign: 'center',
    lineHeight: 24,
  },
  reasonInput: {
    backgroundColor: colors.white,
    borderRadius: spacing.inputBorderRadius,
    padding: spacing.elementMargin,
    fontSize: 15,
    minHeight: 80,
    textAlignVertical: 'top',
    marginBottom: spacing.xl,
  },
  modalButtons: {
    flexDirection: 'row',
    gap: spacing.elementMargin,
  },
  modalBackButton: {
    ...buttonStyles,
    flex: 1,
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: colors.white,
    paddingVertical: spacing.md,
  },
  modalNextButton: {
    ...buttonStyles,
    flex: 1,
    backgroundColor: colors.white,
    paddingVertical: spacing.md,
  },
  modalButtonText: {
    fontSize: 15,
    fontWeight: '600',
  },
  stopModal: {
    backgroundColor: colors.red,
    borderRadius: spacing.cardBorderRadius,
    padding: spacing.containerPadding,
    width: '90%',
    maxWidth: 400,
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    top: spacing.smallMargin,
    right: spacing.smallMargin,
    width: spacing.largeMargin,
    height: spacing.largeMargin,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    color: colors.white,
    fontSize: 24,
    fontWeight: 'bold',
  },
  stopTitle: {
    color: colors.white,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: spacing.xl,
    marginTop: spacing.smallMargin,
    lineHeight: 26,
  },
  stopSign: {
    alignItems: 'center',
    marginVertical: spacing.xl,
  },
  stopHand: {
    fontSize: 60,
    marginBottom: spacing.smallMargin,
  },
  stopText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: colors.white,
  },
  stopMessage: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: spacing.elementMargin,
    lineHeight: 24,
  },
  stopInstructions: {
    color: colors.white,
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: spacing.formFieldMargin,
  },
  stopBackButton: {
    ...buttonStyles,
    flex: 1,
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: colors.white,
    paddingVertical: spacing.md,
  },
  stopSubmitButton: {
    ...buttonStyles,
    flex: 1,
    backgroundColor: colors.white,
    paddingVertical: spacing.md,
  },
  stopButtonText: {
    fontSize: 15,
    fontWeight: '600',
  },
});

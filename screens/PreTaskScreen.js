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
    alert('Office has been notified. Please wait for authorization.');
  };

  return (
    <View style={styles.container}>
      <Header
        onHelpPress={() => alert('Help')}
        onExitPress={() => alert('Exit')}
      />

      <ScrollView style={styles.content}>
        <Text style={styles.title}>Basic Safety Conditions & Permit To Work</Text>

        <Text style={styles.instructions}>
          First please double check that you have everything you need in order to
          complete the service task in a safe, professional way. all answers should be
          based on the actual conditions
        </Text>

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
                <Text style={styles.radioLabel}>Yes</Text>
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
            <Text style={styles.buttonText}>Back</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
            <Text style={styles.buttonText}>Next</Text>
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
              What is preventing you from having permission to do the job?
            </Text>

            <TextInput
              style={styles.reasonInput}
              placeholder="The installation manager is not present."
              value={noPermissionReason}
              onChangeText={setNoPermissionReason}
              multiline
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.modalBackButton}
                onPress={() => setShowReasonModal(false)}
              >
                <Text style={styles.modalButtonText}>Back</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.modalNextButton}
                onPress={handleWarningSubmit}
              >
                <Text style={styles.modalButtonText}>Next</Text>
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

            <Text style={styles.stopTitle}>WARNING - Do Not Continue With The Job</Text>

            <View style={styles.stopSign}>
              <Text style={styles.stopHand}>✋</Text>
              <Text style={styles.stopText}>STOP</Text>
            </View>

            <Text style={styles.stopMessage}>
              The Risk Assessment Has Been Completed
            </Text>

            <Text style={styles.stopInstructions}>
              Call the office immediately to inform them that you don't have the
              customer authorization/approval to continue with the planned job.
            </Text>

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.stopBackButton}
                onPress={() => setShowWarning(false)}
              >
                <Text style={styles.stopButtonText}>Back</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.stopSubmitButton}
                onPress={handleWarningSubmit}
              >
                <Text style={styles.stopButtonText}>Submit</Text>
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
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.white,
    marginBottom: 15,
    textAlign: 'center',
  },
  instructions: {
    color: colors.white,
    fontSize: 13,
    lineHeight: 20,
    marginBottom: 25,
  },
  questionContainer: {
    marginBottom: 25,
  },
  questionText: {
    color: colors.white,
    fontSize: 14,
    marginBottom: 12,
    lineHeight: 20,
  },
  answersRow: {
    flexDirection: 'row',
    gap: 20,
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.white,
  },
  radioLabel: {
    color: colors.white,
    fontSize: 14,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
    marginBottom: 40,
    gap: 15,
  },
  backButton: {
    flex: 1,
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: colors.white,
    borderRadius: 25,
    padding: 15,
    alignItems: 'center',
  },
  nextButton: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: 25,
    padding: 15,
    alignItems: 'center',
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
    padding: 20,
  },
  warningModal: {
    backgroundColor: colors.primary,
    borderRadius: 10,
    padding: 25,
    width: '90%',
    maxWidth: 400,
  },
  warningTitle: {
    color: colors.white,
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  reasonInput: {
    backgroundColor: colors.white,
    borderRadius: 5,
    padding: 15,
    fontSize: 14,
    minHeight: 80,
    textAlignVertical: 'top',
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 15,
  },
  modalBackButton: {
    flex: 1,
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: colors.white,
    borderRadius: 25,
    padding: 12,
    alignItems: 'center',
  },
  modalNextButton: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: 25,
    padding: 12,
    alignItems: 'center',
  },
  modalButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  stopModal: {
    backgroundColor: colors.red,
    borderRadius: 10,
    padding: 25,
    width: '90%',
    maxWidth: 400,
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 30,
    height: 30,
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
    marginBottom: 20,
    marginTop: 10,
  },
  stopSign: {
    alignItems: 'center',
    marginVertical: 20,
  },
  stopHand: {
    fontSize: 60,
    marginBottom: 10,
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
    marginBottom: 15,
  },
  stopInstructions: {
    color: colors.white,
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 25,
  },
  stopBackButton: {
    flex: 1,
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: colors.white,
    borderRadius: 25,
    padding: 12,
    alignItems: 'center',
  },
  stopSubmitButton: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: 25,
    padding: 12,
    alignItems: 'center',
  },
  stopButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
});

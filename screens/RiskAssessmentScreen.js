import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
} from 'react-native';
import { colors } from '../theme/colors';
import { spacing, instructionBoxStyles, buttonStyles, inputStyles } from '../theme/spacing';
import Header from '../components/Header';
import { riskTypes } from '../data/fakeData';

export default function RiskAssessmentScreen({ navigation }) {
  const [selectedRisks, setSelectedRisks] = useState({});
  const [otherRiskText, setOtherRiskText] = useState('');

  const toggleRisk = (riskId) => {
    setSelectedRisks({
      ...selectedRisks,
      [riskId]: !selectedRisks[riskId],
    });
  };

  const handleNext = () => {
    // Pass selected risks to the next screen
    const risks = Object.keys(selectedRisks).filter((key) => selectedRisks[key]);
    navigation.navigate('RiskMatrix', { selectedRisks: risks, otherRiskText });
  };

  return (
    <View style={styles.container}>
      <Header
        onHelpPress={() => alert('Ayuda')}
        onExitPress={() => alert('Salir')}
      />

      <View style={styles.header}>
        <Text style={styles.title}>Evaluación de Riesgos</Text>

        <View style={styles.instructionBox}>
          <Text style={styles.instructionTitle}>⚠️ Instrucciones</Text>
          <Text style={styles.instructionText}>
            Identifique todos los riesgos presentes en el área de trabajo.
            Marque como N/A los que no apliquen. Toque cada riesgo para ver más detalles.
          </Text>
        </View>
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.scrollContent}>
        {riskTypes.map((risk) => (
          <View key={risk.id}>
            <TouchableOpacity
              style={styles.riskItem}
              onPress={() => {
                if (risk.id !== 'other') {
                  navigation.navigate('RiskDetail', { risk });
                }
              }}
            >
              <View style={styles.riskLeft}>
                <View style={styles.iconCircle}>
                  <Text style={styles.icon}>?</Text>
                </View>
                <Text style={styles.riskName}>{risk.name}</Text>
              </View>

              <View style={styles.riskRight}>
                <TouchableOpacity
                  style={styles.checkbox}
                  onPress={() => toggleRisk(risk.id)}
                >
                  {selectedRisks[risk.id] && (
                    <View style={styles.checkboxChecked} />
                  )}
                </TouchableOpacity>
                <Text style={styles.naText}>N/A</Text>
                <Text style={styles.arrow}>›</Text>
              </View>
            </TouchableOpacity>

            {risk.id === 'other' && selectedRisks[risk.id] && (
              <TextInput
                style={styles.otherInput}
                placeholder="Describa el riesgo en detalle..."
                placeholderTextColor="#999"
                value={otherRiskText}
                onChangeText={setOtherRiskText}
                multiline
              />
            )}
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  header: {
    paddingHorizontal: spacing.containerPadding,
    paddingTop: spacing.sectionPadding,
    paddingBottom: spacing.elementMargin,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.white,
    textAlign: 'center',
    marginBottom: spacing.xl,
    lineHeight: 32,
  },
  instructionBox: {
    ...instructionBoxStyles,
    borderLeftColor: colors.secondary,
    marginHorizontal: 0,
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
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: spacing.largeMargin,
  },
  riskItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.cardPadding,
    paddingHorizontal: spacing.containerPadding,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.2)',
  },
  riskLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    borderWidth: 2,
    borderColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.elementMargin,
  },
  icon: {
    color: colors.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
  riskName: {
    color: colors.white,
    fontSize: 15,
    flex: 1,
    lineHeight: 22,
  },
  riskRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: colors.white,
    borderRadius: spacing.xs,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    width: 14,
    height: 14,
    backgroundColor: colors.white,
  },
  naText: {
    color: colors.white,
    fontSize: 15,
    marginLeft: spacing.xs,
  },
  arrow: {
    color: colors.white,
    fontSize: 28,
    fontWeight: '300',
    marginLeft: spacing.xs,
  },
  otherInput: {
    ...inputStyles,
    backgroundColor: colors.white,
    marginHorizontal: spacing.containerPadding,
    marginTop: spacing.smallMargin,
    marginBottom: spacing.xl,
    minHeight: 80,
    textAlignVertical: 'top',
    paddingTop: spacing.elementMargin,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: spacing.elementMargin,
    paddingHorizontal: spacing.containerPadding,
    marginTop: spacing.xl,
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
});

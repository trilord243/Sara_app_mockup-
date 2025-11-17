import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native';
import { colors } from '../theme/colors';
import { spacing, instructionBoxStyles, buttonStyles } from '../theme/spacing';
import Header from '../components/Header';

const { width } = Dimensions.get('window');

export default function RiskMatrixScreen({ navigation, route }) {
  const { risk } = route.params || {};
  const [selectedProbability, setSelectedProbability] = useState(null);
  const [selectedSeverity, setSelectedSeverity] = useState(null);

  const probabilities = [
    { id: 1, label: 'Casi\nImposible' },
    { id: 2, label: 'Poco\nProbable' },
    { id: 3, label: 'Posible' },
    { id: 4, label: 'Probable' },
  ];

  const severities = [
    { id: 1, label: 'Menor' },
    { id: 2, label: 'Reversible' },
    { id: 3, label: 'Irreversible' },
    { id: 4, label: 'Catastrófico' },
  ];

  // Risk matrix values
  const matrix = [
    [1, 2, 3, 4],
    [2, 4, 6, 8],
    [3, 6, 9, 12],
    [4, 8, 12, 16],
  ];

  const getRiskColor = (value) => {
    if (value === 16) return colors.matrixBlack;
    if (value >= 8) return colors.matrixRed;
    if (value >= 3) return colors.matrixYellow;
    return colors.matrixGreen;
  };

  const getRiskLevel = () => {
    if (!selectedProbability || !selectedSeverity) return null;
    return matrix[selectedProbability - 1][selectedSeverity - 1];
  };

  const getRiskLabel = (value) => {
    if (value === 16) return 'NEGRO: Riesgo Extremadamente Alto - Deténgase Inmediatamente';
    if (value >= 8) return 'ROJO: Riesgo Alto - Implemente Controles Para Reducir El Riesgo Antes De Proceder';
    if (value >= 3) return 'AMARILLO: Riesgo Moderado - Realice La Tarea Con Precaución';
    return 'VERDE: Riesgo Bajo - Realice La Tarea';
  };

  const handleNext = () => {
    const riskValue = getRiskLevel();
    if (riskValue) {
      navigation.navigate('RiskDetail', { risk, riskValue });
    }
  };

  return (
    <View style={styles.container}>
      <Header
        onHelpPress={() => alert('Ayuda')}
        onExitPress={() => alert('Salir')}
      />

      <View style={styles.header}>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.closeButtonText}>✕</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Evaluación de Riesgos</Text>
        <Text style={styles.subtitle}>{risk?.name || 'Electricidad'}</Text>

        <View style={styles.instructionBox}>
          <Text style={styles.instructionTitle}>📊 Instrucciones</Text>
          <Text style={styles.instructionText}>
            Seleccione primero la Severidad (1-4) y luego la Probabilidad (1-4).
            La matriz calculará automáticamente el nivel de riesgo.
          </Text>
        </View>
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.scrollContent}>
        {/* Probability Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Severidad</Text>
          <View style={styles.optionsRow}>
            {severities.map((severity) => (
              <TouchableOpacity
                key={severity.id}
                style={[
                  styles.optionButton,
                  selectedSeverity === severity.id && styles.optionButtonSelected,
                ]}
                onPress={() => setSelectedSeverity(severity.id)}
              >
                <Text style={styles.optionNumber}>{severity.id}</Text>
                <Text style={styles.optionLabel}>{severity.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Matrix */}
        <View style={styles.matrixContainer}>
          <View style={styles.matrixLabels}>
            <Text style={styles.matrixAxisLabel}>Probabilidad</Text>
            {probabilities.map((prob) => (
              <TouchableOpacity
                key={prob.id}
                style={[
                  styles.probabilityButton,
                  selectedProbability === prob.id && styles.probabilityButtonSelected,
                ]}
                onPress={() => setSelectedProbability(prob.id)}
              >
                <Text style={styles.probabilityNumber}>{prob.id}</Text>
                <Text style={styles.probabilityLabel}>{prob.label}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.matrixGrid}>
            {matrix.map((row, rowIndex) => (
              <View key={rowIndex} style={styles.matrixRow}>
                {row.map((value, colIndex) => {
                  const isSelected =
                    selectedProbability === rowIndex + 1 &&
                    selectedSeverity === colIndex + 1;
                  return (
                    <View
                      key={`${rowIndex}-${colIndex}`}
                      style={[
                        styles.matrixCell,
                        { backgroundColor: getRiskColor(value) },
                        isSelected && styles.matrixCellSelected,
                      ]}
                    >
                      <Text style={styles.matrixCellText}>{value}</Text>
                    </View>
                  );
                })}
              </View>
            ))}
          </View>
        </View>

        {/* Risk Level Display */}
        {getRiskLevel() && (
          <View
            style={[
              styles.riskLevelContainer,
              { backgroundColor: getRiskColor(getRiskLevel()) },
            ]}
          >
            <Text style={styles.riskLevelText}>
              {getRiskLabel(getRiskLevel())}
            </Text>
          </View>
        )}

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.buttonText}>← Atrás</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.nextButton,
              !getRiskLevel() && styles.nextButtonDisabled,
            ]}
            onPress={handleNext}
            disabled={!getRiskLevel()}
          >
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
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    top: spacing.sectionPadding,
    right: spacing.containerPadding,
    zIndex: 10,
  },
  closeButtonText: {
    color: colors.white,
    fontSize: 28,
    fontWeight: '300',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.white,
    textAlign: 'center',
    marginBottom: spacing.sm,
    lineHeight: 32,
  },
  subtitle: {
    fontSize: 18,
    color: colors.white,
    textAlign: 'center',
    marginBottom: spacing.xl,
    lineHeight: 26,
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
    paddingHorizontal: spacing.containerPadding,
    paddingBottom: spacing.largeMargin,
  },
  section: {
    marginBottom: spacing.formFieldMargin,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.white,
    marginBottom: spacing.elementMargin,
    textAlign: 'center',
    lineHeight: 26,
  },
  optionsRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  optionButton: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: spacing.inputBorderRadius,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.sm,
    alignItems: 'center',
    minHeight: 70,
    justifyContent: 'center',
  },
  optionButtonSelected: {
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    borderColor: colors.white,
  },
  optionNumber: {
    color: colors.white,
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: spacing.xs,
  },
  optionLabel: {
    color: colors.white,
    fontSize: 11,
    textAlign: 'center',
    lineHeight: 16,
  },
  matrixContainer: {
    flexDirection: 'row',
    marginBottom: spacing.formFieldMargin,
  },
  matrixLabels: {
    marginRight: spacing.smallMargin,
    justifyContent: 'space-between',
  },
  matrixAxisLabel: {
    color: colors.white,
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: spacing.smallMargin,
    height: spacing.largeMargin,
    lineHeight: 20,
  },
  probabilityButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: spacing.inputBorderRadius,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.xs,
    width: 80,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: spacing.xs / 2,
  },
  probabilityButtonSelected: {
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    borderColor: colors.white,
  },
  probabilityNumber: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  probabilityLabel: {
    color: colors.white,
    fontSize: 9,
    textAlign: 'center',
    lineHeight: 13,
  },
  matrixGrid: {
    flex: 1,
  },
  matrixRow: {
    flexDirection: 'row',
    marginVertical: spacing.xs / 2,
  },
  matrixCell: {
    flex: 1,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: spacing.xs / 2,
    borderRadius: spacing.xs,
  },
  matrixCellSelected: {
    borderWidth: 3,
    borderColor: colors.white,
  },
  matrixCellText: {
    color: colors.white,
    fontSize: 20,
    fontWeight: 'bold',
  },
  riskLevelContainer: {
    padding: spacing.xl,
    borderRadius: spacing.inputBorderRadius,
    marginBottom: spacing.formFieldMargin,
  },
  riskLevelText: {
    color: colors.white,
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: 22,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: spacing.elementMargin,
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
  nextButtonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});

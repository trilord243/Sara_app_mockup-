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
import Header from '../components/Header';

const { width } = Dimensions.get('window');

export default function RiskMatrixScreen({ navigation, route }) {
  const { risk } = route.params || {};
  const [selectedProbability, setSelectedProbability] = useState(null);
  const [selectedSeverity, setSelectedSeverity] = useState(null);

  const probabilities = [
    { id: 1, label: 'Almost\nImpossible' },
    { id: 2, label: 'Unlikely' },
    { id: 3, label: 'Possible' },
    { id: 4, label: 'Likely' },
  ];

  const severities = [
    { id: 1, label: 'Minor' },
    { id: 2, label: 'Reversible' },
    { id: 3, label: 'Irreversible' },
    { id: 4, label: 'Catastrophic' },
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
    if (value === 16) return 'BLACK: Extremely High Risk - Stop Immediately.';
    if (value >= 8) return 'RED: High Risk - Implement Controls To Lower The Risk Before Proceeding';
    if (value >= 3) return 'YELLOW: Moderate Risk - Carry Out The Task With Caution';
    return 'GREEN: Low Risk - Carry Out The Task';
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
        onHelpPress={() => alert('Help')}
        onExitPress={() => alert('Exit')}
      />

      <View style={styles.header}>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.closeButtonText}>✕</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Risk Assessment</Text>
        <Text style={styles.subtitle}>{risk?.name || 'Electricity'}</Text>
      </View>

      <ScrollView style={styles.content}>
        {/* Probability Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Severity</Text>
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
            <Text style={styles.matrixAxisLabel}>Probability</Text>
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
            <Text style={styles.buttonText}>Back</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.nextButton,
              !getRiskLevel() && styles.nextButtonDisabled,
            ]}
            onPress={handleNext}
            disabled={!getRiskLevel()}
          >
            <Text style={styles.buttonText}>Next</Text>
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
    padding: 20,
    paddingBottom: 10,
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
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
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 18,
    color: colors.white,
    textAlign: 'center',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.white,
    marginBottom: 15,
    textAlign: 'center',
  },
  optionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  optionButton: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 8,
    padding: 12,
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
    marginBottom: 4,
  },
  optionLabel: {
    color: colors.white,
    fontSize: 11,
    textAlign: 'center',
  },
  matrixContainer: {
    flexDirection: 'row',
    marginBottom: 25,
  },
  matrixLabels: {
    marginRight: 10,
    justifyContent: 'space-between',
  },
  matrixAxisLabel: {
    color: colors.white,
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 10,
    height: 30,
  },
  probabilityButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 8,
    padding: 8,
    width: 80,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 2,
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
  },
  matrixGrid: {
    flex: 1,
  },
  matrixRow: {
    flexDirection: 'row',
    marginVertical: 2,
  },
  matrixCell: {
    flex: 1,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 2,
    borderRadius: 4,
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
    padding: 20,
    borderRadius: 8,
    marginBottom: 25,
  },
  riskLevelText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 15,
    marginBottom: 40,
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
  nextButtonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});

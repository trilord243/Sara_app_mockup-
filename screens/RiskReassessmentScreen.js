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
import Header from '../components/Header';

export default function RiskReassessmentScreen({ navigation }) {
  const [risks, setRisks] = useState([
    { id: 'electricity', name: 'Electricity', value: 16, color: colors.black, description: '' },
    { id: 'slips', name: 'Slips & Trips', value: 9, color: colors.red, description: '' },
  ]);

  const handleRiskPress = (riskId) => {
    navigation.navigate('RiskMatrix', { riskId, isReassessment: true });
  };

  const handleNext = () => {
    // Check if all risks are now green or yellow
    const allSafe = risks.every((risk) => risk.value <= 6);
    const riskLevel = allSafe ? 'green' : 'red';
    navigation.navigate('Summary', { riskLevel });
  };

  return (
    <View style={styles.container}>
      <Header
        onHelpPress={() => alert('Ayuda')}
        onExitPress={() => alert('Salir')}
      />

      <View style={styles.header}>
        <Text style={styles.title}>Reevaluación de Riesgos</Text>
      </View>

      <View style={styles.instructionBox}>
        <Text style={styles.instructionTitle}>🔄 Instrucciones</Text>
        <Text style={styles.instructionText}>
          Implemente medidas de control para reducir los riesgos identificados.
          Describa las acciones tomadas y luego reevalúe cada riesgo.
        </Text>
      </View>

      <ScrollView style={styles.content}>
        {risks.map((risk) => (
          <TouchableOpacity
            key={risk.id}
            style={styles.riskItem}
            onPress={() => handleRiskPress(risk.id)}
          >
            <View style={styles.riskHeader}>
              <View style={styles.iconCircle}>
                <Text style={styles.icon}>?</Text>
              </View>
              <Text style={styles.riskName}>{risk.name}</Text>
              <Text style={styles.arrow}>›</Text>
            </View>

            <View style={[styles.riskBadge, { backgroundColor: risk.color }]}>
              <Text style={styles.riskValue}>{risk.value} - {getRiskLabel(risk.value)}</Text>
            </View>

            <TextInput
              style={styles.descriptionInput}
              placeholder="Describa las medidas tomadas para disminuir el riesgo..."
              placeholderTextColor="#999"
              value={risk.description}
              onChangeText={(text) => {
                const newRisks = risks.map((r) =>
                  r.id === risk.id ? { ...r, description: text } : r
                );
                setRisks(newRisks);
              }}
              multiline
            />

            <View style={styles.checkbox}>
              <View style={styles.checkboxSquare} />
              <Text style={styles.checkboxLabel}>N/A</Text>
            </View>
          </TouchableOpacity>
        ))}

        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.nextButtonText}>Siguiente →</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const getRiskLabel = (value) => {
  if (value === 16) return 'Negro';
  if (value >= 8) return 'Rojo';
  if (value >= 3) return 'Amarillo';
  return 'Verde';
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  header: {
    padding: 20,
    paddingBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.white,
    textAlign: 'center',
  },
  instructionBox: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginHorizontal: 20,
    marginBottom: 10,
    padding: 15,
    borderRadius: 10,
    borderLeftWidth: 4,
    borderLeftColor: colors.secondary,
  },
  instructionTitle: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  instructionText: {
    color: colors.white,
    fontSize: 13,
    lineHeight: 20,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  riskItem: {
    backgroundColor: 'rgba(0, 30, 50, 0.8)',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
  },
  riskHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  iconCircle: {
    width: 35,
    height: 35,
    borderRadius: 17.5,
    borderWidth: 2,
    borderColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  icon: {
    color: colors.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
  riskName: {
    flex: 1,
    color: colors.white,
    fontSize: 18,
    fontWeight: '600',
  },
  arrow: {
    color: colors.white,
    fontSize: 28,
    fontWeight: '300',
  },
  riskBadge: {
    borderRadius: 5,
    padding: 12,
    marginBottom: 15,
  },
  riskValue: {
    color: colors.white,
    fontSize: 14,
    fontWeight: 'bold',
  },
  descriptionInput: {
    backgroundColor: colors.white,
    borderRadius: 5,
    padding: 12,
    fontSize: 14,
    minHeight: 80,
    textAlignVertical: 'top',
    marginBottom: 15,
  },
  checkbox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkboxSquare: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: colors.white,
    borderRadius: 3,
    marginRight: 10,
  },
  checkboxLabel: {
    color: colors.white,
    fontSize: 14,
  },
  nextButton: {
    backgroundColor: colors.white,
    borderRadius: 25,
    padding: 15,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 40,
  },
  nextButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.primary,
  },
});

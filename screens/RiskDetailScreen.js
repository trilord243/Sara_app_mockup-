import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { colors } from '../theme/colors';
import Header from '../components/Header';

export default function RiskDetailScreen({ navigation, route }) {
  const { risk } = route.params || {};

  const handleNext = () => {
    navigation.navigate('RiskMatrix', { risk });
  };

  return (
    <View style={styles.container}>
      <Header
        onHelpPress={() => alert('Ayuda')}
        onExitPress={() => alert('Salir')}
      />

      <View style={styles.header}>
        <Text style={styles.title}>Evaluación de Riesgos</Text>
        <Text style={styles.subtitle}>{risk?.name || 'Tipo de Riesgo'}</Text>
      </View>

      <View style={styles.instructionBox}>
        <Text style={styles.instructionTitle}>ℹ️ Información del Riesgo</Text>
        <Text style={styles.instructionText}>
          Revise la descripción del riesgo y las medidas de control mínimas requeridas.
          Asegúrese de comprenderlas antes de continuar con la evaluación.
        </Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.card}>
          <Text style={styles.questionTitle}>{risk?.description}</Text>

          {risk?.minimumControl && (
            <>
              <Text style={styles.controlTitle}>
                Medidas de Control Mínimas:
              </Text>
              <Text style={styles.controlText}>{risk.minimumControl}</Text>
            </>
          )}
        </View>

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
    padding: 20,
    paddingBottom: 10,
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
  card: {
    backgroundColor: 'rgba(0, 20, 40, 0.8)',
    borderRadius: 10,
    padding: 25,
    marginBottom: 30,
  },
  questionTitle: {
    color: colors.white,
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 20,
  },
  controlTitle: {
    color: colors.white,
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  controlText: {
    color: colors.white,
    fontSize: 14,
    lineHeight: 22,
  },
  buttonContainer: {
    flexDirection: 'row',
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
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});

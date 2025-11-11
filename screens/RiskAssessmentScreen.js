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
        onHelpPress={() => alert('Help')}
        onExitPress={() => alert('Exit')}
      />

      <View style={styles.header}>
        <Text style={styles.title}>Risk Assessment</Text>
      </View>

      <ScrollView style={styles.content}>
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
                placeholder="Open text to describe the risk."
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
            <Text style={styles.buttonText}>Back</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
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
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.white,
    textAlign: 'center',
  },
  content: {
    flex: 1,
  },
  riskItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.2)',
  },
  riskLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
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
    color: colors.white,
    fontSize: 15,
    flex: 1,
  },
  riskRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderWidth: 2,
    borderColor: colors.white,
    borderRadius: 3,
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
    fontSize: 14,
  },
  arrow: {
    color: colors.white,
    fontSize: 28,
    fontWeight: '300',
  },
  otherInput: {
    backgroundColor: colors.white,
    margin: 20,
    marginTop: 0,
    padding: 15,
    borderRadius: 8,
    fontSize: 14,
    minHeight: 80,
    textAlignVertical: 'top',
  },
  buttonContainer: {
    flexDirection: 'row',
    padding: 20,
    gap: 15,
    marginBottom: 20,
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

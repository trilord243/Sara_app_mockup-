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

export default function SummaryScreen({ navigation, route }) {
  const { riskLevel } = route.params || { riskLevel: 'green' };

  const getSummaryConfig = () => {
    switch (riskLevel) {
      case 'green':
        return {
          backgroundColor: colors.green,
          title: 'The Risk Is Green',
          buttonLabel: 'Approved',
          message: 'You have now assessed the risk and you are authorised to do the job',
          icon: '✓',
          showReassess: false,
        };
      case 'yellow':
        return {
          backgroundColor: colors.yellow,
          title: 'The Risk Is Yellow',
          buttonLabel: 'Approved',
          message: 'You have now assessed the risk and you are authorised to do the job',
          icon: '✓',
          showReassess: false,
        };
      case 'red':
        return {
          backgroundColor: colors.red,
          title: 'The Risk Is Red',
          buttonLabel: 'Do not Continue',
          message: 'Conditions are not safe enough',
          icon: '⚠',
          showReassess: true,
        };
      case 'black':
        return {
          backgroundColor: colors.black,
          title: 'The Risk Is Black',
          buttonLabel: 'Do not Continue',
          message: 'Conditions are not safe enough',
          icon: '⚠',
          showReassess: true,
        };
      default:
        return {
          backgroundColor: colors.green,
          title: 'Risk Assessment Complete',
          buttonLabel: 'Approved',
          message: 'Assessment completed',
          icon: '✓',
          showReassess: false,
        };
    }
  };

  const config = getSummaryConfig();

  const handleExit = () => {
    navigation.navigate('Congratulations');
  };

  const handleReassess = () => {
    navigation.navigate('RiskReassessment');
  };

  return (
    <View style={styles.container}>
      <Header
        onHelpPress={() => alert('Help')}
        onExitPress={() => alert('Exit')}
      />

      <View style={[styles.summaryContainer, { backgroundColor: config.backgroundColor }]}>
        <Text style={styles.title}>Summary</Text>

        <Text style={styles.riskTitle}>{config.title}</Text>

        <View style={styles.buttonBadge}>
          <Text style={styles.buttonBadgeText}>{config.buttonLabel}</Text>
        </View>

        <Text style={styles.message}>{config.message}</Text>

        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backButtonText}>Back</Text>
          </TouchableOpacity>

          {config.showReassess ? (
            <TouchableOpacity
              style={styles.reassessButton}
              onPress={handleReassess}
            >
              <Text style={styles.reassessButtonText}>Reassess</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleExit}
            >
              <Text style={styles.submitButtonText}>Submit</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  summaryContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.white,
    marginBottom: 40,
  },
  riskTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.white,
    marginBottom: 30,
    textAlign: 'center',
  },
  buttonBadge: {
    backgroundColor: colors.white,
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 25,
    marginBottom: 40,
  },
  buttonBadgeText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.textDark,
  },
  message: {
    fontSize: 16,
    color: colors.white,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 50,
    paddingHorizontal: 20,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 15,
    width: '100%',
    maxWidth: 400,
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
  backButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
  reassessButton: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: 25,
    padding: 15,
    alignItems: 'center',
  },
  reassessButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  submitButton: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: 25,
    padding: 15,
    alignItems: 'center',
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});

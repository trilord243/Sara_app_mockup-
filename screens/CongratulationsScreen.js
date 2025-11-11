import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { colors } from '../theme/colors';
import Header from '../components/Header';

export default function CongratulationsScreen({ navigation }) {
  const handleExit = () => {
    // Reset to home screen
    navigation.reset({
      index: 0,
      routes: [{ name: 'Home' }],
    });
  };

  return (
    <View style={styles.container}>
      <Header
        onHelpPress={() => alert('Help')}
        onExitPress={handleExit}
      />

      <View style={styles.content}>
        <View style={styles.checkmarkContainer}>
          <View style={styles.checkmarkCircle}>
            <Text style={styles.checkmark}>✓</Text>
          </View>
        </View>

        <Text style={styles.title}>Congratulations</Text>

        <Text style={styles.message}>
          The Risk Assessment Has Been Completed
        </Text>

        <TouchableOpacity style={styles.exitButton} onPress={handleExit}>
          <Text style={styles.exitButtonText}>Exit</Text>
        </TouchableOpacity>
      </View>
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
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
  },
  checkmarkContainer: {
    marginBottom: 40,
  },
  checkmarkCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: colors.green,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmark: {
    fontSize: 70,
    color: colors.white,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.white,
    marginBottom: 20,
  },
  message: {
    fontSize: 16,
    color: colors.white,
    textAlign: 'center',
    marginBottom: 50,
  },
  exitButton: {
    backgroundColor: colors.white,
    paddingHorizontal: 60,
    paddingVertical: 15,
    borderRadius: 25,
  },
  exitButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.primary,
  },
});

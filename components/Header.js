import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';

export default function Header({ onHelpPress, onExitPress }) {
  return (
    <View style={styles.header}>
      <View style={styles.leftSection}>
        <TouchableOpacity onPress={onHelpPress} style={styles.iconButton}>
          <Text style={styles.iconText}>?</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onExitPress} style={styles.iconButton}>
          <Text style={styles.iconText}>⎙</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.title}>GRUNDFOS</Text>

      <View style={styles.rightSection}>
        <TouchableOpacity style={styles.simsButton}>
          <Text style={styles.simsText}>💬 SIMS</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
    backgroundColor: colors.primary,
  },
  leftSection: {
    flexDirection: 'row',
    gap: 15,
  },
  rightSection: {
    flexDirection: 'row',
  },
  iconButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  title: {
    color: colors.white,
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 2,
  },
  simsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  simsText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: '600',
  },
});

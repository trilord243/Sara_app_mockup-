// Theme colors - easily customizable
export const colors = {
  // Primary colors
  primary: '#003D5C', // Grundfos dark blue
  secondary: '#00A9CE', // Grundfos light blue

  // Background colors
  background: '#003D5C',
  backgroundLight: '#F5F5F5',
  white: '#FFFFFF',

  // Risk assessment colors
  green: '#4CAF50',
  yellow: '#FFC107',
  red: '#D32F2F',
  black: '#000000',

  // Text colors
  text: '#FFFFFF',
  textDark: '#000000',
  textSecondary: '#B0BEC5',

  // UI elements
  border: '#003D5C',
  inputBackground: '#FFFFFF',
  disabledBackground: '#E0E0E0',

  // Matrix colors
  matrixGreen: '#4CAF50',
  matrixYellow: '#FFC107',
  matrixRed: '#F44336',
  matrixBlack: '#000000',
};

// Matrix configuration
export const riskMatrix = {
  green: { min: 1, max: 2, label: 'Green: Low Risk - Carry Out The Task' },
  yellow: { min: 3, max: 6, label: 'Yellow: Moderate Risk - Carry Out The Task With Caution' },
  red: { min: 8, max: 12, label: 'Red: High Risk - Implement Controls To Lower The Risk Before Proceeding' },
  black: { value: 16, label: 'Black: Extremely High Risk - Stop Immediately' },
};

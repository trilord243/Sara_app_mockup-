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

// Configuración de matriz de riesgos
export const riskMatrix = {
  green: { min: 1, max: 2, label: 'Verde: Riesgo Bajo - Realice La Tarea' },
  yellow: { min: 3, max: 6, label: 'Amarillo: Riesgo Moderado - Realice La Tarea Con Precaución' },
  red: { min: 8, max: 12, label: 'Rojo: Riesgo Alto - Implemente Controles Para Reducir El Riesgo Antes De Proceder' },
  black: { value: 16, label: 'Negro: Riesgo Extremadamente Alto - Deténgase Inmediatamente' },
};

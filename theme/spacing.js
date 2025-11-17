// Sistema de espaciado consistente para toda la aplicación SARA

export const spacing = {
  // Espaciado base
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,

  // Espaciado específico para secciones
  sectionPadding: 20,
  containerPadding: 25,
  cardPadding: 18,

  // Márgenes entre elementos
  elementMargin: 15,
  smallMargin: 10,
  largeMargin: 30,

  // Altura de elementos
  inputHeight: 55,
  buttonHeight: 50,
  headerHeight: 60,

  // Bordes
  borderRadius: 10,
  cardBorderRadius: 12,
  buttonBorderRadius: 12,
  inputBorderRadius: 10,

  // Espaciado de instrucciones
  instructionBoxMargin: 20,
  instructionBoxPadding: 18,

  // Espaciado de formularios
  formFieldMargin: 25,
  labelMargin: 10,
};

// Estilos comunes para cuadros de instrucciones
export const instructionBoxStyles = {
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
  marginHorizontal: spacing.instructionBoxMargin,
  marginVertical: spacing.instructionBoxMargin,
  padding: spacing.instructionBoxPadding,
  borderRadius: spacing.cardBorderRadius,
  borderLeftWidth: 4,
};

// Estilos comunes para botones
export const buttonStyles = {
  borderRadius: spacing.buttonBorderRadius,
  paddingVertical: 18,
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: spacing.buttonHeight,
};

// Estilos comunes para inputs
export const inputStyles = {
  borderRadius: spacing.inputBorderRadius,
  paddingHorizontal: 15,
  height: spacing.inputHeight,
  fontSize: 15,
};

// Estilos comunes para contenedores
export const containerStyles = {
  paddingHorizontal: spacing.containerPadding,
  paddingTop: spacing.sectionPadding,
};

# SARA - Service Automated Risk Assessment

Aplicación móvil de evaluación automatizada de riesgos para técnicos de servicio, desarrollada con React Native y Expo.

## 🎨 Características

- ✅ Interfaz idéntica a la aplicación SARA de Grundfos
- ✅ Sistema de colores configurable mediante variables
- ✅ Navegación fluida entre pantallas
- ✅ Evaluación de múltiples tipos de riesgos
- ✅ Matriz de riesgos interactiva con códigos de colores
- ✅ Datos de prueba pre-cargados
- ✅ Flujo completo de evaluación y reevaluación

## 🎯 Pantallas Incluidas

1. **Home Screen** - Información básica del trabajo
2. **Pre-Task Analysis** - Análisis de condiciones previas
3. **Photo Upload** - Captura y carga de fotos
4. **Risk Assessment** - Lista de riesgos a evaluar
5. **Risk Detail** - Detalles y medidas de control
6. **Risk Matrix** - Matriz interactiva de probabilidad/severidad
7. **Summary** - Resultados de la evaluación
8. **Risk Reassessment** - Reevaluación de riesgos
9. **Congratulations** - Pantalla de finalización

## 🎨 Personalización de Colores

Los colores se pueden cambiar fácilmente en el archivo `theme/colors.js`:

```javascript
export const colors = {
  primary: '#003D5C',    // Color primario
  secondary: '#00A9CE',  // Color secundario
  green: '#4CAF50',      // Riesgo bajo
  yellow: '#FFC107',     // Riesgo moderado
  red: '#D32F2F',        // Riesgo alto
  black: '#000000',      // Riesgo extremo
  // ... más colores
};
```

## 📦 Instalación

```bash
# Instalar dependencias
npm install

# Iniciar en desarrollo
npm start

# Ejecutar en Android
npm run android

# Ejecutar en iOS (requiere macOS)
npm run ios

# Ejecutar en Web
npm run web
```

## 🗂️ Estructura del Proyecto

```
Sara/
├── App.js                      # Configuración de navegación
├── theme/
│   └── colors.js              # Sistema de colores configurable
├── data/
│   └── fakeData.js            # Datos de prueba
├── components/
│   └── Header.js              # Componente de encabezado
├── screens/
│   ├── HomeScreen.js
│   ├── PreTaskScreen.js
│   ├── PhotoUploadScreen.js
│   ├── RiskAssessmentScreen.js
│   ├── RiskDetailScreen.js
│   ├── RiskMatrixScreen.js
│   ├── SummaryScreen.js
│   ├── CongratulationsScreen.js
│   └── RiskReassessmentScreen.js
└── package.json
```

## 🎮 Flujo de la Aplicación

1. Usuario ingresa información básica del trabajo
2. Completa análisis de pre-tarea (permisos, herramientas, etc.)
3. Toma fotos del área de trabajo
4. Selecciona los riesgos presentes
5. Evalúa cada riesgo usando la matriz
6. Recibe aprobación o indicación de reevaluar
7. Si es necesario, reevalúa con medidas de control
8. Finaliza con pantalla de confirmación

## 🚦 Niveles de Riesgo

- **Verde (1-2)**: Riesgo bajo - Aprobado para continuar
- **Amarillo (3-6)**: Riesgo moderado - Continuar con precaución
- **Rojo (8-12)**: Riesgo alto - Implementar controles antes de proceder
- **Negro (16)**: Riesgo extremo - Detener inmediatamente

## 🔧 Tecnologías

- React Native
- Expo
- React Navigation
- Expo Image Picker

## 📝 Datos de Prueba

La aplicación incluye datos de prueba en `data/fakeData.js`:
- Información de usuario pre-cargada
- 18 tipos de riesgos diferentes
- Preguntas de análisis pre-tarea
- Medidas de control recomendadas

## 🎯 Próximas Mejoras

- Integración con backend/API
- Generación de reportes PDF
- Firma digital
- Modo offline
- Sincronización con SAP
- Envío de emails automático

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';
import { colors } from '../theme/colors';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    // Validaciones básicas
    if (!email || !password) {
      Alert.alert('Error', 'Por favor complete todos los campos');
      return;
    }

    if (!email.includes('@')) {
      Alert.alert('Error', 'Por favor ingrese un correo electrónico válido');
      return;
    }

    // Simulación de login exitoso
    // En producción, aquí se haría la llamada al API
    navigation.navigate('Home');
  };

  const handleForgotPassword = () => {
    Alert.alert(
      'Recuperar Contraseña',
      'Se ha enviado un correo electrónico con instrucciones para recuperar su contraseña.',
      [{ text: 'Entendido' }]
    );
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        {/* Logo y título */}
        <View style={styles.logoContainer}>
          <View style={styles.logoCircle}>
            <Text style={styles.logoIcon}>🔒</Text>
          </View>
          <Text style={styles.logo}>S.A.R.A.</Text>
          <Text style={styles.subtitle}>
            Evaluación Automatizada de Riesgos de Servicio
          </Text>
          <Text style={styles.welcomeText}>Bienvenido de nuevo</Text>
        </View>

        {/* Cuadro de instrucciones */}
        <View style={styles.instructionBox}>
          <Text style={styles.instructionTitle}>🔐 Inicio de Sesión</Text>
          <Text style={styles.instructionText}>
            Ingrese sus credenciales para acceder al sistema de evaluación de riesgos.
            Asegúrese de usar su correo corporativo.
          </Text>
        </View>

        {/* Formulario de login */}
        <View style={styles.formContainer}>
          {/* Campo de Email */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Correo Electrónico</Text>
            <View style={styles.inputContainer}>
              <Text style={styles.inputIcon}>📧</Text>
              <TextInput
                style={styles.input}
                placeholder="usuario@grundfos.com"
                placeholderTextColor="#999"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>
          </View>

          {/* Campo de Contraseña */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Contraseña</Text>
            <View style={styles.inputContainer}>
              <Text style={styles.inputIcon}>🔑</Text>
              <TextInput
                style={styles.input}
                placeholder="Ingrese su contraseña"
                placeholderTextColor="#999"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                autoCorrect={false}
              />
              <TouchableOpacity
                style={styles.eyeButton}
                onPress={() => setShowPassword(!showPassword)}
              >
                <Text style={styles.eyeIcon}>{showPassword ? '👁️' : '👁️‍🗨️'}</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Recordar sesión y olvidé contraseña */}
          <View style={styles.optionsRow}>
            <TouchableOpacity
              style={styles.forgotButton}
              onPress={handleForgotPassword}
            >
              <Text style={styles.forgotText}>¿Olvidó su contraseña?</Text>
            </TouchableOpacity>
          </View>

          {/* Botón de Login */}
          <TouchableOpacity
            style={styles.loginButton}
            onPress={handleLogin}
            activeOpacity={0.8}
          >
            <Text style={styles.loginButtonText}>🔓 Iniciar Sesión</Text>
          </TouchableOpacity>

          {/* Información adicional */}
          <View style={styles.infoContainer}>
            <Text style={styles.infoText}>
              ℹ️ Si tiene problemas para acceder, contacte al administrador del sistema
            </Text>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>GRUNDFOS © 2025</Text>
          <Text style={styles.footerText}>Versión 1.0.0</Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 30,
  },
  logoContainer: {
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  logoCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  logoIcon: {
    fontSize: 40,
  },
  logo: {
    fontSize: 48,
    fontWeight: 'bold',
    color: colors.white,
    letterSpacing: 6,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 13,
    color: colors.white,
    textAlign: 'center',
    letterSpacing: 1,
    marginBottom: 15,
  },
  welcomeText: {
    fontSize: 18,
    color: colors.white,
    marginTop: 10,
    fontWeight: '500',
  },
  instructionBox: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginHorizontal: 25,
    marginVertical: 20,
    padding: 18,
    borderRadius: 12,
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
    opacity: 0.95,
  },
  formContainer: {
    paddingHorizontal: 25,
    marginTop: 10,
  },
  inputGroup: {
    marginBottom: 25,
  },
  label: {
    color: colors.white,
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 10,
    letterSpacing: 0.3,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 10,
    paddingHorizontal: 15,
    height: 55,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  inputIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: colors.textDark,
    paddingVertical: 0,
  },
  eyeButton: {
    padding: 5,
  },
  eyeIcon: {
    fontSize: 22,
  },
  optionsRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 30,
  },
  forgotButton: {
    paddingVertical: 5,
  },
  forgotText: {
    color: colors.white,
    fontSize: 14,
    textDecorationLine: 'underline',
  },
  loginButton: {
    backgroundColor: colors.secondary,
    borderRadius: 12,
    paddingVertical: 18,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.secondary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
    marginBottom: 20,
  },
  loginButtonText: {
    color: colors.white,
    fontSize: 17,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  infoContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 10,
    padding: 15,
    marginTop: 10,
  },
  infoText: {
    color: colors.white,
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 18,
    opacity: 0.9,
  },
  footer: {
    alignItems: 'center',
    marginTop: 40,
    paddingBottom: 20,
  },
  footerText: {
    color: colors.white,
    fontSize: 12,
    opacity: 0.6,
    marginVertical: 3,
  },
});

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Platform,
} from 'react-native';
import { colors } from '../theme/colors';
import { spacing, instructionBoxStyles, inputStyles, buttonStyles, containerStyles } from '../theme/spacing';
import Header from '../components/Header';
import { countries, languages, userInfo, jobInfo } from '../data/fakeData';

export default function HomeScreen({ navigation }) {
  const [country, setCountry] = useState('Estados Unidos');
  const [language, setLanguage] = useState('Español');
  const [showCountries, setShowCountries] = useState(false);
  const [showLanguages, setShowLanguages] = useState(false);
  const [formData, setFormData] = useState({
    employeeName: userInfo.fullName,
    employeeNumber: userInfo.employeeNumber,
    serviceOrderNumber: jobInfo.serviceOrderNumber,
    customerContact: jobInfo.customerContact,
    emergencyContact: jobInfo.emergencyContact,
    siteAddress: jobInfo.siteAddress,
    jobDescription: jobInfo.jobDescription,
  });

  const handleNext = () => {
    navigation.navigate('PreTask');
  };

  return (
    <View style={styles.container}>
      <Header
        onHelpPress={() => alert('Ayuda')}
        onExitPress={() => alert('Salir')}
      />

      <ScrollView style={styles.content} contentContainerStyle={styles.scrollContent}>
        <View style={styles.logoContainer}>
          <Text style={styles.logo}>S.A.R.A.</Text>
          <Text style={styles.subtitle}>Evaluación Automatizada de Riesgos de Servicio</Text>
        </View>

        {/* Texto explicativo */}
        <View style={styles.instructionBox}>
          <Text style={styles.instructionTitle}>📋 Bienvenido</Text>
          <Text style={styles.instructionText}>
            Complete la siguiente información para iniciar su evaluación de riesgos.
            Asegúrese de proporcionar datos precisos para garantizar la seguridad en el sitio de trabajo.
          </Text>
        </View>

        <View style={styles.form}>
          {/* Country Selector */}
          <Text style={styles.label}>País:</Text>
          <TouchableOpacity
            style={styles.dropdown}
            onPress={() => setShowCountries(!showCountries)}
          >
            <Text style={styles.dropdownText}>{country}</Text>
            <Text style={styles.dropdownArrow}>▼</Text>
          </TouchableOpacity>
          {showCountries && (
            <View style={styles.dropdownMenu}>
              {countries.map((c) => (
                <TouchableOpacity
                  key={c}
                  style={styles.dropdownItem}
                  onPress={() => {
                    setCountry(c);
                    setShowCountries(false);
                  }}
                >
                  <Text style={styles.dropdownItemText}>{c}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

          {/* Language Selector */}
          <Text style={styles.label}>Idioma:</Text>
          <TouchableOpacity
            style={styles.dropdown}
            onPress={() => setShowLanguages(!showLanguages)}
          >
            <Text style={styles.dropdownText}>{language}</Text>
            <Text style={styles.dropdownArrow}>▼</Text>
          </TouchableOpacity>
          {showLanguages && (
            <View style={styles.dropdownMenu}>
              {languages.map((l) => (
                <TouchableOpacity
                  key={l}
                  style={styles.dropdownItem}
                  onPress={() => {
                    setLanguage(l);
                    setShowLanguages(false);
                  }}
                >
                  <Text style={styles.dropdownItemText}>{l}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

          {/* Employee Information */}
          <Text style={styles.label}>Nombre Completo del Empleado:</Text>
          <TextInput
            style={styles.input}
            value={formData.employeeName}
            onChangeText={(text) =>
              setFormData({ ...formData, employeeName: text })
            }
          />

          <Text style={styles.label}>Número de Empleado:</Text>
          <TextInput
            style={styles.input}
            value={formData.employeeNumber}
            onChangeText={(text) =>
              setFormData({ ...formData, employeeNumber: text })
            }
            keyboardType="numeric"
          />

          <Text style={styles.label}>Número de Orden de Servicio:</Text>
          <TextInput
            style={styles.input}
            value={formData.serviceOrderNumber}
            onChangeText={(text) =>
              setFormData({ ...formData, serviceOrderNumber: text })
            }
            placeholder="IMPORTANTE: ingrese el número correcto"
            placeholderTextColor="#999"
            keyboardType="numeric"
          />

          <Text style={styles.label}>Persona de Contacto del Cliente:</Text>
          <TextInput
            style={styles.input}
            value={formData.customerContact}
            onChangeText={(text) =>
              setFormData({ ...formData, customerContact: text })
            }
          />

          <Text style={styles.label}>Contacto de Emergencia del Cliente (Si es diferente):</Text>
          <TextInput
            style={styles.input}
            value={formData.emergencyContact}
            onChangeText={(text) =>
              setFormData({ ...formData, emergencyContact: text })
            }
          />

          <Text style={styles.label}>Dirección del Sitio:</Text>
          <View style={styles.addressContainer}>
            <TouchableOpacity style={styles.gpsButton}>
              <Text style={styles.gpsIcon}>📍</Text>
            </TouchableOpacity>
            <TextInput
              style={[styles.input, styles.addressInput]}
              value={formData.siteAddress}
              onChangeText={(text) =>
                setFormData({ ...formData, siteAddress: text })
              }
              placeholder="Use el GPS o ingrese manualmente"
              placeholderTextColor="#999"
            />
          </View>

          <Text style={styles.label}>Tarea de Trabajo a Realizar:</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={formData.jobDescription}
            onChangeText={(text) =>
              setFormData({ ...formData, jobDescription: text })
            }
            placeholder="Describa detalladamente el trabajo a realizar..."
            placeholderTextColor="#999"
            multiline
            numberOfLines={4}
          />

          <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
            <Text style={styles.nextButtonText}>Siguiente →</Text>
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
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: spacing.largeMargin,
  },
  logoContainer: {
    alignItems: 'center',
    paddingVertical: spacing.largeMargin,
  },
  logo: {
    fontSize: 48,
    fontWeight: 'bold',
    color: colors.white,
    letterSpacing: 4,
  },
  subtitle: {
    fontSize: 12,
    color: colors.white,
    marginTop: spacing.smallMargin,
    letterSpacing: 1,
    lineHeight: 18,
  },
  instructionBox: {
    ...instructionBoxStyles,
    borderLeftColor: colors.secondary,
  },
  instructionTitle: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: spacing.smallMargin,
  },
  instructionText: {
    color: colors.white,
    fontSize: 13,
    lineHeight: 20,
  },
  form: {
    paddingHorizontal: spacing.containerPadding,
    paddingTop: spacing.sectionPadding,
  },
  label: {
    color: colors.white,
    fontSize: 14,
    marginBottom: spacing.labelMargin,
    marginTop: spacing.elementMargin,
  },
  input: {
    ...inputStyles,
    backgroundColor: colors.white,
    color: colors.textDark,
    marginBottom: spacing.formFieldMargin,
  },
  dropdown: {
    backgroundColor: colors.white,
    borderRadius: spacing.inputBorderRadius,
    paddingHorizontal: spacing.elementMargin,
    height: spacing.inputHeight,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.formFieldMargin,
  },
  dropdownText: {
    fontSize: 15,
    color: colors.textDark,
  },
  dropdownArrow: {
    fontSize: 12,
    color: colors.textDark,
  },
  dropdownMenu: {
    backgroundColor: colors.white,
    borderRadius: spacing.inputBorderRadius,
    marginTop: spacing.xs,
    marginBottom: spacing.formFieldMargin,
    maxHeight: 200,
  },
  dropdownItem: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.elementMargin,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  dropdownItemText: {
    fontSize: 15,
    color: colors.textDark,
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.formFieldMargin,
  },
  gpsButton: {
    backgroundColor: colors.secondary,
    width: spacing.inputHeight,
    height: spacing.inputHeight,
    borderRadius: spacing.inputHeight / 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.smallMargin,
  },
  gpsIcon: {
    fontSize: 20,
  },
  addressInput: {
    flex: 1,
    marginBottom: 0,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
    paddingTop: spacing.elementMargin,
  },
  nextButton: {
    ...buttonStyles,
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: colors.white,
    marginTop: spacing.largeMargin,
    marginBottom: spacing.xl,
  },
  nextButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
});

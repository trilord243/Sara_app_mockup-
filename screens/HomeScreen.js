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

      <ScrollView style={styles.content}>
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
  logoContainer: {
    alignItems: 'center',
    paddingVertical: 30,
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
    marginTop: 5,
    letterSpacing: 1,
  },
  instructionBox: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    margin: 20,
    padding: 15,
    borderRadius: 10,
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
  },
  form: {
    padding: 20,
  },
  label: {
    color: colors.white,
    fontSize: 14,
    marginBottom: 8,
    marginTop: 15,
  },
  input: {
    backgroundColor: colors.white,
    borderRadius: 5,
    padding: 12,
    fontSize: 14,
    color: colors.textDark,
  },
  dropdown: {
    backgroundColor: colors.white,
    borderRadius: 5,
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dropdownText: {
    fontSize: 14,
    color: colors.textDark,
  },
  dropdownArrow: {
    fontSize: 12,
    color: colors.textDark,
  },
  dropdownMenu: {
    backgroundColor: colors.white,
    borderRadius: 5,
    marginTop: 5,
    maxHeight: 200,
  },
  dropdownItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  dropdownItemText: {
    fontSize: 14,
    color: colors.textDark,
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  gpsButton: {
    backgroundColor: colors.secondary,
    width: 45,
    height: 45,
    borderRadius: 22.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gpsIcon: {
    fontSize: 20,
  },
  addressInput: {
    flex: 1,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  nextButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: colors.white,
    borderRadius: 25,
    padding: 15,
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 40,
  },
  nextButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
});

import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Alert,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { colors } from '../theme/colors';
import { spacing, instructionBoxStyles, buttonStyles } from '../theme/spacing';
import Header from '../components/Header';

export default function PhotoUploadScreen({ navigation }) {
  const [photos, setPhotos] = useState([]);

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert('Permiso Requerido', '¡Se requiere permiso para acceder a la galería de fotos!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 0.7,
    });

    if (!result.canceled) {
      setPhotos([...photos, result.assets[0].uri]);
    }
  };

  const takePhoto = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert('Permiso Requerido', '¡Se requiere permiso para acceder a la cámara!');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: false,
      quality: 0.7,
    });

    if (!result.canceled) {
      setPhotos([...photos, result.assets[0].uri]);
    }
  };

  const removePhoto = (index) => {
    const newPhotos = photos.filter((_, i) => i !== index);
    setPhotos(newPhotos);
  };

  const handleNext = () => {
    navigation.navigate('RiskAssessment');
  };

  return (
    <View style={styles.container}>
      <Header
        onHelpPress={() => alert('Ayuda')}
        onExitPress={() => alert('Salir')}
      />

      <ScrollView style={styles.content} contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>
          Carga de Fotos del Área de Trabajo
        </Text>

        <View style={styles.instructionBox}>
          <Text style={styles.instructionTitle}>📸 Instrucciones</Text>
          <Text style={styles.instructionText}>
            Por favor tome fotos del área de trabajo donde realizará el servicio, enfocándose en los peligros potenciales.
            Identifique todos los riesgos (S.A.R.A le ayudará) y evalúe el nivel de peligro.
          </Text>
        </View>

        <Text style={styles.subtitle}>(máximo 10 archivos y/o 100mb)</Text>

        <Text style={styles.infoText}>
          Si el riesgo se evalúa como rojo o negro, su gerente será informado
          automáticamente por correo (si está conectado a una red)
        </Text>

        <TouchableOpacity style={styles.uploadButton} onPress={pickImage}>
          <Text style={styles.uploadButtonText}>📁 Toque o haga clic para agregar una imagen</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.cameraButton} onPress={takePhoto}>
          <Text style={styles.cameraButtonText}>📷 Tomar Foto</Text>
        </TouchableOpacity>

        {photos.length > 0 && (
          <View style={styles.photosContainer}>
            <Text style={styles.photosTitle}>Fotos Cargadas:</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {photos.map((photo, index) => (
                <View key={index} style={styles.photoWrapper}>
                  <Image source={{ uri: photo }} style={styles.photo} />
                  <TouchableOpacity
                    style={styles.removeButton}
                    onPress={() => removePhoto(index)}
                  >
                    <Text style={styles.removeButtonText}>✕</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>
          </View>
        )}

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.saveButton}
            onPress={() => alert('Fotos guardadas en la galería')}
          >
            <Text style={styles.saveButtonText}>💾 Guardar en galería</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.clearButton}
            onPress={() => setPhotos([])}
          >
            <Text style={styles.clearButtonText}>🗑️ Limpiar galería</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.navigationButtons}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.buttonText}>← Atrás</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
            <Text style={styles.buttonText}>Siguiente →</Text>
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
    paddingHorizontal: spacing.containerPadding,
    paddingTop: spacing.sectionPadding,
    paddingBottom: spacing.largeMargin,
  },
  title: {
    color: colors.white,
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: spacing.xl,
    textAlign: 'center',
    lineHeight: 28,
  },
  instructionBox: {
    ...instructionBoxStyles,
    borderLeftColor: colors.secondary,
    marginHorizontal: 0,
    marginBottom: spacing.xl,
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
  subtitle: {
    color: colors.white,
    fontSize: 12,
    marginBottom: spacing.elementMargin,
    textAlign: 'center',
  },
  infoText: {
    color: colors.white,
    fontSize: 12,
    lineHeight: 18,
    marginBottom: spacing.formFieldMargin,
  },
  uploadButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderWidth: 2,
    borderColor: colors.white,
    borderStyle: 'dashed',
    borderRadius: spacing.inputBorderRadius,
    padding: spacing.xxxl,
    alignItems: 'center',
    marginBottom: spacing.elementMargin,
  },
  uploadButtonText: {
    color: colors.white,
    fontSize: 16,
  },
  cameraButton: {
    ...buttonStyles,
    backgroundColor: colors.secondary,
    marginBottom: spacing.formFieldMargin,
  },
  cameraButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
  photosContainer: {
    marginBottom: spacing.formFieldMargin,
  },
  photosTitle: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: spacing.elementMargin,
  },
  photoWrapper: {
    position: 'relative',
    marginRight: spacing.smallMargin,
  },
  photo: {
    width: 150,
    height: 150,
    borderRadius: spacing.inputBorderRadius,
  },
  removeButton: {
    position: 'absolute',
    top: spacing.xs,
    right: spacing.xs,
    backgroundColor: colors.red,
    width: spacing.formFieldMargin,
    height: spacing.formFieldMargin,
    borderRadius: spacing.formFieldMargin / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: spacing.elementMargin,
    marginBottom: spacing.formFieldMargin,
  },
  saveButton: {
    ...buttonStyles,
    flex: 1,
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: colors.white,
    paddingVertical: spacing.md,
  },
  clearButton: {
    ...buttonStyles,
    flex: 1,
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: colors.white,
    paddingVertical: spacing.md,
  },
  saveButtonText: {
    color: colors.white,
    fontSize: 15,
    fontWeight: '600',
  },
  clearButtonText: {
    color: colors.white,
    fontSize: 15,
    fontWeight: '600',
  },
  navigationButtons: {
    flexDirection: 'row',
    gap: spacing.elementMargin,
  },
  backButton: {
    ...buttonStyles,
    flex: 1,
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: colors.white,
  },
  nextButton: {
    ...buttonStyles,
    flex: 1,
    backgroundColor: colors.white,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});

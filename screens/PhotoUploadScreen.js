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
import Header from '../components/Header';

export default function PhotoUploadScreen({ navigation }) {
  const [photos, setPhotos] = useState([]);

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert('Permission Required', 'Permission to access camera roll is required!');
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
      Alert.alert('Permission Required', 'Permission to access camera is required!');
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
        onHelpPress={() => alert('Help')}
        onExitPress={() => alert('Exit')}
      />

      <ScrollView style={styles.content}>
        <Text style={styles.title}>
          Please take photos of the work area where you will do the job, focusing on
          hazards.
        </Text>
        <Text style={styles.subtitle}>(max 10 files and/or 100mb)</Text>

        <View style={styles.instructionsBox}>
          <Text style={styles.instructionBullet}>
            • First identify all hazards (S.A.R.A will help you) and assess the risk
          </Text>
          <Text style={styles.instructionBullet}>
            • Call the office if the risk is too high or you are not sure.
          </Text>
        </View>

        <Text style={styles.infoText}>
          If the risk is assessed as being red or black, your manager will be informed
          automatically via mail (if you are connected to a network)
        </Text>

        <TouchableOpacity style={styles.uploadButton} onPress={pickImage}>
          <Text style={styles.uploadButtonText}>Tap or click to add a picture</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.cameraButton} onPress={takePhoto}>
          <Text style={styles.cameraButtonText}>📷 Take Photo</Text>
        </TouchableOpacity>

        {photos.length > 0 && (
          <View style={styles.photosContainer}>
            <Text style={styles.photosTitle}>Uploaded Photos:</Text>
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
            onPress={() => alert('Photos saved to gallery')}
          >
            <Text style={styles.saveButtonText}>Save to gallery</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.clearButton}
            onPress={() => setPhotos([])}
          >
            <Text style={styles.clearButtonText}>Clear gallery</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.navigationButtons}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.buttonText}>Back</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
            <Text style={styles.buttonText}>Next</Text>
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
    padding: 20,
  },
  title: {
    color: colors.white,
    fontSize: 16,
    marginBottom: 5,
    lineHeight: 22,
  },
  subtitle: {
    color: colors.white,
    fontSize: 12,
    marginBottom: 20,
  },
  instructionsBox: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
  },
  instructionBullet: {
    color: colors.white,
    fontSize: 13,
    lineHeight: 20,
    marginBottom: 8,
  },
  infoText: {
    color: colors.white,
    fontSize: 12,
    lineHeight: 18,
    marginBottom: 25,
  },
  uploadButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderWidth: 2,
    borderColor: colors.white,
    borderStyle: 'dashed',
    borderRadius: 8,
    padding: 40,
    alignItems: 'center',
    marginBottom: 15,
  },
  uploadButtonText: {
    color: colors.white,
    fontSize: 16,
  },
  cameraButton: {
    backgroundColor: colors.secondary,
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
    marginBottom: 25,
  },
  cameraButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
  photosContainer: {
    marginBottom: 25,
  },
  photosTitle: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  photoWrapper: {
    position: 'relative',
    marginRight: 10,
  },
  photo: {
    width: 150,
    height: 150,
    borderRadius: 8,
  },
  removeButton: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: colors.red,
    width: 25,
    height: 25,
    borderRadius: 12.5,
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
    gap: 15,
    marginBottom: 25,
  },
  saveButton: {
    flex: 1,
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: colors.white,
    borderRadius: 25,
    padding: 12,
    alignItems: 'center',
  },
  clearButton: {
    flex: 1,
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: colors.white,
    borderRadius: 25,
    padding: 12,
    alignItems: 'center',
  },
  saveButtonText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: '600',
  },
  clearButtonText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: '600',
  },
  navigationButtons: {
    flexDirection: 'row',
    gap: 15,
    marginBottom: 40,
  },
  backButton: {
    flex: 1,
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: colors.white,
    borderRadius: 25,
    padding: 15,
    alignItems: 'center',
  },
  nextButton: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: 25,
    padding: 15,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});

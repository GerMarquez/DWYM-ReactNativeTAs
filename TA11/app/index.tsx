import React, { useState } from 'react';
import { View, Text, Button, Image, Alert, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function App() {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const askPermissions = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== 'granted') {
      setErrorMessage('Permiso denegado. No se puede acceder al álbum de fotos.');
      return false;
    }
    setErrorMessage(null); 
  };

  const selectImage = async () => {
    const hasPermission = await askPermissions();
    if (!hasPermission) return;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setImageUri(result.assets[0].uri);
    } else {
      setErrorMessage('No se seleccionó ninguna imagen.');
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Seleccionar imagen" onPress={selectImage} />

      {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}

      {imageUri && (
        <View style={styles.imageContainer}>
          <Text>Imagen seleccionada:</Text>
          <Image
            source={{ uri: imageUri }}
            style={styles.image}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  imageContainer: {
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
    marginTop: 10,
  },
  errorText: {
    color: 'red',
    marginTop: 10,
    textAlign: 'center',
  },
});

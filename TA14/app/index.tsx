import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const [inputText, setInputText] = useState<string>('');
  const [storedText, setStoredText] = useState<string>('');

  const handleTextChange = (text: string) => {
    setInputText(text);
  };

  const storeData = async (value: any) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('my-key', jsonValue);
    } catch (e) {
      console.error('Error saving data', e);
    }
  };

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('my-key');
      if (value !== null) {
        setStoredText(JSON.parse(value));
      } else {
        setStoredText('No data found');
      }
    } catch (e) {
      console.error('Error reading value', e);
    }
  };

  const clearData = async () => {
    try {
      await AsyncStorage.removeItem('my-key');
      setStoredText('');
    } catch (e) {
      console.error('Error clearing data', e);
    }
  };

  const handleSaveButtonPress = () => {
    storeData(inputText);
  };

  return (
    <View style={styles.container}>
      <TextInput
        value={inputText}
        onChangeText={handleTextChange}
        placeholder="Type here"
        style={styles.input}
      />
      <TouchableOpacity onPress={handleSaveButtonPress} style={styles.button}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
      
      <TouchableOpacity onPress={getData} style={styles.button}>
        <Text style={styles.buttonText}>Load Data</Text>
      </TouchableOpacity>
      
      <TouchableOpacity onPress={clearData} style={styles.button}>
        <Text style={styles.buttonText}>Clear Data</Text>
      </TouchableOpacity>

      <Text style={styles.storedText}>
        Stored Data: {storedText}
      </Text>
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
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    width: '80%',
    paddingLeft: 10,
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    margin: 10,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  storedText: {
    marginTop: 20,
    fontSize: 16,
    color: 'black',
  },
});

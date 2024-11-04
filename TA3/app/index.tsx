import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, FlatList } from 'react-native';
import { red } from 'react-native-reanimated/lib/typescript/reanimated2/Colors';

export default function Index() {
  const [text, setText] = useState("Default Text");
  const [list, setList] = useState<string[]>([]);

  const addElement = () =>{
    setList(prevList => [...prevList, text]);
    setText("");
  };

  const removeElement = (index: number) => {
    setList(prevList => prevList.filter((_, i) => i !== index));
  };

  return (
    <View style={styles.container}>
      <TextInput
      style={styles.input}
          onChangeText={setText}
          value={text}
      />

      <TouchableOpacity onPress={addElement}>
          <Text>Agregar</Text>
      </TouchableOpacity>

      <FlatList
        data={list}
        renderItem={({ item, index }) => (
          <View style={styles.listItem}>
            <Text>{item}</Text>
            <TouchableOpacity onPress={() => removeElement(index)}>
              <Text style={styles.removeButtonText}>Eliminar</Text>
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />

    </View>  
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  input: {
    fontSize: 32,
    borderBottomWidth: 2,
    borderBottomColor: 'black',
  },
  display: {
    fontWeight: 'bold',
    fontSize: 64,
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  removeButtonText: {
    color: 'red',
    paddingLeft: 10,
  },
});

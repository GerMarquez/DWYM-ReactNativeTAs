import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';

export default function Index() {
  const [text, setText] = useState("Default Text");

  return (
    <View style={styles.container}>
      <TextInput
      style={styles.input}
          onChangeText={setText}
          value={text}
      />
      <Text style={styles.display}>{text}</Text>
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
  },
  display: {
    fontWeight: 'bold',
    fontSize: 64,
  },
});

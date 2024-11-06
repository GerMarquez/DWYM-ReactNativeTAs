import React, { useState } from 'react';
import { Image, View, TouchableOpacity, StyleSheet } from 'react-native';

export default function Index() {
  const [image, setImage] = useState<number>(require('../assets/images/favicon.png'));

  const toggleImage = () => {
    setImage((prevImage) => 
      prevImage === require('../assets/images/favicon.png') 
        ? require('../assets/images/react-logo.png') 
        : require('../assets/images/favicon.png')
    );
  };
  
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleImage}>
        <Image source={image} style={styles.image} />
      </TouchableOpacity>
    </View>  
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
  },
});

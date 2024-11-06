import React from 'react';
import { View, Text, Image, FlatList, StyleSheet } from 'react-native';

interface ImageItem {
  id: string;
  imageSource: any;
  description: string;
}

export default function Index() {
  const data: ImageItem[] = [
    { id: '1', imageSource: require('../assets/images/favicon.png'), description: 'Desc 1' },
    { id: '2', imageSource: require('../assets/images/splash.png'), description: 'Desc 2' },
    { id: '3', imageSource: require('../assets/images/react-logo.png'), description: 'Desc 3' },
    { id: '4', imageSource: require('../assets/images/adaptive-icon.png'), description: 'Desc 4' },
  ];

  const renderItem = ({ item }: { item: ImageItem }) => (
    <View style={styles.imageContainer}>
      <Image source={item.imageSource} style={styles.image} />
      <Text style={styles.description}>{item.description}</Text>
    </View>
  );

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.container}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    paddingBottom: 10,
  },
  imageContainer: {
    marginBottom: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 10,
    backgroundColor: '#fff',
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 10,
  },
  description: {
    marginTop: 10,
    textAlign: 'center',
    fontSize: 14,
    color: '#333',
  },
});

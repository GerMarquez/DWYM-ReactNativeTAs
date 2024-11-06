import React, { useState } from 'react';
import { View, Text, Image, FlatList, StyleSheet } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { GestureHandlerRootView } from 'react-native-gesture-handler'; 

interface ImageItem {
  id: string;
  imageSource: any;
  description: string;
}

export default function Index() {
  const initialData: ImageItem[] = [
    { id: '1', imageSource: require('../assets/images/favicon.png'), description: 'Desc 1' },
    { id: '2', imageSource: require('../assets/images/splash.png'), description: 'Desc 2' },
    { id: '3', imageSource: require('../assets/images/react-logo.png'), description: 'Desc 3' },
    { id: '4', imageSource: require('../assets/images/adaptive-icon.png'), description: 'Desc 4' },
  ];

  const [data, setData] = useState<ImageItem[]>(initialData);

  const deleteItem = (id: string) => {
    setData((prevData) => prevData.filter(item => item.id !== id));
  };

  const renderRightActions = (id: string) => (
    <View style={styles.deleteContainer}>
      <MaterialCommunityIcons
        name="delete"
        size={30}
        color="white"
        onPress={() => deleteItem(id)}
      />
    </View>
  );

  const renderItem = ({ item }: { item: ImageItem }) => (
    <Swipeable renderRightActions={() => renderRightActions(item.id)}>
      <View style={styles.imageContainer}>
        <Image source={item.imageSource} style={styles.image} />
        <Text style={styles.description}>{item.description}</Text>
      </View>
    </Swipeable>
  );

  return (
    <GestureHandlerRootView style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
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
  deleteContainer: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    borderRadius: 10,
    marginTop: 20,
  },
});

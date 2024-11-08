import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, StyleSheet, ActivityIndicator, Dimensions, Platform } from 'react-native';

const API_KEY = 'cdd16def'; 

const { width, height } = Dimensions.get('window');

const OMDBApiCaller = () => {
  const [inputMovieTitle, setInputMovieTitle] = useState('');
  const [movieData, setMovieData] = useState<MovieData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  interface MovieData {
    Title: string;
    Poster: string;
    Plot: string;
    Response: string;
  }

  const searchMovie = async () => {
    if (!inputMovieTitle) return;

    setLoading(true);
    setError(null);
    setMovieData(null);

    try {
      const response = await fetch(`https://www.omdbapi.com/?t=${inputMovieTitle}&apikey=${API_KEY}`);
      const data = await response.json();
      console.log(data);

      if (data.Response === 'True') {
        setMovieData(data); 
      } else {
        setError('Película no encontrada');
      }
    } catch (err) {
      setError('Error al realizar la solicitud');
    } finally {
      setLoading(false);
    }
  };

  const platformName = Platform.OS === 'ios' ? 'iOS' : 'Android';

  return (
    <View style={styles.container}>
      <Text style={styles.platformText}>OMDB App versión - {platformName}</Text>

      <Text style={styles.title}>Buscar Película</Text>

      <TextInput
        style={styles.input}
        placeholder="Ingresa el título de la película"
        value={inputMovieTitle}
        onChangeText={setInputMovieTitle}
      />

      <Button title="Buscar" onPress={searchMovie} />

      {loading && <ActivityIndicator size="large" color="#0000ff" />}

      {error && <Text style={styles.error}>{error}</Text>}

      {movieData && !loading && !error && (
        <View style={styles.movieContainer}>
          <Image source={{ uri: movieData.Poster }} style={styles.poster} />
          <Text style={styles.movieTitle}>{movieData.Title}</Text>
          <Text style={styles.moviePlot}>{movieData.Plot}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
    width: width,
    height: height,
  },
  platformText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'gray',
    position: 'absolute',
    top: 20,
  },
  title: {
    fontSize: width > 400 ? 30 : 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
    width: '100%',
    fontSize: width > 400 ? 18 : 14,
  },
  movieContainer: {
    alignItems: 'center',
    marginTop: 20,
    width: '100%',
    paddingHorizontal: width > 400 ? 40 : 20,
  },
  poster: {
    width: width > 400 ? 250 : 200,
    height: width > 400 ? 375 : 300,
    marginBottom: 10,
  },
  movieTitle: {
    fontSize: width > 400 ? 22 : 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  moviePlot: {
    fontSize: width > 400 ? 16 : 14,
    textAlign: 'center',
    marginHorizontal: 20,
  },
  error: {
    color: 'red',
    marginTop: 20,
    fontSize: width > 400 ? 18 : 16,
  },
});

export default OMDBApiCaller;

import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { NavigationProp } from '@react-navigation/native';

interface Props {
  navigation: NavigationProp<any, any>;
  route: any;
}

const DetailsScreen = ({ navigation, route }: Props) => {
  const movie = route.params.movie;

  if (!movie) {
    return <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#fff' }}>No movie found</Text>;
  }

  console.log('Movie:', movie);

  return (
    <ScrollView style={{
      flex: 1,
      backgroundColor: '#141414', // dark background
    }}>
      <View style={{
        flex: 1,
        padding: 20,
        backgroundColor: '#141414', // dark background
      }}>
        <TouchableOpacity style={{
          position: 'absolute',
          top: 20,
          left: 20,
        }} onPress={() => navigation.goBack()}>
          <Image source={require('../assets/back.png')} style={{
            width: 30,
            height: 30,
            tintColor: '#fff', // white icon
          }} />
        </TouchableOpacity>
        <View style={{
          alignItems: 'center',
          marginBottom: 20,
        }}>
          {movie.image && (
            <Image
              source={{ uri: movie.image.medium }}
              style={{
                width: 200,
                height: 280,
                borderRadius: 10,
                borderColor: '#333', // dark gray border
                borderWidth: 1,
              }}
            />
          )}
        </View>
        <View style={{
          padding: 20,
          backgroundColor: '#333', // dark gray background
          borderRadius: 15,
        }}>
          {movie.name && (
            <Text style={{
              fontSize: 24,
              fontWeight: 'bold',
              color: '#fff', // white text
              marginBottom: 10,
            }}>
              {movie.name}
            </Text>
          )}
          {movie.summary && (
            <Text style={{
              fontSize: 18,
              color: '#ccc', // light gray text
              marginBottom: 10,
            }}>
              {movie.summary}
            </Text>
          )}
          {movie.genres && (
            <Text style={{
              fontSize: 16,
              color: '#ccc', // light gray text
              marginBottom: 10,
            }}>
              Genre: {movie.genres.join(', ')}
            </Text>
          )}
          {movie.rating && (
            <Text style={{
              fontSize: 16,
              color: '#ccc', // light gray text
              marginBottom: 10,
            }}>
              Rating: {movie.rating.average}
            </Text>
          )}
          {movie.language && (
            <Text style={{
              fontSize: 16,
              color: '#ccc', // light gray text
              marginBottom: 10,
            }}>
              Language: {movie.language}
            </Text>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

export default DetailsScreen;
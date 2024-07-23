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
          {movie.show.image && (
            <Image
              source={{ uri: movie.show.image.medium }}
              style={{
                width: 200,
                height: 230,
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
          {movie.show.name && (
            <Text style={{
              fontSize: 24,
              fontWeight: 'bold',
              color: '#fff', // white text
              marginBottom: 10,
            }}>
              {movie.show.name}
            </Text>
          )}
          {movie.show.summary && (
            <Text style={{
              fontSize: 18,
              color: '#ccc', // light gray text
              marginBottom: 10,
            }}>
              {movie.show.summary}
            </Text>
          )}
          {movie.show.genres && (
            <Text style={{
              fontSize: 16,
              color: '#ccc', // light gray text
              marginBottom: 10,
            }}>
              Genre: {movie.show.genres.join(', ')}
            </Text>
          )}
          {movie.show.rating && (
            <Text style={{
              fontSize: 16,
              color: '#ccc', // light gray text
              marginBottom: 10,
            }}>
              Rating: {movie.show.rating.average}
            </Text>
          )}
          {movie.show.language && (
            <Text style={{
              fontSize: 16,
              color: '#ccc', // light gray text
              marginBottom: 10,
            }}>
              Language: {movie.show.language}
            </Text>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

export default DetailsScreen;
import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, Image, TouchableOpacity } from 'react-native';
import axios from 'axios';

interface Props {
  navigation: any;
}

interface Item {
  id: number;
  name: string;
  image: {
    medium: string;
  };
  summary: string;
}

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const [movies, setMovies] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('https://api.tvmaze.com/shows')
     .then(response => {
        setMovies(response.data);
        setLoading(false);
      })
     .catch(error => {
        console.error(error);
      });
  }, []);

  const handleMoviePress = (movie: Item) => {
    navigation.navigate('DetailsScreen', { movie });
  };

  return (
    <View style={{
      flex: 1,
      backgroundColor: '#141414',
      padding: 20,
    }}>
      {loading ? (
        <Text style={{
          fontSize: 24,
          fontWeight: 'bold',
          color: '#fff',
          textAlign: 'center',
        }}>
          Loading...
        </Text>
      ) : (
        <FlatList
          data={movies}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity onPress={() => handleMoviePress(item)}>
                <View style={{
                  flexDirection: 'row',
                  padding: 10,
                  marginBottom: 20,
                }}>
                  <View style={{
                    backgroundColor: '#333',
                    height: 120,
                    width: 80,
                    alignItems: 'center',
                    borderRadius: 15,
                    marginRight: 20,
                  }}>
                    <Image
                      source={{ uri: item.image.medium }}
                      style={{
                        width: 70,
                        height: 100,
                        marginTop: 10,
                        borderRadius: 10,
                      }}
                    />
                  </View>

                  <View style={{
                    flex: 1,
                    padding: 10,
                  }}>
                    <Text style={{
                      fontSize: 18,
                      fontWeight: 'bold',
                      color: '#fff',
                    }}>
                      {item.name}
                    </Text>
                    <Text style={{
                      fontSize: 14,
                      color: '#ccc',
                      maxHeight: 70,
                      overflow: 'hidden',
                    }}>
                      {item.summary.substring(0, 100000)}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}
          keyExtractor={(item) => item.id.toString()}
        />
      )}
    </View>
  );
};

export default HomeScreen;
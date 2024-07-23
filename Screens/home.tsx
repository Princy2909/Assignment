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
      backgroundColor: '#141414', // dark background
      padding: 20,
    }}>
      {loading ? (
        <Text style={{
          fontSize: 24,
          fontWeight: 'bold',
          color: '#fff', // white text
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
                  marginBottom: 20, // add some space between items
                }}>
                  <View style={{
                    backgroundColor: '#333', // dark gray background
                    height: 120, // increase height to match Netflix style
                    width: 80, // increase width to match Netflix style
                    alignItems: 'center',
                    borderRadius: 15,
                    marginRight: 20, // add some space between image and text
                  }}>
                    <Image
                      source={{ uri: item.image.medium }}
                      style={{
                        width: 70,
                        height: 100, // increase height to match Netflix style
                        marginTop: 10,
                        borderRadius: 10, // add some rounded corners
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
                      color: '#fff', // white text
                    }}>
                      {item.name}
                    </Text>
                    <Text style={{
                      fontSize: 14,
                      color: '#ccc', // light gray text
                      maxHeight: 70, // limit summary height
                      overflow: 'hidden', // hide excess text
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
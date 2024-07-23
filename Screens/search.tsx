import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import axios from 'axios';

interface Props {
  navigation: any;
  route: any;
}

interface Item {
  id: number;
  name: string;
  image: {
    medium: string;
  } | null;
  summary: string | null;
}

const SearchScreen: React.FC<Props> = ({ navigation, route }) => {
  const [movies, setMovies] = useState<Item[]>([]);
  const [searchTerm, setSearchTerm] = useState(route.params? route.params.searchTerm : '');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios.get(`https://api.tvmaze.com/search/shows?q=${searchTerm}`)
     .then(response => {
        const data = response.data.map((item: any) => item.show);
        setMovies(data);
        setLoading(false);
      })
     .catch(error => {
        console.error(error);
      });
  }, [searchTerm]);

  const handleSearchTermChange = (text: string) => {
    setSearchTerm(text);
  };

  const handleMoviePress = (movie: Item) => {
    navigation.navigate('DetailsScreen', { movie });
  };

  return (
    <View style={{
      flex: 1,
      backgroundColor: '#141414',
      padding: 20,
    }}>
      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 3,
        borderBottomColor: '#333',
      }}>
        <Text style={{
          fontSize: 24,
          fontWeight: 'bold',
          color: '#fff',
        }}>
          Search Screen
        </Text>
        <TextInput
          value={searchTerm}
          onChangeText={handleSearchTermChange}
          placeholder="Search for a movie"
          style={{
            flex: 1,
            padding: 10,
            borderWidth: 1,
            borderColor: '#333',
            borderRadius: 15,
            height: 40,
            marginLeft: 5,
            backgroundColor: '#eef0f2',
            color: '#212529',
          }}
        />
      </View>
      {loading? (
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
                  {item.image && (
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
                  )}
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
                      {item.summary ? item.summary.substring(0, 100000) : ''}
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

export default SearchScreen;
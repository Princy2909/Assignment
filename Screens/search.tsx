import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import axios from 'axios';

interface Props {
  navigation: any;
  route: any;
}

interface Item {
  show: {
    id: number;
    name: string;
    image: {
      medium: string;
    } | null;
    summary: string;
  };
}

const SearchScreen: React.FC<Props> = ({ navigation, route }) => {
  const [movies, setMovies] = useState<Item[]>([]);
  const [searchTerm, setSearchTerm] = useState(route.params? route.params.searchTerm : '');

  useEffect(() => {
    axios.get(`https://api.tvmaze.com/search/shows?q=${searchTerm}`)
     .then(response => {
        setMovies(response.data);
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
      backgroundColor: '#141414', // dark background
      padding: 20,
    }}>
      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 3,
        borderBottomColor: '#333', // dark gray border
      }}>
        <Text style={{
          fontSize: 24,
          fontWeight: 'bold',
          color: '#fff', // white text
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
            borderColor: '#333', // dark gray border
            borderRadius: 15,
            height: 40,
            marginLeft: 5,
            backgroundColor: '#eef0f2', // gray background
            color: '#212529', // changed text color to a lighter shade of gray
          }}
        />
      </View>
      <FlatList
        data={movies}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleMoviePress(item)}>
            <View style={{
              flexDirection: 'row',
              padding: 10,
              marginBottom: 20, // add some space between items
            }}>
              {item.show.image && (
                <View style={{
                  backgroundColor: '#333', // dark gray background
                  height: 120, // increase height to match Netflix style
                  width: 80, // increase width to match Netflix style
                  alignItems: 'center',
                  borderRadius: 15,
                  marginRight: 20, // add some space between image and text
                }}>
                  <Image
                    source={{ uri: item.show.image.medium }}
                    style={{
                      width: 70,
                      height: 100, // increase height to match Netflix style
                      marginTop: 10,
                      borderRadius: 10, // add some rounded corners
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
                  color: '#fff', // white text
                }}>
                  {item.show.name}
                </Text>
                <Text style={{
                      fontSize: 14,
                      color: '#ccc', // light gray text
                      maxHeight: 70, // limit summary height
                      overflow: 'hidden', // hide excess text
                    }}>
                  {item.show.summary}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.show.id.toString()}
      />
    </View>
  );
};

export default SearchScreen;
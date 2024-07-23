import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import SplashScreen from './Screens/splash';
import HomeScreen from './Screens/home';
import SearchScreen from './Screens/search';
import DetailsScreen from './Screens/details';
import { Image } from 'react-native';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const App = () => {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setShowSplash(false);
    }, 2000);
  }, []);

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator>
          {showSplash ? (
            <Stack.Screen name="SplashScreen" component={SplashScreen} options={{ headerShown: false }} />
          ) : (
            <Stack.Screen name="HomeScreen" component={HomeTabs} options={{ headerShown: false }} />
          )}
          <Stack.Screen name="DetailsScreen" component={DetailsScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

const HomeTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? require('./assets/home.png') : require('./assets/home.png');
          } else if (route.name === 'Search') {
            iconName = focused ? require('./assets/search.png') : require('./assets/search.png');
          }

          return (
            <Image
              source={iconName}
              style={{
                width: 24,
                height: 24,
                tintColor: focused ? '#FF3737' : '#8B0A1A', // red shades
              }}
            />
          );
        },
        tabBarLabelStyle: {
          fontSize: 12,
          marginBottom: 5,
          color: '#ccc', // light gray text
        },
        tabBarStyle: {
          backgroundColor: '#141414', // dark background
          borderTopWidth: 3,
          borderTopColor: '#333', // dark gray border
          padding:10,
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ focused }) => {
            return (
              <Image
                source={focused ? require('./assets/home.png') : require('./assets/home2.png')}
                style={{
                  width: 24,
                  height: 24,
                  tintColor: focused ? '#E74C3C' : '#8B0A1A', // red shades
                }}
              />
            );
          },
          headerStyle: {
            backgroundColor: '#141414', // dark background
            borderBottomWidth: 3,
            borderBottomColor: '#333', // dark gray border
          },
          headerTintColor: '#ccc', // light gray text
          headerTitleStyle: {
            fontSize: 20,
            fontWeight: 'bold',
            color: '#ccc', // light gray text
          },
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarLabel: 'Search',
          tabBarIcon: ({ focused }) => {
            return (
              <Image
                source={focused ? require('./assets/search1.png') : require('./assets/search.png')}
                style={{
                  width: 24,
                  height: 24,
                  tintColor: focused ? '#E74C3C' : '#8B0A1A', // red shades
                }}
              />
            );
          },
          headerStyle: {
            backgroundColor: '#141414', // dark background
            borderBottomWidth: 1,
            borderBottomColor: '#333', // dark gray border
          },
          headerTintColor: '#ccc', // light gray text
          headerTitleStyle: {
            fontSize: 18,
            fontWeight: 'bold',
            color: '#ccc', // light gray text
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default App;
import React from 'react';
import { View, Text } from 'react-native';
import LottieView from 'lottie-react-native';

const SplashScreen = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <LottieView
        source={require('../assets/icon2.json')}
        autoPlay
        loop
        style={{ width: 250, height: 250 }}
      />
     <Text style={{fontSize:24, fontWeight:'bold',color:'black', margin:10,}}>MOVIEMAZE</Text>
    </View>
  );
};

export default SplashScreen;
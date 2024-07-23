import React from 'react';
import { View } from 'react-native';
import LottieView from 'lottie-react-native';

const SplashScreen = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <LottieView
        source={require('../assets/icon.json')}
        autoPlay
        loop
        style={{ width: 350, height: 380 }}
      />
    </View>
  );
};

export default SplashScreen;
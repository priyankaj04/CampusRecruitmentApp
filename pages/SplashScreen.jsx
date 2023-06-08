import { StyleSheet, Text, View, Image } from 'react-native';
import React, { useState, useEffect } from 'react';

const SplashScreen = ({ navigation }) => {

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('Getstarted') // Hide the splash screen after 3 seconds
    }, 3000);

    return () => clearTimeout(timer);
  }, [])
  return (
    <View style={{ backgroundColor: '#407BFF', width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
      <View style={{ alignItems: 'center' }}>
        <Image
          source={require('../assets/puzzle.png')}
          style={{ width: 300, height: 300 }}
        />

      </View>
      <Text style={{ position: 'absolute', fontSize: 26, fontWeight: 'bold', color: 'white', bottom: 65 }}>TALENT CONNECT</Text>
      <Text style={{ position: 'absolute', fontSize: 14, color: 'white', bottom: 50 }}>©Copyright policy</Text>
    </View>
  )
}

export default SplashScreen

const styles = StyleSheet.create({})
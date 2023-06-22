import { StyleSheet, Text, View, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SplashScreen = ({ navigation }) => {
  const [type, setType] = useState(null);

  const getData = async () => {
    setType(await AsyncStorage.getItem('user_type'))
    const value = await AsyncStorage.getItem('user_type');
    if (value == 'talent') {
      navigation.reset({
        index: 0,
        routes: [{ name: 'Index' }],
      });
      navigation.navigate('Index')
    } else if (value == 'recruiter') {
      navigation.reset({
        index: 0,
        routes: [{ name: 'IndexRecruiter' }],
      });
      navigation.navigate('IndexRecruiter')
    } else if (!value) {
      navigation.reset({
        index: 0,
        routes: [{ name: 'Getstarted' }],
      });
      navigation.navigate('Getstarted')
    }
  }

  useEffect(() => {

    const timer = setTimeout(() => {
      getData()
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
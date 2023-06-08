import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'

const Home = () => {
  return (
    <View style={{ backgroundColor: 'white' }}>
      <View style={{ alignItems: 'center', height: 200, justifyContent: 'center' }}>
        <View style={{
          backgroundColor: '#407BFF',
          width: '90%',
          height: 150,
          borderRadius: 28,
          shadowOffset: { width: 5, height: 5 },
          shadowColor: 'black',
          shadowOpacity: 0.8,
          shadowRadius: 5,
          elevation: 8
        }}>

          <Text style={{
            color: 'white',
            fontSize: 20,
            textAlign: 'left',
            margin: 20
          }}>
            Good Evening, Priyanka!
          </Text>
          <Text>Dream big, work hard, and seize your dream job. The future is waiting for you!</Text>
          <Image
            source={require('../assets/break.png')}
            style={{ width: 100, height: 100 }}
          />
        </View>
      </View>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({})
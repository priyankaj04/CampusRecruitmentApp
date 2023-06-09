import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'

const Getstarted = ({navigation}) => {
  return (
      <View style={{ width: '100%', height: '100%', backgroundColor: '#407BFF', alignItems:'center' }}>
          <Text style={{
              margin: 15,
              fontSize: 24,
              color: 'white',
              fontWeight: 'bold',
              textAlign: 'center',
          }}>Welcome to a world of possibilities!!!</Text>
          <Text style={{
              fontSize: 16,
              margin: 0,
              color: 'white',
              fontWeight: 'bold',
              textAlign: 'center',
              fontStyle: 'italic'
            }}>  Begin your campus recruitment transformation with TALENT CONNECT and open doors to success</Text> 
          <Image
              source={require("../assets/getStarted.png")}
              style={{ 
                  width: '100%',
                  height: 500,
              }} />
          
          <TouchableOpacity style={{
              width: '90%',
              height: 50,
              padding: 10, 
              backgroundColor: 'white',
              borderRadius: 25,
              alignItems: 'center',
              justifyContent: 'center',
              margin:5
          }} onPress={() => navigation.navigate("Register")}><Text style={{
                  fontSize: 20, 
                  fontWeight: 'bold',
                color:'#407BFF'
          }}>Join as Student</Text></TouchableOpacity>
          <TouchableOpacity style={{
              width: '90%',
              height: 50,
              padding: 10,
              backgroundColor: 'white',
              borderRadius: 25,
              alignItems: 'center',
              margin: 5,
              justifyContent: 'center'
          }} onPress={() => navigation.navigate("RecruiterRegister")}><Text style={{
              fontSize: 20,
              fontWeight: 'bold',
          }}>Join as Recruiter</Text></TouchableOpacity>
          
    </View>
  )
}

export default Getstarted

const styles = StyleSheet.create({})
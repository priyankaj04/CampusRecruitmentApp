import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, KeyboardAvoidingView, ScrollView, SafeAreaView, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { RecruiterLoginForm } from '../api';

const RecruiterLogin = ({ navigation }) => {

  const [company_name, setCompany] = useState('');
  const [password, setPassword] = useState('');
  const [visible, setVisible] = useState(false);
  const [showHelper, setShowHelper] = useState(false);
  const [msg, setMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    if (!password || password.length === 0 || company_name.length === 0 || !company_name) {
      setShowHelper(true);
      setMsg('All fields are required');
    } else if (password && password.length < 8) {
      setShowHelper(true);
      setMsg('Password must be at least 8 characters');
    } else {
      setShowHelper(false);
      setIsLoading(true);
      let reqbody = {
        company_name,
        password
      }
      //student login
      RecruiterLoginForm(reqbody).then((res) => {
        console.log("its response", res);
        if (res.status) {
          setIsLoading(false);
          setShowHelper(false);
          navigation.navigate('IndexRecruiter');
        } else {
          setShowHelper(true);
          setMsg(res.data.message);
          setIsLoading(false);
        }
      }).catch((err) => {
        console.log("it failed", err);
        setIsLoading(false);
      })
      //
    }
  }
  return (
    <ScrollView >
      <View style={styles.container}>
        <Text style={{
          color: '#407BFF',
          fontWeight: 'bold',
          fontSize: 24,
          textAlign: 'center'
        }}>Welcome Back!</Text>
        <Text style={{
          color: 'gray',
          fontWeight: 'bold',
          fontSize: 18,
        }}>Please sign in to continue.</Text>
        <Image
          source={require('../assets/achieve.png')}
          style={{ width: '100%', height: 400 }}
        />
        <KeyboardAvoidingView >
          <TextInput
            placeholder="Company Name"
            style={{
              height: 50,
              borderColor: 'transparent',
              borderWidth: 1,
              width: 350,
              borderRadius: 25,
              padding: 10,
              backgroundColor: '#e5e5e5',
              margin: 10,
              fontSize: 16
            }}
            onChangeText={(e) => setCompany(e)}
            value={company_name}
            keyboardType="default"
          />
          <View style={{
            backgroundColor: '#e5e5e5',
            height: 50,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            margin: 10,
            padding: 5,
            borderRadius: 25,
          }}>
            <TextInput
              placeholder='Password'
              style={{
                height: 50,
                borderColor: 'transparent',
                borderWidth: 1,
                width: 300,
                padding: 10,
                backgroundColor: '#e5e5e5',
                fontSize: 16,
                borderRadius: 25,
              }}
              secureTextEntry={visible ? false : true}
              onChangeText={(e) => setPassword(e)}
              value={password}
              keyboardType="default"
            />
            <Icon name={visible ? "eye" : "eye-slash"} color="gray" size={26} onPress={() => setVisible(!visible)} />
          </View>
          {showHelper && <Text style={{ color: 'red', margin: 10 }}><Icon name="info-circle" size={14} color='red' />  {msg}</Text>}
          {isLoading ? <ActivityIndicator color='#407BFF' size="small" /> :
            <TouchableOpacity style={styles.btn} onPress={() => handleClick()}><Text style={{ color: 'white', fontWeight: 'bold', fontSize: 18 }} >Log In</Text></TouchableOpacity>
          }
        </KeyboardAvoidingView>
        <Text style={{
          color: '#407BFF',
          fontWeight: 'bold',
          fontSize: 16,
          margin: 10
        }}>Forgot Password?</Text>
        <Text style={{
          color: 'gray',
          fontSize: 16,
          margin: 10
        }}>Don't have an account? <Text style={{ color: '#407BFF', fontWeight: 'bold' }} onPress={() => navigation.navigate('RecruiterRegister')}>Signup</Text></Text>
      </View>
    </ScrollView>
  )
}

export default RecruiterLogin

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'whitesmoke',
    width: '100%',
  },
  btn: {
    width: 350,
    height: 50,
    backgroundColor: '#407BFF',
    color: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    borderRadius: 25
  }
})
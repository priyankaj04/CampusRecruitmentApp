import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, KeyboardAvoidingView, ScrollView, ActivityIndicator, SafeAreaView } from 'react-native';
import React, { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { TalentRegister, SendOTPCode } from '../api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Register = ({ navigation }) => {

  const [registerno, setRegisterno] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [visible, setVisible] = useState(false);
  const [showHelper, setShowHelper] = useState(false);
  const [msg, setMsg] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [confirmpass, setConfirmpass] = useState('')

  function isGmailEmail(email) {
    const regex = /^[a-zA-Z0-9._%+-]+@bmscw.edu.in$/;
    return regex.test(email);
  }

  function hasNumbers(text) {
    const regex = /\d/;
    return regex.test(text);
  }

  const handleClick = () => {
    if (!registerno || registerno.length === 0 || !firstname || firstname.length === 0 || !lastname
      || lastname.length === 0 || !email || email.length === 0 || !password || password.length === 0) {
      setShowHelper(true);
      setMsg({ value: 'all', msg: 'All fields are mandatory.' });
    } else if (!isGmailEmail(email)) {
      setShowHelper(true);
      setMsg({ value: 'email', msg: 'Use valid gmail address only.' });
    } else if (hasNumbers(firstname) || hasNumbers(lastname)) {
      setShowHelper(true);
      setMsg({ value: 'name', msg: 'Name cannot contain numbers.' });
    } else if (password && password.length < 8) {
      setShowHelper(true);
      setMsg({ value: 'password', msg: 'Password should be at least 8 characters long.' });
    } else if (password != confirmpass) {
      setShowHelper(true);
      setMsg({ value: 'password', msg: 'Password do not match.' });
    } else {
      setIsLoading(true);
      setShowHelper(false);
      let reqbody = {
        firstname,
        lastname,
        email,
        register_no: registerno,
        password,
        enable: true,
        college: 'BMS College for Women'
      }
      //console.log("11211",reqbody);
      TalentRegister(reqbody).then((res) => {
        if (res.status) {
          const reqbody = { email }
          SendOTPCode(reqbody, res.data[0].talent_id).then((resp) => {
            console.log("response", resp);
            setIsLoading(false);
            AsyncStorage.setItem('talent_id', res.data[0].talent_id);
            AsyncStorage.setItem('email', res.data[0].email);
            navigation.navigate('SendOTP', { talent_id: res.data[0].talent_id, email: res.data[0].email });
          })
        } else {
          setShowHelper(true);
          console.log("ERROR", res);
          setMsg({ value: 'all', msg: res.message });
          setIsLoading(false);
        }
        //console.log("reponsehere", res);
        setIsLoading(false);
      })
        .catch((err) => {
          console.log(err);
          setIsLoading(false);
        })
    }
  }
  return (
    <ScrollView >
      <View style={styles.container}>
        <Text style={{
          color: '#407BFF',
          fontWeight: 'bold',
          fontSize: 26,
          textAlign: 'left',
          marginTop: 80,
          margin: 10
        }}>Create Account</Text>
        <Text style={{
          color: 'gray',
          fontWeight: 'bold',
          fontSize: 18,
        }}>Please sign up to continue.</Text>
        <Image
          source={require('../assets/signup.png')}
          style={{ width: '100%', height: 300 }}
        />
        <KeyboardAvoidingView >
          <View style={{ alignItems: 'center' }}>
            <TextInput
              placeholder="First Name"
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
              onChangeText={(e) => setFirstname(e)}
              value={firstname}
              inputMode="text"
            />
            <TextInput
              placeholder="Last Name"
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
              onChangeText={(e) => setLastname(e)}
              value={lastname}
              inputMode="text"
            />
            {showHelper && msg && msg.value === 'name' && <Text style={{ color: 'red', margin: 10, textAlign: 'left' }}><Icon name="info-circle" size={14} color='red' />  {msg.msg}</Text>}
            <TextInput
              placeholder="Email"
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
              onChangeText={(e) => setEmail(e)}
              value={email}
              inputMode="email"
              keyboardType="email-address"
            />
            {showHelper && msg && msg.value === 'email' && <Text style={{ color: 'red', margin: 10, textAlign: 'left' }}><Icon name="info-circle" size={14} color='red' />  {msg.msg}</Text>}
            <TextInput
              placeholder="Register No."
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
              onChangeText={(e) => setRegisterno(e)}
              value={registerno}
              keyboardType="default"
            />
            <View style={{
              backgroundColor: '#e5e5e5',
              height: 50,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              margin: 10,
              padding: 10,
              borderRadius: 25,
            }}>
              <TextInput
                placeholder='Password'
                style={{
                  height: 50,
                  borderColor: 'transparent',
                  borderWidth: 1,
                  width: 300,
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
            <TextInput
              placeholder="Confirm password"
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
              secureTextEntry
              onChangeText={(e) => setConfirmpass(e)}
              value={confirmpass}
              keyboardType="default"
            />
            {showHelper && msg && msg.value === 'password' && <Text style={{ color: 'red', margin: 10, textAlign: 'left' }}><Icon name="info-circle" size={14} color='red' />  {msg.msg}</Text>}
            {showHelper && msg && msg.value === 'all' && <Text style={{ color: 'red', margin: 10, textAlign: 'left' }}><Icon name="info-circle" size={14} color='red' />  {msg.msg}</Text>}
            <Text style={{ margin: 10, textAlign: 'center', color: 'gray' }}>By joining us you agree to our <Text onPress={() => navigation.navigate('TermsandConditions')} style={{
              color: '#407BFF',
              fontWeight: 'bold'
            }}>Terms and Condtions</Text> and <Text onPress={() => navigation.navigate('PrivatePolicy')} style={{
              color: '#407BFF',
              fontWeight: 'bold'
            }}>Private policy</Text></Text>
            {isLoading ? <ActivityIndicator size="small" color="#407BFF" /> :
              <TouchableOpacity onPress={() => handleClick()} style={styles.btn}><Text style={{ color: 'white', fontWeight: 'bold', fontSize: 18 }} >Join us</Text></TouchableOpacity>
            }
          </View>
        </KeyboardAvoidingView>
        <Text style={{
          color: 'gray',
          fontSize: 16,
          margin: 10,
          marginBottom: 40
        }}>Already have an account? <Text style={{ color: '#407BFF', fontWeight: 'bold' }} onPress={() => navigation.navigate('Login')}>Login</Text></Text>
      </View>
    </ScrollView>
  )
}

export default Register

const styles = StyleSheet.create({
  container: {
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
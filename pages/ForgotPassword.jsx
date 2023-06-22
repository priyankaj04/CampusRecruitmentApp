import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, KeyboardAvoidingView, ScrollView, SafeAreaView, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react';
import { VerifyForgotEmail, ConfrimForgotOTP, ForgotpasswordEmail } from '../api';

const ForgotPassword = ({ route, navigation }) => {
  const type = route.params.type;
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [cpassword, setCpassword] = useState('');
  const [verifyemail, setVerifyEmail] = useState(false);
  const [confirmotp, setConfirmotp] = useState(false);
  const [showHelper, setShowHelper] = useState({});

  const handleEmail = () => {
    const reqbody = { email }
    VerifyForgotEmail(type, reqbody).then((res) => {
      if (res.status) {
        setVerifyEmail(true);
      } else {
        setShowHelper({ label: 'email', message: res.message })
      }
    })
      .catch((err) => {
        setShowHelper({ label: 'email', message: err })
      })
  }

  const handleOTP = () => {
    const reqbody = { email, otp }
    ConfrimForgotOTP(type, reqbody).then((res) => {
      if (res.status) {
        setConfirmotp(true);
      } else {
        setShowHelper({ label: 'otp', message: res.message })
      }
    })
      .catch((err) => {
        setShowHelper({ label: 'otp', message: err })
      })
  }

  const handlePassword = () => {
    if (password === cpassword) {
      const reqbody = { email, password }
      ForgotpasswordEmail(type, reqbody).then((res) => {
        if (res.status) {
          if (type == 'talent') {
            navigation.navigate("Index");
          } else if (type == 'recruiter') {
            navigation.navigate("IndexRecruiter");
          }
        } else {
          setShowHelper({ label: 'password', message: res.message })
        }
      })
        .catch((err) => {
          setShowHelper({ label: 'password', message: err })
        })
    } else {
      setShowHelper({ label: 'password', message: "Passwords do not match" })
    }
  }

  return (
    <ScrollView>
      <View>
        <Text>Don't worry! we are here to help you.</Text>
        <TextInput
          style={styles.textField}
          value={value}
          onChangeText={(e) => setEmail(e)}
          placeholder='Enter registered otp.'
        />
        {
          !verifyemail && <TouchableOpacity style={styles.btn} onPress={() => handleEmail()}>
            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 18 }}>Verify Email</Text>
          </TouchableOpacity>
        } {
          verifyemail && <View>

          </View>
        }
      </View>
    </ScrollView>
  )
}

export default ForgotPassword

const styles = StyleSheet.create({
  textField: {
    height: 50,
    borderColor: 'transparent',
    borderWidth: 1,
    width: 360,
    padding: 8,
    backgroundColor: 'whitesmoke',
    fontSize: 16,
    marginTop: 0,
    borderRadius: 25,
    marginLeft: 10
  },
  btn: {
    width: 350,
    height: 50,
    backgroundColor: '#407BFF',
    color: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    marginTop: 20,
    borderRadius: 25,
    shadowOffset: { width: 5, height: 5 },
    shadowColor: 'black',
    shadowOpacity: 0.8,
    shadowRadius: 5,
    elevation: 3
  }
})
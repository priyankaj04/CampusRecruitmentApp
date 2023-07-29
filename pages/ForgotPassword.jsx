import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, KeyboardAvoidingView, ScrollView, SafeAreaView, ActivityIndicator } from 'react-native'
import React, { useState, useEffect, useRef } from 'react';
import { VerifyForgotEmail, ConfrimForgotOTP, ForgotpasswordEmail } from '../api';
import Icon from 'react-native-vector-icons/FontAwesome';
import { MotiView } from 'moti';

const ForgotPassword = ({ route, navigation }) => {
  const type = route.params.type;
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [cpassword, setCpassword] = useState('');
  const [verifyemail, setVerifyEmail] = useState(false);
  const [confirmotp, setConfirmotp] = useState(false);
  const [showHelper, setShowHelper] = useState({});
  const [pin, setPin] = useState(['', '', '', '', '', '']);
  const pinRefs = [useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null)];
  const [show, setShow] = useState(false);

  const handleChangeEmail = (text) => {
    setEmail(text);
  }

  const handleChangeMobile = (text) => {
    setMobile(text);
  }

  const handleVerifyEmail = () => {
    let reqbody = {};
    if (type === 'talent') {
      reqbody = { email };
    } else if (type === 'recruiter') {
      reqbody = { mobile };
    }
    VerifyForgotEmail(type, reqbody).then((res) => {
      console.log(res);
      if (res.status) {
        setVerifyEmail(true);
      } else {
        setShowHelper({ label: 'email', message: res.message })
      }
    })
      .catch((err) => {
        setShowHelper({ label: 'email', message: err });
      });
  }

  const handleVerifyOTP = () => {
    const otpValue = pin.join('');
    let reqbody = {};
    if (type === 'talent') {
      reqbody = { email, otp: otpValue };
    } else if (type === 'recruiter') {
      reqbody = { mobile, otp: otpValue };
    }
    ConfrimForgotOTP(type, reqbody).then((res) => {
      if (res.status) {
        setConfirmotp(true);
      } else {
        setShowHelper({ label: 'otp', message: res.message });
      }
    })
      .catch((err) => {
        setShowHelper({ label: 'otp', message: err });
      });
  }

  const handlePasswordReset = () => {
    if (password === cpassword) {
      let reqbody = {};
      if (type === 'talent') {
        reqbody = { email, password };
      } else if (type === 'recruiter') {
        reqbody = { mobile, password };
      }
      ForgotpasswordEmail(type, reqbody).then((res) => {
        console.log(res);
        if (res.status) {
          if (type === 'talent') {
            navigation.navigate('Login');
          } else if (type === 'recruiter') {
            navigation.navigate('RecruiterLogin');
          }
        } else {
          setShowHelper({ label: 'password', message: res.message });
        }
      })
        .catch((err) => {
          setShowHelper({ label: 'password', message: err });
        });
    } else {
      setShowHelper({ label: 'password', message: 'Passwords do not match' });
    }
  }

  const handleOTPChange = (index, text) => {
    const newPin = [...pin];
    newPin[index] = text;
    setPin(newPin);
    if (text !== '' && index < 5) {
      pinRefs[index + 1].current.focus();
    }
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.heading}>Don't worry! We are here to help you.</Text>
        {type === 'talent' ? (
          <MotiView
            from={{ translateX: -100 }}
            animate={{ translateX: 0 }}
            transition={{ type: 'timing', duration: 500 }}
          >
            <TextInput
              style={styles.textField}
              value={email}
              onChangeText={handleChangeEmail}
              placeholder="Enter registered email"
            />
          </MotiView>
        ) : (
          <MotiView
            from={{ translateX: -100 }}
            animate={{ translateX: 0 }}
            transition={{ type: 'timing', duration: 500 }}
          >
            <TextInput
              style={styles.textField}
              value={mobile}
              onChangeText={handleChangeMobile}
              placeholder="Enter registered mobile number"
            />
          </MotiView>
        )}
        {!verifyemail && (
          <TouchableOpacity style={styles.btn} onPress={handleVerifyEmail}>
            <Text style={styles.btnText}>Send OTP</Text>
          </TouchableOpacity>
        )}
        {verifyemail && !confirmotp && (
          <View>
            <MotiView
              from={{ translateX: -100 }}
              animate={{ translateX: 0 }}
              transition={{ type: 'timing', duration: 500 }}
            >
              <View style={styles.otpContainer}>
                {pin.map((value, index) => (
                  <TextInput
                    key={index}
                    ref={pinRefs[index]}
                    style={styles.otpInput}
                    value={value}
                    onChangeText={(text) => handleOTPChange(index, text)}
                    keyboardType="number-pad"
                    maxLength={1}
                  />
                ))}
              </View>
            </MotiView>
          </View>
        )}
        {!confirmotp && verifyemail && (
          <TouchableOpacity style={styles.btn} onPress={handleVerifyOTP}>
            <Text style={styles.btnText}>Confirm OTP</Text>
          </TouchableOpacity>
        )}
        {confirmotp && (
          <View>
            <View style={styles.passwordContainer}>
              <MotiView
                from={{ translateX: -100 }}
                animate={{ translateX: 0 }}
                transition={{ type: 'timing', duration: 500 }}
              >
                <TextInput
                  placeholder="Password"
                  style={styles.passwordInput}
                  secureTextEntry={!show}
                  onChangeText={(text) => setPassword(text)}
                  value={password}
                  keyboardType="default"
                />
              </MotiView>
              <Icon
                name={show ? "eye" : "eye-slash"}
                color="gray"
                size={26}
                onPress={() => setShow(!show)}
              />
            </View>
            <MotiView
              from={{ translateX: -100 }}
              animate={{ translateX: 0 }}
              transition={{ type: 'timing', duration: 500 }}
            >
              <TextInput
                placeholder="Confirm Password"
                style={styles.passwordInput}
                secureTextEntry
                onChangeText={(text) => setCpassword(text)}
                value={cpassword}
                inputMode="text"
              />
            </MotiView>
          </View>
        )}
        {confirmotp && verifyemail && (
          <TouchableOpacity style={styles.btn} onPress={handlePasswordReset}>
            <Text style={styles.btnText}>Confirm Password</Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  )
}

export default ForgotPassword;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    width: '95%',
    margin: 10,
    borderRadius: 25,
    padding: 20,
    alignItems: 'center',
  },
  heading: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#407BFF',
    marginVertical: 10,
  },
  textField: {
    height: 50,
    borderColor: 'transparent',
    borderWidth: 1,
    width: 365,
    padding: 8,
    backgroundColor: 'whitesmoke',
    fontSize: 16,
    marginTop: 0,
    borderRadius: 25,
    marginLeft: 13,
  },
  btn: {
    width: 300,
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
    elevation: 3,
    marginLeft: 50,
  },
  btnText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  otpInput: {
    borderBottomWidth: 1,
    width: 35,
    borderBottomColor: '#407BFF',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'whitesmoke',
    padding: 10,
    borderRadius: 10,
    marginHorizontal: 5,
    fontSize: 20,
  },
  passwordContainer: {
    backgroundColor: 'whitesmoke',
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    padding: 10,
    borderRadius: 25,
  },
  passwordInput: {
    height: 50,
    borderColor: 'transparent',
    borderWidth: 1,
    width: 300,
    backgroundColor: 'whitesmoke',
    fontSize: 16,
    borderRadius: 25,
  },
});
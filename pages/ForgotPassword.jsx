import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, KeyboardAvoidingView, ScrollView, SafeAreaView, ActivityIndicator } from 'react-native'
import React, { useState, useEffect, useRef } from 'react';
import { VerifyForgotEmail, ConfrimForgotOTP, ForgotpasswordEmail } from '../api';
import Icon from 'react-native-vector-icons/FontAwesome';

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
  const [pin1, setPin1] = useState('');
  const [pin2, setPin2] = useState('');
  const [pin3, setPin3] = useState('');
  const [pin4, setPin4] = useState('');
  const [pin5, setPin5] = useState('');
  const [pin6, setPin6] = useState('');
  const pin1Ref = useRef(null);
  const pin2Ref = useRef(null);
  const pin3Ref = useRef(null);
  const pin4Ref = useRef(null);
  const pin5Ref = useRef(null);
  const pin6Ref = useRef(null);
  const [show, setShow] = useState(false);

  const handleEmail = () => {
    if (type == 'talent') {
      reqbody = { email }
    } else if (type == 'recruiter')
    {
      reqbody = { mobile }
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
        setShowHelper({ label: 'email', message: err })
      })
  }

  const handleOTP = () => {
    let reqbody = {}
    if (type == "talent") {
      reqbody = { email, otp: pin1 + pin2 + pin3 + pin4 + pin5 + pin6 }
    } else if (type == 'recruiter') {
      reqbody = { mobile, otp: pin1 + pin2 + pin3 + pin4 + pin5 + pin6 }
    }
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
      let reqbody = {}
      if (type == "talent") {
        reqbody = { email, password }
      } else if (type == 'recruiter') {
        reqbody = { mobile, password }
      }
      
      ForgotpasswordEmail(type, reqbody).then((res) => {
        console.log(res)
        if (res.status) {
          if (type == 'talent') {
            navigation.navigate("Login");
          } else if (type == 'recruiter') {
            navigation.navigate("RecruiterLogin");
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
      <View style={{
        width: '95%',
        margin: 10,
        backgroundColor: 'white',
        borderRadius: 25
      }}>
        <Text style={{textAlign:'center', fontSize: 18, fontWeight:'bold', color:'#407BFF', margin: 10}}>Don't worry! we are here to help you.</Text>
        { type == 'talent' ? <TextInput
          style={styles.textField}
          value={email}
          onChangeText={(e) => setEmail(e)}
          placeholder='Enter registered email'
        /> : <TextInput
          style={styles.textField}
          value={mobile}
          onChangeText={(e) => setMobile(e)}
          placeholder='Enter registered mobile number'
        />
      }
        {
          !verifyemail && <TouchableOpacity style={styles.btn} onPress={() => handleEmail()}>
            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 18 }}>Send OTP</Text>
          </TouchableOpacity>
        }
        {
          verifyemail && !confirmotp && <View>
            <View style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'space-around',
              marginTop: 20
            }}>
              <View style={styles.textInputView}>
                <TextInput
                  ref={pin1Ref}
                  keyboardType={'number-pad'}
                  maxLength={1}
                  onChangeText={(e) => {
                    setPin1(e);
                    if (e !== "") {
                      pin2Ref.current.focus();
                    }
                  }}
                  style={styles.textInputStyle}
                />
              </View>
              <View style={styles.textInputView}>
                <TextInput
                  ref={pin2Ref}
                  keyboardType={'number-pad'}
                  maxLength={1}
                  onKeyPress={({ nativeEvent }) => {
                    if (nativeEvent.key === 'Backspace') {
                      pin1Ref.current.focus();
                      setPin2("");
                    }
                  }}
                  onChangeText={(e) => {
                    setPin2(e);
                    if (e !== "") {
                      pin3Ref.current.focus()
                    }
                  }}
                  style={styles.textInputStyle}
                />
              </View>
              <View style={styles.textInputView}>
                <TextInput
                  ref={pin3Ref}
                  keyboardType={'number-pad'}
                  maxLength={1}
                  onKeyPress={({ nativeEvent }) => {
                    if (nativeEvent.key === 'Backspace') {
                      pin2Ref.current.focus()
                      setPin3("");
                    }
                  }}
                  onChangeText={(e) => {
                    setPin3(e);
                    if (e !== "") {
                      pin4Ref.current.focus()
                    }
                  }}
                  style={styles.textInputStyle}
                />
              </View>
              <View style={styles.textInputView}>
                <TextInput
                  ref={pin4Ref}
                  keyboardType={'number-pad'}
                  maxLength={1}
                  onKeyPress={({ nativeEvent }) => {
                    if (nativeEvent.key === 'Backspace') {
                      pin3Ref.current.focus();
                      setPin4("");
                    }
                  }}
                  onChangeText={(e) => {
                    setPin4(e);
                    if (e !== "") {
                      pin5Ref.current.focus()
                    }
                  }}
                  style={styles.textInputStyle}
                />
              </View>
              <View style={styles.textInputView}>
                <TextInput
                  ref={pin5Ref}
                  keyboardType={'number-pad'}
                  maxLength={1}
                  onKeyPress={({ nativeEvent }) => {
                    if (nativeEvent.key === 'Backspace') {
                      pin4Ref.current.focus();
                      setPin5("");
                    }
                  }}
                  onChangeText={(e) => {
                    setPin5(e);
                    if (e !== "") {
                      pin6Ref.current.focus();
                    }
                  }}
                  style={styles.textInputStyle}
                />
              </View>
              <View style={styles.textInputView}>
                <TextInput
                  ref={pin6Ref}
                  keyboardType={'number-pad'}
                  maxLength={1}
                  onKeyPress={({ nativeEvent }) => {
                    if (nativeEvent.key === 'Backspace') {
                      pin5Ref.current.focus();
                      setPin6("");
                    }
                  }}
                  onChangeText={(e) => {
                    setPin6(e);
                  }}
                  style={styles.textInputStyle}
                />
              </View>
            </View>
          </View>
        }
        {
          !confirmotp && verifyemail && <TouchableOpacity style={styles.btn} onPress={() => handleOTP()}>
            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 18 }}>Confirm OTP</Text>
          </TouchableOpacity>
        }{
          confirmotp && <View>
            <View style={{
              backgroundColor: 'whitesmoke',
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
                  backgroundColor: 'whitesmoke',
                  fontSize: 16,
                  borderRadius: 25,
                }}
                secureTextEntry={show ? false : true}
                onChangeText={(e) => setPassword(e)}
                value={password}
                keyboardType="default"
              />
              <Icon name={show ? "eye" : "eye-slash"} color="gray" size={26} onPress={() => setShow(!show)} />
            </View>
            <TextInput
              placeholder="Confirm Password"
              style={{
                height: 50,
                borderColor: 'transparent',
                borderWidth: 1,
                width: 370,
                borderRadius: 25,
                padding: 10,
                backgroundColor: 'whitesmoke',
                margin: 10,
                fontSize: 16
              }}
              secureTextEntry
              onChangeText={(e) => { setCpassword(e); }}
              value={cpassword}
              inputMode="text"
            />
          </View>
        }{
          confirmotp && verifyemail && <TouchableOpacity style={styles.btn} onPress={() => handlePassword()}>
            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 18 }}>Confirm Password</Text>
          </TouchableOpacity>
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
    width: 365,
    padding: 8,
    backgroundColor: 'whitesmoke',
    fontSize: 16,
    marginTop: 0,
    borderRadius: 25,
    marginLeft: 13
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
    marginLeft: 50
  },
  textInputView: {
    borderBottomWidth: 1,
    width: 35,
    borderBottomColor: '#407BFF',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'whitesmoke',
    padding: 10,
    borderRadius: 10
  },
  textInputStyle: {
    fontSize: 20
  },
  container: {
    flex: 1,
    backgroundColor: "#141414",
    alignItems: "center",
    justifyContent: "center",
  },
  ButtonContainer: {
    backgroundColor: "#000000",
    padding: "20px",
    justifyContent: "center",
    alignItems: "center",
    width: "200px",
    marginTop: "30px",
  },
  ButtonText: {
    color: "black",
    fontSize: "20px",
  }
})
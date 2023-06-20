import { StyleSheet, Text, View, ScrollView, KeyboardAvoidingView, Image, TouchableOpacity, Pressable, Keyboard } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { TextInput } from 'react-native-gesture-handler';
import { verifyOTP } from '../api.js'
import { StatusBar } from "expo-status-bar";
import { OTPInput } from "../components/commonFunctions";
import AsyncStorage from '@react-native-async-storage/async-storage';

const SmsOTP = ({route, navigation}) => {
  const id = AsyncStorage.getItem('recruiter_id');
  const [getData, setGetdata] = useState();

  const getDataasync = async () => {
    console.log(await AsyncStorage.getAllKeys())
    let value = await AsyncStorage.multiGet(['talent_id', 'email'])
    console.log(value[0][1])
    setGetdata(await AsyncStorage.multiGet(['talent_id', 'email']))
  }

  const [isLoading, setIsLoading] = useState(true);
  const [showMsg, setShowMsg] = useState(false);
  const [msg, setMsg] = useState('');
  const [pin1, setPin1] = useState('');
  const [pin2, setPin2] = useState('');
  const [pin3, setPin3] = useState('');
  const [pin4, setPin4] = useState('');
  const [pin5, setPin5] = useState('');
  const [pin6, setPin6] = useState('');
  const pin1Ref = useRef(null)
  const pin2Ref = useRef(null)
  const pin3Ref = useRef(null)
  const pin4Ref = useRef(null)
  const pin5Ref = useRef(null)
  const pin6Ref = useRef(null)

  useEffect(() => {
    getDataasync();
  }, [])

  const handleClick = () => {
    const reqbody = {
      otp: pin1 + pin2 + pin3 + pin4 + pin5 + pin6
    }
    verifyOTP(reqbody, getData[0][1]).then((res) => {
      setIsLoading(false);
      console.log(res);
      if (res.status) {
        navigation.navigate("Index");
      }
    })
  }


  return (
    <ScrollView>
      <View style={{ backgroundColor: 'white', minHeight: '100%' }}>
        <View style={{
          backgroundColor: '#407BFF',
          alignItems: "center",
          height: 400,
          justifyContent: "center"
        }}>
          <Image
            source={require('../assets/sendotp.png')}
            style={{
              width: 300,
              height: 300
            }}
          />
        </View>
        <KeyboardAvoidingView>
          <View style={{ marginTop: 20 }}>
            <Text style={{ textAlign: 'center' }} >OTP code sent to {getData[1][1]}</Text>
            <View style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'space-around'
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
            {showMsg && <Text style={{ color: 'red', margin: 10, textAlign: 'left' }}><Icon name="info-circle" size={14} color='red' />  {msg}</Text>}
            <TouchableOpacity style={styles.btn} onPress={() => handleClick()}>
              <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 18 }}>Verify</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    </ScrollView>
  )
}

export default SmsOTP

const styles = StyleSheet.create({})
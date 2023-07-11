import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, KeyboardAvoidingView, ScrollView } from 'react-native';
import { VerifyForgotEmail, ConfrimForgotOTP, ForgotpasswordEmail } from '../api';
import { MotiView } from 'moti';
import Icon from 'react-native-vector-icons/FontAwesome';

const ForgotPassword = ({ route, navigation }) => {
  const type = route.params.type;
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [cpassword, setCpassword] = useState('');
  const [verifyEmail, setVerifyEmail] = useState(false);
  const [confirmOTP, setConfirmOTP] = useState(false);
  const [showHelper, setShowHelper] = useState({});
  const pinRefs = useRef([]);

  useEffect(() => {
    pinRefs.current = Array(6).fill().map((_, index) => pinRefs.current[index] || React.createRef());
  }, []);

  const handleEmail = () => {
    const reqBody = type === 'talent' ? { email } : { mobile };

    VerifyForgotEmail(type, reqBody)
      .then((res) => {
        console.log(res);
        if (res.status) {
          setVerifyEmail(true);
        } else {
          setShowHelper({ label: 'email', message: res.message });
        }
      })
      .catch((err) => {
        setShowHelper({ label: 'email', message: err });
      });
  };

  const handleOTP = () => {
    const enteredOTP = pin.join('');

    const reqBody = type === 'talent' ? { email, otp: enteredOTP } : { mobile, otp: enteredOTP };

    ConfrimForgotOTP(type, reqBody)
      .then((res) => {
        if (res.status) {
          setConfirmOTP(true);
        } else {
          setShowHelper({ label: 'otp', message: res.message });
        }
      })
      .catch((err) => {
        setShowHelper({ label: 'otp', message: err });
      });
  };

  const handlePassword = () => {
    if (password === cpassword) {
      const reqBody = type === 'talent' ? { email, password } : { mobile, password };

      ForgotpasswordEmail(type, reqBody)
        .then((res) => {
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
  };

  const handlePinChange = (index, value) => {
    const newPin = [...pin];
    newPin[index] = value;
    setPin(newPin);

    if (value !== '') {
      const nextPinRef = pinRefs.current[index + 1];
      nextPinRef && nextPinRef.current.focus();
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Don't worry! We are here to help you.</Text>
        <TextInput
          style={styles.textField}
          value={type === 'talent' ? email : mobile}
          onChangeText={(value) => (type === 'talent' ? setEmail(value) : setMobile(value))}
          placeholder={type === 'talent' ? 'Enter registered email' : 'Enter registered mobile number'}
        />
        {!verifyEmail ? (
          <TouchableOpacity style={styles.btn} onPress={handleEmail}>
            <Text style={styles.btnText}>Send OTP</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.pinContainer}>
            {pin.map((digit, index) => (
              <TextInput
                key={index}
                ref={pinRefs.current[index]}
                style={styles.pinInput}
                value={digit}
                onChangeText={(value) => handlePinChange(index, value)}
                keyboardType="number-pad"
                maxLength={1}
              />
            ))}
          </View>
        )}
        {!confirmOTP && verifyEmail && (
          <TouchableOpacity style={styles.btn} onPress={handleOTP}>
            <Text style={styles.btnText}>Confirm OTP</Text>
          </TouchableOpacity>
        )}
        {confirmOTP && (
          <View>
            <TextInput
              placeholder="Password"
              style={styles.passwordInput}
              secureTextEntry
              onChangeText={(value) => setPassword(value)}
              value={password}
            />
            <TextInput
              placeholder="Confirm Password"
              style={styles.passwordInput}
              secureTextEntry
              onChangeText={(value) => setCpassword(value)}
              value={cpassword}
            />
            <TouchableOpacity style={styles.btn} onPress={handlePassword}>
              <Text style={styles.btnText}>Confirm Password</Text>
            </TouchableOpacity>
          </View>
        )}
        {showHelper.label === 'email' && <Text style={styles.helperText}>{showHelper.message}</Text>}
        {showHelper.label === 'otp' && <Text style={styles.helperText}>{showHelper.message}</Text>}
        {showHelper.label === 'password' && <Text style={styles.helperText}>{showHelper.message}</Text>}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#407BFF',
    marginBottom: 20,
    textAlign: 'center',
  },
  textField: {
    height: 50,
    width: '80%',
    paddingHorizontal: 16,
    backgroundColor: 'whitesmoke',
    fontSize: 16,
    borderRadius: 25,
    marginBottom: 20,
  },
  btn: {
    width: '60%',
    height: 50,
    backgroundColor: '#407BFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    marginBottom: 20,
  },
  btnText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  pinContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  pinInput: {
    width: 40,
    height: 40,
    backgroundColor: 'whitesmoke',
    fontSize: 24,
    borderRadius: 8,
    textAlign: 'center',
    marginHorizontal: 8,
  },
  passwordInput: {
    height: 50,
    width: '80%',
    paddingHorizontal: 16,
    backgroundColor: 'whitesmoke',
    fontSize: 16,
    borderRadius: 25,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  helperText: {
    color: 'red',
    marginBottom: 10,
  },
});

export default ForgotPassword;
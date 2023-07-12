import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, KeyboardAvoidingView, ScrollView, SafeAreaView, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { RecruiterLoginForm, AdminLoginForm, HodLogin } from '../api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';
import { MotiView } from 'moti';

const RecruiterLogin = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [email1, setEmail1] = useState('');
  const [password, setPassword] = useState('');
  const [visible, setVisible] = useState(false);
  const [showHelper, setShowHelper] = useState(false);
  const [msg, setMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const Streams = ['Department of Computer Science', 'Department of Commerce', 'Department of Arts', 'Department of Science'];

  const getData = async (id, val, name) => {
    await AsyncStorage.multiSet([
      [id, val],
      ['user_type', name]
    ]);
  };

  const getDataHod = async (id, val, name, department) => {
    await AsyncStorage.multiSet([
      [id, val],
      ['user_type', name],
      ['department', department]
    ]);
  };

  const handleClick = () => {
    if (email === 'admin') {
      if (!password || password.length === 0 || email1.length === 0 || !email1) {
        setShowHelper(true);
        setMsg('All fields are required');
        return;
      }
      let reqbody = {
        email: email1,
        password
      };
      AdminLoginForm(reqbody)
        .then((res) => {
          if (res.status) {
            setIsLoading(false);
            setShowHelper(false);
            getData('admin_id', res.data.admin_id, 'admin').then(() => {
              navigation.reset({
                index: 0,
                routes: [{ name: 'IndexDashboard' }]
              });
              navigation.navigate('IndexDashboard', { screen: 'Dashboard' });
            });
          } else {
            setShowHelper(true);
            setMsg(res.data.message);
            setIsLoading(false);
          }
        })
        .catch((err) => {
          setIsLoading(false);
          setShowHelper(true);
          setMsg(err.message);
        });
    } else if (email === 'hod') {
      handleHodLogin();
    } else {
      handleRecruiterLogin();
    }
  };

  const handleRecruiterLogin = () => {
    if (!password || password.length === 0 || email.length === 0 || !email) {
      setShowHelper(true);
      setMsg('All fields are required');
      return;
    } else if (password.length < 8) {
      setShowHelper(true);
      setMsg('Password must be at least 8 characters');
      return;
    } else {
      setShowHelper(false);
      setIsLoading(true);
      let reqbody = {
        email,
        password
      };
      console.log("are we here??");

      RecruiterLoginForm(reqbody)
        .then((res) => {
          if (res.status) {
            setIsLoading(false);
            setShowHelper(false);
            getData('recruiter_id', res.data.recruiter_id, 'recruiter').then(() => {
              navigation.reset({
                index: 0,
                routes: [{ name: 'IndexRecruiter' }]
              });
              navigation.navigate('IndexRecruiter');
            });
          } else {
            setShowHelper(true);
            setMsg(res.data.message);
            setIsLoading(false);
          }
        })
        .catch((err) => {
          setIsLoading(false);
          setShowHelper(true);
          setMsg(err.message);
        });
    }
  };

  const handleHodLogin = () => {
    if (!password || password.length === 0 || email1.length === 0 || !email1) {
      setShowHelper(true);
      setMsg('All fields are required');
      return;
    }

    let reqbody = {
      department: email1,
      password
    };

    HodLogin(reqbody)
      .then((res) => {
        if (res.status) {
          setIsLoading(false);
          setShowHelper(false);
          getDataHod('hod_id', res.data.hod_id, 'hod', res.data.department).then(() => {
            navigation.reset({
              index: 0,
              routes: [{ name: 'Subjects' }]
            });
            navigation.navigate('Subjects');
          });
        } else {
          setShowHelper(true);
          setMsg(res.data.message);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        setIsLoading(false);
        setShowHelper(true);
        setMsg(err.message);
      });
  };

  return (
    <ScrollView>
      <KeyboardAvoidingView>
        <MotiView
          from={{
            opacity: 0,
            translateY: -100,
          }}
          animate={{
            opacity: 1,
            translateY: 0,
          }}
          transition={{
            type: 'timing',
            duration: 1000,
          }}
        >
          <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Welcome Back!</Text>
            <Text style={styles.subtitle}>Please sign in to continue.</Text>
            <MotiView
              from={{
                opacity: 0,
                translateY: 100,
              }}
              animate={{
                opacity: 1,
                translateY: 0,
              }}
              transition={{
                type: 'timing',
                duration: 1000,
              }}
              delay={500}
            >
              <Image source={require('../assets/achieve.png')} style={styles.image} />
            </MotiView>
            <View style={styles.formContainer}>
              {email !== 'hod' ? (
                <MotiView
                  from={{
                    opacity: 0,
                    translateX: -100,
                  }}
                  animate={{
                    opacity: 1,
                    translateX: 0,
                  }}
                  transition={{
                    type: 'timing',
                    duration: 1000,
                  }}
                  delay={1000}
                >
                  <View>
                    <TextInput
                      placeholder="Email"
                      style={styles.input}
                      onChangeText={(e) => setEmail(e)}
                      value={email}
                      keyboardType="email-address"
                    />
                    {email && email === 'admin' && (
                      <TextInput
                        placeholder="Email"
                        style={styles.input}
                        onChangeText={(e) => setEmail1(e)}
                        value={email1}
                        keyboardType="email-address"
                      />
                    )}
                  </View>
                </MotiView>
              ) : (
                <MotiView
                  from={{
                    opacity: 0,
                    translateX: -100,
                  }}
                  animate={{
                    opacity: 1,
                    translateX: 0,
                  }}
                  transition={{
                    type: 'timing',
                    duration: 1000,
                  }}
                  delay={1500}
                >
                  <TextInput
                    placeholder="Email"
                    style={styles.input}
                    onChangeText={(e) => setEmail(e)}
                    value={email}
                    keyboardType="email-address"
                  />
                </MotiView>
              )}
              <MotiView
                from={{
                  opacity: 0,
                  translateX: -100,
                }}
                animate={{
                  opacity: 1,
                  translateX: 0,
                }}
                transition={{
                  type: 'timing',
                  duration: 1000,
                }}
                delay={1500}
              >
                <View style={styles.passwordContainer}>
                  <TextInput
                    placeholder="Password"
                    style={styles.passwordInput}
                    secureTextEntry={!visible}
                    onChangeText={(e) => setPassword(e)}
                    value={password}
                  />
                  <TouchableOpacity onPress={() => setVisible(!visible)}>
                    <Icon name={visible ? 'eye' : 'eye-slash'} color="gray" size={26} />
                  </TouchableOpacity>
                </View>
              </MotiView>
              {showHelper && (
                <Text style={styles.errorText}>
                  <Icon name="info-circle" size={14} color="red" /> {msg}
                </Text>
              )}
              <MotiView
                from={{
                  opacity: 0,
                  translateY: 1000,
                }}
                animate={{
                  opacity: 1,
                  translateY: 0,
                }}
                transition={{
                  type: 'timing',
                  duration: 1000,
                }}
                delay={2000}
              >
                {isLoading ? (
                  <ActivityIndicator color="#407BFF" size="small" />
                ) : (
                  <TouchableOpacity style={styles.button} onPress={handleClick}>
                    <Text style={styles.buttonText}>Log In</Text>
                  </TouchableOpacity>
                )}
              </MotiView>
            </View>
            {email !== 'admin' && email !== 'hod' && (
              <MotiView
                from={{
                  opacity: 0,
                  translateY: 1000,
                }}
                animate={{
                  opacity: 1,
                  translateY: 0,
                }}
                transition={{
                  type: 'timing',
                  duration: 1000,
                }}
                delay={2500}
              >
                <TouchableOpacity
                  style={styles.forgotPassword}
                  onPress={() => navigation.navigate('ForgotPassword', { type: 'recruiter' })}
                >
                  <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                </TouchableOpacity>
              </MotiView>
            )}
            <MotiView
              from={{
                opacity: 0,
                translateY: 1000,
              }}
              animate={{
                opacity: 1,
                translateY: 0,
              }}
              transition={{
                type: 'timing',
                duration: 1000,
              }}
              delay={2500}
            >
              <Text style={styles.signupText}>
                Don't have an account?{' '}
                <Text style={styles.signupLink} onPress={() => navigation.navigate('RecruiterRegister')}>
                  Signup
                </Text>
              </Text>
            </MotiView>
          </SafeAreaView>
        </MotiView>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default RecruiterLogin;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'whitesmoke',
    paddingVertical: 50
  },
  title: {
    color: '#407BFF',
    fontWeight: 'bold',
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 10
  },
  subtitle: {
    color: 'gray',
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 20
  },
  image: {
    width: 500,
    height: 400
  },
  formContainer: {
    width: '100%',
    alignItems: 'center'
  },
  input: {
    height: 50,
    borderColor: 'transparent',
    borderWidth: 1,
    width: 350,
    borderRadius: 25,
    padding: 10,
    backgroundColor: '#e5e5e5',
    marginVertical: 10,
    fontSize: 16
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e5e5e5',
    height: 50,
    width: 350,
    borderRadius: 25,
    marginVertical: 10,
    paddingHorizontal: 10
  },
  passwordInput: {
    flex: 1,
    height: 50,
    fontSize: 16
  },
  errorText: {
    color: 'red',
    marginVertical: 10
  },
  button: {
    width: 350,
    height: 50,
    backgroundColor: '#407BFF',
    borderRadius: 25,
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18
  },
  forgotPassword: {
    marginVertical: 10
  },
  forgotPasswordText: {
    color: '#407BFF',
    fontWeight: 'bold',
    fontSize: 16
  },
  signupText: {
    color: 'gray',
    fontSize: 16,
    marginVertical: 10
  },
  signupLink: {
    color: '#407BFF',
    fontWeight: 'bold'
  }
});
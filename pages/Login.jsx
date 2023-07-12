import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Image, KeyboardAvoidingView, ScrollView, ActivityIndicator, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import { TalentLogin } from '../api';
import { MotiView } from 'moti';

const Login = ({ navigation }) => {
  const [text, setText] = useState('');
  const [password, setPassword] = useState('');
  const [visible, setVisible] = useState(false);
  const [showHelper, setShowHelper] = useState(false);
  const [msg, setMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const ClearData = async () => {
    console.log(await AsyncStorage.getAllKeys());
  };

  useEffect(() => {
    ClearData();
  }, []);

  const GetData = async (value) => {
    await AsyncStorage.multiSet([['user_type', 'talent'], ['talent_id', value], ['register_no', text]]);
  };

  const handleClick = () => {
    if (!password || !text || password.length === 0 || text.length === 0) {
      setShowHelper(true);
      setMsg('All fields are required');
    } else if (password && password.length < 8) {
      setShowHelper(true);
      setMsg('Password must be at least 8 characters');
    } else {
      setShowHelper(false);
      setIsLoading(true);
      let reqbody = {
        register_no: text,
        password: password,
      };
      TalentLogin(reqbody)
        .then((res) => {
          console.log('its response', res);
          if (res.status) {
            GetData(res.data.talent_id);
            setIsLoading(false);
            navigation.reset({
              index: 0,
              routes: [{ name: 'Index' }],
            });
            navigation.navigate('Index');
          } else {
            setShowHelper(true);
            setMsg(res.data.message);
            setIsLoading(false);
          }
        })
        .catch((err) => {
          console.log('it failed', err);
          setIsLoading(false);
        });
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
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
          <Text style={styles.header}>Welcome Back!</Text>
          <Text style={styles.subHeader}>Please sign in to continue.</Text>
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
          >
            <Image
              source={require('../assets/achieve.png')}
              style={styles.image}
            />
          </MotiView>
          <KeyboardAvoidingView>
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
              delay={500}
            >
              <TextInput
                placeholder="Register No."
                style={styles.input}
                onChangeText={(e) => setText(e)}
                value={text}
                keyboardType="default"
              />
            </MotiView>
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
              <View style={styles.passwordContainer}>
                <TextInput
                  placeholder="Password"
                  style={styles.passwordInput}
                  secureTextEntry={visible ? false : true}
                  onChangeText={(e) => setPassword(e)}
                  value={password}
                  keyboardType="default"
                />
                <Icon
                  name={visible ? 'eye' : 'eye-slash'}
                  color="gray"
                  size={26}
                  onPress={() => setVisible(!visible)}
                />
              </View>
            </MotiView>
            {showHelper && (
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
                delay={1500}
              >
                <Text style={styles.helperText}>
                  <Icon name="info-circle" size={14} color="red" /> {msg}
                </Text>
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
              delay={2000}
            >
              {isLoading ? (
                <ActivityIndicator color="#407BFF" size="small" />
              ) : (
                <TouchableOpacity style={styles.button} onPress={() => handleClick()}>
                  <Text style={styles.buttonText}>Log In</Text>
                </TouchableOpacity>
              )}
            </MotiView>
          </KeyboardAvoidingView>
        </MotiView>
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
          <Text
            style={styles.forgotPasswordText}
            onPress={() => navigation.navigate('ForgotPassword', { type: 'talent' })}
          >
            Forgot Password?
          </Text>
          <Text style={styles.signupText}>
            Don't have an account?{' '}
            <Text style={styles.signupLink} onPress={() => navigation.navigate('Register')}>
              Signup
            </Text>
          </Text>
        </MotiView>
      </View>
    </ScrollView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'whitesmoke',
    width: '100%',
  },
  header: {
    color: '#407BFF',
    fontWeight: 'bold',
    fontSize: 24,
    textAlign: 'center',
  },
  subHeader: {
    color: 'gray',
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 10,
    textAlign:'center'
  },
  image: {
    width: '100%',
    height: 400,
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
    fontSize: 16,
  },
  passwordContainer: {
    backgroundColor: '#e5e5e5',
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    padding: 5,
    borderRadius: 25,
  },
  passwordInput: {
    flex: 1,
    height: 50,
    borderColor: 'transparent',
    borderWidth: 1,
    padding: 10,
    backgroundColor: '#e5e5e5',
    fontSize: 16,
    borderRadius: 25,
  },
  helperText: {
    color: 'red',
    marginVertical: 10,
  },
  button: {
    width: 350,
    height: 50,
    backgroundColor: '#407BFF',
    color: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    borderRadius: 25,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  forgotPasswordText: {
    color: '#407BFF',
    fontWeight: 'bold',
    fontSize: 16,
    marginVertical: 10,
    textAlign:'center'
  },
  signupText: {
    color: 'gray',
    fontSize: 16,
    marginVertical: 10,
  },
  signupLink: {
    color: '#407BFF',
    fontWeight: 'bold',
  },
});
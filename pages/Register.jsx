import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { TalentRegister, SendOTPCode } from '../api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MotiView } from 'moti';

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
  const [confirmpass, setConfirmpass] = useState('');

  function isGmailEmail(email) {
    const regex = /^[a-zA-Z0-9._%+-]+@bmscw.edu.in$/;
    return regex.test(email);
  }

  function hasNumbers(text) {
    const regex = /\d/;
    return regex.test(text);
  }

  const storeData = async (id, email) => {
    await AsyncStorage.multiSet([
      ['talent_id', id],
      ['register_no', registerno],
      ['user_type', 'talent'],
    ]);
  };

  const handleClick = () => {
    if (
      !registerno ||
      registerno.length === 0 ||
      !firstname ||
      firstname.length === 0 ||
      !lastname ||
      lastname.length === 0 ||
      !email ||
      email.length === 0 ||
      !password ||
      password.length === 0
    ) {
      setShowHelper(true);
      setMsg({ value: 'all', msg: 'All fields are mandatory.' });
    } else if (!isGmailEmail(email)) {
      setShowHelper(true);
      setMsg({ value: 'email', msg: 'Use a valid college address only.' });
    } else if (hasNumbers(firstname) || hasNumbers(lastname)) {
      setShowHelper(true);
      setMsg({ value: 'name', msg: 'Name cannot contain numbers.' });
    } else if (password.length < 8) {
      setShowHelper(true);
      setMsg({ value: 'password', msg: 'Password should be at least 8 characters long.' });
    } else if (password !== confirmpass) {
      setShowHelper(true);
      setMsg({ value: 'password', msg: 'Passwords do not match.' });
    } else {
      setIsLoading(true);
      setShowHelper(false);
      const reqbody = {
        firstname,
        lastname,
        email,
        register_no: registerno,
        password,
        enable: true,
        college: 'BMS College for Women',
      };
      TalentRegister(reqbody)
        .then((res) => {
          if (res.status) {
            const reqbody = { email };
            SendOTPCode(reqbody, res.data[0].talent_id).then((resp) => {
              storeData(res.data[0].talent_id, res.data[0].email);
              navigation.navigate('SendOTP', {
                talent_id: res.data[0].talent_id,
                email: res.data[0].email,
              });
              setIsLoading(false);
            });
          } else {
            setShowHelper(true);
            console.log('ERROR', res);
            setMsg({ value: 'all', msg: res.message });
            setIsLoading(false);
          }
        })
        .catch((err) => {
          console.log(err);
          setIsLoading(false);
        });
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <MotiView
        from={{ opacity: 0, translateY: 100 }}
        animate={{ opacity: 1, translateY: 0 }}
        duration={500}
        delay={500}
      >
        <Text style={styles.heading}>Create Account</Text>
        <Text style={styles.subheading}>Please sign up to continue.</Text>
      </MotiView>
      <MotiView
        from={{ opacity: 0, translateY: -100 }}
        animate={{ opacity: 1, translateY: 0 }}
        duration={1000}
      >
        <Image source={require('../assets/signup.png')} style={styles.image} />
      </MotiView>
      <KeyboardAvoidingView style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <MotiView
            from={{ opacity: 0, translateX: -100 }}
            animate={{ opacity: 1, translateX: 0 }}
            duration={500}
            delay={1500}
          >
            <TextInput
              placeholder="First Name"
              style={styles.input}
              onChangeText={(e) => setFirstname(e)}
              value={firstname}
              inputMode="text"
            />
          </MotiView>
          <MotiView
            from={{ opacity: 0, translateX: -100 }}
            animate={{ opacity: 1, translateX: 0 }}
            duration={500}
            delay={2000}
          >
            <TextInput
              placeholder="Last Name"
              style={styles.input}
              onChangeText={(e) => setLastname(e)}
              value={lastname}
              inputMode="text"
            />
          </MotiView>
          {showHelper && msg.value === 'name' && (
            <Text style={styles.errorMsg}>
              <Icon name="info-circle" size={14} color="red" /> {msg.msg}
            </Text>
          )}
          <MotiView
            from={{ opacity: 0, translateX: -100 }}
            animate={{ opacity: 1, translateX: 0 }}
            duration={500}
            delay={2500}
          >
            <TextInput
              placeholder="Email"
              style={styles.input}
              onChangeText={(e) => setEmail(e)}
              value={email}
              inputMode="email"
              keyboardType="email-address"
            />
          </MotiView>
          {showHelper && msg.value === 'email' && (
            <Text style={styles.errorMsg}>
              <Icon name="info-circle" size={14} color="red" /> {msg.msg}
            </Text>
          )}
          <MotiView
            from={{ opacity: 0, translateX: -100 }}
            animate={{ opacity: 1, translateX: 0 }}
            duration={500}
            delay={3000}
          >
            <TextInput
              placeholder="Register No."
              style={styles.input}
              onChangeText={(e) => setRegisterno(e)}
              value={registerno}
              keyboardType="default"
            />
          </MotiView>
          <MotiView
            from={{ opacity: 0, translateX: -100 }}
            animate={{ opacity: 1, translateX: 0 }}
            duration={500}
            delay={3500}
          >
            <View style={styles.passwordContainer}>
              <TextInput
                placeholder="Password"
                style={styles.passwordInput}
                secureTextEntry={!visible}
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
          <MotiView
            from={{ opacity: 0, translateX: -100 }}
            animate={{ opacity: 1, translateX: 0 }}
            duration={500}
            delay={4000}
          >
            <TextInput
              placeholder="Confirm password"
              style={styles.input}
              secureTextEntry
              onChangeText={(e) => setConfirmpass(e)}
              value={confirmpass}
              keyboardType="default"
            />
          </MotiView>
          {showHelper && msg.value === 'password' && (
            <Text style={styles.errorMsg}>
              <Icon name="info-circle" size={14} color="red" /> {msg.msg}
            </Text>
          )}
          {showHelper && msg.value === 'all' && (
            <Text style={styles.errorMsg}>
              <Icon name="info-circle" size={14} color="red" /> {msg.msg}
            </Text>
          )}
          <MotiView
            from={{ opacity: 0, translateY: -100 }}
            animate={{ opacity: 1, translateY: 0 }}
            duration={500}
            delay={4500}
          >
            <Text style={styles.termsText}>
              By joining us you agree to our{' '}
              <Text
                onPress={() => navigation.navigate('TermsandConditions')}
                style={styles.termsLink}
              >
                Terms and Conditions
              </Text>{' '}
              and{' '}
              <Text
                onPress={() => navigation.navigate('PrivatePolicy')}
                style={styles.termsLink}
              >
                Privacy Policy
              </Text>
            </Text>
          </MotiView>
          <MotiView
            from={{ opacity: 0, translateY: -100 }}
            animate={{ opacity: 1, translateY: 0 }}
            duration={500}
            delay={5000}
          >
            {isLoading ? (
              <ActivityIndicator size="small" color="#407BFF" />
            ) : (
              <TouchableOpacity onPress={handleClick} style={styles.btn}>
                <Text style={styles.btnText}>Join us</Text>
              </TouchableOpacity>
            )}
          </MotiView>
        </View>
      </KeyboardAvoidingView>
      <MotiView
        from={{ opacity: 0, translateY: -100 }}
        animate={{ opacity: 1, translateY: 0 }}
        duration={500}
        delay={5500}
      >
        <Text style={styles.loginText}>
          Already have an account?{' '}
          <Text style={styles.loginLink} onPress={() => navigation.navigate('Login')}>
            Login
          </Text>
        </Text>
      </MotiView>
    </ScrollView>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    backgroundColor: 'whitesmoke',
    paddingTop: 80,
    paddingBottom: 40,
  },
  heading: {
    color: '#407BFF',
    fontWeight: 'bold',
    fontSize: 26,
    textAlign: 'left',
    marginLeft: 10,
    marginTop: 10,
  },
  subheading: {
    color: 'gray',
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 20,
  },
  image: {
    width: 400,
    height: 300,
  },
  formContainer: {
    alignItems: 'center',
  },
  inputContainer: {
    alignItems: 'center',
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
    padding: 10,
    borderRadius: 25,
    width: 350
  },
  passwordInput: {
    height: 50,
    borderColor: 'transparent',
    borderWidth: 1,
    flex: 1,
    backgroundColor: '#e5e5e5',
    fontSize: 16,
    borderRadius: 25,
  },
  errorMsg: {
    color: 'red',
    margin: 10,
    textAlign: 'left',
  },
  termsText: {
    marginVertical: 10,
    textAlign: 'center',
    color: 'gray',
    paddingHorizontal: 10
  },
  termsLink: {
    color: '#407BFF',
    fontWeight: 'bold',
  },
  btn: {
    width: 350,
    height: 50,
    backgroundColor: '#407BFF',
    color: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    borderRadius: 25,
  },
  btnText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  loginText: {
    color: 'gray',
    fontSize: 16,
    marginVertical: 10,
  },
  loginLink: {
    color: '#407BFF',
    fontWeight: 'bold',
  },
});
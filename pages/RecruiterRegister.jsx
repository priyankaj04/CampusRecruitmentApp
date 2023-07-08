import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, KeyboardAvoidingView, ScrollView, ActivityIndicator, SafeAreaView } from 'react-native';
import React, { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { RecruiterRegisteration, AdminRegisteration, SendOTPCodeSMS, HodRegisteration } from '../api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';


const RecruiterRegister = ({ navigation }) => {

  const [company_name, setCompany] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [contact_no, setContact] = useState('');
  const [visible, setVisible] = useState(false);
  const [showHelper, setShowHelper] = useState(false);
  const [msg, setMsg] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [confirmpass, setConfirmpass] = useState('');
  const [code, setCode] = useState('');

  function hasNumbers(text) {
    const regex = /\d/;
    return regex.test(text);
  }

  function isInvalidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return !emailRegex.test(email);
  }

  function isInvalidContactNumber(number) {
    const regex = /^\d+$/;
    return !regex.test(number);
  }

  const SetData = async (id) => {
    await AsyncStorage.multiSet([['admin_id', id], ['user_type', 'admin']]);
  }

  const SetData1 = async (id) => {
    await AsyncStorage.multiSet([['recruiter_id', id], ['user_type', 'recruiter']]);
  }

  const SetData2 = async (id, department) => {
    await AsyncStorage.multiSet([['hod_id', id], ['user_type', 'hod'], ['department', department]]);
  }

  const Streams = ['Department of Computer Science', 'Department of Commerce', 'Department of Arts', 'Department of Science'];


  const handleClick = () => {
    if (firstname === 'admin') {
      if (!lastname || lastname.length === 0 || !email || email.length === 0 || !password || password.length === 0 || !contact_no || contact_no.length === 0) {
        setShowHelper(true);
        setMsg({ value: 'all', msg: 'All fields are mandatory.' });
        return;
      }
      reqbody = {
        code,
        firstname,
        lastname,
        email,
        password,
        contactno: contact_no
      }
      AdminRegisteration(reqbody).then((res) => {
        console.log(res);
        if (res.status) {
          setIsLoading(false);
          setShowHelper(false);
          SetData(res.data[0].admin_id).then((resp) => {
            if (resp.status) {
              navigation.reset({
                index: 0,
                routes: [{ name: 'IndexDashboard' }]
              })
              navigation.navigate("IndexDashboard", { screen: "Dashboard" });
            }
          })
        } else {
          setIsLoading(false);
          setShowHelper(true);
          setMsg({ value: 'all', msg: res.message });
        }
      })
    } else {
      if (!company_name || company_name.length === 0 || !firstname || firstname.length === 0 || !lastname
        || lastname.length === 0 || !email || email.length === 0 || !password || password.length === 0 || !contact_no || contact_no.length === 0) {
        setShowHelper(true);
        setMsg({ value: 'all', msg: 'All fields are mandatory.' });
        return;
      } else if (isInvalidEmail(email)) {
        setShowHelper(true);
        setMsg({ value: 'email', msg: 'Invalid Email' });
        return;
      } else if (hasNumbers(firstname) || hasNumbers(lastname)) {
        setShowHelper(true);
        setMsg({ value: 'name', msg: 'Name cannot contain numbers.' });
        return;
      } else if (password && password.length < 8) {
        setShowHelper(true);
        setMsg({ value: 'password', msg: 'Password should be at least 8 characters long.' });
        return;
      } else if (password != confirmpass) {
        setShowHelper(true);
        setMsg({ value: 'password', msg: 'Password do not match.' });
        return;
      } else if (contact_no.length != 10) {
        setShowHelper(true);
        setMsg({ value: 'contactno', msg: 'Contact No should be 10 digits only.' });
        return;
      } else if (isInvalidContactNumber(contact_no)) {
        setShowHelper(true);
        setMsg({ value: 'contactno', msg: 'Contact No should only contain digits.' });
        return;
      } else {
        setIsLoading(true);
        setShowHelper(false);
        let reqbody = {
          firstname,
          lastname,
          email,
          company_name,
          contact_no,
          password
        }
        //console.log("11211",reqbody);
        RecruiterRegisteration(reqbody).then((res) => {
          if (res.status) {
            SetData1(res.data[0].recruiter_id).then(() => {
              var req = { mobile: contact_no }
              SendOTPCodeSMS(req, res.data[0].recruiter_id).then((resp) => {
                console.log("asdfasdf", resp);
                if (resp.status) {
                  navigation.navigate('SMSOTP');
                  setShowHelper(false);
                  setIsLoading(false);
                }
              })
            })
          } else {
            setShowHelper(true);
            //console.log("ERROR", res);
            setMsg({ value: 'all', msg: res.message });
            setIsLoading(false);
          }
          //console.log("reponsehere", res);
          setIsLoading(false);
        })
          .catch((err) => {
            //console.log(err);
            setShowHelper(true);
            setMsg({ value: 'all', msg: err });
            setIsLoading(false);
          })
      }
    }
  }

  const handleHodLogin = () => {
    if (password != confirmpass) {
      setShowHelper(true);
      setMsg({ value: 'all', msg: 'Password do not match.' });
      return;
    } else {
      setIsLoading(true);
      setShowHelper(false);
      const reqbody = {
        name: lastname,
        department: email,
        password
      }
      HodRegisteration(reqbody).then((res) => {
        console.log(res);
        if (res.status) {
          SetData2(res.data[0].hod_id, res.data[0].department).then(() => {
            navigation.reset({
              index: 0,
              routes: [{ name: 'Subjects' }],
            });
            navigation.navigate('Subjects');
            setShowHelper(false);
            setIsLoading(false);
          })
        } else {
          setShowHelper(true);
          //console.log("ERROR", res);
          setMsg({ value: 'all', msg: res.message });
          setIsLoading(false);
        }
        //console.log("reponsehere", res);
        setIsLoading(false);
      }).catch((err) => {
        console.log(err);
        setShowHelper(true);
        //setMsg({ value: 'all', msg: err });
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
          {firstname != "hod" ? <View style={{ alignItems: 'center' }}>
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
              placeholder={!firstname || firstname != "admin" ? "Last Name" : "Full Name"}
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
            {firstname && firstname == 'admin' && <TextInput
              placeholder="Code"
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
              onChangeText={(e) => setCode(e)}
              value={code}
              inputMode="text"
            />}
            {!firstname || firstname != "admin" ? <TextInput
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
            /> : null}
            {showHelper && msg && msg.value === 'companyname' && <Text style={{ color: 'red', margin: 10, textAlign: 'left' }}><Icon name="info-circle" size={14} color='red' />  {msg.msg}</Text>}
            <TextInput
              placeholder={!firstname || firstname != "admin" ? "Official Email Id" : "Email Id"}
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
              placeholder="Contact No"
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
              onChangeText={(e) => setContact(e)}
              value={contact_no}
              keyboardType="default"
            />
            {showHelper && msg && msg.value === 'contactno' && <Text style={{ color: 'red', margin: 10, textAlign: 'left' }}><Icon name="info-circle" size={14} color='red' />  {msg.msg}</Text>}
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
          </View> : <View>
            <TextInput
              placeholder="User type"
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
              placeholder="Full Name"
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
            <View style={{
              height: 50,
              borderColor: 'transparent',
              borderWidth: 1,
              width: 350,
              borderRadius: 25,
              backgroundColor: '#e5e5e5',
              margin: 10,
              fontSize: 16
            }}>
              <Picker
                selectedValue={email}
                onValueChange={(itemValue) => {
                  setEmail(itemValue)
                }
                }>
                {Streams.map((item) => <Picker.Item key={item} label={item} value={item} />)}
              </Picker>
            </View>
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
              {showHelper && msg && msg.value === 'all' && <Text style={{ color: 'red', margin: 10, textAlign: 'left' }}><Icon name="info-circle" size={14} color='red' />  {msg.msg}</Text>}
              <Text style={{ margin: 10, textAlign: 'center', color: 'gray' }}>By joining us you agree to our <Text onPress={() => navigation.navigate('TermsandConditions')} style={{
                color: '#407BFF',
                fontWeight: 'bold'
              }}>Terms and Condtions</Text> and <Text onPress={() => navigation.navigate('PrivatePolicy')} style={{
                color: '#407BFF',
                fontWeight: 'bold'
              }}>Private policy</Text></Text>
              {isLoading ? <ActivityIndicator size="small" color="#407BFF" /> :
                <TouchableOpacity onPress={() => handleHodLogin()} style={styles.btn}><Text style={{ color: 'white', fontWeight: 'bold', fontSize: 18 }} >Join us</Text></TouchableOpacity>
              }
          </View>
          }
        </KeyboardAvoidingView>
        <Text style={{
          color: 'gray',
          fontSize: 16,
          margin: 10,
          marginBottom: 40
        }}>Already have an account? <Text style={{ color: '#407BFF', fontWeight: 'bold' }} onPress={() => navigation.navigate('RecruiterLogin')}>Login</Text></Text>
      </View>
    </ScrollView>
  )
}

export default RecruiterRegister

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
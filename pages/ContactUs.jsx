import { Image, StyleSheet, Text, View, TextInput, ScrollView, KeyboardAvoidingView, ActivityIndicator, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { NewQuery, TalentDetailsById } from '../api';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ContactUs = ({ route, navigation }) => {
  const [id, setId] = useState(null);
  const [type, setType] = useState(null);

  const getData = async () => {
    console.log(await AsyncStorage.getAllKeys())
    setId(await AsyncStorage.multiGet(['talent_id', 'user_type']));
    console.log(await AsyncStorage.multiGet(['talent_id', 'user_type']))
  }

  const [query, setQuery] = useState('');
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [contact_no, setContactNo] = useState('');
  const [loading, setLoading] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [msg, setMsg] = useState('');


  useEffect(() => {
    if (!id || !type) {
      getData();
    }
    let value;
    
    if (async() => await AsyncStorage.getItem('talent_id')) {
      console.log("how are you huh??")
      TalentDetailsById(id).then((res) => {
        if (res.status) {
          setFullname(res.firstName + res.lastName);
        }
      })
    }
  }, [])

  const handleClick = () => {
    if (!query || query.length === 0 || !fullname || fullname.length === 0 || !email || email.length === 0 || !contact_no || contact_no.length === 0) {
      setShowMessage(true);
      setMsg('All fields are required.')
      return;
    }
    setShowMessage(false);
    setLoading(true);
    const reqbody = {
      id,
      type,
      message: query,
      fullname,
      email,
      contact_no
    }

    NewQuery(reqbody).then((res) => {
      if (res.status) {
        //navigation.navigate('Profile');
        setQuery('');
        setFullname('');
        setEmail('');
        setContactNo('');
      } else {
        setShowMessage(true);
        setMsg(res.data.message)
      }
      setLoading(false);
    })
  }


  return (
    <ScrollView>
      <View style={{ backgroundColor: '#407BFF', width: '100%', minHeight: '35%', alignItems: 'center' }}>
        <Image
          source={require('../assets/Contactus.png')}
          style={{ width: 350, height: 350, alignItems: 'center' }}
        />
      </View>
      <KeyboardAvoidingView>
        <View style={{ marginTop: 20, backgroundColor: 'white', margin: 10, borderRadius: 10 }}>
          <Text style={styles.label}>Full name*</Text>
          <TextInput
            value={fullname}
            style={styles.textField}
          />
          <Text style={styles.label}>Email*</Text>
          <TextInput
            value={email}
            onChangeText={(text) => { setEmail(text) }}
            style={styles.textField}
          />
          <Text style={styles.label}>Contact Number*</Text>
          <TextInput
            value={contact_no}
            onChangeText={(text) => { setContactNo(text) }}
            style={styles.textField}
          />
          <Text style={styles.label}>Message*</Text>
          <TextInput
            editable
            multiline
            numberOfLines={4}
            value={query}
            onChangeText={(text) => { setQuery(text) }}
            style={styles.multiline}
          />
          {showMessage && <Text style={{ color: 'red', margin: 10, textAlign: 'left' }}><Icon name="info-circle" size={14} color='red' /> {msg}</Text>}
          <View style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 20
          }}>
            {loading ? <View style={{
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <ActivityIndicator size="large" color="#407BFF" />
            </View> : <TouchableOpacity style={styles.btn} onPress={() => handleClick()}>
              <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 18 }}>Submit</Text>
            </TouchableOpacity>
            }
            <Text style={{ fontWeight: "bold", margin: 7, color: '#407BFF' }} onPress={() => navigation.navigate('ViewQueries')}>View all your queries</Text>
          </View>
        </View>

      </KeyboardAvoidingView>
      <Text style={{ color: 'gray', fontSize: 12, lineHeight: 14, textAlign: 'center', margin: 20, fontStyle: 'italic', marginBottom: 75 }}>We appreciate your interest in reaching out to us! If you have any recommendations, queries, reports,
        or any other kind of inquiries, we would be more than happy to assist you. We also welcome compliments and feedback from our valued users.
        Please feel free to contact us,we assure you that we value your input and will strive to provide a prompt and helpful response.
        We look forward to hearing from you!
      </Text>
    </ScrollView>
  )
}

export default ContactUs

const styles = StyleSheet.create({
  textField: {
    height: 50,
    borderBottomColor: 'black',
    borderColor: 'transparent',
    borderWidth: 1,
    width: 350,
    padding: 8,
    backgroundColor: 'white',
    margin: 10,
    fontSize: 16,
    marginTop: 0,
    marginLeft: 20
  },
  btn: {
    width: 350,
    height: 50,
    backgroundColor: '#407BFF',
    color: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    marginTop: 0,
    borderRadius: 25,
    shadowOffset: { width: 5, height: 5 },
    shadowColor: 'black',
    shadowOpacity: 0.8,
    shadowRadius: 5,
    elevation: 3
  },
  multiline: {
    minHeight: 50,
    borderBottomColor: 'black',
    borderColor: 'transparent',
    borderWidth: 1,
    width: 350,
    padding: 8,
    backgroundColor: 'white',
    margin: 10,
    fontSize: 16,
    textAlign: 'left',
    marginLeft: 20
  },
  btncontainer: {
    backgroundColor: 'white',
  },
  label: {
    margin: 10,
    marginLeft: 20,
    marginBottom: 0,
    color: 'gray',
    textAlign: 'left'
  },
  edit: {
    backgroundColor: '#407BFF',
    padding: 10,
    borderRadius: 10,
    shadowOffset: { width: 5, height: 5 },
    shadowColor: 'black',
    shadowOpacity: 0.8,
    shadowRadius: 5,
    elevation: 3
  }
})
import { Image, StyleSheet, Text, View, TextInput, ScrollView, KeyboardAvoidingView, ActivityIndicator, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { MotiView } from 'moti';
import { NewQuery, TalentDetailsById, RecruiterDetailsById } from '../api';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ContactUs = ({ route, navigation }) => {
  const [id, setId] = useState(null);
  const [type, setType] = useState(null);

  const getData = async () => {
    setType(await AsyncStorage.getItem('user_type'));
    setId(await AsyncStorage.multiGet(['talent_id', 'recruiter_id']));
  };

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
    if (type === 'talent' && id) {
      TalentDetailsById(id[0][1]).then((res) => {
        if (res.status) {
          setFullname(`${res.data[0].firstname} ${res.data[0].lastname}`);
          setEmail(res.data[0].email);
          setContactNo(res.data[0].contactno);
        }
      });
    } else if (type === 'recruiter' && id) {
      RecruiterDetailsById(id[1][1]).then((res) => {
        if (res.status) {
          setFullname(`${res.data[0].firstname} ${res.data[0].lastname}`);
          setEmail(res.data[0].email);
          setContactNo(res.data[0].contactno);
        }
      });
    }
  }, [id, type]);

  const handleClick = () => {
    if (!query || query.length === 0 || !fullname || fullname.length === 0 || !email || email.length === 0 || !contact_no || contact_no.length === 0) {
      setShowMessage(true);
      setMsg('All fields are required.');
      return;
    }
    setShowMessage(false);
    setLoading(true);
    const reqbody = {
      type,
      message: query,
      fullname,
      email,
      contact_no
    };

    if (type === 'talent') {
      reqbody.id = id[0][1];
    } else if (type === 'recruiter') {
      reqbody.id = id[1][1];
    }
    console.log(reqbody);
    NewQuery(reqbody).then((res) => {
      if (res.status) {
        setQuery('');
      } else {
        setShowMessage(true);
        setMsg(res.data.message);
      }
      setLoading(false);
    });
  };

  const handleNav = () => {
    if (type === 'talent') {
      navigation.navigate('ViewQueries', { id: id[0][1] });
    } else if (type === 'recruiter') {
      navigation.navigate('ViewQueries', { id: id[1][1] });
    }
  };

  return (
    <ScrollView>
      <View style={{ backgroundColor: '#407BFF', width: '100%', minHeight: '35%', alignItems: 'center' }}>
        <MotiView
          from={{ opacity: 0, translateY: -100 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'timing', duration: 500 }}
        >
          <Image
            source={require('../assets/Contactus.png')}
            style={{ width: 350, height: 350, alignItems: 'center' }}
          />
        </MotiView>
      </View>
      <KeyboardAvoidingView>
        <View style={{ marginTop: 20, backgroundColor: 'white', margin: 10, borderRadius: 10 }}>
          <MotiView
            from={{ opacity: 0, translateX: -100 }}
            animate={{ opacity: 1, translateX: 0 }}
            transition={{ type: 'timing', duration: 1000, delay: 500 }}
            style={{ marginBottom: 20 }}
          >
            <Text style={styles.label}>Full name*</Text>
            <TextInput
              value={fullname}
              style={styles.textField}
            />
          </MotiView>
          <MotiView
            from={{ opacity: 0, translateX: -100 }}
            animate={{ opacity: 1, translateX: 0 }}
            transition={{ type: 'timing', duration: 1000, delay: 1000 }}
            style={{ marginBottom: 20 }}
          >
            <Text style={styles.label}>Email*</Text>
            <TextInput
              value={email}
              onChangeText={(text) => { setEmail(text) }}
              style={styles.textField}
            />
          </MotiView>
          <MotiView
            from={{ opacity: 0, translateX: -100 }}
            animate={{ opacity: 1, translateX: 0 }}
            transition={{ type: 'timing', duration: 1000, delay: 1500 }}
            style={{ marginBottom: 20 }}
          >
            <Text style={styles.label}>Contact Number*</Text>
            <TextInput
              value={contact_no}
              onChangeText={(text) => { setContactNo(text) }}
              style={styles.textField}
            />
          </MotiView>
          <MotiView
            from={{ opacity: 0, translateX: -100 }}
            animate={{ opacity: 1, translateX: 0 }}
            transition={{ type: 'timing', duration: 1000, delay: 2000 }}
            style={{ marginBottom: 20 }}
          >
            <Text style={styles.label}>Message*</Text>
            <TextInput
              editable
              multiline
              numberOfLines={4}
              value={query}
              onChangeText={(text) => { setQuery(text) }}
              style={styles.multiline}
            />
          </MotiView>
          {showMessage && <Text style={{ color: 'red', margin: 10, textAlign: 'left' }}><Icon name="info-circle" size={14} color='red' /> {msg}</Text>}
          <MotiView
            from={{ opacity: 0, translateX: -100 }}
            animate={{ opacity: 1, translateX: 0 }}
            transition={{ type: 'timing', duration: 1000, delay: 2500 }}
            style={styles.btnContainer}
          >
            {loading ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#407BFF" />
              </View>
            ) : (
              <View>
                <TouchableOpacity style={styles.btn} onPress={handleClick}>
                  <Text style={styles.btnText}>Submit</Text>
                </TouchableOpacity>
                <Text style={styles.queryText} onPress={handleNav}>View all your queries</Text>
              </View>
            )}
          </MotiView>
        </View>
      </KeyboardAvoidingView>
      <Text style={styles.infoText}>
        We appreciate your interest in reaching out to us! If you have any recommendations, queries, reports,
        or any other kind of inquiries, we would be more than happy to assist you. We also welcome compliments and feedback from our valued users.
        Please feel free to contact us, we assure you that we value your input and will strive to provide a prompt and helpful response.
        We look forward to hearing from you!
      </Text>
    </ScrollView>
  )
}

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
  btnContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20
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
  btnText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18
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
  label: {
    margin: 10,
    marginLeft: 20,
    marginBottom: 0,
    color: 'gray',
    textAlign: 'left'
  },
  queryText: {
    fontWeight: "bold",
    margin: 10,
    color: '#407BFF',
    textAlign: 'center'
  },
  infoText: {
    color: 'gray',
    fontSize: 12,
    lineHeight: 14,
    textAlign: 'center',
    margin: 20,
    fontStyle: 'italic',
    marginBottom: 100
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default ContactUs;
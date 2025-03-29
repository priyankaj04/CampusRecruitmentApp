import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import { MotiView } from 'moti';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AdminChangepassword = ({ navigation }) => {
  const [oldpassword, setOldpassword] = useState('');
  const [newpassword, setNewpassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [showMsg, setShowMsg] = useState(false);
  const [msg, setMsg] = useState('');
  const [adminid, setAdminid] = useState(null);

  const getData = async () => {
    setAdminid(await AsyncStorage.getItem('admin_id'));
  };

  React.useEffect(() => {
    if (!adminid) {
      getData();
    }
  }, [adminid]);

  const handleClick = () => {
    if (confirm !== newpassword) {
      setShowMsg(true);
      setMsg(
        'Sorry, but the password and confirm password entries must match. Please double-check and try again.'
      );
    } else if (newpassword.length < 8) {
      setShowMsg(true);
      setMsg(
        'Sorry, but the password should contain at least 8 characters. Please double-check and try again.'
      );
    } else if (
      !confirm ||
      confirm.length === 0 ||
      !newpassword ||
      newpassword.length === 0 ||
      !oldpassword ||
      oldpassword.length === 0
    ) {
      setShowMsg(true);
      setMsg('All fields are required.');
    } else {
      setShowMsg(false);
      setShow(false);
      setShow1(false);
      // Rest of the code...
    }
  };

  return (
    <ScrollView>
      <View style={{ backgroundColor: 'white', minHeight: '100%' }}>
        <MotiView
          from={{ opacity: 0, translateY: -100 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'timing', duration: 1000 }}
        >
          <View
            style={{
              backgroundColor: '#407BFF',
              alignItems: 'center',
              height: 400,
              justifyContent: 'center',
            }}
          >
            <Image
              source={require('../assets/changepassword.png')}
              style={{
                width: 300,
                height: 300,
              }}
            />
          </View>
        </MotiView>
        <KeyboardAvoidingView>
          <View style={{ alignItems: 'center', marginTop: 20 }}>
            <MotiView
              from={{ opacity: 0, translateY: -100 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{ type: 'timing', duration: 1000 }}
            >
              <View style={styles.inputContainer}>
                <TextInput
                  placeholder="Old password"
                  style={styles.input}
                  secureTextEntry={!show1}
                  onChangeText={(e) => setOldpassword(e)}
                  value={oldpassword}
                  keyboardType="default"
                />
                <Icon
                  name={show1 ? 'eye' : 'eye-slash'}
                  color="gray"
                  size={26}
                  onPress={() => setShow1(!show1)}
                />
              </View>
              <View style={styles.inputContainer}>
                <TextInput
                  placeholder="New password"
                  style={styles.input}
                  secureTextEntry={!show}
                  onChangeText={(e) => setNewpassword(e)}
                  value={newpassword}
                  keyboardType="default"
                />
                <Icon
                  name={show ? 'eye' : 'eye-slash'}
                  color="gray"
                  size={26}
                  onPress={() => setShow(!show)}
                />
              </View>
              <TextInput
                placeholder="Confirm Password"
                style={styles.confirmInput}
                secureTextEntry
                onChangeText={(e) => {
                  setConfirm(e);
                }}
                value={confirm}
                inputMode="text"
              />
              {showMsg && (
                <Text style={styles.errorMessage}>
                  <Icon name="info-circle" size={14} color="red" /> {msg}
                </Text>
              )}
              <MotiView
                from={{ opacity: 0, translateX: -100 }}
                animate={{ opacity: 1, translateX: 0 }}
                transition={{ type: 'timing', duration: 1000}}
                delay={1000}
              >
                <TouchableOpacity style={styles.btn} onPress={handleClick}>
                  <Text style={styles.btnText}>Submit</Text>
                </TouchableOpacity>
              </MotiView>
            </MotiView>
          </View>
        </KeyboardAvoidingView>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    backgroundColor: '#e5e5e5',
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    padding: 10,
    borderRadius: 25,
  },
  input: {
    height: 50,
    borderColor: 'transparent',
    borderWidth: 1,
    flex: 1,
    backgroundColor: '#e5e5e5',
    fontSize: 16,
    borderRadius: 25,
  },
  confirmInput: {
    height: 50,
    borderColor: 'transparent',
    borderWidth: 1,
    width: 350,
    borderRadius: 25,
    padding: 10,
    backgroundColor: '#e5e5e5',
    margin: 10,
    fontSize: 16,
  },
  errorMessage: {
    color: 'red',
    margin: 10,
    textAlign: 'left',
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
    elevation: 3,
    marginTop: 40,
  },
  btnText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default AdminChangepassword;
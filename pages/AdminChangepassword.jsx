import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, KeyboardAvoidingView, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import { ChangeAdminPassword } from '../api';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AdminChangepassword = ({ navigation }) => {
  const [oldpassword, setOldpassword] = useState('');
  const [newpassword, setNewpassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showMsg, setShowMsg] = useState(false);
  const [msg, setMsg] = useState('');
  const [adminid, setAdminid] = useState(null);

  const getData = async () => {
    setAdminid(await AsyncStorage.getItem('admin_id'))
  }

  useEffect(() => {
    if (!adminid) {
      getData();
    }
  }, [adminid])

  const handleClick = () => {
    if (confirm != newpassword) {
      setShowMsg(true);
      setMsg("Sorry, but the password and confirm password entries must match. Please double-check and try again.")
    } else if (newpassword.length < 8) {
      setShowMsg(true);
      setMsg("Sorry, but the password should contain 8 characters. Please double-check and try again.")
    } else if (!confirm || confirm.length == 0 || !newpassword || newpassword.length == 0 || !oldpassword || oldpassword.length == 0) {
      setShowMsg(true);
      setMsg("All fields are required.");
    } else {
      setShowMsg(false);
      setIsLoading(true);
      const reqbody = {
        password: oldpassword,
        newpassword: newpassword
      }
      ChangeAdminPassword(reqbody, adminid).then((res) => {
        if (res.status) {
          setOldpassword('');
          setNewpassword('');
          setConfirm('');
          setShowMsg(false);
          setIsLoading(false);
        } else {
          setShowMsg(true);
          setMsg(res.data.message);
        }
        setIsLoading(false);
      })
    }
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
            source={require('../assets/changepassword.png')}
            style={{
              width: 300,
              height: 300
            }}
          />
        </View>
        <KeyboardAvoidingView>
          <View style={{ alignItems: 'center', marginTop: 20 }}>
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
                placeholder='Old password'
                style={{
                  height: 50,
                  borderColor: 'transparent',
                  borderWidth: 1,
                  width: 300,
                  backgroundColor: '#e5e5e5',
                  fontSize: 16,
                  borderRadius: 25,
                }}
                secureTextEntry={show1 ? false : true}
                onChangeText={(e) => setOldpassword(e)}
                value={oldpassword}
                keyboardType="default"
              />
              <Icon name={show1 ? "eye" : "eye-slash"} color="gray" size={26} onPress={() => setShow1(!show1)} />
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
                placeholder='New password'
                style={{
                  height: 50,
                  borderColor: 'transparent',
                  borderWidth: 1,
                  width: 300,
                  backgroundColor: '#e5e5e5',
                  fontSize: 16,
                  borderRadius: 25,
                }}
                secureTextEntry={show ? false : true}
                onChangeText={(e) => setNewpassword(e)}
                value={newpassword}
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
                width: 350,
                borderRadius: 25,
                padding: 10,
                backgroundColor: '#e5e5e5',
                margin: 10,
                fontSize: 16
              }}
              secureTextEntry
              onChangeText={(e) => { setConfirm(e); }}
              value={confirm}
              inputMode="text"
            />
            {showMsg && <Text style={{ color: 'red', margin: 10, textAlign: 'left' }}><Icon name="info-circle" size={14} color='red' />  {msg}</Text>}
            <TouchableOpacity style={styles.btn} onPress={() => handleClick()}>
              <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 18 }}>Submit</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    </ScrollView>
  )
}

export default AdminChangepassword

const styles = StyleSheet.create({
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
    marginTop: 40
  },
})
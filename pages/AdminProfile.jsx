import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AdminProfile = ({ navigation }) => {
  const [id, setId] = useState(null)
  
  const getData = async () => {
    console.log(await AsyncStorage.getAllKeys())
    console.log(await AsyncStorage.getItem('admin_id'))
    setId(await AsyncStorage.getItem('admin_id'));
  }

  useEffect(() => {
    getData();
  }, [id]);

  const removeData = async () => {
    await AsyncStorage.multiRemove(['admin_id', 'user_type']);
  }

  const handleNav = () => {
    removeData().then(() => {
      navigation.navigate('Getstarted');
    })
  }

  return (
    <View>
      <Text>AdminProfile</Text>
      <TouchableOpacity style={{
        backgroundColor: 'white',
        width: '90%',
        margin: 20,
        marginTop: 5,
        padding: 20,
        justifyContent: 'space-between',
        flexDirection: 'row',
        borderRadius: 15,
        alignItems: 'center'
      }} onPress={() => { handleNav() }}>
        <Text style={{ fontSize: 20, alignItems: 'center', textAlign: 'center', color: 'red' }}> Logout</Text>
        <Icon name="chevron-right" size={18} color='gray' />
      </TouchableOpacity>
    </View>
  )
}

export default AdminProfile

const styles = StyleSheet.create({})
import { StyleSheet, Text, View, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { ScrollView } from 'react-native-gesture-handler';
import { RecruiterDetailsById } from '../api';
import { Capitalize } from "../components/commonFunctions";
import AsyncStorage from '@react-native-async-storage/async-storage';

const RecruiterProfile = ({ navigation }) => {
  //const id = AsyncStorage.getItem('recruiter_id');
  const [details, setDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [id, setId] = useState(null);

  const getData = async () => {
    console.log(await AsyncStorage.getAllKeys())
    setId(await AsyncStorage.getItem('recruiter_id'));
  }

  useEffect(() => {
    if (!id) {
      getData()
    }
    if (id) {
      RecruiterDetailsById(id).then((res) => {
        console.log(res);
        if (res.status) {
          setDetails(res.data[0]);
          setIsLoading(false);
        }
      })
    }
  }, [id])

  const removeItem = async () => {
    await AsyncStorage.multiRemove(['recruiter_id', 'user_type'])
  }

  const handleNav = () => {
    removeItem().then(() => {
      navigation.navigate('Getstarted');
    })
  }

  return (
    <ScrollView>
      {isLoading ? <View style={{
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <ActivityIndicator size="large" color="#407BFF" />
      </View> :
        <>
          <View style={{
            backgroundColor: 'white',
            margin: 20,
            width: '90%',
            padding: 8,
            borderRadius: 25,
            flexDirection: 'row',
            alignItems: 'center'
          }}>
            <Image source={require('../assets/female.png')}
              style={{
                width: 150,
                height: 150,
                borderRadius: 100,
              }} />
            <View>
              <Text style={{
                fontSize: 20,
                fontWeight: 'bold',
                margin: 0
              }}>{Capitalize(details.firstname)} {Capitalize(details.lastname)}</Text>
              <Text style={{
                fontWeight: 'bold',
                color: 'gray',
                margin: 0
              }}>{details.email}</Text>
              <Text style={{
                fontWeight: 'bold',
                color: 'gray',
                margin: 0
              }}>{details.company_name}</Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('EditRecruiterProfile', { id: id })}
                style={{
                  backgroundColor: '#407BFF',
                  width: 100,
                  alignItems: 'center',
                  margin: 5,
                  padding: 7,
                  borderRadius: 8,
                  shadowOffset: { width: 5, height: 5 },
                  shadowColor: 'black',
                  shadowOpacity: 0.8,
                  shadowRadius: 5,
                  elevation: 3
                }}>
                <Text style={{ color: 'white', fontSize: 16 }}>Edit Profile</Text>
              </TouchableOpacity>
            </View>
          </View>
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
          }} onPress={() => navigation.navigate('ChangePassword', { id: id, type: 'recruiter' })}>
            <Text style={{ fontSize: 20, alignItems: 'center', textAlign: 'center' }}> <Icon name="key-variant" size={24} color='#407BFF' />  Change Password</Text>
            <Icon name="chevron-right" size={18} color='gray' />
          </TouchableOpacity>
          <TouchableOpacity style={{
            backgroundColor: 'white',
            width: '90%',
            margin: 20,
            padding: 20,
            marginTop: 5,
            justifyContent: 'space-between',
            flexDirection: 'row',
            borderRadius: 15,
            alignItems: 'center'
          }} onPress={() => navigation.navigate('Contact', { id: id, type: 'recruiter' })}>
            <Text style={{ fontSize: 20, alignItems: 'center', textAlign: 'center' }}> <Icon name="chat-outline" size={24} color='#407BFF' />  Contact Us</Text>
            <Icon name="chevron-right" size={18} color='gray' />
          </TouchableOpacity>
          <TouchableOpacity style={{
            backgroundColor: 'white',
            width: '90%',
            margin: 20,
            padding: 20,
            marginTop: 5,
            justifyContent: 'space-between',
            flexDirection: 'row',
            borderRadius: 15,
            alignItems: 'center'
          }} onPress={() => navigation.navigate('About')}>
            <Text style={{ fontSize: 20, alignItems: 'center', textAlign: 'center' }}> <Icon name="information-outline" size={24} color='#407BFF' />  About Us</Text>
            <Icon name="chevron-right" size={18} color='gray' />
          </TouchableOpacity>
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
          }} onPress={() => { handleNav() } }>
            <Text style={{ fontSize: 20, alignItems: 'center', textAlign: 'center', color: 'red' }}> Logout</Text>
            <Icon name="chevron-right" size={18} color='gray' />
          </TouchableOpacity>
        </>
      }
    </ScrollView>
  )
}

export default RecruiterProfile

const styles = StyleSheet.create({})
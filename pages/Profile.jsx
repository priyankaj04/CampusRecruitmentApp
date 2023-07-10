import { StyleSheet, Text, View, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { ScrollView } from 'react-native-gesture-handler';
import { TalentDetailsById } from '../api';
import { Capitalize } from "../components/commonFunctions";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icona from 'react-native-vector-icons/AntDesign';
import { MotiView } from 'moti';

const Profile = ({ navigation }) => {
  const [id, setId] = useState(null)

  const getData = async () => {
    console.log(await AsyncStorage.getAllKeys())
    console.log(await AsyncStorage.getItem('talent_id'))
    setId(await AsyncStorage.getItem('talent_id'));
  }


  const [details, setDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getData();
    if (id) {
      TalentDetailsById(id).then((res) => {
        console.log(res);
        if (res.status) {
          setDetails(res.data[0]);
          setIsLoading(false);
        }
      })
    }
  }, [id])

  const removeData = async () => {
    await AsyncStorage.multiRemove(['register_no', 'talent_id', 'user_type']);
  }

  const handleNav = () => {
    removeData().then(() => {
      navigation.reset({
        index: 0,
        routes: [{ name: 'Getstarted' }],
      });
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
          <MotiView
            from={{ translateX: -100 }}
            animate={{ translateX: 0 }}
            duration={500}
          >
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
                {details.branch &&
                  <Text style={{
                    fontWeight: 'bold',
                    color: 'gray',
                    margin: 0
                  }}>{details.branch} - {details.semester} Semester</Text>
                }
                <TouchableOpacity
                  onPress={() => navigation.navigate('EditProfile')}
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
          </MotiView>
          <MotiView
            from={{ opacity: 0, translateX: -100 }}
            animate={{ opacity: 1, translateX: 0 }}
            duration={500}
            delay={1000}
          >
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
            }} onPress={() => navigation.navigate('ChangePassword', { id: id, type: 'talent' })}>
              <Text style={{ fontSize: 20, alignItems: 'center', textAlign: 'center' }}> <Icon name="key-variant" size={24} color='#407BFF' />  Change Password</Text>
              <Icon name="chevron-right" size={18} color='gray' />
            </TouchableOpacity>
          </MotiView>
          <MotiView
            from={{ opacity: 0, translateX: -100 }}
            animate={{ opacity: 1, translateX: 0 }}
            duration={500}
            delay={1500}
          >
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
            }} onPress={() => navigation.navigate('Report', { id: id, type: 'recruiter' })}>
              <Text style={{ fontSize: 20, alignItems: 'center', textAlign: 'center' }}> <Icona name="piechart" size={24} color='#407BFF' />  Report</Text>
              <Icon name="chevron-right" size={18} color='gray' />
            </TouchableOpacity>
          </MotiView>
          <MotiView
            from={{ opacity: 0, translateX: -100 }}
            animate={{ opacity: 1, translateX: 0 }}
            duration={500}
            delay={2000}
          >
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
            }} onPress={() => navigation.navigate('Contact', { id: id, type: 'talent' })}>
              <Text style={{ fontSize: 20, alignItems: 'center', textAlign: 'center' }}> <Icon name="chat-outline" size={24} color='#407BFF' />  Contact Us</Text>
              <Icon name="chevron-right" size={18} color='gray' />
            </TouchableOpacity>
          </MotiView>
          <MotiView
            from={{ opacity: 0, translateX: -100 }}
            animate={{ opacity: 1, translateX: 0 }}
            duration={500}
            delay={2500}
          >
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
          </MotiView>
          <MotiView
            from={{opacity:0, translateX: -100 }}
            animate={{opacity: 1, translateX: 0 }}
            duration={500}
            delay={3000}
          >
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
          </MotiView>
        </>
      }
    </ScrollView>
  )
}

export default Profile

const styles = StyleSheet.create({})
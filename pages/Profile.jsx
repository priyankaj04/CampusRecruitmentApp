import { StyleSheet, Text, View, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { ScrollView } from 'react-native-gesture-handler';
import { TalentDetailsByReg } from '../api';
import { Capitalize } from "../components/commonFunctions";

const Profile = ({ navigation }) => {
  const id = 'e35147fb-b336-4858-9dc1-2438a5524a7c';
  const [details, setDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    TalentDetailsByReg(id).then((res) => {
      console.log(res);
      if (res.status) {
        setDetails(res.data[0]);
        setIsLoading(false);
      }
    })
  }, [])


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
          }} onPress={() => navigation.navigate('ChangePassword')}>
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
          }} onPress={() => navigation.navigate('Contact')}>
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
          }} onPress={() => navigation.navigate('Login')}>
            <Text style={{ fontSize: 20, alignItems: 'center', textAlign: 'center', color: 'red' }}> Logout</Text>
            <Icon name="chevron-right" size={18} color='gray' />
          </TouchableOpacity>
        </>
      }
    </ScrollView>
  )
}

export default Profile

const styles = StyleSheet.create({})
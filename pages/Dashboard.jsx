import { StyleSheet, Text, View, Button, ScrollView, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActionJobCard } from '../components/commonFunctions';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import { GetApplicationsForAdmin } from '../api';

const Dashboard = ({ navigation }) => {

  const [id, setId] = useState(null);
  const [details, setDetails] = useState([]);
  const [fetch, setFetch] = useState(false);

  const getData = async () => {
    console.log(await AsyncStorage.getItem('admin_id'));
    setId(await AsyncStorage.getItem('admin_id'));
  }

  useEffect(() => {
    if (!id) {
      getData();
    }
    if (id) {
      GetApplicationsForAdmin().then((res) => {
        if (res.status) {
          setDetails(res.data);
        } else {
          setDetails([]);
        }
      })
    }
  }, [id, fetch])

  return (
    <ScrollView style={{ backgroundColor: 'white', padding: 10 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={{ fontSize: 16, fontWeight: 'bold', marginLeft: 10 }}>Approve Applications</Text>
        <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => navigation.navigate('ViewActionJobs')}>
          <Text style={{ fontSize: 14, color: '#407BFF', fontWeight: 'bold', marginRight: 5 }} >View all</Text>
          <Icon name="angle-double-right" color="#407BFF" size={18} />
        </TouchableOpacity>
      </View>
      {id && details && details.length > 0 ?
        <ScrollView horizontal style={{ width: '100%', backgroundColor: 'white', margin: 0, padding: 5 }}>
          {details.map((item, index) => <ActionJobCard key={index} item={item} fetch={fetch} setFetch={setFetch} />)}
        </ScrollView>
        :
        <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Image
            source={require('../assets/Nodata.png')}
            style={{ width: 200, height: 200 }}
          />
          <Text>No new jobs uploaded by recruiters.</Text>
        </View>
      }
    </ScrollView>
  )
}

export default Dashboard

const styles = StyleSheet.create({})
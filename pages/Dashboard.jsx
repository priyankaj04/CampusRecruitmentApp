import { StyleSheet, Text, View, Button, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { JobCards } from '../components/commonFunctions';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';

const Dashboard = ({ navigation }) => {

  const [id, setId] = useState(null);

  const getData = async () => {
    console.log(await AsyncStorage.getItem('admin_id'));
    setId(await AsyncStorage.getItem('admin_id'));
  }

  useEffect(() => {
    if (!id) {
      getData();
    }
  }, [id])

  return (
    <View>
      <View style={{ backgroundColor: 'white', padding: 10 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{ fontSize: 16, fontWeight: 'bold', marginLeft: 10 }}>Approve Applications</Text>
          <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => navigation.navigate('ViewActionJobs')}>
            <Text style={{ fontSize: 14, color: '#407BFF', fontWeight: 'bold', marginRight: 5 }} >View all</Text>
            <Icon name="angle-double-right" color="#407BFF" size={18} />
          </TouchableOpacity>
        </View>
        {id && <JobCards type={"admin"} id={id} />}
      </View>
    </View>
  )
}

export default Dashboard

const styles = StyleSheet.create({})
import { StyleSheet, Text, View, Button, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { JobCards } from '../components/commonFunctions';

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
      <Text>Dashboard</Text>
      {id && <JobCards type={"admin"} id={id} /> }
    </View>
  )
}

export default Dashboard

const styles = StyleSheet.create({})
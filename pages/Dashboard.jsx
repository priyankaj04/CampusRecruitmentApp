import { StyleSheet, Text, View, Button } from 'react-native'
import React, {useEffect, useState} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';

const Dashboard = ({ navigation }) => {

  const [id, setId] = useState(null);

  const getData = async () => {
    setId(await AsyncStorage.getItem('admin_id'));
  }

  useEffect(() => {
    if (!id) {
      getData();
    }
  }, [])

  return (
    <View>
      <Text>Dashboard</Text>
    </View>
  )
}

export default Dashboard

const styles = StyleSheet.create({})
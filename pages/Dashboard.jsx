import { StyleSheet, Text, View, Button } from 'react-native'
import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';

const Dashboard = ({ navigation }) => {

  const id = AsyncStorage.getItem('admin_id')
  return (
    <View>
      <Text>Dashboard</Text>
    </View>
  )
}

export default Dashboard

const styles = StyleSheet.create({})
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

const SmsOTP = ({route, navigation}) => {
  const id = AsyncStorage.getItem('recruiter_id');
  return (
    <View>
      <Text>SmsOTP</Text>
    </View>
  )
}

export default SmsOTP

const styles = StyleSheet.create({})
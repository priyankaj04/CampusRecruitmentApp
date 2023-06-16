import { StyleSheet, Text, View, Button } from 'react-native'
import React from 'react'

const AdminProfile = ({navigation}) => {
  return (
    <View>
      <Text>AdminProfile</Text>
      <Button title="Open Drawer" onPress={() => navigation.openDrawer()} />
    </View>
  )
}

export default AdminProfile

const styles = StyleSheet.create({})
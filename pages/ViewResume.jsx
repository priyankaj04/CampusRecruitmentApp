import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react';
import { ResumeDetailsByTalentID } from '../api';

const ViewResume = ({ route, navigation }) => {
  //const { talent_id, resume_id } = route.params;
  const talent_id = 'e35147fb-b336-4858-9dc1-2438a5524a7c'
  const [details, setDetails] = useState([]);
  
  useEffect(() => {
    ResumeDetailsByTalentID(talent_id).then((res) => {
      if (res.status) {
        setDetails(res.data[0]);
        console.log(res.data[0]);
      }
    })
  }, [])

  return (
    <ScrollView>
      <View style={{width: '96%', margin: 10, backgroundColor: 'white', borderRadius: 10}}>
        <Text>ViewResume</Text>
      </View>
    </ScrollView>
  )
}

export default ViewResume

const styles = StyleSheet.create({})
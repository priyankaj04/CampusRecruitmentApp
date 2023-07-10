import { StyleSheet, Text, View, ScrollView, Image } from 'react-native'
import React, { useState, useEffect } from 'react';
import { Picker } from '@react-native-picker/picker';
import { ApplicationsDetailsByStatus } from '../api';
import { JobViewCard } from '../components/commonFunctions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MotiView } from 'moti';

const RecruiterHome = ({ navigation }) => {
  const [id, setId] = useState(null)
  const [status, setStatus] = useState('all');
  const [applications, setApplications] = useState([]);
  const [open, setOpen] = useState(false);

  const Applications = [
    { value: 'all', label: 'All' },
    { value: 'pending', label: 'Pending' },
    { value: 'approved', label: 'Approved' },
    { value: 'rejected', label: 'Rejected' }
  ]

  const getData = async () => {
    setId(await AsyncStorage.getItem('recruiter_id'))
  }

  useEffect(() => {
    if (!id) {
      getData()
    }
    if (id) {
      ApplicationsDetailsByStatus(status, id).then((res) => {
        if (res.status) {
          setApplications(res.data)
        } else {
          setApplications([])
        }
      })
    }
  }, [id])

  const onClassChange = (value) => {
    if (id) {
      ApplicationsDetailsByStatus(value, id).then((res) => {
        if (res.status) {
          setApplications(res.data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)))
        } else {
          setApplications([])
        }
      })
    }
  }

  return (
    <MotiView
      from={{ opacity: 0, translateY: 100 }}
      animate={{ opacity: 1, translateY: 0 }}
      duration={1000}
      delay={500}
    >
      <View style={{ width: '100%', backgroundColor: 'white', margin: 0, height: '100%' }}>
        <View style={{ backgroundColor: 'whitesmoke', borderRadius: 25, width: 360, marginLeft: 25, marginTop: 10 }}>
          <Picker
            selectedValue={status}
            onValueChange={(itemValue) => {
              setStatus(itemValue);
              onClassChange(itemValue);
            }
            }>
            {Applications.map((item, index) => <Picker.Item key={index} label={item.label} value={item.value} />)}
          </Picker>
        </View>
        <ScrollView>
          <View style={{ marginTop: 0 }}>
            {
              applications && applications.length > 0 ?
                <View>
                  {
                    applications.map((item, index) => (
                        <JobViewCard key={index}  item={item} type='recruiter' navigation={navigation} />
                    ))
                  }
                </View> :
                <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <Image
                    source={require('../assets/Nodata.png')}
                    style={{ width: 200, height: 200 }}
                  />
                  <Text>No applications.</Text>
                </View>

            }
          </View>
        </ScrollView>
      </View>
    </MotiView>
  )
}

export default RecruiterHome

const styles = StyleSheet.create({})
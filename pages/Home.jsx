import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import { GetAllApprovedApplications } from '../api';
import { JobViewCard } from '../components/commonFunctions';


const Home = ({ navigation }) => {
  const [alljobs, setAlljobs] = useState([]);

  useEffect(() => {
    GetAllApprovedApplications().then((res) => {
      if (res.status) {
        setAlljobs(res.data);
      }
    })
  }, []);

  return (
    <View style={{ backgroundColor: 'white' }}>
      <View style={{ alignItems: 'center', height: 200, justifyContent: 'center' }}>
        <View style={{
          backgroundColor: '#407BFF',
          width: '90%',
          height: 150,
          borderRadius: 28,
          shadowOffset: { width: 5, height: 5 },
          shadowColor: 'black',
          shadowOpacity: 0.8,
          shadowRadius: 5,
          elevation: 8
        }}>

          <Text style={{
            color: 'white',
            fontSize: 20,
            textAlign: 'left',
            margin: 20
          }}>
            Good Evening, Priyanka!
          </Text>
          <Text>Dream big, work hard, and seize your dream job. The future is waiting for you!</Text>
          <Image
            source={require('../assets/break.png')}
            style={{ width: 100, height: 100 }}
          />
        </View>
      </View>
      <Text>All Jobs</Text>
      <ScrollView>
        <View style={{ marginTop: 0 }}>
          {
            alljobs && alljobs.length > 0 ?
              <View>
                {
                  alljobs.map((item, index) => (
                    <JobViewCard key={index} item={item} type={'talent'} navigation={navigation} />
                  ))
                }
              </View> :
              <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Image
                  source={require('../assets/Nodata.png')}
                  style={{ width: 200, height: 200 }}
                />
                <Text>No students created from this class yet.</Text>
              </View>

          }
        </View>
      </ScrollView>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({})
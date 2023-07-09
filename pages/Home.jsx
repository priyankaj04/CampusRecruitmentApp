import { StyleSheet, Text, View, Image, ScrollView, RefreshControl } from 'react-native';
import React, { useState, useEffect } from 'react';
import { GetAllApprovedApplications, TalentDetailsById } from '../api';
import { TalentJobViewCard } from '../components/commonFunctions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MotiView } from 'moti';

const Home = ({ navigation }) => {
  const [alljobs, setAlljobs] = useState([]);
  const [id, setId] = useState(null);
  const [name, setName] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [fetch, setFetch] = useState(false);

  const getData = async () => {
    setId(await AsyncStorage.getItem('talent_id'));
  }

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      GetAllApprovedApplications().then((res) => {
        if (res.status) {
          setAlljobs(res.data);
        }
      })
      if (id) {
        TalentDetailsById(id).then((res) => {
          if (res.status) {
            setName(res.data[0].firstname)
          }
        })
      }
      setRefreshing(false);
    }, 2000);
  }, []);

  useEffect(() => {
    if (!id) {
      getData();
    }
    GetAllApprovedApplications().then((res) => {
      if (res.status) {
        setAlljobs(res.data);
      }
    })
    if (id) {
      TalentDetailsById(id).then((res) => {
        if (res.status) {
          setName(res.data[0].firstname)
        }
      })
    }
  }, [id, fetch]);

  function getGreeting() {
    const currentHour = new Date().getHours();

    if (currentHour >= 5 && currentHour < 12) {
      return "Good morning";
    } else if (currentHour >= 12 && currentHour < 17) {
      return "Good afternoon";
    } else if (currentHour >= 17 && currentHour < 21) {
      return "Good evening";
    } else {
      return "Good night";
    }
  }

  useEffect(() => {
    GetAllApprovedApplications().then((res) => {
      if (res.status) {
        setAlljobs(res.data);
      }
    })
    if (id) {
      TalentDetailsById(id).then((res) => {
        if (res.status) {
          setName(res.data[0].firstname)
        }
      })
    }
  }, [])


  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      style={{ backgroundColor: 'white' }}>
      <MotiView
        from={{ opacity: 0, translateY: 100 }}
        animate={{ opacity: 1, translateY: 0 }}
        duration={1000}
      >
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
            elevation: 8,
            flexDirection: 'row'
          }}>
            <View >
              <MotiView
                from={{ opacity: 0, translateY: 100 }}
                animate={{ opacity: 1, translateY: 0 }}
                duration={1000}
                delaly={1000}
              >
                <Text style={{
                  color: 'white',
                  fontSize: 20,
                  textAlign: 'left',
                  margin: 20,
                  marginBottom: 10,
                  fontWeight: 'bold',
                  width: 230
                }}>
                  {getGreeting()}, {name && name}!
                </Text>
              </MotiView>
              <Text style={{ width: 230, marginLeft: 20, color: 'white', fontStyle: 'italic' }}>Dream big, work hard, and seize your dream job.
                The future is waiting for you!</Text>
            </View>
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <Image
                source={require('../assets/build.png')}
                style={{ width: 100, height: 100 }}
              />
            </View>
          </View>
        </View>
      </MotiView>
      <Text style={{ fontWeight: 'bold', marginLeft: 15 }}>All Jobs</Text>
      <View>
        <View style={{ marginTop: 0 }}>
          {
            alljobs && alljobs.length > 0 ?

              <View>
                {
                  alljobs.map((item, index) => (
                    <MotiView
                      from={{ opacity: 0, translateX: 100 }}
                      animate={{ opacity: 1, translateX: 0 }}
                      duration={1000}
                      key={index}
                    >
                      <TalentJobViewCard item={item} navigation={navigation} fetch={fetch} setFetch={setFetch} />
                    </MotiView>
                  ))
                }
              </View>
              :
              <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Image
                  source={require('../assets/Nodata.png')}
                  style={{ width: 200, height: 200 }}
                />
                <Text>No students created from this class yet.</Text>
              </View>

          }
        </View>
      </View>
    </ScrollView>
  )
}

export default Home

const styles = StyleSheet.create({})
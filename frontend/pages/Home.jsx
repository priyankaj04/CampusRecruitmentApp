import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, RefreshControl } from 'react-native';
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
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      GetAllApprovedApplications().then((res) => {
        if (res.status) {
          setAlljobs(res.data);
        }
      });
      if (id) {
        TalentDetailsById(id).then((res) => {
          if (res.status) {
            setName(res.data[0].firstname);
          }
        });
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
    });
    if (id) {
      TalentDetailsById(id).then((res) => {
        if (res.status) {
          setName(res.data[0].firstname);
        }
      });
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
    });
    if (id) {
      TalentDetailsById(id).then((res) => {
        if (res.status) {
          setName(res.data[0].firstname);
        }
      });
    }
  }, []);

  return (
    <ScrollView
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      style={styles.container}
    >
      <MotiView from={{ opacity: 0, translateY: 100 }} animate={{ opacity: 1, translateY: 0 }} duration={1000}>
        <View style={styles.welcomeContainer}>
          <View style={styles.welcomeContent}>
            <Text style={styles.greetingText}>
              {getGreeting()}, {name ? name : ''}!
            </Text>
            <Text style={styles.subText}>Dream big, work hard, and seize your dream job. The future is waiting for you!</Text>
          </View>
          <Image source={require('../assets/build.png')} style={styles.buildImage} />
        </View>
      </MotiView>
      <Text style={styles.sectionTitle}>All Jobs</Text>
      <View style={styles.jobListContainer}>
        {alljobs && alljobs.length > 0 ? (
          alljobs.map((item, index) => (
            <MotiView from={{ opacity: 0, translateX: 100 }} animate={{ opacity: 1, translateX: 0 }} duration={1000} key={index}>
              <TalentJobViewCard item={item} navigation={navigation} fetch={fetch} setFetch={setFetch} />
            </MotiView>
          ))
        ) : (
          <View style={styles.noDataContainer}>
            <Image source={require('../assets/Nodata.png')} style={styles.noDataImage} />
            <Text>No jobs available.</Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  welcomeContainer: {
    alignItems: 'center',
    height: 200,
    justifyContent: 'center',
    backgroundColor: '#407BFF',
    width: '90%',
    height: 150,
    borderRadius: 28,
    shadowOffset: { width: 5, height: 5 },
    shadowColor: 'black',
    shadowOpacity: 0.8,
    shadowRadius: 5,
    elevation: 8,
    flexDirection: 'row',
    marginBottom: 20,
    marginLeft: 20
  },
  welcomeContent: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 10,
  },
  greetingText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    width: 230,
  },
  subText: {
    width: 230,
    marginLeft: 20,
    color: 'white',
    fontStyle: 'italic',
  },
  buildImage: {
    width: 100,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionTitle: {
    fontWeight: 'bold',
    marginLeft: 15,
  },
  jobListContainer: {
    marginTop: 10,
  },
  noDataContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  noDataImage: {
    width: 200,
    height: 200,
  },
});

export default Home;
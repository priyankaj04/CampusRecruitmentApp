import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, Pressable, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import { GetApplicationsForAdmin } from '../api';
import { ActionJob } from '../components/commonFunctions';
import { MotiView, MotiImage } from 'moti';

const Dashboard = ({ navigation }) => {
  const [id, setId] = useState(null);
  const [details, setDetails] = useState([]);
  const [fetch, setFetch] = useState(false);
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    setId(await AsyncStorage.getItem('admin_id'));
  };

  useEffect(() => {
    if (!id) {
      getData();
    }

    if (id) {
      setLoading(true);
      GetApplicationsForAdmin()
        .then((res) => {
          if (res.status) {
            setDetails(res.data);
          } else {
            setDetails([]);
          }
        })
        .finally(() => setLoading(false));
    }
  }, [id, fetch]);

  return (
    <ScrollView style={{ backgroundColor: 'white', padding: 10 }}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Approve Applications</Text>
        {details.length > 0 && (
          <Pressable style={styles.viewAllButton} onPress={() => navigation.navigate('ViewActionJobs')}>
            <Text style={styles.viewAllText}>View all</Text>
            <Icon name="angle-double-right" color="#407BFF" size={18} />
          </Pressable>
        )}
      </View>
      {loading ? (
        <ActivityIndicator style={styles.loadingIndicator} size="large" color="#407BFF" />
      ) : details.length > 0 ? (
          <MotiView style={styles.scrollView} animate={{ opacity: 1, translateX: 0 }} transition={{ type: 'timing' }}>
          <ScrollView contentContainerStyle={styles.scrollContentContainer}>
            {details.map((item, index) => (
              <ActionJob key={index} item={item} fetch={fetch} setFetch={setFetch} />
            ))}
          </ScrollView>
        </MotiView>
      ) : (
        <View style={styles.noJobsContainer}>
              <MotiImage style={styles.noJobsImage} source={require('../assets/Nodata.png')} from={{ opacity: 0, translateY: -100 }} animate={{ opacity: 1, translateY: 0 }} transition={{ type: 'timing' }} />
          <Text>No new jobs uploaded by recruiters.</Text>
        </View>
      )}
    </ScrollView>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  viewAllButton: {
    flexDirection: 'row',
  },
  viewAllText: {
    fontSize: 14,
    color: '#407BFF',
    fontWeight: 'bold',
    marginRight: 5,
  },
  loadingIndicator: {
    marginTop: 20,
  },
  scrollView: {
    width: '100%',
    backgroundColor: 'white',
    margin: 0,
    padding: 5,
  },
  scrollContentContainer: {
    flexGrow: 1,
  },
  noJobsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noJobsImage: {
    width: 200,
    height: 200,
  },
});

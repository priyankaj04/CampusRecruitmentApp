import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { ApplicationsDetailsByStatus } from '../api';
import { JobViewCard } from '../components/commonFunctions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MotiView } from 'moti';

const RecruiterHome = ({ navigation }) => {
  const [id, setId] = useState(null);
  const [status, setStatus] = useState('all');
  const [applications, setApplications] = useState([]);

  const Applications = [
    { value: 'all', label: 'All' },
    { value: 'pending', label: 'Pending' },
    { value: 'approved', label: 'Approved' },
    { value: 'rejected', label: 'Rejected' }
  ];

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setId(await AsyncStorage.getItem('recruiter_id'));
  };

  useEffect(() => {
    if (id) {
      fetchApplicationsByStatus(status);
    }
  }, [id, status]);

  const fetchApplicationsByStatus = (status) => {
    ApplicationsDetailsByStatus(status, id).then((res) => {
      if (res.status) {
        setApplications(res.data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)));
      } else {
        setApplications([]);
      }
    });
  };

  const onClassChange = (value) => {
    setStatus(value);
    fetchApplicationsByStatus(value);
  };

  return (
    <MotiView
      from={{ opacity: 0, translateY: 100 }}
      animate={{ opacity: 1, translateY: 0 }}
      duration={1000}
      delay={500}
    >
      <View style={styles.container}>
        <MotiView
          from={{ opacity: 0, translateY: -100 }}
          animate={{ opacity: 1, translateY: 0 }}
          duration={1000}
          delay={500}
        >
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={status}
              onValueChange={onClassChange}
            >
              {Applications.map((item, index) => <Picker.Item key={index} label={item.label} value={item.value} />)}
            </Picker>
          </View>
        </MotiView>
        <ScrollView>
          <View style={styles.applicationContainer}>
            {
              applications && applications.length > 0 ? (
                applications.map((item, index) => (
                  <MotiView
                    from={{ opacity: 0, translateY: 100 }}
                    animate={{ opacity: 1, translateY: 0 }}
                    duration={500}
                    delay={index + 1 + 1000}
                    key={index}
                  >
                    <JobViewCard item={item} type='recruiter' navigation={navigation} />
                  </MotiView>
                ))
              ) : (
                <MotiView
                  from={{ opacity: 0, translateY: 100 }}
                  animate={{ opacity: 1, translateY: 0 }}
                  duration={1000}
                  delay={1000}
                >
                  <View style={styles.noApplicationsContainer}>
                    <Image
                      source={require('../assets/Nodata.png')}
                      style={styles.noApplicationsImage}
                    />
                    <Text style={styles.noApplicationsText}>No applications.</Text>
                  </View>
                </MotiView>
              )
            }
          </View>
        </ScrollView>
      </View>
    </MotiView>
  );
};

export default RecruiterHome;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: 'white',
    margin: 0,
    height: '100%',
  },
  pickerContainer: {
    backgroundColor: 'whitesmoke',
    borderRadius: 25,
    width: 360,
    marginLeft: 25,
    marginTop: 10,
  },
  applicationContainer: {
    marginTop: 0,
  },
  noApplicationsContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  noApplicationsImage: {
    width: 200,
    height: 200,
  },
  noApplicationsText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
});
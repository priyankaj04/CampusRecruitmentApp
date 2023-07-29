import React, { useState, useEffect } from 'react';
import { View, ScrollView, Image, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ApplicationsAppliedbytalentid } from '../api';
import { TalentJobViewCard } from '../components/commonFunctions';
import { MotiView, AnimatePresence } from 'moti';

const JobProfile = ({ navigation }) => {
  const [talentId, setTalentId] = useState(null);
  const [applications, setApplications] = useState([]);

  const getData = async () => {
    const storedTalentId = await AsyncStorage.getItem('talent_id');
    setTalentId(storedTalentId);
  };

  useEffect(() => {
    if (!talentId) {
      getData();
    }
    if (talentId) {
      ApplicationsAppliedbytalentid(talentId).then((res) => {
        console.log(res);
        if (res.status) {
          setApplications(res.data);
        } else {
          setApplications([]);
        }
      });
    }
  }, [talentId]);

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <MotiView style={{ flex: 1 }}>
        <AnimatePresence>
          <View style={{ marginTop: 0 }}>
            {applications.length > 0 ? (
              applications.map((item, index) => (
                <TalentJobViewCard key={index} item={item} navigation={navigation} />
              ))
            ) : (
                <View style={{
                marginTop: 250,
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                <Image source={require('../assets/Nodata.png')} style={{
                  width: 200,
                  height: 200
                }} />
                <Text style={{
                  fontSize: 16,
                  color:'black'
                }}>You have not applied for any jobs yet.</Text>
              </View>
            )}
          </View>
        </AnimatePresence>
      </MotiView>
    </View>
  );
};

export default JobProfile;
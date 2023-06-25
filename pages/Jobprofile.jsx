import { StyleSheet, Text, View, ScrollView, Image } from 'react-native'
import React, { useState, useEffect } from 'react';
import { ApplicationsAppliedbytalentid } from '../api'
import { TalentJobViewCard } from '../components/commonFunctions';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Jobprofile = ({ navigation }) => {

  const [talentid, setTalentid] = useState(null);
  const [applications, setApplication] = useState([]);

  const getData = async () => {
    setTalentid(await AsyncStorage.getItem('talent_id'));
  }

  useEffect(() => {
    if (!talentid) {
      getData();
    }
    if (talentid) {
      ApplicationsAppliedbytalentid(talentid).then((res) => {
        console.log(res);
        if (res.status) {
          setApplication(res.data);
        } else {
          setApplication([]);
        }
      })
    }
  }, [talentid])

  return (
    <View style={{ width: '100%', height: '100%', backgroundColor: 'white' }}>
      <ScrollView>
        <View style={{ marginTop: 0 }}>
          {
            applications && applications.length > 0 ?
              <View>
                {
                  applications.map((item, index) => (
                    <TalentJobViewCard key={index} item={item} navigation={navigation} />
                  ))
                }
              </View> :
              <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Image
                  source={require('../assets/Nodata.png')}
                  style={{ width: 200, height: 200 }}
                />
                <Text>You have not applied for any jobs yet.</Text>
              </View>

          }
        </View>
      </ScrollView>
    </View>
  )
}

export default Jobprofile

const styles = StyleSheet.create({})
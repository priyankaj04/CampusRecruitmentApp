import { StyleSheet, Text, View, ScrollView, Image } from 'react-native'
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TalentDetailsById, GetAllSavedApplications } from '../api';
import { TalentJobViewCard } from '../components/commonFunctions';

const Saved = ({navigation}) => {
  const [id, setId] = useState(null);
  const [saved, setSaved] = useState([]);
  const [load, setLoad] = useState(false);

  const getData = async () => {
    setId(await AsyncStorage.getItem('talent_id'));
  }

  useEffect(() => {
    if (!id) {
      getData();
    }
    if (id) {
      TalentDetailsById(id).then((res) => {
        if (res.status) {
          if (res.data[0].saved && res.data[0].saved.length > 0) {
            let reqbody = { aid : res.data[0].saved }
            GetAllSavedApplications(reqbody).then((resp) => {
              if (resp.status) {
                setSaved(resp.data);
              } else {
                setSaved([]);
              }
            })
          }
        }
      })
    }
  }, [id, load])

  return (
    <ScrollView style={{backgroundColor:'white'}}>
      <View style={{ marginTop: 0 }}>
        {
          saved && saved.length > 0 ?
            <View>
              {
                saved.map((item, index) => (
                    <TalentJobViewCard key={index} item={item} navigation={navigation} load={load} setLoad={setLoad} savedCard={true} />
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
  )
}

export default Saved

const styles = StyleSheet.create({})
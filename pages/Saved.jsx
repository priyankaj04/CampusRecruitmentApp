import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TalentDetailsById, GetAllSavedApplications } from '../api';
import { TalentJobViewCard } from '../components/commonFunctions';

const Saved = ({ navigation }) => {
  const [id, setId] = useState(null);
  const [saved, setSaved] = useState([]);
  const [load, setLoad] = useState(false);

  const getData = async () => {
    setId(await AsyncStorage.getItem('talent_id'));
  };

  useEffect(() => {
    if (!id) {
      getData();
    } else {
      TalentDetailsById(id).then((res) => {
        if (res.status && res.data[0].saved && res.data[0].saved.length > 0) {
          const reqbody = { aid: res.data[0].saved };
          GetAllSavedApplications(reqbody).then((resp) => {
            if (resp.status) {
              setSaved(resp.data);
            } else {
              setSaved([]);
            }
          });
        }
      });
    }
  }, [id, load]);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        {saved && saved.length > 0 ? (
          saved.map((item, index) => (
            <TalentJobViewCard key={index} item={item} navigation={navigation} load={load} setLoad={setLoad} savedCard={true} />
          ))
        ) : (
          <View style={styles.emptyContainer}>
            <Image source={require('../assets/Nodata.png')} style={styles.emptyImage} />
            <Text style={styles.emptyText}>No students created from this class yet.</Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default Saved;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  content: {
    marginTop: 0,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyImage: {
    width: 200,
    height: 200,
  },
  emptyText: {
    marginTop: 20,
    fontSize: 16,
  },
});
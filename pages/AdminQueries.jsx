import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, Image } from 'react-native';
import { GetAllQueries } from '../api';
import { MotiView } from 'moti';
import { ViewQueries } from '../components/commonFunctions';

const AdminQueries = ({ navigation }) => {
  const [allqueries, setAllQueries] = useState([]);
  const [fetch, setFetch] = useState(false);

  useEffect(() => {
    GetAllQueries().then((res) => {
      if (res.status) {
        setAllQueries(
          res.data.sort(
            (a, b) => new Date(b.created_at) - new Date(a.created_at)
          )
        );
      }
    });
  }, [fetch]);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Feedback/Queries from users</Text>
      <View>
        {allqueries && allqueries.length > 0 ? (
          <View style={styles.queriesContainer}>
            {allqueries.map((item, index) => (
              <MotiView
                key={index}
                from={{ opacity: 0, translateY: -50 }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{ type: 'timing', duration: 500, delay: index * 200 }}
              >
                <ViewQueries key={index} item={item} fetch={fetch} setFetch={setFetch} />
              </MotiView>
            ))}
          </View>
        ) : (
          <View style={styles.noDataContainer}>
            <Image
              source={require('../assets/Nodata.png')}
              style={styles.noDataImage}
            />
            <Text>No new jobs uploaded by recruiters.</Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: 'white',
    margin: 0,
    padding: 5,
  },
  heading: {
    textAlign: 'center',
    padding: 10,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#407BFF',
  },
  queriesContainer: {
    width: '100%',
    backgroundColor: 'white',
    margin: 0,
    padding: 5,
  },
  queryItem: {
    // Add styles for query item
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
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

export default AdminQueries;


{/*
  <View >
  {allqueries && allqueries.length > 0 ?
    <View style={{ width: '100%', backgroundColor: 'white', margin: 0, padding: 5 }}>
      {allqueries.map((item, index) => <ViewQueries key={index} item={item} fetch={fetch} setFetch={setFetch} />)}
    </View> :
    <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Image
        source={require('../assets/Nodata.png')}
        style={{ width: 200, height: 200 }}
      />
      <Text>No new jobs uploaded by recruiters.</Text>
    </View>}
</View >
  */}
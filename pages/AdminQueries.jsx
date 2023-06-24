import { StyleSheet, Text, View, ScrollView, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import { GetAllQueries } from '../api';
import { ViewQueries } from '../components/commonFunctions';

const AdminQueries = ({ navigation }) => {
  const [allqueries, setAllQueries] = useState([]);
  const [fetch, setFetch] = useState(false);

  useEffect(() => {
    GetAllQueries().then((res) => {
      console.log(res);
      if (res.status) {
        setAllQueries(res.data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)));
      }
    })
  }, [fetch])

  return (
    <ScrollView style={{ width: '100%', backgroundColor: 'white', margin: 0, padding: 5 }}>
      <Text style={{textAlign:'center', padding: 10, fontSize: 18, fontWeight:'bold', color:'#407BFF'}}>Feedback/Queries from users</Text>
      <View>
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
      </View>
    </ScrollView>
  )
}

export default AdminQueries

const styles = StyleSheet.create({})
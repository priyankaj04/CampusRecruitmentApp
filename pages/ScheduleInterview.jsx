import { StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { ScheduleInterviewAPI, GetInterviewDetails, UpdateInterviewDetails } from '../api';

const ScheduleInterview = ({ route, navigation }) => {
  const [interview, setInterview] = useState({});
  const [fetch, setFetch] = useState(false);
  const tid = route.params.tid;
  const aid = route.params.aid;
  const type = route.params.type;

  useEffect(() => {
    GetInterviewDetails(aid, tid).then((res) => {
      console.log(res);
      if (res.status) {
        setInterview(res.data[0]);
      } else {
        setInterview({});
      }
    })
  }, [fetch]);


  const handleSchedule = () => {
    const reqbody = {
      talent_id: tid,
      application_id: aid,
      slot_date: interview.slot_date,
      slot_time: interview.slot_time,
      link: interview.link,
      description: interview.description
    }

    if (type == 'create') {
      ScheduleInterviewAPI(reqbody).then((res) => {
        console.log(res);
        if (res.status) {
          setInterview({});
          navigation.goBack();
        }
      })
    } else if (type === 'edit') {
      UpdateInterviewDetails(reqbody, interview.interview_id).then((res) => {
        console.log(res);
        if (res.status) {
          setInterview({});
          navigation.goBack();
        }
      })
    }
  }


  return (
    <ScrollView style={{ backgroundColor: 'white' }}>
      {type && type == 'create' ?
        <View>
          <Text style={{ color: '#407BFF', fontSize: 18, textAlign: "center", fontWeight: 'bold' }}>Schedule Interview</Text>
          <Text style={styles.label}>Slot time</Text>
          <TextInput
            style={styles.textField}
            value={interview && interview.slot_time ? interview.slot_time : ''}
            onChangeText={(e) => { setInterview({ ...interview, slot_time: e }) }}
            placeholder='e.g. 10:30 AM'
          />
          <Text style={styles.label}>Slot date</Text>
          <TextInput
            style={styles.textField}
            value={interview && interview.slot_date ? interview.slot_date : ''}
            onChangeText={(e) => { setInterview({ ...interview, slot_date: e }) }}
            placeholder='e.g. 25 July 2023'

          />
          <Text style={styles.label}>Interview link</Text>
          <TextInput
            style={styles.textField}
            value={interview && interview.link ? interview.link : ''}
            onChangeText={(e) => { setInterview({ ...interview, link: e }) }}
            placeholder='e.g. https://meet.google.com/bns-qmdb-vnf'
          />
          <Text style={styles.label}>Interview Description</Text>
          <TextInput
            style={styles.multiline}
            multiline
            numberOfLines={7}
            value={interview && interview.description ? interview.description : ''}
            onChangeText={(e) => { setInterview({ ...interview, description: e }) }}
            placeholder='Description about this interview i.e., documents required, rules and regulations of interview etc,.'
          />
          <TouchableOpacity style={styles.btnpro} onPress={() => handleSchedule()}>
            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 18 }}>Schedule</Text>
          </TouchableOpacity>
        </View> :
        <View>
          <View>
            <Text style={{ color: '#407BFF', fontSize: 18, textAlign: "center", fontWeight: 'bold' }}>Edit scheduled Interview</Text>
            <Text style={styles.label}>Slot time</Text>
            <TextInput
              style={styles.textField}
              value={interview && interview.slot_time ? interview.slot_time : ''}
              onChangeText={(e) => { setInterview({ ...interview, slot_time: e }) }}
              placeholder='e.g. 10:30 AM'
            />
            <Text style={styles.label}>Slot date</Text>
            <TextInput
              style={styles.textField}
              value={interview && interview.slot_date ? interview.slot_date : ''}
              onChangeText={(e) => { setInterview({ ...interview, slot_date: e }) }}
              placeholder='e.g. 25 July 2023'

            />
            <Text style={styles.label}>Interview link</Text>
            <TextInput
              style={styles.textField}
              value={interview && interview.link ? interview.link : ''}
              onChangeText={(e) => { setInterview({ ...interview, link: e }) }}
              placeholder='e.g. https://meet.google.com/bns-qmdb-vnf'
            />
            <Text style={styles.label}>Interview Description</Text>
            <TextInput
              style={styles.multiline}
              multiline
              numberOfLines={7}
              value={interview && interview.description ? interview.description : ''}
              onChangeText={(e) => { setInterview({ ...interview, description: e }) }}
              placeholder='Description about this interview i.e., documents required, rules and regulations of interview etc,.'
            />
            <TouchableOpacity style={styles.btnpro} onPress={() => handleSchedule()}>
              <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 18 }}>Schedule</Text>
            </TouchableOpacity>
          </View>
        </View>
      }
    </ScrollView>
  )
}

export default ScheduleInterview

const styles = StyleSheet.create({
  textField: {
    height: 50,
    borderColor: 'transparent',
    borderWidth: 1,
    width: 360,
    padding: 8,
    backgroundColor: 'whitesmoke',
    fontSize: 16,
    marginTop: 0,
    borderRadius: 25,
    marginLeft: 15
  },
  label: {
    marginBottom: 0,
    color: 'gray',
    marginLeft: 25,
    marginTop: 10
  },
  multiline: {
    minHeight: 50,
    borderColor: 'transparent',
    borderWidth: 1,
    width: 360,
    padding: 8,
    backgroundColor: 'whitesmoke',
    fontSize: 16,
    textAlign: 'left',
    borderRadius: 25,
    marginLeft: 15
  },
  btnpro: {
    width: 350,
    height: 50,
    backgroundColor: '#407BFF',
    color: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    borderRadius: 25,
    shadowOffset: { width: 5, height: 5 },
    shadowColor: 'black',
    shadowOpacity: 0.8,
    shadowRadius: 5,
    elevation: 3,
    marginLeft: 28,
    marginTop: 30
  }
})
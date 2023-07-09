import { StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { ScheduleInterviewAPI, GetInterviewDetails, UpdateInterviewDetails } from '../api';
import { Picker } from '@react-native-picker/picker';
import moment from 'moment';
import Icon from 'react-native-vector-icons/FontAwesome';

const ScheduleInterview = ({ route, navigation }) => {
  const [interview, setInterview] = useState({});
  const [fetch, setFetch] = useState(false);
  const tid = route.params.tid;
  const aid = route.params.aid;
  const type = route.params.type;

  useEffect(() => {
    GetInterviewDetails(aid, tid).then((res) => {
      console.log("here", res);
      if (res.status) {
        setInterview(res.data[0]);
      } else {
        setInterview({});
      }
    })
  }, [fetch]);

  const Duration = [{ value: '10', label: '10 mins' },
  { value: '15', label: '15 mins' },
  { value: '20', label: '20 mins' },
  { value: '30', label: '30 mins' },
  { value: '45', label: '45 mins' },
  { value: '60', label: '60 mins' },
  { value: '90', label: '90 mins' }
  ]


  const handleSchedule = () => {
    const reqbody = {
      talent_id: tid,
      application_id: aid,
      slot_dates: datesting(interview.slot_dates),
      slot_timings: interview.slot_timings,
      link: interview.link,
      description: interview.description,
      slot_time: interview.slot_time,
      slots: ScheduleInterview()
    }

    if (type == 'create') {
      ScheduleInterviewAPI(reqbody).then((res) => {
        console.log(res);
        if (res.status) {
          setInterview({});
          navigation.goBack();
        }
      })
    }
  }


  const timeslots = (arr, value) => {

    const timeSlots = arr;
    const timeFormat = 'h:mm a';

    const slots = [];

    for (let i = 0; i < timeSlots.length; i++) {
      const startTime = moment(timeSlots[i], timeFormat);
      const endTime = moment(timeSlots[i + 1], timeFormat).subtract(1, 'minute');

      while (startTime.isSameOrBefore(endTime)) {
        slots.push(startTime.format(timeFormat));
        startTime.add(value, 'minutes');
      }
    }
    return slots;
  }

  const datesting = (value) => {

    const startDateString = value[0];
    const endDateString = value[1];

    // Convert date strings to Moment.js objects
    const startDate = moment(startDateString, 'DD/MM/YYYY');
    const endDate = moment(endDateString, 'DD/MM/YYYY');

    const datesBetween = [];
    const currentDate = startDate.clone();

    while (currentDate.isSameOrBefore(endDate, 'day')) {
      datesBetween.push(currentDate.format('DD/MM/YYYY'));
      currentDate.add(1, 'day');
    }

    return datesBetween;
  }

  const ScheduleInterview = () => {
    const dates = datesting(interview.slot_dates);
    const slotTimings = timeslots(interview.slot_time, interview.slot_timings);

    const combinedSlots = [];

    dates.forEach((date) => {
      slotTimings.forEach((slot) => {
        const slotObject = {
          slot_date: date,
          slot_time: slot,
          is_booked: false
        };

        combinedSlots.push(slotObject);
      });
    });

    console.log("dfadfdfSDF", combinedSlots);
    return combinedSlots;
  }


  return (
    <ScrollView style={{ backgroundColor: 'white' }}>

      {type == 'create' ? <Text style={{ color: '#407BFF', fontSize: 18, textAlign: "center", fontWeight: 'bold' }}>Schedule Interview</Text> :
        <Text style={{ color: '#407BFF', fontSize: 18, textAlign: "center", fontWeight: 'bold' }}>Scheduled Interview</Text>}
        <Text style={styles.label}>Slot date</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TextInput
            style={styles.halfText}
            value={interview && interview.slot_dates && interview.slot_dates[0] ? interview.slot_dates[0] : ''}
            onChangeText={(e) => {
              const updatedHobbies = interview.slot_dates ? [...interview.slot_dates] : [];
              if (updatedHobbies.length > 0 && updatedHobbies[0]) {
                updatedHobbies[0] = e;
              } else {
                updatedHobbies.push(e);
              }
              const updatedObject = {
                ...interview,
                slot_dates: updatedHobbies
              };
              setInterview(updatedObject);
            }}
            placeholder='e.g. 25 July 2023'
          />
          <Text style={{ marginLeft: 15 }}>{'to'}</Text>
          <TextInput
            style={{ ...styles.halfText, marginLeft: 18 }}
            value={interview && interview.slot_dates && interview.slot_dates[1] ? interview.slot_dates[1] : ''}
            onChangeText={(e) => {
              const updatedHobbies = interview.slot_dates ? [...interview.slot_dates] : [];
              if (updatedHobbies.length > 0 && updatedHobbies[1]) {
                updatedHobbies[1] = e;
              } else {
                updatedHobbies.push(e);
              }
              const updatedObject = {
                ...interview,
                slot_dates: updatedHobbies
              };
              setInterview(updatedObject);
            }}
            placeholder='e.g. 25 July 2023'
          />
        </View>
        <Text style={styles.label}>Select time</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TextInput
            style={styles.halfText}
            value={interview && interview.slot_time && interview.slot_time[0] ? interview.slot_time[0] : ''}
            onChangeText={(e) => {
              console.log('sdlkfjalsf', e)
              const updatedHobbies = interview.slot_time ? [...interview.slot_time] : [];
              if (updatedHobbies.length > 0 && updatedHobbies[0] && updatedHobbies[0] != "") {
                updatedHobbies[0] = e;
              } else {
                updatedHobbies.push(e);
              }
              const updatedObject = {
                ...interview,
                slot_time: updatedHobbies
              };
              setInterview(updatedObject);
            }}
            placeholder='e.g. 25 July 2023'
          />
          <Text style={{ marginLeft: 15 }}>to</Text>
          <TextInput
            style={{ ...styles.halfText, marginLeft: 18 }}
            value={interview && interview.slot_time && interview.slot_time[1] ? interview.slot_time[1] : ''}
            onChangeText={(e) => {
              const updatedHobbies = interview.slot_time ? [...interview.slot_time] : [];
              if (updatedHobbies.length > 0 && updatedHobbies[1]) {
                updatedHobbies[1] = e;
              } else {
                updatedHobbies.push(e);
              }
              const updatedObject = {
                ...interview,
                slot_time: updatedHobbies
              };
              setInterview(updatedObject);
            }}
            placeholder='e.g. 25 July 2023'
          />
        </View>
        <Text style={styles.label}>Duration</Text>
        <View style={{ backgroundColor: 'whitesmoke', borderRadius: 25, width: 360, marginLeft: 25, marginTop: 10 }}>
          <Picker
            selectedValue={interview && interview.slot_timings ? interview.slot_timings : ''}
            onValueChange={(itemValue) => {
              setInterview({ ...interview, slot_timings: itemValue })
            }
            }>
            {
              Duration.map((item, index) => <Picker.Item key={index} label={item.label} value={item.value} />)}
          </Picker>
        </View>
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
        {type == "create" && <TouchableOpacity style={styles.btnpro} onPress={() => handleSchedule()}>
          <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 18 }}>Schedule</Text>
        </TouchableOpacity>}
        <Text style={{ color: '#407BFF', margin: 10, textAlign: 'left', fontStyle: 'italic' }}><Icon name="info-circle" size={14} color='#407BFF' /> Once you schedule interview, cannot be edited/updated.</Text>
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
    marginLeft: 25
  },
  halfText: {
    height: 50,
    borderColor: 'transparent',
    borderWidth: 1,
    width: 160,
    padding: 8,
    backgroundColor: 'whitesmoke',
    fontSize: 16,
    marginTop: 0,
    borderRadius: 25,
    marginLeft: 25
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
    marginLeft: 25
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
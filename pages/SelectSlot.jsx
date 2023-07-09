import { StyleSheet, Text, View, Button, TouchableOpacity, TextInput } from 'react-native';
import React, { useState, useEffect } from 'react';
import { ApplicantsByAid, UpdateSlots, ApplicationById, GetInterviewDetails, UpdateInterviewDetails } from '../api';
import { Picker } from '@react-native-picker/picker';

const SelectSlot = ({ route, navigation }) => {
    //const applicant_id = route.params.id;
    const applicant_id = '57742fad-1564-448e-8668-4daca28dc745';
    const [details, setDetails] = useState({});
    const [slots, setSlots] = useState({});
    const [dates, setDates] = useState([]);
    const [times, setTimes] = useState([]);
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('');
    const [allSlots, setAllSlots] = useState([]);
    const [fetch, setFetch] = useState(false);
    const [interview_id, setInterviewId] = useState(null);


    useEffect(() => {
        ApplicantsByAid(applicant_id).then((res) => {
            if (res.status) {
                console.log(res.data[0]);
                GetInterviewDetails(res.data[0].application_id, res.data[0].talent_id).then((resp) => {
                    setInterviewId(resp.data[0].interview_id)
                    setAllSlots(resp.data[0].slots);
                    setDates([...new Set(resp.data[0].slots.filter(slot => !slot.is_booked).map(slot => slot.slot_date))]);
                })
                setDetails(res.data[0]);
            }
        })
        //console.log("am i being even called")
    }, [fetch]);

    const GetTimes = (date) =>{
        const slotTimes = allSlots
            .filter(slot => slot.slot_date === date && !slot.is_booked)
            .map(slot => slot.slot_time);
        setTimes(slotTimes);
    }

    const handleSchedule = () => {
        const updatedSlots = allSlots.map(slot => {
            if (slot.slot_date === selectedDate && slot.slot_time === selectedTime) {
                return { ...slot, is_booked: true };
            }
            return slot;
        });

        const req = {
            slots: updatedSlots
        }
        const reqbody = {
            slotdate: selectedDate,
            slottime: selectedTime
        }
        UpdateInterviewDetails(req, interview_id).then((res) => {
            UpdateSlots(reqbody, applicant_id).then((res) => {
                if (res.status) {
                    setFetch(!fetch);
                    //navigation.goBack();
                }
            })
        })

    }

    return (
        <View style={{backgroundColor:'white', height: '100%'}}>
            <View style={{ backgroundColor: 'whitesmoke', borderRadius: 25, width: 360, marginLeft: 25, marginTop: 10 }}>
                <Picker
                    selectedValue={selectedDate}
                    onValueChange={(itemValue) => {
                        setSelectedDate(itemValue);
                        GetTimes(itemValue);
                    }
                    }>
                    {dates.map((item, index) => <Picker.Item key={index} label={item} value={item} />)}
                </Picker>
            </View>
            {
                times && times.length > 0 && <View style={{ backgroundColor: 'whitesmoke', borderRadius: 25, width: 360, marginLeft: 25, marginTop: 10 }}>
                    <Picker
                        selectedValue={selectedTime}
                        onValueChange={(itemValue) => {
                            setSelectedTime(itemValue);
                        }
                        }>
                        {times.map((item, index) => <Picker.Item key={index} label={item} value={item} />)}
                    </Picker>
                </View>
            }

            <TouchableOpacity style={styles.btnpro} onPress={() => handleSchedule()}>
                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 18 }}>Schedule</Text>
            </TouchableOpacity>
        </View>
    )
}

export default SelectSlot

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
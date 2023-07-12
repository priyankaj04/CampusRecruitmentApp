import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { ApplicantsByAid, UpdateSlots, GetInterviewDetails, UpdateInterviewDetails } from '../api';
import { Picker } from '@react-native-picker/picker';
import { MotiView } from 'moti';

const SelectSlot = ({ route, navigation }) => {
    const applicant_id = route.params.id;
    const [details, setDetails] = useState({});
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
                GetInterviewDetails(res.data[0].application_id, res.data[0].talent_id).then((resp) => {
                    if (resp.status) {
                        setInterviewId(resp.data[0].interview_id);
                        setAllSlots(resp.data[0].slots);
                        setDates([...new Set(resp.data[0].slots.filter(slot => !slot.is_booked).map(slot => slot.slot_date))]);
                    } else {
                        setAllSlots([]);
                    }
                });
                setDetails(res.data[0]);
            }
        });
    }, [fetch]);

    const GetTimes = (date) => {
        const slotTimes = allSlots
            .filter(slot => slot.slot_date === date && !slot.is_booked)
            .map(slot => slot.slot_time);
        setTimes(slotTimes);
    };

    const handleSchedule = () => {
        const updatedSlots = allSlots.map(slot => {
            if (slot.slot_date === selectedDate && slot.slot_time === selectedTime) {
                return { ...slot, is_booked: true };
            }
            return slot;
        });

        const req = {
            slots: updatedSlots
        };

        const reqbody = {
            slotdate: selectedDate,
            slottime: selectedTime
        };

        UpdateInterviewDetails(req, interview_id).then((res) => {
            UpdateSlots(reqbody, applicant_id).then((res) => {
                if (res.status) {
                    setFetch(!fetch);
                    navigation.goBack();
                }
            });
        });
    };

    return (
        <View style={styles.container}>
            {
                allSlots && allSlots.length > 0 ?
                    <MotiView
                        from={{ opacity: 0, translateY: -100 }}
                        animate={{ opacity: 1, translateY: 0 }}
                        exit={{ opacity: 0, translateY: -100 }}
                        transition={{ type: 'timing', duration: 500 }}
                    >
                        <MotiView
                            from={{ opacity: 0, translateX: -100 }}
                            animate={{ opacity: 1, translateX: 0 }}
                            exit={{ opacity: 0, translateX: -100 }}
                            transition={{ type: 'timing', duration: 1000 }}
                            delay={500}
                        >
                            <View style={styles.pickerContainer}>
                                <Picker
                                    selectedValue={selectedDate}
                                    onValueChange={(itemValue) => {
                                        setSelectedDate(itemValue);
                                        GetTimes(itemValue);
                                    }}
                                >
                                    {dates.map((item, index) => (
                                        <Picker.Item key={index} label={item} value={item} />
                                    ))}
                                </Picker>
                            </View>
                        </MotiView>

                        {times && times.length > 0 && (
                            <MotiView
                                from={{ opacity: 0, translateX: -100 }}
                                animate={{ opacity: 1, translateX: 0 }}
                                exit={{ opacity: 0, translateX: -100 }}
                                transition={{ type: 'timing', duration: 1000 }}
                                delay={1500}
                            >
                                <View style={styles.pickerContainer}>
                                    <Picker
                                        selectedValue={selectedTime}
                                        onValueChange={(itemValue) => {
                                            setSelectedTime(itemValue);
                                        }}
                                    >
                                        {times.map((item, index) => (
                                            <Picker.Item key={index} label={item} value={item} />
                                        ))}
                                    </Picker>
                                </View>
                            </MotiView>
                        )}
                        <MotiView
                            from={{ opacity: 0, translateY: 100 }}
                            animate={{ opacity: 1, translateY: 0 }}
                            exit={{ opacity: 0, translateY: 100 }}
                            transition={{ type: 'timing', duration: 1000 }}
                            delay={2500}
                        >
                            <TouchableOpacity style={styles.btnpro} onPress={handleSchedule}>
                                <Text style={styles.btnText}>Schedule</Text>
                            </TouchableOpacity>
                        </MotiView>
                    </MotiView> :
                    <MotiView
                        from={{ opacity: 0, translateY: -100 }}
                        animate={{ opacity: 1, translateY: 0 }}
                        exit={{ opacity: 0, translateY: -100 }}
                        transition={{ type: 'timing', duration: 1000 }}
                        delay={1000}
                        style={{ width: '100%', height: '100%', display: 'flex', flex: 1, justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}
                    >
                        <Image source={require('../assets/Nodata.png')} style={styles.noApplicantsImage} />
                        <Text style={{ fontSize: 14, textAlign: 'center', marginTop: 0 }}>No Slots allocated yet.</Text>
                    </MotiView>
            }
        </View>
    );
};

export default SelectSlot;

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        height: '100%'
    },
    pickerContainer: {
        backgroundColor: 'whitesmoke',
        borderRadius: 25,
        width: 360,
        marginLeft: 25,
        marginTop: 10
    },
    btnpro: {
        width: 350,
        height: 50,
        backgroundColor: '#407BFF',
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
    },
    btnText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18
    },
    noApplicantsImage: {
        width: 200,
        height: 200
    }
});
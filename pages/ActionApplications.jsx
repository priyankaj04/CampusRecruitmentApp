import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, Alert } from 'react-native'
import React, { useState, useEffect } from 'react';
import { ApplicantsByApplicationId, UpdateMultipleStatus } from '../api';
import { Picker } from '@react-native-picker/picker';
import { ViewTalentCard } from '../components/commonFunctions';
import Checkbox from 'expo-checkbox';
import { MotiView } from 'moti';


const ActionApplications = ({ route, navigation }) => {
    const applicationid = route.params.aid;
    const [applicantDetials, setApplicantDetails] = useState([]);
    const [fetch, setFetch] = useState(false);
    const [status, setStatus] = useState('all');
    const [selected, setSelected] = useState([]);
    const [selection, setSelection] = useState(false);
    const [selectAllChecked, setSelectAllChecked] = useState(false);


    useEffect(() => {
        ApplicantsByApplicationId(status, applicationid).then((res) => {
            console.log(res);
            if (res.status) {
                setApplicantDetails(res.data);
            } else {
                setApplicantDetails([])
            }
        })
    }, [status, fetch])

    const Status = [
        { label: 'All', value: "all" },
        { label: 'Not Reviewed yet', value: "under review" },
        { label: 'Shortlisted', value: "shortlisted" },
        { label: 'Rejected', value: "rejected" }
    ]

    const handleCheckboxChange = (id) => {
        if (selected.includes(id)) {
            // Remove the ID from the array
            setSelected(selected.filter((selected) => selected !== id));
        } else {
            // Add the ID to the array
            setSelected([...selected, id]);
        }
    };

    const isCheckboxChecked = (id) => {
        return selected.includes(id);
    };

    const handleApproved = () => {
        console.log(selected);
        Alert.alert(`Are you sure you shortlist ${selected.length} applicant(s)?`, '', [
            {
                text: "Yes",
                onPress: () => {
                    const reqbody = {
                        id: selected,
                        status: 'shortlisted'
                    }
                    UpdateMultipleStatus(reqbody).then((res) => {
                        console.log("shortlisted", res)
                        if (res.status) {
                            setSelection(false);
                            setSelected([]);
                            setSelectAllChecked(false);
                            setFetch(!fetch);
                        }
                    })
                },
            },
            {
                text: "No",
            },
        ])


    }

    const handleRejected = () => {
        console.log(selected)
        Alert.alert(`Are you sure you reject ${selected.length} applicant(s)?`, '', [
            {
                text: "Yes",
                onPress: () => {
                    const reqbody = {
                        id: selected,
                        status: 'rejected'
                    }
                    UpdateMultipleStatus(reqbody).then((res) => {
                        console.log("Rejected", res);
                        if (res.status) {
                            setSelection(false);
                            setSelected([]);
                            setSelectAllChecked(false);
                            setFetch(!fetch);

                        }
                    })
                },
            },
            {
                text: "No",
            },
        ])

    }

    const handleSelectAllChange = () => {
        if (selectAllChecked) {
            setSelected([]);
        } else {
            const allIds = applicantDetials.map((item) => item.applicant_id);
            setSelected(allIds);
        }
        setSelectAllChecked(!selectAllChecked);
    };

    return (
        <ScrollView style={{ width: '100%', backgroundColor: 'white' }}>
            <View style={{ backgroundColor: 'whitesmoke', borderRadius: 25, width: 360, marginLeft: 25, marginTop: 10 }}>
                <Picker
                    selectedValue={status}
                    onValueChange={(itemValue) => {
                        setStatus(itemValue);
                    }
                    }>
                    {Status.map((item, index) => <Picker.Item key={index} label={item.label} value={item.value} />)}
                </Picker>
            </View>
            {applicantDetials &&
                <MotiView
                from={{ opacity: 0, translateY: -50 }}
                animate={{ opacity: 1, translateY: 0 }}
                duration={1000}
                delay={500}
            >
                <Text style={{ marginLeft: 10, margin: 15 }}>{applicantDetials.length} applicant(s)</Text>
            </MotiView>}
            <View style={{ flexDirection: 'row' }}>
                {selection ?
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', flex: 1 }}>
                        <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity style={{ marginLeft: 20 }} onPress={() => handleSelectAllChange()}>
                                <Text style={{ color: '#407BFF' }}> SELECT ALL</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ marginLeft: 20 }} onPress={() => {
                                setSelection(false);
                                setSelected([]);
                                setSelectAllChecked(false);
                            }}>
                                <Text style={{ color: 'red' }}> CANCLE</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity style={{ marginLeft: 20 }} onPress={() => handleApproved()}>
                                <Text style={{ color: '#407BFF' }}> SHORTLIST</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ marginLeft: 20 }} onPress={() => handleRejected()}>
                                <Text style={{ color: 'red' }}> REJECT</Text>
                            </TouchableOpacity>
                        </View>
                    </View> : <TouchableOpacity style={{ marginLeft: 20 }} onPress={() => setSelection(true)} >
                        <Text style={{ color: '#407BFF' }} >SELECT</Text>
                    </TouchableOpacity>}
            </View>
            <View style={{ marginTop: 0 }}>
                {
                    applicantDetials && applicantDetials.length > 0 ?
                        <View>
                            {
                                applicantDetials.map((item, index) => (
                                    <View key={index} style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 10 }}>
                                        {selection &&
                                            <Checkbox
                                                value={isCheckboxChecked(item.applicant_id)}
                                                onValueChange={(e) => {
                                                    handleCheckboxChange(item.applicant_id)
                                                }}
                                                color={isCheckboxChecked(item.applicant_id) ? '#407BFF' : undefined}
                                            />}
                                        <ViewTalentCard item={item} fetch={fetch} setFetch={setFetch} navigation={navigation} />
                                    </View>
                                ))
                            }
                        </View> :
                        <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Image
                                source={require('../assets/Nodata.png')}
                                style={{ width: 200, height: 200 }}
                            />
                            <Text>No applicants.</Text>
                        </View>
                }
            </View>
        </ScrollView>
    )
}

export default ActionApplications

const styles = StyleSheet.create({})
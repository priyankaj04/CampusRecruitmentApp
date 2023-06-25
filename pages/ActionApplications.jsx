import { StyleSheet, Text, View, ScrollView, Image } from 'react-native'
import React, { useState, useEffect } from 'react';
import { ApplicantsByApplicationId } from '../api';
import { Picker } from '@react-native-picker/picker';
import { ViewTalentCard } from '../components/commonFunctions';

const ActionApplications = ({ route, navigation }) => {
    const applicationid = route.params.aid;
    const [applicantDetials, setApplicantDetails] = useState([]);
    const [fetch, setFetch] = useState(false);
    const [status, setStatus] = useState('all');

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
            {applicantDetials && <Text style={{marginLeft: 10, margin: 15}}>{applicantDetials.length} applicant(s)</Text>}
            <View style={{ marginTop: 0 }}>
                {
                    applicantDetials && applicantDetials.length > 0 ?
                        <View>
                            {
                                applicantDetials.map((item, index) => (
                                    <ViewTalentCard key={index} item={item} fetch={fetch} setFetch={setFetch} navigation={navigation} />
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
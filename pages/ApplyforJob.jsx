import { StyleSheet, Text, View, TextInput, TouchableOpacity, Linking } from 'react-native';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ApplyingForApplication, ResumeDetailsByTalentID } from '../api';

const ApplyforJob = ({ route, navigation }) => {
    const id = route.params.id;
    const [resumeid, setResumeId] = useState('');
    const [talentid, setTalentid] = useState(null);
    const [cv, setCv] = useState('');

    const getData = async () => {
        setTalentid(await AsyncStorage.getItem('talent_id'));
    }

    useEffect(() => {
        if (!talentid) {
            getData()
        }
        if (talentid) {
            ResumeDetailsByTalentID(talentid).then((res) => {
                if (res.status) {
                    console.log(res.data[0]);
                    setResumeId(res.data[0].resume_id)
                } else {
                    setResumeId('');
                }
            })
        }

    }, [talentid])

    const handleSubmit = () => {
        let reqbody = {
            "application_id": id,
            "pitching": cv,
            "resume_id": resumeid,
            "talent_id": talentid,
        }

        ApplyingForApplication(reqbody).then((res) => {
            if (res.status) {
                navigation.goBack();
            }
        })
    }

    return (
        <View>
            <View style={{ width: '100%', backgroundColor: 'white', margin: 0, padding: 25, height: '100%' }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#407BFF' }}>Application</Text>
                <Text style={{ fontSize: 16, fontWeight: 'bold', marginTop: 10 }}>Your Resume</Text>
                <Text style={{ color: 'gray', fontStyle: 'italic' }}>Your resume will be submitted along with this application.</Text>
                <TouchableOpacity onPress={() => { navigation.navigate('EditResume') }}>
                    <Text style={{ color: '#407BFF' }}>Edit resume</Text>
                </TouchableOpacity>
                <Text style={{ fontSize: 16, fontWeight: 'bold', marginTop: 10 }}>Cover letter</Text>
                <Text style={{ marginTop: 10 }}>Why should you be hired for this role?</Text>
                <TextInput
                    style={styles.multiline}
                    multiline
                    numberOfLines={10}
                    value={cv}
                    onChangeText={(e) => setCv(e)}
                    placeholder='Mention in detail what relevant skill or past experience you have for this internship. 
              What you have for this application. What excites you about this opportunity? Why would you be a good fit?'
                />
                <TouchableOpacity onPress={() => { handleSubmit() }} style={{
                    width: 350,
                    height: 50,
                    backgroundColor: '#407BFF',
                    color: 'white',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: 20,
                    borderRadius: 25,
                    shadowOffset: { width: 5, height: 5 },
                    shadowColor: 'black',
                    shadowOpacity: 0.8,
                    shadowRadius: 5,
                    elevation: 3,
                    marginLeft: 10
                }}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'white' }}>Submit</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default ApplyforJob

const styles = StyleSheet.create({
    multiline: {
        borderColor: 'transparent',
        borderWidth: 1,
        width: 360,
        backgroundColor: 'whitesmoke',
        fontSize: 16,
        textAlign: 'left',
        borderRadius: 10,
        marginTop: 10,
        padding: 10
    },
})
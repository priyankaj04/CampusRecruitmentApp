import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Linking, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MotiView } from 'moti';
import { ApplyingForApplication, ResumeDetailsByTalentID } from '../api';

const ApplyforJob = ({ route, navigation }) => {
    const id = route.params.id;
    const [resumeid, setResumeId] = useState('');
    const [talentid, setTalentid] = useState(null);
    const [cv, setCv] = useState('');
    const [email, setEmail] = useState(null);
    const [showInputs, setShowInputs] = useState(false);

    const getData = async () => {
        setTalentid(await AsyncStorage.getItem('talent_id'));
        setEmail(await AsyncStorage.getItem('register_no'));
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
            "registerno": email,
        }
        console.log(reqbody);
        ApplyingForApplication(reqbody).then((res) => {
            console.log("adsdfsdf", res);
            if (res.status) {
                navigation.goBack();
            }
        })
    }

    useEffect(() => {
        setShowInputs(true);
    }, []);

    return (
        <ScrollView>
            <View style={styles.container}>
                <Text style={styles.heading}>Application</Text>
                <MotiView
                    from={{ opacity: 0, translateX: -100 }}
                    animate={{ opacity: 1, translateX: 0 }}
                    transition={{ type: 'timing', duration: 1000 }}
                    style={styles.resumeContainer}
                >
                    <Text style={styles.subheading}>Your Resume</Text>
                    <Text style={styles.italicText}>Your resume will be submitted along with this application.</Text>
                    <TouchableOpacity onPress={() => { navigation.navigate('EditResume') }}>
                        <Text style={styles.editText}>Edit resume</Text>
                    </TouchableOpacity>
                </MotiView>
                {showInputs && (
                    <View>
                        <MotiView
                            from={{ opacity: 0, translateX: -100 }}
                            animate={{ opacity: 1, translateX: 0 }}
                            transition={{ type: 'timing', duration: 1000, delay: 1000 }}
                            style={styles.coverLetterContainer}
                        >
                            <Text style={styles.subheading}>Cover letter</Text>
                            <Text style={styles.coverLetterText}>Why should you be hired for this role?</Text>
                            <TextInput
                                style={styles.multiline}
                                multiline
                                numberOfLines={10}
                                value={cv}
                                onChangeText={(e) => setCv(e)}
                                placeholder='Mention in detail what relevant skill or past experience you have for this internship. 
              What you have for this application. What excites you about this opportunity? Why would you be a good fit?'
                            />
                        </MotiView>
                        <MotiView
                            from={{ opacity: 0, translateX: -100 }}
                            animate={{ opacity: 1, translateX: 0 }}
                            transition={{ type: 'timing', duration: 500, delay: 1500 }}
                            style={styles.coverLetterContainer}
                        >
                            <TouchableOpacity onPress={() => { handleSubmit() }} style={styles.submitButton}>
                                <Text style={styles.submitButtonText}>Submit</Text>
                            </TouchableOpacity>
                        </MotiView>
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
        padding: 25,
        height: '100%',
    },
    heading: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#407BFF',
        marginBottom: 10,
    },
    resumeContainer: {
        marginBottom: 20,
    },
    subheading: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 10,
    },
    italicText: {
        color: 'gray',
        fontStyle: 'italic',
    },
    editText: {
        color: '#407BFF',
        marginTop: 5,
    },
    coverLetterContainer: {
        marginBottom: 20,
    },
    coverLetterText: {
        marginTop: 10,
        marginBottom: 10,
    },
    multiline: {
        borderColor: 'transparent',
        borderWidth: 1,
        width: 360,
        backgroundColor: 'whitesmoke',
        fontSize: 16,
        textAlign: 'left',
        borderRadius: 10,
        marginTop: 10,
        padding: 10,
    },
    submitButton: {
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
        marginLeft: 10,
    },
    submitButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
    },
});

export default ApplyforJob;
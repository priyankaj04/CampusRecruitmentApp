import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, KeyboardAvoidingView, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import { MotiView } from 'moti';
import { TalentDetailsById, ChangeTalentPassword, ChangeRecruiterPassword, RecruiterDetailsById } from '../api';
import Icon from 'react-native-vector-icons/FontAwesome';

const ChangePassword = ({ route, navigation }) => {
    const { id, type } = route.params;
    const [oldpassword, setOldpassword] = useState('');
    const [newpassword, setNewpassword] = useState('');
    const [oldpass, setOldpass] = useState('');
    const [show1, setShow1] = useState(false);
    const [confirm, setConfirm] = useState('');
    const [show, setShow] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [showMsg, setShowMsg] = useState(false);
    const [msg, setMsg] = useState('');
    const [talentid, setTalentid] = useState('');
    const [showInputs, setShowInputs] = useState(false);

    useEffect(() => {
        if (type == "talent") {
            TalentDetailsById(id).then((res) => {
                if (res.status) {
                    setTalentid(res.data[0].talent_id);
                    setOldpass(res.data[0].password);
                }
                setIsLoading(false);
            })
        } else if (type == "recruiter") {
            RecruiterDetailsById(id).then((res) => {
                if (res.status) {
                    setTalentid(res.data[0].recruiter_id);
                    setOldpass(res.data[0].password);
                }
                setIsLoading(false);
            })
        }
    }, [])

    useEffect(() => {
        setShowInputs(true);
    }, []);

    const handleClick = () => {
        if (confirm != newpassword) {
            setShowMsg(true);
            setMsg("Sorry, but the password and confirm password entries must match. Please double-check and try again.")
        } else if (newpassword.length < 8) {
            setShowMsg(true);
            setMsg("Sorry, but the password should contain 8 characters. Please double-check and try again.")
        } else if (!confirm || confirm.length == 0 || !newpassword || newpassword.length == 0 || !oldpassword || oldpassword.length == 0) {
            setShowMsg(true);
            setMsg("All fields are required.");
        } else {
            setShowMsg(false);
            setIsLoading(true);
            let reqbody = { password: oldpassword, newpassword: newpassword }
            //console.log(reqbody);
            if (type == "talent") {
                ChangeTalentPassword(reqbody, talentid).then((res) => {
                    //console.log(res);
                    if (res.status) {
                        navigation.navigate('Profile');
                        setIsLoading(false);
                    } else {
                        setShowMsg(true);
                        setMsg(res.data.message);
                    }
                    setIsLoading(false);
                })
            } else if (type == "recruiter") {
                ChangeRecruiterPassword(reqbody, talentid).then((res) => {
                    if (res.status) {
                        navigation.navigate('RecruiterProfile');
                        setIsLoading(false);
                    } else {
                        setShowMsg(true);
                        setMsg(res.data.message);
                    }
                    setIsLoading(false);
                })
            }
        }
    }

    return (
        <ScrollView>
            <View style={{ backgroundColor: 'white', minHeight: '100%' }}>
                <MotiView
                    from={{ opacity: 0, translateY: -100 }}
                    animate={{ opacity: 1, translateY: 0 }}
                    transition={{ type: 'timing', duration: 1000 }}
                >
                    <View style={{
                        backgroundColor: '#407BFF',
                        alignItems: "center",
                        height: 400,
                        justifyContent: "center"
                    }}>
                        <Image
                            source={require('../assets/changepassword.png')}
                            style={{
                                width: 300,
                                height: 300
                            }}
                        />
                    </View>
                </MotiView>
                <KeyboardAvoidingView>
                    <View style={{ alignItems: 'center', marginTop: 20 }}>
                        <MotiView
                            from={{ opacity: 0, translateX: -100 }}
                            animate={{ opacity: 1, translateX: 0 }}
                            transition={{ type: 'timing', duration: 1000, delay: 1000 }}
                            style={{ marginBottom: 20 }}
                        >
                            <View style={{
                                backgroundColor: '#e5e5e5',
                                height: 50,
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'center',
                                margin: 10,
                                padding: 10,
                                borderRadius: 25,
                            }}>
                                <TextInput
                                    placeholder='Old password'
                                    style={{
                                        height: 50,
                                        borderColor: 'transparent',
                                        borderWidth: 1,
                                        width: 300,
                                        backgroundColor: '#e5e5e5',
                                        fontSize: 16,
                                        borderRadius: 25,
                                    }}
                                    secureTextEntry={show1 ? false : true}
                                    onChangeText={(e) => setOldpassword(e)}
                                    value={oldpassword}
                                    keyboardType="default"
                                />
                                <Icon name={show1 ? "eye" : "eye-slash"} color="gray" size={26} onPress={() => setShow1(!show1)} />
                            </View>
                            <View style={{
                                backgroundColor: '#e5e5e5',
                                height: 50,
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'center',
                                margin: 10,
                                padding: 10,
                                borderRadius: 25,
                            }}>
                                <TextInput
                                    placeholder='New password'
                                    style={{
                                        height: 50,
                                        borderColor: 'transparent',
                                        borderWidth: 1,
                                        width: 300,
                                        backgroundColor: '#e5e5e5',
                                        fontSize: 16,
                                        borderRadius: 25,
                                    }}
                                    secureTextEntry={show ? false : true}
                                    onChangeText={(e) => setNewpassword(e)}
                                    value={newpassword}
                                    keyboardType="default"
                                />
                                <Icon name={show ? "eye" : "eye-slash"} color="gray" size={26} onPress={() => setShow(!show)} />
                            </View>
                            <TextInput
                                placeholder="Confirm Password"
                                style={{
                                    height: 50,
                                    borderColor: 'transparent',
                                    borderWidth: 1,
                                    width: 350,
                                    borderRadius: 25,
                                    padding: 10,
                                    backgroundColor: '#e5e5e5',
                                    margin: 10,
                                    fontSize: 16
                                }}
                                secureTextEntry
                                onChangeText={(e) => { setConfirm(e); }}
                                value={confirm}
                                inputMode="text"
                            />
                            {showMsg && <Text style={{ color: 'red', margin: 10, textAlign: 'left' }}><Icon name="info-circle" size={14} color='red' />  {msg}</Text>}
                        </MotiView>
                        {showInputs && (
                            <MotiView
                                from={{ opacity: 0, translateX: -100 }}
                                animate={{ opacity: 1, translateX: 0 }}
                                transition={{ type: 'timing', duration: 500, delay: 2000 }}
                                style={styles.btnContainer}
                            >
                                <TouchableOpacity style={styles.btn} onPress={() => handleClick()}>
                                    <Text style={styles.btnText}>Submit</Text>
                                </TouchableOpacity>
                            </MotiView>
                        )}
                    </View>
                </KeyboardAvoidingView>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    btnContainer: {
        marginBottom: 20,
    },
    btn: {
        width: 350,
        height: 50,
        backgroundColor: '#407BFF',
        color: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10,
        marginTop: 0,
        borderRadius: 25,
        shadowOffset: { width: 5, height: 5 },
        shadowColor: 'black',
        shadowOpacity: 0.8,
        shadowRadius: 5,
        elevation: 3,
        marginTop: 40,
    },
    btnText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18,
    },
});

export default ChangePassword;

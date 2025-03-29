import { StyleSheet, Text, View, ScrollView, TouchableOpacity, TextInput, Image } from 'react-native'
import React, { useState, useEffect } from 'react';
import { Picker } from '@react-native-picker/picker';
import { StudentsByClassName } from '../api';
import { EditStudentDetails } from '../components/commonFunctions';

const StudentPage = ({ navigation }) => {
    const [classes, setClasses] = useState('III BCA A');
    const [students, setStudent] = useState([]);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (classes) {
            StudentsByClassName(classes).then((res) => {
                console.log(res);
                if (res.status) {
                    setStudent(res.data);
                } else {
                    setStudent([]);
                }
            })
        }
    }, [])

    const onClassChange = (value) => {
        StudentsByClassName(value).then((res) => {
            console.log(res);
            if (res.status) {
                setStudent(res.data);
            } else {
                setStudent([]);
            }
        })
    }


    const Classes = [
        { value: 'III BCA A' }, { value: 'III BCA B' }, { value: 'II BCA A' }, { value: 'II BCA B' }, { value: 'I BCA A' }, { value: 'I BCA B' }]
    return (
        <View style={{ width: '100%', backgroundColor: 'white', margin: 0, height:'100%' }}>
            <View style={{ backgroundColor: 'whitesmoke', borderRadius: 25, width: 360, marginLeft: 25, marginTop: 10 }}>
                <Picker
                    selectedValue={classes}
                    onValueChange={(itemValue) => {
                        setClasses(itemValue);
                        onClassChange(itemValue);
                    }
                    }>
                    {Classes.map((item) => <Picker.Item key={item.value} label={item.value} value={item.value} />)}
                </Picker>
            </View>
            <View style={{ flex: 1, margin: 10, flexDirection: 'row', justifyContent: students && students.length > 0 ? 'space-between':'flex-end' }}>
                {students && students.length > 0 && <Text style={{ margin: 10}}>{students.length} students</Text>}
                <TouchableOpacity style={styles.btn} onPress={() => {
                    navigation.navigate('CreateStudent');
                }}>
                    <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 18 }}>Create Student</Text>
                </TouchableOpacity>
            </View>
            <ScrollView>
                <View style={{ marginTop: 0 }}>
                    {
                        students && students.length > 0 ?
                            <View>
                                {
                                    students.map((item, index) => (
                                        <EditStudentDetails key={index} item={item} />
                                    ))
                                }
                            </View> :
                            <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <Image
                                    source={require('../assets/Nodata.png')}
                                    style={{ width: 200, height: 200 }}
                                />
                                <Text>No students created from this class yet.</Text>
                            </View>

                    }
                </View>
            </ScrollView>
        </View>
    )
}

export default StudentPage

const styles = StyleSheet.create({
    btn: {
        width: 150,
        height: 50,
        backgroundColor: '#407BFF',
        color: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 25,
        shadowOffset: { width: 5, height: 5 },
        shadowColor: 'black',
        shadowOpacity: 0.8,
        shadowRadius: 5,
        elevation: 3,
    },
    card: {
        backgroundColor: 'whitesmoke',
        width: '96%',
        height: 150,
        margin: 8,
        borderRadius: 20,
        shadowOffset: { width: 5, height: 5 },
        shadowColor: 'black',
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 1,
        padding: 20
    },
    
})
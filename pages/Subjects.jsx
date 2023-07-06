import { StyleSheet, Text, View, Button, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import React, { useState, useEffect } from 'react';
import { UpdateSubjects, GetSubjects } from '../api';

const Subjects = ({ navigation }) => {

    const [degree, setDegree] = useState('BCA');
    const [isem, setISem] = useState([]);
    const [iisem, setIISem] = useState([]);
    const [iiisem, setIIISem] = useState([]);
    const [ivsem, setIVSem] = useState([]);
    const [vsem, setVSem] = useState([]);
    const [visem, setVISem] = useState([]);
    const [syllabus, setSyllabus] = useState([]);
    const [totalnoofhours, setTotalnoofhours] = useState('');
    const [points, setPoints] = useState('');
    const [year, setYear] = useState('2020-2023');

    useEffect(() => {
        GetSubjects(degree, year).then((res) => {
            if (res.status) {
                setISem(res.data[0].subject.isem)
                setIISem(res.data[0].subject.iisem)
                setIIISem(res.data[0].subject.iiisem)
                setIVSem(res.data[0].subject.ivsem)
                setVSem(res.data[0].subject.vsem)
                setVISem(res.data[0].subject.visem)
            } else {
                setISem([]);
                setIISem([]);
                setIIISem([]);
                setIVSem([]);
                setVSem([]);
                setVISem([]);
            }
        })
    }, []);

    const Degrees = [
        { value: 'BCA', label: 'BCA' }, { value: 'BSc', label: 'BSc' }
    ]

    const AcademicYear = [
        { value: '2019-2022', label: '2019-2022' },
        { value: '2020-2023', label: '2020-2023' },
        { value: '2021-2024', label: '2021-2024' },
        { value: '2022-2025', label: '2022-2025' },
        { value: '2023-2026', label: '2023-2026' }
    ];

    const handleUpdate = () => {
        reqbody = {
            isem,
            iisem,
            iiisem,
            ivsem,
            vsem,
            visem
        }
        UpdateSubjects(reqbody, degree).then((res) => {
            if (res.status) {
                // console.log("Updated successfully");
            }
        })
    }

    const onChangePicker = () => {
        GetSubjects(degree, year).then((res) => {
            if (res.status) {
                setISem(res.data[0].subject.isem)
                setIISem(res.data[0].subject.iisem)
                setIIISem(res.data[0].subject.iiisem)
                setIVSem(res.data[0].subject.ivsem)
                setVSem(res.data[0].subject.vsem)
                setVISem(res.data[0].subject.visem)
            } else {
                setISem([]);
                setIISem([]);
                setIIISem([]);
                setIVSem([]);
                setVSem([]);
                setVISem([]);
            }
        });
    }

    return (
        <ScrollView style={{ width: '100%', backgroundColor: 'white', margin: 0, height: '100%' }}>
            <View style={{ flexDirection: 'row' }}>
                <View style={{ backgroundColor: 'whitesmoke', borderRadius: 25, width: 180, marginLeft: 25, marginTop: 10 }}>
                    <Picker
                        selectedValue={degree}
                        onValueChange={(itemValue) => {
                            setDegree(itemValue);
                        }
                        }>
                        {Degrees.map((item) => <Picker.Item key={item.value} label={item.value} value={item.value} />)}
                    </Picker>
                </View>
                <View style={{ backgroundColor: 'whitesmoke', borderRadius: 25, width: 180, marginLeft: 5, marginTop: 10 }}>
                    <Picker
                        selectedValue={year}
                        onValueChange={(itemValue) => {
                            setYear(itemValue);
                        }
                        }>
                        {AcademicYear.map((item) => <Picker.Item key={item.value} label={item.value} value={item.value} />)}
                    </Picker>
                </View>
            </View>
            <KeyboardAvoidingView>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 10 }}>
                    <Text style={{ color: '#407BFF', fontSize: 18, fontWeight: 'bold', margin: 10 }}>I semester</Text>
                    <TouchableOpacity style={styles.btn} onPress={() => { setISem([...isem, []]) }}>
                        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 22 }}> + </Text>
                    </TouchableOpacity>
                </View>
                {isem && isem.length > 0 && isem.map((array, index) => (
                    <View key={index}>
                        <Text style={styles.label}>Subject Name</Text>
                        <TextInput
                            style={styles.textField}
                            placeholder='e.g. C programming'
                            value={isem[index] ? isem[index] : ''}
                            onChangeText={value => {
                                const updatedArrays = [...isem];
                                updatedArrays[index] = value;
                                setISem(updatedArrays);
                            }}
                        />
                        <View>
                            <Text style={styles.header}>Subject Details</Text>
                            <Text style={styles.label}>Total number of hours</Text>
                            <TextInput
                                style={styles.textField}
                                placeholder='e.g. 60 hours'
                                value={isem[index] ? isem[index] : ''}
                                onChangeText={value => {
                                    const updatedArrays = [...isem];
                                    updatedArrays[index] = value;
                                    setISem(updatedArrays);
                                }}
                            />

                            <Text style={styles.label}>Credit points</Text>
                            <TextInput
                                style={styles.textField}
                                placeholder='e.g 3'
                                value={isem[index] ? isem[index] : ''}
                                onChangeText={value => {
                                    const updatedArrays = [...isem];
                                    updatedArrays[index] = value;
                                    setISem(updatedArrays);
                                }}
                            />
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 10 }}>
                                <Text style={{ color: '#407BFF', fontSize: 16, fontWeight: 'bold', margin: 10 }}>Add Units</Text>
                                <TouchableOpacity style={styles.btn} onPress={() => { setSyllabus([...isem, []]) }}>
                                    <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20 }}> + </Text>
                                </TouchableOpacity>
                            </View>
                            <Text style={styles.label}>Unit Name</Text>
                            <TextInput
                                style={styles.textField}
                                placeholder='e.g. Introduction to C'
                                value={points}
                                onChangeText={value => {
                                    const updatedArrays = [...isem];
                                    updatedArrays[index] = value;
                                    setISem(updatedArrays);
                                }}
                            />
                            <Text style={styles.label}>Number of hours</Text>
                            <TextInput
                                style={styles.textField}
                                placeholder='e.g. 10'
                                value={points}
                                onChangeText={value => {
                                    const updatedArrays = [...isem];
                                    updatedArrays[index] = value;
                                    setISem(updatedArrays);
                                }}
                            />
                            <Text style={styles.label}>Topics</Text>
                            <TextInput
                                style={styles.textField}
                                placeholder='e.g. Topics'
                                value={points}
                                onChangeText={value => {
                                    const updatedArrays = [...isem];
                                    updatedArrays[index] = value;
                                    setISem(updatedArrays);
                                }}
                            />
                            <TouchableOpacity style={styles.btn} onPress={() => { setISem([...isem, []]) }}>
                                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20 }}> + </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                ))}

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 10 }}>
                    <Text style={{ color: '#407BFF', fontSize: 18, fontWeight: 'bold', margin: 10 }}>II semester</Text>
                    <TouchableOpacity style={styles.btn} onPress={() => { setIISem([...iisem, []]) }}>
                        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 22 }}> + </Text>
                    </TouchableOpacity>
                </View>
                {iisem.map((array, index) => (
                    <TextInput
                        key={index}
                        style={styles.textField}
                        placeholder='Subject name'
                        value={iisem[index] ? iisem[index] : ''}
                        onChangeText={value => {
                            const updatedArrays = [...iisem];
                            updatedArrays[index] = value;
                            setIISem(updatedArrays);
                        }}
                    />
                ))}
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 10 }}>
                    <Text style={{ color: '#407BFF', fontSize: 18, fontWeight: 'bold', margin: 10 }}>III semester</Text>
                    <TouchableOpacity style={styles.btn} onPress={() => { setIIISem([...iiisem, []]) }}>
                        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 22 }}> + </Text>
                    </TouchableOpacity>
                </View>
                {iiisem.map((array, index) => (
                    <TextInput
                        key={index}
                        style={styles.textField}
                        placeholder='Subject name'
                        value={iiisem[index] ? iiisem[index] : ''}
                        onChangeText={value => {
                            const updatedArrays = [...iiisem];
                            updatedArrays[index] = value;
                            setIIISem(updatedArrays);
                        }}
                    />
                ))}
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 10 }}>
                    <Text style={{ color: '#407BFF', fontSize: 18, fontWeight: 'bold', margin: 10 }}>IV semester</Text>
                    <TouchableOpacity style={styles.btn} onPress={() => { setIVSem([...ivsem, []]) }}>
                        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 22 }}> + </Text>
                    </TouchableOpacity>
                </View>
                {ivsem.map((array, index) => (
                    <TextInput
                        key={index}
                        style={styles.textField}
                        placeholder='Subject name'
                        value={ivsem[index] ? ivsem[index] : ''}
                        onChangeText={value => {
                            const updatedArrays = [...ivsem];
                            updatedArrays[index] = value;
                            setIVSem(updatedArrays);
                        }}
                    />
                ))}
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 10 }}>
                    <Text style={{ color: '#407BFF', fontSize: 18, fontWeight: 'bold', margin: 10 }}>V semester</Text>
                    <TouchableOpacity style={styles.btn} onPress={() => { setVSem([...vsem, []]) }}>
                        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 22 }}> + </Text>
                    </TouchableOpacity>
                </View>
                {vsem.map((array, index) => (
                    <TextInput
                        key={index}
                        style={styles.textField}
                        placeholder='Subject name'
                        value={vsem[index] ? vsem[index] : ''}
                        onChangeText={value => {
                            const updatedArrays = [...vsem];
                            updatedArrays[index] = value;
                            setVSem(updatedArrays);
                        }}
                    />
                ))}
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 10 }}>
                    <Text style={{ color: '#407BFF', fontSize: 18, fontWeight: 'bold', margin: 10 }}>VI semester</Text>
                    <TouchableOpacity style={styles.btn} onPress={() => { setVISem([...visem, []]) }}>
                        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 22 }}> + </Text>
                    </TouchableOpacity>
                </View>
                {visem.map((array, index) => (
                    <TextInput
                        key={index}
                        style={styles.textField}
                        placeholder='Subject name'
                        value={visem[index] ? visem[index] : ''}
                        onChangeText={value => {
                            const updatedArrays = [...visem];
                            updatedArrays[index] = value;
                            setVISem(updatedArrays);
                        }}
                    />
                ))}
            </KeyboardAvoidingView>
            <TouchableOpacity style={styles.btn1} onPress={() => { handleUpdate() }}>
                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 18 }}>UPDATE</Text>
            </TouchableOpacity>
        </ScrollView>
    )
}

export default Subjects

const styles = StyleSheet.create({
    btn: {
        width: 30,
        height: 30,
        backgroundColor: '#407BFF',
        color: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10,
        borderRadius: 5,
        shadowOffset: { width: 5, height: 5 },
        shadowColor: 'black',
        shadowOpacity: 0.8,
        shadowRadius: 5,
        elevation: 3,
    },
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
        margin: 15,
        marginLeft: 25
    },
    btn1: {
        width: 320,
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
        marginLeft: 45,
        margin: 20
    },
    label: {
        marginBottom: 0,
        color: 'gray',
        marginLeft: 25,
        marginTop: 10
    },
    header: {
        fontSize: 20,
        fontWeight: 'bold',
        margin: 10,
        marginTop: 15
    },
})
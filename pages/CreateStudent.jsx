import { StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity, ClearText } from 'react-native'
import React, { useState, useEffect } from 'react';
import { RadioButton } from 'react-native-paper';
import Checkbox from 'expo-checkbox';
import Icon from 'react-native-vector-icons/Entypo';
import { CreateStudentAPI, GetSubjects } from '../api';
import { Picker } from '@react-native-picker/picker';
import Toastable, { showToastable } from 'react-native-toastable';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CreateStudent = () => {
    const [stream, setStream] = useState('Science');
    const [degree, setDegree] = useState('Bachelore of Computer Science');
    const [semester, setSemester] = useState('I');
    const [classSection, setClassSection] = useState('III BCA A');
    const [email, setEmail] = useState('');
    const [cgpa, setCgpa] = useState('');
    const [blno, setBlno] = useState('');
    const [blsub, setBlsub] = useState('');
    const [tenth, setTenth] = useState({});
    const [twelth, setTwelth] = useState('');
    const [register_no, setRegisterno] = useState('');
    const [msg, setMsg] = useState('');
    const [showMsg, setShowMsg] = useState('');
    const [subjects, setSubjects] = useState({});
    const [isem, setISem] = useState([]);
    const [iisem, setIISem] = useState([]);
    const [iiisem, setIIISem] = useState([]);
    const [ivsem, setIVSem] = useState([]);
    const [vsem, setVSem] = useState([]);
    const [visem, setVISem] = useState([]);

    const Streams = ['Science', 'Computer Science', 'Commerce', 'Arts'];
    const StreamsCollege = ['Science', 'Commerce', 'Arts'];
    const Degree = ['Bachelore of Science', 'Bachelore of Computer Science', 'Bachelore of Commerce', 'Bachelore of Arts'];
    const Semester = ['I', 'II', 'III', 'IV', 'V', 'VI'];
    const [id, setId] = useState(null);
    const Classes = [
        { value: 'III BCA A' }, { value: 'III BCA B' }, { value: 'II BCA A' }, { value: 'II BCA B' }, { value: 'I BCA A' }, { value: 'I BCA B' }
    ]

    const getData = async () => {
        setId(await AsyncStorage.getItem('admin_id'));
    }

    useEffect(() => {
        if (!id) {
            getData();
        }
        GetSubjects('BCA').then((res) => {
            if (res.status) {
                setSubjects(res.data[0].subject);
            } else {
                setSubjects({});
            }
        })
    }, [id])


    const handleClick = () => {
        const reqbody = {
            stream,
            degree,
            semester,
            classes: classSection,
            CGPA: cgpa,
            email,
            twelth_details: twelth,
            tenth_details: tenth,
            backlog_number: blno,
            backlog_subject: blsub,
            register_no: register_no,
            created_by: id,
            subject_marks: [
                { I: isem }, { II: iisem }, { III: iiisem }, { IV: ivsem }, { V: vsem }, { VI: visem }
            ]
        }

        CreateStudentAPI(reqbody).then((res) => {
            if (res.status) {
                showToastable({
                    message: "Successful!!",
                    duration: 3000,
                    status: 'success'
                })
            } else {
                showToastable({
                    message: res.message,
                    duration: 3000,
                    status: 'info'
                })
            }
        })
    }

    return (
        <View>
            <View style={{ position: 'absolute', width: '100%', height: 100, zIndex: 9999 }}>
                <Toastable statusMap={{
                    success: 'rgba(66, 126, 255, 0.85)',
                    info: 'rgba(0, 0, 0, 0.85)'
                }} />
            </View>
            <ScrollView>
                <View style={{ backgroundColor: 'white', width: "95%", margin: 10, borderRadius: 10, paddingTop: 10 }}>
                    <Text style={styles.header}>Degree Details</Text>
                    <Text style={styles.label}>Stream</Text>
                    <View style={{ flexDirection: 'row', marginLeft: 10 }}>
                        <View style={{ backgroundColor: 'whitesmoke', borderRadius: 25, width: 360, marginLeft: 10 }}>
                            <Picker
                                selectedValue={stream}
                                onValueChange={(itemValue) => {
                                    setStream(itemValue)
                                }}
                            >
                                {Streams.map((item) => <Picker.Item key={item} label={item} value={item} />)}
                            </Picker>
                        </View>
                    </View>
                    <Text style={styles.label}>Degree</Text>
                    <View style={{ flexDirection: 'row', marginLeft: 10 }}>
                        <View style={{ backgroundColor: 'whitesmoke', borderRadius: 25, width: 360, marginLeft: 10 }}>
                            <Picker
                                selectedValue={degree}
                                onValueChange={(itemValue) => {
                                    setDegree(itemValue)
                                }}
                            >
                                {Degree.map((item) => <Picker.Item key={item} label={item} value={item} />)}
                            </Picker>
                        </View>
                    </View>
                    <Text style={styles.label}>Semester</Text>
                    <View style={{ flexDirection: 'row', marginLeft: 10 }}>
                        <View style={{ backgroundColor: 'whitesmoke', borderRadius: 25, width: 360, marginLeft: 10 }}>
                            <Picker
                                selectedValue={semester}
                                onValueChange={(itemValue) => {
                                    setSemester(itemValue)
                                }}
                            >
                                {Semester.map((item) => <Picker.Item key={item} label={item} value={item} />)}
                            </Picker>
                        </View>
                    </View>
                    <Text style={styles.label}>Class & Section</Text>
                    <View style={{ flexDirection: 'row', marginLeft: 10 }}>
                        <View style={{ backgroundColor: 'whitesmoke', borderRadius: 25, width: 360, marginLeft: 10 }}>
                            <Picker
                                selectedValue={classSection}
                                onValueChange={(itemValue) => {
                                    setClassSection(itemValue)
                                }}
                            >
                                {Classes.map((item) => <Picker.Item key={item.value} label={item.value} value={item.value} />)}
                            </Picker>
                        </View>
                    </View>
                    <Text style={styles.label}>Email</Text>
                    <TextInput
                        style={styles.textField}
                        value={email}
                        onChangeText={(e) => { setEmail(e) }}
                    />
                    <Text style={styles.label}>Register No</Text>
                    <TextInput
                        style={styles.textField}
                        value={register_no}
                        onChangeText={(e) => { setRegisterno(e) }}
                        placeholder="e.g. R2013480"
                    />
                    {
                        (semester == 'I' || semester == 'II' || semester == 'III' || semester == 'IV' || semester == 'V' || semester == 'VI') && <View>
                            <Text style={styles.header}>Marks Card</Text>
                            <Text style={{ color: '#407BFF', fontWeight: 'bold', margin: 10 }}>I semester</Text>
                            {subjects && subjects.isem && subjects.isem.length > 0 && subjects.isem.map((item, index) => (<View key={index} style={{ flexDirection: 'row', alignItems: 'center', margin: 5, marginLeft: 20 }}>
                                <Text>{item}</Text>
                                <TextInput
                                    style={{
                                        height: 50,
                                        borderColor: 'transparent',
                                        borderWidth: 1,
                                        width: 160,
                                        padding: 8,
                                        backgroundColor: 'whitesmoke',
                                        fontSize: 16,
                                        marginTop: 0,
                                        borderRadius: 25,
                                        marginLeft: 15
                                    }}
                                    value={isem && isem[index] ? isem[index].marks : ''}
                                    onChangeText={(e) => {
                                        const existingIndex = isem.findIndex(obj => obj.subject === item);
                                        if (existingIndex !== -1) {
                                            // Update marks for existing entry
                                            const updatedArray = [...isem];
                                            updatedArray[existingIndex].marks = e;
                                            setISem(updatedArray);
                                        } else {
                                            // Create a new entry for subject and marks
                                            const newEntry = { subject: item, marks: e };
                                            setISem(prevArray => [...prevArray, newEntry]);
                                        }
                                    }}
                                    placeholder="marks"
                                />
                            </View>))}
                        </View>
                    }

                    {
                        (semester == 'II' || semester == 'III' || semester == 'IV' || semester == 'V' || semester == 'VI') && <View>
                            <Text style={{ color: '#407BFF', fontWeight: 'bold', margin: 10 }} >II semester</Text>
                            {subjects && subjects.iisem && subjects.iisem.length > 0 && subjects.iisem.map((item, index) => (<View key={index} style={{ flexDirection: 'row', alignItems: 'center', margin: 5, marginLeft: 20 }}>
                                <Text>{item}</Text>
                                <TextInput
                                    style={{
                                        height: 50,
                                        borderColor: 'transparent',
                                        borderWidth: 1,
                                        width: 160,
                                        padding: 8,
                                        backgroundColor: 'whitesmoke',
                                        fontSize: 16,
                                        marginTop: 0,
                                        borderRadius: 25,
                                        marginLeft: 15
                                    }}
                                    value={iisem && iisem[index] ? iisem[index].marks : ''}
                                    onChangeText={(e) => {
                                        const existingIndex = iisem.findIndex(obj => obj.subject === item);
                                        if (existingIndex !== -1) {
                                            // Update marks for existing entry
                                            const updatedArray = [...iisem];
                                            updatedArray[existingIndex].marks = e;
                                            setIISem(updatedArray);
                                        } else {
                                            // Create a new entry for subject and marks
                                            const newEntry = { subject: item, marks: e };
                                            setIISem(prevArray => [...prevArray, newEntry]);
                                        }
                                    }}
                                    placeholder="marks"
                                />
                            </View>))}
                        </View>
                    }

                    {
                        (semester == 'III' || semester == 'IV' || semester == 'V' || semester == 'VI') && <View>
                            <Text style={{ color: '#407BFF', fontWeight: 'bold', margin: 10 }}>III semester</Text>
                            {subjects && subjects.iiisem && subjects.iiisem.length > 0 && subjects.iiisem.map((item, index) => (<View key={index} style={{ flexDirection: 'row', alignItems: 'center', margin: 5, marginLeft: 20 }}>
                                <Text>{item}</Text>
                                <TextInput
                                    style={{
                                        height: 50,
                                        borderColor: 'transparent',
                                        borderWidth: 1,
                                        width: 160,
                                        padding: 8,
                                        backgroundColor: 'whitesmoke',
                                        fontSize: 16,
                                        marginTop: 0,
                                        borderRadius: 25,
                                        marginLeft: 15
                                    }}
                                    value={iiisem && iiisem[index] ? iiisem[index].marks : ''}
                                    onChangeText={(e) => {
                                        const existingIndex = iiisem.findIndex(obj => obj.subject === item);
                                        if (existingIndex !== -1) {
                                            // Update marks for existing entry
                                            const updatedArray = [...iiisem];
                                            updatedArray[existingIndex].marks = e;
                                            setIIISem(updatedArray);
                                        } else {
                                            // Create a new entry for subject and marks
                                            const newEntry = { subject: item, marks: e };
                                            setIIISem(prevArray => [...prevArray, newEntry]);
                                        }
                                    }}
                                    placeholder="marks"
                                />
                            </View>))}
                        </View>
                    }

                    {
                        (semester == 'IV' || semester == 'V' || semester == 'VI') && <View>
                            <Text style={{ color: '#407BFF', fontWeight: 'bold', margin: 10 }}>IV semester</Text>
                            {subjects && subjects.ivsem && subjects.ivsem.length > 0 && subjects.ivsem.map((item, index) => (<View key={index} style={{ flexDirection: 'row', alignItems: 'center', margin: 5, marginLeft: 20 }}>
                                <Text>{item}</Text>
                                <TextInput
                                    style={{
                                        height: 50,
                                        borderColor: 'transparent',
                                        borderWidth: 1,
                                        width: 160,
                                        padding: 8,
                                        backgroundColor: 'whitesmoke',
                                        fontSize: 16,
                                        marginTop: 0,
                                        borderRadius: 25,
                                        marginLeft: 15
                                    }}
                                    value={ivsem && ivsem[index] ? ivsem[index].marks : ''}
                                    onChangeText={(e) => {
                                        const existingIndex = ivsem.findIndex(obj => obj.subject === item);
                                        if (existingIndex !== -1) {
                                            // Update marks for existing entry
                                            const updatedArray = [...ivsem];
                                            updatedArray[existingIndex].marks = e;
                                            setIVSem(updatedArray);
                                        } else {
                                            // Create a new entry for subject and marks
                                            const newEntry = { subject: item, marks: e };
                                            setIVSem(prevArray => [...prevArray, newEntry]);
                                        }
                                    }}
                                    placeholder="marks"
                                />
                            </View>))}
                        </View>
                    }

                    {
                        (semester == 'V' || semester == 'VI') && <View>
                            <Text style={{ color: '#407BFF', fontWeight: 'bold', margin: 10 }}>V semester</Text>
                            {subjects && subjects.vsem && subjects.vsem.length > 0 && subjects.vsem.map((item, index) => (<View key={index} style={{ flexDirection: 'row', alignItems: 'center', margin: 5, marginLeft: 20 }}>
                                <Text>{item}</Text>
                                <TextInput
                                    style={{
                                        height: 50,
                                        borderColor: 'transparent',
                                        borderWidth: 1,
                                        width: 160,
                                        padding: 8,
                                        backgroundColor: 'whitesmoke',
                                        fontSize: 16,
                                        marginTop: 0,
                                        borderRadius: 25,
                                        marginLeft: 15
                                    }}
                                    value={vsem && vsem[index] ? vsem[index].marks : ''}
                                    onChangeText={(e) => {
                                        const existingIndex = vsem.findIndex(obj => obj.subject === item);
                                        if (existingIndex !== -1) {
                                            // Update marks for existing entry
                                            const updatedArray = [...vsem];
                                            updatedArray[existingIndex].marks = e;
                                            setVSem(updatedArray);
                                        } else {
                                            // Create a new entry for subject and marks
                                            const newEntry = { subject: item, marks: e };
                                            setVSem(prevArray => [...prevArray, newEntry]);
                                        }
                                    }}
                                    placeholder="marks"
                                />
                            </View>))}
                        </View>
                    }

                    {
                        (semester == 'VI') && <View>
                            <Text style={{ color: '#407BFF', fontWeight: 'bold', margin: 10 }}>VI semester</Text>
                            {subjects && subjects.visem && subjects.visem.length > 0 && subjects.visem.map((item, index) => (<View key={index} style={{ flexDirection: 'row', alignItems: 'center', margin: 5, marginLeft: 20 }}>
                                <Text>{item}</Text>
                                <TextInput
                                    style={{
                                        height: 50,
                                        borderColor: 'transparent',
                                        borderWidth: 1,
                                        width: 160,
                                        padding: 8,
                                        backgroundColor: 'whitesmoke',
                                        fontSize: 16,
                                        marginTop: 0,
                                        borderRadius: 25,
                                        marginLeft: 15
                                    }}
                                    value={visem && visem[index] ? visem[index].marks : ''}
                                    onChangeText={(e) => {
                                        const existingIndex = visem.findIndex(obj => obj.subject === item);
                                        if (existingIndex !== -1) {
                                            // Update marks for existing entry
                                            const updatedArray = [...visem];
                                            updatedArray[existingIndex].marks = e;
                                            setVISem(updatedArray);
                                        } else {
                                            // Create a new entry for subject and marks
                                            const newEntry = { subject: item, marks: e };
                                            setVISem(prevArray => [...prevArray, newEntry]);
                                        }
                                    }}
                                    placeholder="marks"
                                />
                            </View>))}
                        </View>
                    }

                    <Text style={styles.label}>Overall CGPA</Text>
                    <TextInput
                        style={styles.textField}
                        value={cgpa}
                        onChangeText={(e) => { setCgpa(e) }}
                        placeholder="e.g. 9.1"
                    />
                    <View style={styles.divider} />
                    <Text style={styles.header}>Secondary Details</Text>
                    <Text style={styles.label}>School</Text>
                    <TextInput
                        style={styles.textField}
                        value={tenth.school}
                        onChangeText={(e) => { setTenth({ ...tenth, school: e }) }}
                    />
                    <Text style={styles.label}>Board</Text>
                    <TextInput
                        style={styles.textField}
                        value={tenth.board}
                        onChangeText={(e) => { setTenth({ ...tenth, board: e }) }}
                    />
                    <Text style={styles.label}>Year of completion</Text>
                    <TextInput
                        style={styles.textField}
                        value={tenth.yearofcompletion}
                        onChangeText={(e) => { setTenth({ ...tenth, yearofcompletion: e }) }}
                        placeholder='e.g. 2018'
                    />
                    <Text style={styles.label}>Percentage</Text>
                    <TextInput
                        style={styles.textField}
                        value={tenth.percentage}
                        onChangeText={(e) => { setTenth({ ...tenth, percentage: e }) }}
                    />
                    <View style={styles.divider} />
                    <Text style={styles.header}>Senior Secondary Details</Text>
                    <Text style={styles.label}>College</Text>
                    <TextInput
                        style={styles.textField}
                        value={twelth.school}
                        onChangeText={(e) => { setTwelth({ ...twelth, school: e }) }}
                    />
                    <Text style={styles.label}>Board</Text>
                    <TextInput
                        style={styles.textField}
                        value={twelth.board}
                        onChangeText={(e) => { setTwelth({ ...twelth, board: e }) }}
                    />
                    <Text style={styles.label}>Stream</Text>
                    <View style={{ flexDirection: 'row', marginLeft: 10 }}>
                        <View style={{ backgroundColor: 'whitesmoke', borderRadius: 25, width: 360, marginLeft: 10 }}>
                            <Picker
                                selectedValue={twelth.stream}
                                onValueChange={(itemValue) => {
                                    setTwelth({ ...twelth, stream: itemValue })
                                }}
                            >
                                {StreamsCollege.map((item) => <Picker.Item key={item} label={item} value={item} />)}
                            </Picker>
                        </View>
                    </View>
                    <Text style={styles.label}>Year of completion</Text>
                    <TextInput
                        style={styles.textField}
                        value={twelth.yearofcompletion}
                        onChangeText={(e) => { setTwelth({ ...twelth, yearofcompletion: e }) }}
                        placeholder='e.g. 2018'
                    />
                    <Text style={styles.label}>Percentage</Text>
                    <TextInput
                        style={styles.textField}
                        value={twelth.percentage}
                        onChangeText={(e) => { setTwelth({ ...twelth, percentage: e }) }}
                    />
                    <View style={styles.divider} />
                    <Text style={styles.header}>Backlogs</Text>
                    <Text style={styles.label}>Number of backlogs</Text>
                    <TextInput
                        style={styles.textField}
                        value={blno}
                        onChangeText={(e) => { setBlno(e) }}
                        placeholder='e.g. 2'
                    />
                    <Text style={styles.label}>Backlog subjects</Text>
                    <TextInput
                        style={styles.textField}
                        value={blsub}
                        onChangeText={(e) => { setBlsub(e) }}
                        placeholder='e.g. 2'
                    />
                    <TouchableOpacity style={styles.btn} onPress={() => {
                        handleClick()
                    }}>
                        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 18 }}>Create Student</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    )
}

export default CreateStudent

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
    header: {
        fontSize: 20,
        fontWeight: 'bold',
        margin: 10,
        marginTop: 15
    },
    btn: {
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
        marginLeft: 20
    },
    multiline: {
        minHeight: 50,
        borderColor: 'transparent',
        borderWidth: 1,
        width: 360,
        padding: 8,
        backgroundColor: 'whitesmoke',
        marginLeft: 15,
        fontSize: 16,
        textAlign: 'left',
        borderRadius: 25,
    },
    datePickerStyle: {
        width: 230,
    },
    divider: {
        margin: 15,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
    },
    multilines: {
        minHeight: 50,
        borderColor: 'transparent',
        borderWidth: 1,
        width: 320,
        padding: 8,
        backgroundColor: 'whitesmoke',
        marginLeft: 15,
        fontSize: 16,
        textAlign: 'left',
        borderRadius: 25,
    },
    towinone: {
        height: 50,
        borderColor: 'transparent',
        borderWidth: 1,
        width: 160,
        padding: 8,
        backgroundColor: 'whitesmoke',
        fontSize: 16,
        marginTop: 0,
        borderRadius: 25,
        marginLeft: 10
    },
    towinonepro: {
        height: 50,
        borderColor: 'transparent',
        borderWidth: 1,
        width: 180,
        padding: 8,
        backgroundColor: 'whitesmoke',
        fontSize: 16,
        marginTop: 0,
        borderRadius: 25,
        marginLeft: 5
    }
})
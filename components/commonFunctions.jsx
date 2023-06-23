import React, { useRef, useState, useEffect } from "react";
import moment from "moment";
import { StyleSheet, View, TextInput, Pressable, TouchableOpacity, ScrollView, Text, Button, Alert } from 'react-native';
import { GetApplicationsForAdmin, RecruiterDetailsById, UpdateStudentDetailsById } from '../api';
import Icon from 'react-native-vector-icons/FontAwesome';
import Dialog from 'react-native-dialog';
import { Picker } from '@react-native-picker/picker';

export const Capitalize = (text) => {
    return text.charAt(0).toUpperCase() + text.slice(1)
}

export const calculateTimeAgo = (datetime) => {
    const now = moment();
    const time = moment(datetime);
    const diffMinutes = now.diff(time, 'minutes');
    const diffHours = now.diff(time, 'hours');
    console.log(now)

    if (diffMinutes < 1) {
        return 'Just now';
    } else if (diffMinutes === 1) {
        return '1 min ago';
    } else if (diffHours < 1) {
        return `${diffMinutes} mins ago`;
    } else if (diffHours === 1) {
        return '1 hour ago';
    } else if (time.isSame(now, 'day')) {
        return `${diffHours} hours ago`;
    } else if (time.isSame(now.clone().subtract(1, 'days'), 'day')) {
        return 'Yesterday';
    } else {
        return `${moment(datetime).format("DD/MM/YYYY HH:MM")}`;
    }
};

export const OTPInput = ({ code, setCode, maximumLength, setIsPinReady }) => {
    const boxArray = new Array(maximumLength).fill(0);
    const inputRef = useRef();

    const [isInputBoxFocused, setIsInputBoxFocused] = useState(false);

    const handleOnPress = () => {
        setIsInputBoxFocused(true);
        inputRef.current.focus();
    };

    const handleOnBlur = () => {
        setIsInputBoxFocused(false);
    };

    useEffect(() => {
        // update pin ready status
        setIsPinReady(code.length === maximumLength);
        // clean up function
        return () => {
            setIsPinReady(false);
        };
    }, [code]);
    const boxDigit = (_, index) => {
        const emptyInput = "";
        const digit = code[index] || emptyInput;

        const isCurrentValue = index === code.length;
        const isLastValue = index === maximumLength - 1;
        const isCodeComplete = code.length === maximumLength;

        const isValueFocused = isCurrentValue || (isLastValue && isCodeComplete);

        return (
            <View style={isInputBoxFocused && isValueFocused ? styles.SplitBoxesFocused : styles.SplitBoxes} key={index}>
                <Text style={styles.SplitBoxText}>{digit}</Text>
            </View>
        );
    };

    return (
        <View style={styles.OTPInputContainer}>
            <Pressable style={styles.SplitOTPBoxesContainer} onPress={handleOnPress}>
                {boxArray.map(boxDigit)}
            </Pressable>
            <TextInput
                style={styles.TextInputHidden}
                value={code}
                onChangeText={setCode}
                maxLength={maximumLength}
                ref={inputRef}
                onBlur={handleOnBlur}
            />
        </View>
    );
};

export const JobCards = ({ type, id }) => {
    const [details, setDetails] = useState([]);
    const [recruiterdetails, setRecruiterDetails] = useState({});

    useEffect(() => {
        if (type == 'admin') {
            GetApplicationsForAdmin().then((res) => {
                console.log(res);
                if (res.status) {
                    RecruiterDetailsById(res.data[0].recruiter_id).then((resp) => {
                        console.log("Recruiter", resp)
                        if (resp.status) {
                            setRecruiterDetails(resp.data[0]);
                        }
                    })
                    setDetails(res.data);
                }
            })
        }
    }, [id])

    return (<View>
        <ScrollView horizontal >
            {details && details.length > 0 && details.map((item, index) => (
                <View key={index} style={styles.card}>
                    <Text style={{ color: '#407BFF', fontSize: 18, fontWeight: 'bold' }}>{item.job_title}</Text>
                    <Text style={{ color: 'gray', fontStyle: 'italic', }}>Round {item.round}, {item.round_name}</Text>
                    <Text><Icon name="building-o" />{item.company_name} - <Text>{calculateTimeAgo(item.created_at)}</Text></Text>
                    <Text numberOfLines={3} ellipsizeMode='tail' >Eligibility - {item.eligibility}</Text>
                    <Text>{item.due_date}</Text>
                </View>
            ))}
        </ScrollView>
    </View>)
}

export const EditStudentDetails = ({ item }) => {
    const [dialogVisible, setDialogVisible] = useState(false);
    const [stream, setStream] = useState(item.stream);
    const [degree, setDegree] = useState(item.degree);
    const [semester, setSemester] = useState(item.semester);
    const [classSection, setClassSection] = useState(item.class);
    const [email, setEmail] = useState(item.email);
    const [cgpa, setCgpa] = useState(item.cgpa);
    const [blno, setBlno] = useState(item.backlog_number);
    const [blsub, setBlsub] = useState(item.backlog_subject);
    const [tenth, setTenth] = useState(item.tenth_details);
    const [twelth, setTwelth] = useState(item.twelth_details);
    const [register_no, setRegisterno] = useState(item.register_no);
    const [msg, setMsg] = useState('');
    const [showMsg, setShowMsg] = useState('');

    const Streams = ['Science', 'Computer Science', 'Commerce', 'Arts'];
    const StreamsCollege = ['Science', 'Commerce', 'Arts'];
    const Degree = ['Bachelore of Science', 'Bachelore of Computer Application', 'Bachelore of Commerce', 'Bachelore of Arts'];
    const Semester = ['I', 'II', 'III', 'IV', 'V', 'VI'];
    const [id, setId] = useState(null);
    const Classes = [
        { value: 'III BCA A' }, { value: 'III BCA B' }, { value: 'II BCA A' }, { value: 'II BCA B' }, { value: 'I BCA A' }, { value: 'I BCA B' }
    ]

    const showDialog = () => {
        setDialogVisible(true);
    };

    const handleCancel = () => {
        setDialogVisible(false);
    };

    const handleConfirm = () => {
        const reqbody = {
            stream,
            degree,
            semester,
            class: classSection,
            CGPA: cgpa,
            email,
            twelth_details: twelth,
            tenth_details: tenth,
            backlog_number: blno,
            backlog_subject: blsub,
            register_no: register_no
        }

        UpdateStudentDetailsById(reqbody, item.student_id).then((res) => {
            console.log("response", res);
            if (res.status) {
                setDialogVisible(false);
            }
        })
    };

    return (
        <View>
            <TouchableOpacity style={styles.cardStud} onPress={showDialog}>
                <Text style={{ color: '#407BFF', fontSize: 16, fontWeight: 'bold' }}>{item.register_no}</Text>
                <Text style={{ fontSize: 16 }}>{item.email}</Text>
                <Text>{item.cgpa} CGPA</Text>
                <Text>{item.degree}</Text>
                <Text>{item.semester} Semester</Text>
                <Text>{item.class}</Text>
            </TouchableOpacity>
            <Dialog.Container visible={dialogVisible}>
                <Dialog.Title>Student Details</Dialog.Title>
                <ScrollView>
                    <View style={{ backgroundColor: 'white', width: "95%", margin: 10, borderRadius: 10, paddingTop: 10 }}>
                        <Text style={styles.header}>Degree Details</Text>
                        <Text style={styles.label}>Stream</Text>
                        <View style={{ flexDirection: 'row', marginLeft: 10 }}>
                            <View style={{ backgroundColor: 'whitesmoke', borderRadius: 25, width: 300, marginLeft: 10 }}>
                                <Picker
                                    selectedValue={stream}
                                    onValueChange={(itemValue) => {
                                        setStream(itemValue)
                                    }
                                    }>
                                    {Streams.map((item) => <Picker.Item key={item} label={item} value={item} />)}
                                </Picker>
                            </View>
                        </View>
                        <Text style={styles.label}>Degree</Text>
                        <View style={{ flexDirection: 'row', marginLeft: 10 }}>
                            <View style={{ backgroundColor: 'whitesmoke', borderRadius: 25, width: 300, marginLeft: 10 }}>
                                <Picker
                                    selectedValue={degree}
                                    onValueChange={(itemValue) => {
                                        setDegree(itemValue)
                                    }
                                    }>
                                    {Degree.map((item) => <Picker.Item key={item} label={item} value={item} />)}
                                </Picker>
                            </View>
                        </View>
                        <Text style={styles.label}>Semester</Text>
                        <View style={{ flexDirection: 'row', marginLeft: 10 }}>
                            <View style={{ backgroundColor: 'whitesmoke', borderRadius: 25, width: 300, marginLeft: 10 }}>
                                <Picker
                                    selectedValue={semester}
                                    onValueChange={(itemValue) => {
                                        setSemester(itemValue)
                                    }
                                    }>
                                    {Semester.map((item) => <Picker.Item key={item} label={item} value={item} />)}
                                </Picker>
                            </View>
                        </View>
                        <Text style={styles.label}>Class & Section</Text>
                        <View style={{ flexDirection: 'row', marginLeft: 10 }}>
                            <View style={{ backgroundColor: 'whitesmoke', borderRadius: 25, width: 300, marginLeft: 10 }}>
                                <Picker
                                    selectedValue={classSection}
                                    onValueChange={(itemValue) => {
                                        setClassSection(itemValue)
                                    }
                                    }>
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
                            <View style={{ backgroundColor: 'whitesmoke', borderRadius: 25, width: 300, marginLeft: 10 }}>
                                <Picker
                                    selectedValue={twelth.stream}
                                    onValueChange={(itemValue) => {
                                        setTwelth({ ...twelth, stream: itemValue })
                                    }
                                    }>
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
                    </View>
                </ScrollView>
                <Dialog.Button label="Cancel" style={{ color: '#407BFF', marginRight: 10 }} onPress={handleCancel} />
                <Dialog.Button label="Confirm" style={{ color: 'white', backgroundColor: '#407BFF', marginLeft: 10, borderRadius: 5 }} onPress={handleConfirm} />
            </Dialog.Container>
        </View>
    );
}

export const styles = StyleSheet.create({
    OTPInputContainer: {
        justifyContent: "center",
        alignItems: "center",
    }, textInputView: {
        borderBottomWidth: 1,
        width: 35,
        borderBottomColor: '#407BFF',
        justifyContent: 'center',
        alignItems: 'center'
    }, textInputStyle: {
        fontSize: 20
    },
    SplitOTPBoxesContainer: {
        width: "80%",
        flexDirection: "row",
        justifyContent: "space-evenly",
    },
    TextInputHidden: {
        borderColor: "#e5e5e5",
        borderWidth: "1px",
        borderRadius: "5px",
        padding: "15px",
        marginTop: "50px",
        color: "white",
        position: "absolute",
        opacity: 0,
    },
    SplitBoxes: {
        borderColor: "#e5e5e5",
        borderEidth: "2px",
        borderRadius: "5px",
        padding: "12px",
        width: "50px",
    },
    SplitBoxesFocused: {
        borderColor: "#ecdbba",
        backgroundColor: "gray",
    },
    SplitBoxText: {
        fontSize: "20px",
        textAlign: "center",
        color: "#e5e5e5",
    }, card: {
        backgroundColor: 'white',
        width: 220,
        height: 220,
        padding: 15,
        margin: 8,
        borderRadius: 10,
        shadowOffset: { width: 5, height: 5 },
        shadowColor: 'black',
        shadowOpacity: 0.8,
        shadowRadius: 5,
        elevation: 3,
    },
    cardStud: {
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
    textField: {
        height: 50,
        borderColor: 'transparent',
        borderWidth: 1,
        width: 300,
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
        width: 300,
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
    }, divider: {
        margin: 15,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
    },
})

import React, { useRef, useState, useEffect } from "react";
import moment from "moment";
import { StyleSheet, View, TextInput, Pressable, TouchableOpacity, ScrollView, Text, Button, Alert, Linking } from 'react-native';
import {
    GetApplicationsForAdmin, RecruiterDetailsById, UpdateStudentDetailsById,
    UpdateApplicationStatusById, Responsetoquery
} from '../api';
import Icon from 'react-native-vector-icons/FontAwesome';
import Iconz from 'react-native-vector-icons/Ionicons';
import Iconf from 'react-native-vector-icons/Foundation';
import Iconm from 'react-native-vector-icons/MaterialIcons';
import Icona from 'react-native-vector-icons/AntDesign';
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
                if (res.status) {
                    RecruiterDetailsById(res.data[0].recruiter_id).then((resp) => {
                        if (resp.status) {
                            setRecruiterDetails(resp.data[0]);
                        }
                    })
                    setDetails(res.data);
                }
            })
        }
    }, [id])

    return (
        <View>
            <ScrollView horizontal >
                {details && details.length > 0 && details.map((item, index) => (
                    <TouchableOpacity key={index} style={styles.card}>
                        <Text style={{ color: '#407BFF', fontSize: 16, fontWeight: 'bold' }}>{item.job_title}</Text>
                        <Text><Icon name="building-o" color="#407BFF" /> {item.company_name} - <Text>{calculateTimeAgo(item.created_at)}</Text></Text>
                        <View style={styles.divider} />
                        <Text><Icon name="suitcase" color="#407BFF" /> {Capitalize(item.opportunity_type)}</Text>
                        <Text><Iconz name="location-outline" color="#407BFF" /> {item.location} Koramangala</Text>
                        <Text><Icon name="money" color="#407BFF" /> {item.ctc1} CTC</Text>
                        <Text><Iconz name="hourglass-outline" color="#407BFF" /> Apply by {item.due_date}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    )
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

export const ActionJobCard = ({ item, fetch, setFetch }) => {
    const [dialogVisible, setDialogVisible] = useState(false);
    const [recruiterDetails, setRecruiterDetails] = useState({});
    //console.log("Items", item);
    const showDialog = () => {
        setDialogVisible(true);
    };

    const handleCancel = () => {
        setDialogVisible(false);
    };

    const handleConfirm = () => {
        const reqbody = { status: 'approved' };
        Alert.alert('Are you sure?', '', [
            {
                text: "Yes",
                onPress: () => {
                    UpdateApplicationStatusById(reqbody, item.application_id).then((res) => {
                        //console.log("ITS RESPONSE", res);
                        if (res.status) {
                            setDialogVisible(false);
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

    const handleReject = () => {
        const reqbody = { status: 'rejected' };
        Alert.alert('Are you sure?', '', [
            {
                text: "Yes",
                onPress: () => {
                    UpdateApplicationStatusById(reqbody, item.application_id).then((res) => {
                        if (res.status) {
                            setDialogVisible(false);
                            setFetch(!fetch);
                            console.log("coming here")
                        }
                    })
                },
            },
            {
                text: "No",
            },
        ])
    }

    useEffect(() => {
        RecruiterDetailsById(item.recruiter_id).then((res) => {
            if (res.status) {
                setRecruiterDetails(res.data[0]);
            }
        })
    }, [item])

    const WebLink = ({ url }) => {
        const handleLinkPress = () => {
            // Open the web link in the default browser
            Linking.openURL(url);
        };

        return (
            <Text onPress={handleLinkPress} style={{ color: '#407BFF', marginBottom: 8 }}>
                Know more
            </Text>
        );
    };

    return (
        <View style={{ margin: 10, backgroundColor: 'whitesmoke', borderRadius: 10, padding: 10 }}>
            <TouchableOpacity style={styles.cardJob} onPress={showDialog}>
                <Text style={{ fontSize: 18, color: '#407BFF', fontWeight: 'bold' }}>{item.job_title}</Text>
                <Text style={{ fontSize: 14, color: 'gray' }}><Icon name="building-o" color="#407BFF" /> {item.company_name}</Text>
                <View style={{ marginTop: 20 }}></View>
                <Text><Icon name="suitcase" color="#407BFF" /> {Capitalize(item.opportunity_type)}</Text>
                <Text><Iconm name="not-started" color="#407BFF" /> Starts {item.job_start_date}</Text>
                <Text><Icona name="profile" color="#407BFF" /> Round -{item.round} {item.round_name}</Text>
                <Text><Iconz name="location-outline" color="#407BFF" /> {item.location}</Text>
                <Text><Icon name="money" color="#407BFF" /> ₹{item.stipend_amt}{item.stipend_per}</Text>
                <Text><Icon name="calendar" color="#407BFF" /> Duration - {item.ctc1} {item.ctc2}</Text>
                <Text><Iconz name="hourglass-outline" color="#407BFF" /> Apply by {item.due_date}</Text>
                <Text><Iconz name="refresh" color="#407BFF" /> Posted {calculateTimeAgo(item.created_at)}</Text>
            </TouchableOpacity>
            <Dialog.Container visible={dialogVisible}>
                <Dialog.Title>Application Details</Dialog.Title>
                <ScrollView>
                    <Text style={{ fontSize: 18, color: '#407BFF', fontWeight: 'bold' }}>{item.job_title}</Text>
                    <Text style={{ fontSize: 14, color: 'gray' }}><Icon name="building-o" color="#407BFF" /> {item.company_name}</Text>
                    <View style={{ marginTop: 20 }}></View>
                    <Text><Icon name="suitcase" color="#407BFF" /> {Capitalize(item.opportunity_type)}</Text>
                    <Text><Iconm name="not-started" color="#407BFF" /> Starts {item.job_start_date}</Text>
                    <Text><Icona name="profile" color="#407BFF" /> Round -{item.round} {item.round_name}</Text>
                    <Text><Iconz name="location-outline" color="#407BFF" /> {item.location}</Text>
                    <Text><Icon name="money" color="#407BFF" /> ₹{item.stipend_amt}{item.stipend_per}</Text>
                    <Text><Icon name="calendar" color="#407BFF" /> Duration - {item.ctc1} {item.ctc2}</Text>
                    <Text><Iconz name="hourglass-outline" color="#407BFF" /> Apply by {item.due_date}</Text>
                    <Text><Iconz name="refresh" color="#407BFF" /> Posted {calculateTimeAgo(item.created_at)}</Text>
                    <View style={styles.divider} />
                    <Text style={{ fontSize: 16, fontWeight: 'bold' }}>About {item.company_name}</Text>
                    {recruiterDetails && <WebLink url={recruiterDetails.url} />}
                    <Text>{recruiterDetails && recruiterDetails.description}</Text>
                    <Text style={{ fontSize: 16, fontWeight: 'bold' }}>About the {Capitalize(item.opportunity_type)}</Text>

                    <Text style={{ fontSize: 14, color: '#407BFF', fontStyle: 'italic', marginTop: 10, marginBottom: 10 }}>Selected candidate's day-to-day responsibilites include:</Text>
                    <Text>{item.job_description}</Text>
                    <Text style={{ fontSize: 16, fontWeight: 'bold', marginTop: 10, marginBottom: 10 }}>Skill(s) required</Text>
                    <Text>{item.skills}</Text>
                    <Text style={{ fontSize: 16, fontWeight: 'bold', marginTop: 10, marginBottom: 10 }}>Eligibility</Text>
                    <Text>{item.eligibility}</Text>
                    <Text style={{ fontSize: 16, fontWeight: 'bold', marginTop: 10, marginBottom: 10 }}>Preferred candidate</Text>
                    <Text>{item.preference}</Text>
                    <Text style={{ fontSize: 16, fontWeight: 'bold', marginTop: 10, marginBottom: 10 }}>Perks</Text>
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                        {item.perks1 && <Text style={{ backgroundColor: 'whitesmoke', padding: 10, borderRadius: 20, margin: 3 }}>{item.perks1}</Text>}
                        {item.perks2 && <Text style={{ backgroundColor: 'whitesmoke', padding: 10, borderRadius: 20, margin: 3 }}> {item.perks2}</Text>}
                        {item.perks3 && <Text style={{ backgroundColor: 'whitesmoke', padding: 10, borderRadius: 20, margin: 3 }}> {item.perks3}</Text>}
                        {item.perks4 && <Text style={{ backgroundColor: 'whitesmoke', padding: 10, borderRadius: 20, margin: 3 }}>{item.perks4}</Text>}
                        {item.perks5 && <Text style={{ backgroundColor: 'whitesmoke', padding: 10, borderRadius: 20, margin: 3 }}>{item.perks5}</Text>}
                        {item.perks6 && <Text style={{ backgroundColor: 'whitesmoke', padding: 10, borderRadius: 20, margin: 3 }}>{item.perks6}</Text>}
                        {item.perks7 && <Text style={{ backgroundColor: 'whitesmoke', padding: 10, borderRadius: 20, margin: 3 }}>{item.perks7}</Text>}
                    </View>
                    <Text style={{ fontSize: 16, fontWeight: 'bold', marginTop: 10, marginBottom: 10 }}>Number of openings</Text>
                    <Text>{item.number_of_openings}</Text>
                </ScrollView>
                <Dialog.Button label="Cancel" style={{ color: '#407BFF', marginRight: 10 }} onPress={handleCancel} />
                <Dialog.Button label="Reject" style={{ color: 'red', marginRight: 10 }} onPress={handleReject} />
                <Dialog.Button label="Approve" style={{ color: 'white', backgroundColor: '#407BFF', marginLeft: 10, borderRadius: 5 }} onPress={handleConfirm} />
            </Dialog.Container>
        </View>
    )
}

export const JobViewCard = ({ item, type, navigation }) => {
    const [dialogVisible, setDialogVisible] = useState(false);
    const [recruiterDetails, setRecruiterDetails] = useState({});

    useEffect(() => {
        RecruiterDetailsById(item.recruiter_id).then((res) => {
            if (res.status) {
                setRecruiterDetails(res.data[0]);
            }
        })
    }, [item])

    const showDialog = () => {
        setDialogVisible(true);
    };

    const handleCancel = () => {
        setDialogVisible(false);
    };

    const WebLink = ({ url }) => {
        const handleLinkPress = () => {
            // Open the web link in the default browser
            Linking.openURL(url);
        };

        return (
            <Text onPress={handleLinkPress} style={{ color: '#407BFF', marginBottom: 8 }}>
                Know more
            </Text>
        );
    };

    const handleNav = () => {
        setDialogVisible(false);
        navigation.navigate('EditApplication', { id: item.application_id });
    }

    return (
        <View style={{ margin: 10, backgroundColor: 'whitesmoke', borderRadius: 10, padding: 10 }}>
            <TouchableOpacity style={styles.cardJob} onPress={showDialog}>
                <Text style={{ fontSize: 18, color: '#407BFF', fontWeight: 'bold' }}>{item.job_title}</Text>
                <Text style={{ fontSize: 14, color: 'gray' }}><Icon name="building-o" color="#407BFF" /> {item.company_name}</Text>
                <View style={{ marginTop: 20 }}></View>
                <Text><Icon name="suitcase" color="#407BFF" /> {Capitalize(item.opportunity_type)}</Text>
                <Text><Iconm name="not-started" color="#407BFF" /> Starts {item.job_start_date}</Text>
                <Text><Icona name="profile" color="#407BFF" /> Round -{item.round} {item.round_name}</Text>
                <Text><Iconz name="location-outline" color="#407BFF" /> {item.location}</Text>
                <Text><Icon name="money" color="#407BFF" /> ₹{item.stipend_amt}{item.stipend_per}</Text>
                <Text><Icon name="calendar" color="#407BFF" /> Duration - {item.ctc1} {item.ctc2}</Text>
                <Text><Iconz name="hourglass-outline" color="#407BFF" /> Apply by {item.due_date}</Text>
                {type == 'recruiter' ? <Text><Iconz name="refresh" color="#407BFF" /> Posted {calculateTimeAgo(item.created_at)}</Text> : <Text><Iconz name="refresh" color="#407BFF" /> Posted {calculateTimeAgo(item.updated_At)}</Text> }
                {type == 'recruiter' && <Text style={{ color: item.status == 'pending' ? "gray" : item.status == 'rejected' ? "red" : "#407BFF" }}><Iconf name="alert" color={item.status == 'pending' ? "gray" : item.status == 'rejected' ? "red" : "#407BFF"} /> {Capitalize(item.status)}</Text>}
            </TouchableOpacity>
            <Dialog.Container visible={dialogVisible}>
                <Dialog.Title>Application Details</Dialog.Title>
                <ScrollView>
                    <Text style={{ fontSize: 18, color: '#407BFF', fontWeight: 'bold' }}>{item.job_title}</Text>
                    <Text style={{ fontSize: 14, color: 'gray' }}><Icon name="building-o" color="#407BFF" /> {item.company_name}</Text>
                    <View style={{ marginTop: 20 }}></View>
                    <Text><Icon name="suitcase" color="#407BFF" /> {Capitalize(item.opportunity_type)}</Text>
                    <Text><Iconm name="not-started" color="#407BFF" /> Starts {item.job_start_date}</Text>
                    <Text><Icona name="profile" color="#407BFF" /> Round -{item.round} {item.round_name}</Text>
                    <Text><Iconz name="location-outline" color="#407BFF" /> {item.location}</Text>
                    <Text><Icon name="money" color="#407BFF" /> ₹{item.stipend_amt}{item.stipend_per}</Text>
                    <Text><Icon name="calendar" color="#407BFF" /> Duration - {item.ctc1} {item.ctc2}</Text>
                    <Text><Iconz name="hourglass-outline" color="#407BFF" /> Apply by {item.due_date}</Text>
                    <Text><Iconz name="refresh" color="#407BFF" /> Posted {calculateTimeAgo(item.created_at)}</Text>
                    <View style={styles.divider} />
                    <Text style={{ fontSize: 16, fontWeight: 'bold' }}>About {item.company_name}</Text>
                    {recruiterDetails && <WebLink url={recruiterDetails.url} />}
                    <Text>{recruiterDetails && recruiterDetails.description}</Text>
                    <Text style={{ fontSize: 16, fontWeight: 'bold' }}>About the {Capitalize(item.opportunity_type)}</Text>

                    <Text style={{ fontSize: 14, color: '#407BFF', fontStyle: 'italic', marginTop: 10, marginBottom: 10 }}>Selected candidate's day-to-day responsibilites include:</Text>
                    <Text>{item.job_description}</Text>
                    <Text style={{ fontSize: 16, fontWeight: 'bold', marginTop: 10, marginBottom: 10 }}>Skill(s) required</Text>
                    <Text>{item.skills}</Text>
                    <Text style={{ fontSize: 16, fontWeight: 'bold', marginTop: 10, marginBottom: 10 }}>Eligibility</Text>
                    <Text>{item.eligibility}</Text>
                    <Text style={{ fontSize: 16, fontWeight: 'bold', marginTop: 10, marginBottom: 10 }}>Preferred candidate</Text>
                    <Text>{item.preference}</Text>
                    <Text style={{ fontSize: 16, fontWeight: 'bold', marginTop: 10, marginBottom: 10 }}>Perks</Text>
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                        {item.perks1 && <Text style={{ backgroundColor: 'whitesmoke', padding: 10, borderRadius: 20, margin: 3 }}>{item.perks1}</Text>}
                        {item.perks2 && <Text style={{ backgroundColor: 'whitesmoke', padding: 10, borderRadius: 20, margin: 3 }}> {item.perks2}</Text>}
                        {item.perks3 && <Text style={{ backgroundColor: 'whitesmoke', padding: 10, borderRadius: 20, margin: 3 }}> {item.perks3}</Text>}
                        {item.perks4 && <Text style={{ backgroundColor: 'whitesmoke', padding: 10, borderRadius: 20, margin: 3 }}>{item.perks4}</Text>}
                        {item.perks5 && <Text style={{ backgroundColor: 'whitesmoke', padding: 10, borderRadius: 20, margin: 3 }}>{item.perks5}</Text>}
                        {item.perks6 && <Text style={{ backgroundColor: 'whitesmoke', padding: 10, borderRadius: 20, margin: 3 }}>{item.perks6}</Text>}
                        {item.perks7 && <Text style={{ backgroundColor: 'whitesmoke', padding: 10, borderRadius: 20, margin: 3 }}>{item.perks7}</Text>}
                    </View>
                    <Text style={{ fontSize: 16, fontWeight: 'bold', marginTop: 10, marginBottom: 10 }}>Number of openings</Text>
                    <Text>{item.number_of_openings}</Text>
                </ScrollView>
                <Dialog.Button label="Close" style={{ color: '#407BFF', marginRight: 10 }} onPress={handleCancel} />
                {type == 'recruiter' && (item.status == 'rejected' || item.status == 'pending') && <Dialog.Button label="Edit" style={{ color: '#407BFF', marginRight: 10 }} onPress={handleNav} />}
            </Dialog.Container>
        </View>
    )
}

export const ViewQueries = ({ item, setFetch, fetch }) => {
    const [dialogVisible, setDialogVisible] = useState(false);
    const [reply, setReply] = useState('');
    const showDialog = () => {
        setDialogVisible(true);
    };

    const handleCancel = () => {
        setDialogVisible(false);
    };

    const handleConfirm = () => {
        const reqbody = { reply: reply };
        Alert.alert('Are you sure?', '', [
            {
                text: "Yes",
                onPress: () => {
                    Responsetoquery(item.query_id, reqbody).then((res) => {
                        if (res.status) {
                            setDialogVisible(false);
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

    return (
        <View>
            <TouchableOpacity style={{
                backgroundColor: 'whitesmoke',
                width: '96%',
                margin: 8,
                borderRadius: 20,
                shadowOffset: { width: 5, height: 5 },
                shadowColor: 'black',
                shadowOpacity: 0.3,
                shadowRadius: 3,
                elevation: 1,
                padding: 10
            }} onPress={showDialog}>
                <Text style={{ fontWeight: 'bold', fontSize: 16 }}> By {item.fullname} ({Capitalize(item.type)})</Text>
                <Text> Sent {calculateTimeAgo(item.created_at)}</Text>
                <View style={styles.divider} />
                <Text style={{ fontSize: 16 }}>Query: {item.message}</Text>
                {item.reply && <Text style={{ fontSize: 16, marginTop: 5 }}>Reply: {item.reply}</Text>}
            </TouchableOpacity>
            {
                !item.reply && <Dialog.Container visible={dialogVisible}>
                    <Dialog.Title>Reply to {item.fullname}</Dialog.Title>
                    <Text style={{ marginLeft: 10 }}>{item.message}</Text>
                    <TextInput
                        style={{
                            height: 50,
                            borderColor: 'transparent',
                            borderWidth: 1,
                            width: 300,
                            padding: 8,
                            backgroundColor: 'whitesmoke',
                            fontSize: 16,
                            marginTop: 10,
                            borderRadius: 25,
                            marginLeft: 0
                        }}
                        value={reply}
                        onChangeText={(e) => setReply(e)}
                        placeholder="Your response"
                    />
                    <Dialog.Button label="Cancle" style={{ color: '#407BFF', marginRight: 10 }} onPress={handleCancel} />
                    <Dialog.Button label="Send" style={{ color: '#407BFF', marginRight: 10 }} onPress={handleConfirm} />
                </Dialog.Container>
            }
        </View>
    )
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

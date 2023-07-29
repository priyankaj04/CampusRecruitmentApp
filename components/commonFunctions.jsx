import React, { useRef, useState, useEffect } from "react";
import moment from "moment";
import { StyleSheet, View, TextInput, Pressable, TouchableOpacity, ScrollView, Text, Button, Alert, Linking } from 'react-native';
import {
    GetApplicationsForAdmin, RecruiterDetailsById, UpdateStudentDetailsById, TalentDetailsById, ResumeDetailsByTalentID, GetInterviewDetails,
    UpdateApplicationStatusById, Responsetoquery, ApplicantsByTidAid, DecisionApplicant, GetStudentByEmail, SaveApplication, RemoveSavedApplication
} from '../api';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icone from 'react-native-vector-icons/Entypo';
import Iconz from 'react-native-vector-icons/Ionicons';
import Iconf from 'react-native-vector-icons/Foundation';
import Iconm from 'react-native-vector-icons/MaterialIcons';
import Icona from 'react-native-vector-icons/AntDesign';
import Dialog from 'react-native-dialog';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MotiView } from 'moti';

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
                        {item.job_type == 'Remote' ? <Text><Iconz name="home" color="#407BFF" /> Work from Home</Text> : <Text><Iconz name="location-outline" color="#407BFF" /> {item.location}</Text>}
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
    const [isem, setISem] = useState(item.subject_marks[0].I);
    const [iisem, setIISem] = useState(item.subject_marks[1].II);
    const [iiisem, setIIISem] = useState(item.subject_marks[2].III);
    const [ivsem, setIVSem] = useState(item.subject_marks[3].IV);
    const [vsem, setVSem] = useState(item.subject_marks[4].V);
    const [visem, setVISem] = useState(item.subject_marks[5].VI);
    const [batch, setBatch] = useState(item.batch);

    const Streams = ['Science', 'Computer Science', 'Commerce', 'Arts'];
    const StreamsCollege = ['Science', 'Commerce', 'Arts'];
    const Degree = [
        { label: 'Bachelore of Science', value: 'BSc' },
        { label: 'Bachelore of Computer Application', value: 'BCA' },
        { label: 'Bachelore of Vocational Course - IT', value: 'BVoc' },
        { label: 'Bachelore of Commerce', value: 'BCom' },
        { label: 'Bachelore of Business Administration', value: 'BBA' },
        { label: 'Bachelore of Arts', value: 'BA' }
    ];
    const Semester = ['I', 'II', 'III', 'IV', 'V', 'VI'];
    const Classes = [
        { value: 'III BCA A' }, { value: 'III BCA B' }, { value: 'II BCA A' }, { value: 'II BCA B' }, { value: 'I BCA A' }, { value: 'I BCA B' }
    ]

    const Batch = [
        { value: '2019-2022', label: '2019-2022' },
        { value: '2020-2023', label: '2020-2023' },
        { value: '2021-2024', label: '2021-2024' },
        { value: '2022-2025', label: '2022-2025' },
        { value: '2023-2026', label: '2023-2026' }
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
            register_no: register_no,
            subject_marks: [
                { I: isem },
                { II: iisem },
                { III: iiisem },
                { IV: ivsem },
                { V: vsem },
                { VI: visem }
            ],
            batch
        }
        UpdateStudentDetailsById(reqbody, item.student_id).then((res) => {
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
                                    {Degree.map((item) => <Picker.Item key={item.value} label={item.label} value={item.value} />)}
                                </Picker>
                            </View>
                        </View>
                        <Text style={styles.label}>Batch</Text>
                        <View style={{ flexDirection: 'row', marginLeft: 10 }}>
                            <View style={{ backgroundColor: 'whitesmoke', borderRadius: 25, width: 300, marginLeft: 10 }}>
                                <Picker
                                    selectedValue={batch}
                                    onValueChange={(itemValue) => {
                                        setBatch(itemValue)
                                    }
                                    }>
                                    {Batch.map((item) => <Picker.Item key={item.value} label={item.label} value={item.value} />)}
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
                        {
                            (semester == 'I' || semester == 'II' || semester == 'III' || semester == 'IV' || semester == 'V' || semester == 'VI') && <View>
                                <Text style={styles.header}>Marks Card</Text>
                                <Text style={{ color: '#407BFF', fontWeight: 'bold', margin: 10 }}>I semester</Text>
                                {isem && isem.length > 0 && isem.map((item, index) => (<View key={index} style={{ flexDirection: 'row', alignItems: 'center', margin: 5, marginLeft: 20 }}>
                                    <Text>{item.subject}</Text>
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
                                            const existingIndex = isem.findIndex(obj => obj.subject === item.subject);
                                            if (existingIndex !== -1) {
                                                // Update marks for existing entry
                                                const updatedArray = [...isem];
                                                updatedArray[existingIndex].marks = e;
                                                setISem(updatedArray);
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
                                {iisem && iisem.length > 0 && iisem.map((item, index) => (<View key={index} style={{ flexDirection: 'row', alignItems: 'center', margin: 5, marginLeft: 20 }}>
                                    <Text>{item.subject}</Text>
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
                                            const existingIndex = iisem.findIndex(obj => obj.subject === item.subject);
                                            if (existingIndex !== -1) {
                                                // Update marks for existing entry
                                                const updatedArray = [...iisem];
                                                updatedArray[existingIndex].marks = e;
                                                setIISem(updatedArray);
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
                                {iiisem && iiisem.length > 0 && iiisem.map((item, index) => (<View key={index} style={{ flexDirection: 'row', alignItems: 'center', margin: 5, marginLeft: 20 }}>
                                    <Text>{item.subject}</Text>
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
                                            const existingIndex = iiisem.findIndex(obj => obj.subject === item.subject);
                                            if (existingIndex !== -1) {
                                                // Update marks for existing entry
                                                const updatedArray = [...iiisem];
                                                updatedArray[existingIndex].marks = e;
                                                setIIISem(updatedArray);
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
                                {ivsem && ivsem.length > 0 && ivsem.map((item, index) => (<View key={index} style={{ flexDirection: 'row', alignItems: 'center', margin: 5, marginLeft: 20 }}>
                                    <Text>{item.subject}</Text>
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
                                            const existingIndex = ivsem.findIndex(obj => obj.subject === item.subject);
                                            if (existingIndex !== -1) {
                                                // Update marks for existing entry
                                                const updatedArray = [...ivsem];
                                                updatedArray[existingIndex].marks = e;
                                                setIVSem(updatedArray);
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
                                {vsem && vsem.length > 0 && vsem.map((item, index) => (<View key={index} style={{ flexDirection: 'row', alignItems: 'center', margin: 5, marginLeft: 20 }}>
                                    <Text>{item.subject}</Text>
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
                                            const existingIndex = vsem.findIndex(obj => obj.subject === item.subject);
                                            if (existingIndex !== -1) {
                                                // Update marks for existing entry
                                                const updatedArray = [...vsem];
                                                updatedArray[existingIndex].marks = e;
                                                setVSem(updatedArray);
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
                                {visem && visem.length > 0 && visem.map((item, index) => (<View key={index} style={{ flexDirection: 'row', alignItems: 'center', margin: 5, marginLeft: 20 }}>
                                    <Text>{item.subject}</Text>
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
                                            const existingIndex = visem.findIndex(obj => obj.subject === item.subject);
                                            if (existingIndex !== -1) {
                                                // Update marks for existing entry
                                                const updatedArray = [...visem];
                                                updatedArray[existingIndex].marks = e;
                                                setVISem(updatedArray);
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
            setDialogVisible(false);
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
                {item.job_start_date && <Text><Iconm name="not-started" color="#407BFF" /> Starts {item.job_start_date}</Text>}
                <Text><Icona name="profile" color="#407BFF" /> Round -{item.round} {item.round_name}</Text>
                {item.job_type == 'Remote' ? <Text><Iconz name="home" color="#407BFF" /> Work from Home</Text> : <Text><Iconz name="location-outline" color="#407BFF" /> {item.location}</Text>}
                <Text><Icon name="money" color="#407BFF" />{item.opportunity_type == 'internship' ? `₹${item.stipend_amt}${item.stipend_per}` : `₹${item.ctc1} to ${item.ctc2} LPA`}</Text>
                {item.job_start_date && <Text><Icon name="calendar" color="#407BFF" /> Duration - {item.ctc1} {item.ctc2}</Text>}
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
                    {item.job_start_date && <Text><Iconm name="not-started" color="#407BFF" /> Starts {item.job_start_date}</Text>}
                    <Text><Icona name="profile" color="#407BFF" /> Round -{item.round} {item.round_name}</Text>
                    {item.job_type == 'Remote' ? <Text><Iconz name="home" color="#407BFF" /> Work from Home</Text> : <Text><Iconz name="location-outline" color="#407BFF" /> {item.location}</Text>}
                    <Text><Icon name="money" color="#407BFF" />{item.opportunity_type == 'internship' ? `₹${item.stipend_amt}${item.stipend_per}` : `₹${item.ctc1} to ${item.ctc2} LPA`}</Text>
                    {item.job_start_date && <Text><Icon name="calendar" color="#407BFF" /> Duration - {item.ctc1} {item.ctc2}</Text>}
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

export const ActionJob = ({ item, fetch, setFetch }) => {
    
    return (
        <View style={{ margin: 10, backgroundColor: 'whitesmoke', borderRadius: 10, padding: 10 }}>
            <TouchableOpacity style={styles.cardJob}>
                <Text style={{ fontSize: 18, color: '#407BFF', fontWeight: 'bold' }}>{item.job_title}</Text>
                <Text style={{ fontSize: 14, color: 'gray' }}><Icon name="building-o" color="#407BFF" /> {item.company_name}</Text>
                <View style={{ marginTop: 20 }}></View>
                <Text><Icon name="suitcase" color="#407BFF" /> {Capitalize(item.opportunity_type)}</Text>
                {item.job_type == 'Remote' ? <Text><Iconz name="home" color="#407BFF" /> Work from Home</Text> : <Text><Iconz name="location-outline" color="#407BFF" /> {item.location}</Text>}
                <Text><Icon name="money" color="#407BFF" />{item.opportunity_type == 'internship' ? `${" "} ₹ ${item.stipend_amt}${item.stipend_per}` : `₹${item.ctc1} to ${item.ctc2} LPA`}</Text>
                {item.job_start_date && <Text><Icon name="calendar" color="#407BFF" /> Duration - {item.ctc1} {item.ctc2}</Text>}
                <Text><Iconz name="hourglass-outline" color="#407BFF" /> Apply by {item.due_date}</Text>
                <Text><Iconz name="refresh" color="#407BFF" /> Posted {calculateTimeAgo(item.created_at)}</Text>
            </TouchableOpacity>
        </View>
    )
}

export const JobViewCard = ({ item, navigation }) => {
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
            setDialogVisible(false);
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
        <MotiView
            from={{ opacity: 0, translateX: 100 }}
            animate={{ opacity: 1, translateX: 0 }}
            duration={1000}
            delay={500}
        >
            <View style={{ margin: 10, backgroundColor: 'whitesmoke', borderRadius: 10, padding: 10 }}>
                <TouchableOpacity style={styles.cardJob} onPress={showDialog}>
                    <Text style={{ fontSize: 18, color: '#407BFF', fontWeight: 'bold' }}>{item.job_title}</Text>
                    <Text style={{ fontSize: 14, color: 'gray' }}><Icon name="building-o" color="#407BFF" /> {item.company_name}</Text>
                    <View style={styles.divider}></View>
                    <Text><Icon name="suitcase" color="#407BFF" /> {Capitalize(item.opportunity_type)}</Text>
                    {item.job_start_date && <Text><Iconm name="not-started" color="#407BFF" /> Starts {item.job_start_date}</Text>}
                    <Text><Icona name="profile" color="#407BFF" /> Round -{item.round} {item.round_name}</Text>
                    {item.job_type == 'Remote' ? <Text><Iconz name="home" color="#407BFF" /> Work from Home</Text> : <Text><Iconz name="location-outline" color="#407BFF" /> {item.location}</Text>}
                    <Text><Icon name="money" color="#407BFF" />{item.opportunity_type == 'internship' ? ` ₹${item.stipend_amt}${item.stipend_per}` : ` ₹${item.ctc1} to ${item.ctc2} LPA`}</Text>
                    {item.job_start_date && <Text><Icon name="calendar" color="#407BFF" /> Duration - {item.ctc1} {item.ctc2}</Text>}
                    <Text><Iconz name="hourglass-outline" color="#407BFF" /> Apply by {item.due_date}</Text>
                    <Text style={{ color: item.status == 'pending' ? "gray" : item.status == 'rejected' ? "red" : "#407BFF" }}>
                        <Iconf name="alert" color={item.status == 'pending' ? "gray" : item.status == 'rejected' ? "red" : "#407BFF"} />
                        {Capitalize(item.status)}
                    </Text>
                </TouchableOpacity>
                <Dialog.Container visible={dialogVisible}>
                    <Dialog.Title>Application Details</Dialog.Title>
                    <ScrollView>
                        <Text style={{ fontSize: 18, color: '#407BFF', fontWeight: 'bold' }}>{item.job_title}</Text>
                        <Text style={{ fontSize: 14, color: 'gray' }}><Icon name="building-o" color="#407BFF" /> {item.company_name}</Text>
                        <View style={{ marginTop: 20 }}></View>
                        <Text><Icon name="suitcase" color="#407BFF" /> {Capitalize(item.opportunity_type)}</Text>
                        {item.job_start_date && <Text><Iconm name="not-started" color="#407BFF" /> Starts {item.job_start_date}</Text>}
                        <Text><Icona name="profile" color="#407BFF" /> Round -{item.round} {item.round_name}</Text>
                        {item.job_type == 'Remote' ? <Text><Iconz name="home" color="#407BFF" /> Work from Home</Text> : <Text><Iconz name="location-outline" color="#407BFF" /> {item.location}</Text>}
                        <Text><Icon name="money" color="#407BFF" />{item.opportunity_type == 'internship' ? ` ₹${item.stipend_amt}${item.stipend_per}` : ` ₹${item.ctc1} to ${item.ctc2} LPA`}</Text>
                        {item.job_start_date && <Text><Icon name="calendar" color="#407BFF" /> Duration - {item.ctc1} {item.ctc2}</Text>}
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
                        {item.opportunity_type == 'job' &&
                            <View>
                                <Text style={{ fontSize: 16, fontWeight: 'bold', marginTop: 10, marginBottom: 10 }}>Salary</Text>
                                <Text style={{ fontSize: 16 }}>Annual CTC: ₹{item.ctc1} to {item.ctc2} LPA</Text>
                                <Text>Annual CTC breakup:</Text>
                                <Text style={{ color: 'gray' }}>• Fixed component: {item.fixed_pay}{item.ctc_breakup == 'In LPA' ? ' LPA' : '%'}</Text>
                                <Text style={{ color: 'gray' }}>• Variable component: {item.variable_pay}{item.ctc_breakup == 'In LPA' ? ' LPA' : '%'}</Text>
                                {item.other_incentives && <Text style={{ color: 'gray' }}>• Other component: {item.other_incentives}{item.ctc_breakup == 'In LPA' ? ' LPA' : '%'}</Text>}
                            </View>
                        }
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
                    {(item.status == 'rejected' || item.status == 'pending') && <Dialog.Button label="Edit" style={{ color: '#407BFF', marginRight: 10 }} onPress={handleNav} />}
                    {item.status == 'approved' && <Dialog.Button label="View applicants" style={{ color: 'white', backgroundColor: '#407BFF', marginLeft: 10, borderRadius: 5 }} onPress={() => {
                        setDialogVisible(false);
                        navigation.navigate('ActionApplications', { aid: item.application_id });
                    }} />}
                </Dialog.Container>
            </View>
        </MotiView>
    )
}



export const TalentJobViewCard = ({ item, navigation, load, setLoad, savedCard }) => {
    console.log("item", item);
    const [dialogVisible, setDialogVisible] = useState(false);
    const [recruiterDetails, setRecruiterDetails] = useState({});
    const [tid, setTid] = useState(null);
    const [applicantsDetails, setApplicantsDetails] = useState({});
    const [status, setStatus] = useState(false);
    const [saved, setSaved] = useState(false);
    const [fetch, setFetch] = useState(false);
    const [loading, setLoading] = useState(false);
    const [interview, setInterview] = useState({});

    const getData = async () => {
        setTid(await AsyncStorage.getItem('talent_id'))
    }

    useEffect(() => {
        if (item) {
            RecruiterDetailsById(item.recruiter_id).then((res) => {
                if (res.status) {
                    setRecruiterDetails(res.data[0]);
                }
            })
        }
    }, [item])

    useEffect(() => {
        if (!tid) {
            getData();
        }
        if (tid) {
            ApplicantsByTidAid(tid, item.application_id).then((res) => {
                if (res.status) {
                    setApplicantsDetails(res.data[0]);
                    setStatus(true);
                }
            })
            GetInterviewDetails(item.application_id, tid).then((res) => {
                console.log(res);
                if (res.status) {
                    setInterview(res.data[0]);
                } else {
                    setInterview({});
                }
            })
        }
    }, [tid])

    useEffect(() => {
        if (tid) {
            TalentDetailsById(tid).then((res) => {
                if (res.status) {
                    console.log("jfad", res.data[0].saved)
                    if (res.data[0].saved && res.data[0].saved.length > 0) {
                        let value = res.data[0].saved.indexOf(item.application_id);
                        if (value >= 0) {
                            setSaved(true);
                        } else {
                            setSaved(false);
                        }
                    }
                }
            })
        }
    }, [tid, fetch])

    useEffect(() => {
        if (tid) {
            TalentDetailsById(tid).then((res) => {
                if (res.status) {
                    if (res.data[0].saved && res.data[0].saved.length > 0) {
                        let value = res.data[0].saved.indexOf(item.application_id);
                        if (value >= 0) {
                            setSaved(true);

                        } else {
                            setSaved(false);
                        }
                    }
                }
            })
            ApplicantsByTidAid(tid, item.application_id).then((res) => {
                if (res.status) {
                    console.log("resoibsejdhfkadf", res.data[0]);
                    setApplicantsDetails(res.data[0]);
                    setStatus(true);
                }
            })
            RecruiterDetailsById(item.recruiter_id).then((res) => {
                if (res.status) {
                    setRecruiterDetails(res.data[0]);
                }
            })
        }
    }, [tid, loading, fetch])


    const onClickSave = () => {
        const reqbody = { aid: item.application_id, tid: tid }
        SaveApplication(reqbody).then((res) => {
            if (res.status) {
                setFetch(!fetch);
                setLoading(!loading);
                if (savedCard) {
                    setLoad(!load)
                }
            }
        })
    }

    const onClickRemove = () => {
        const reqbody = { aid: item.application_id, tid: tid }
        RemoveSavedApplication(reqbody).then((res) => {
            if (res.status) {
                setSaved(false);
                setFetch(!fetch);
                setLoading(!loading);
                if (savedCard) {
                    setLoad(!load);
                }
            } else {
                setSaved(true)
            }
        })
    }


    const showDialog = () => {
        setDialogVisible(true);
    };

    const handleCancel = () => {
        setDialogVisible(false);
    };

    const WebLink = ({ url }) => {
        const handleLinkPress = () => {
            setDialogVisible(false);
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
        navigation.navigate('SelectSlot', { id: item.application_id })
    }

    const handleApply = () => {
        setDialogVisible(false);
        navigation.navigate('ApplyforJob', { id: item.application_id });
    }

    const MeetLink = ({ url }) => {
        const handleLinkPress = () => {
            setDialogVisible(false);
            Linking.openURL(url);
        };

        return (
            <Text>Interview Link: <Text style={{ color: '#407BFF' }} onPress={() => handleLinkPress()}>{url}</Text></Text>
        );
    }

    return (
        <MotiView
            from={{ scale: 0 }}
            animate={{ scale: 1 }}
            duration={500}
        >
            <View style={{ margin: 10, backgroundColor: 'whitesmoke', borderRadius: 10, padding: 10 }}>
                <MotiView
                    from={{ opacity: 0, translateX: 100 }}
                    animate={{ opacity: 1, translateX: 0 }}
                    duration={1000}
                    delay={500}
                >
                    <TouchableOpacity style={styles.cardJob} onPress={showDialog}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={{ fontSize: 18, color: '#407BFF', fontWeight: 'bold' }}>{item.job_title}</Text>
                            <TouchableOpacity style={{ margin: 5 }} onPress={() => { saved ? onClickRemove() : onClickSave() }}>{saved ? <Icon name="bookmark" size={24} color="#407BFF" /> : <Icon name="bookmark-o" size={24} color="#407BFF" />}</TouchableOpacity>
                        </View>
                        <Text style={{ fontSize: 14, color: 'gray' }}><Icon name="building-o" color="#407BFF" /> {item.company_name}</Text>
                        <View style={styles.divider}></View>


                        <Text><Icon name="suitcase" color="#407BFF" /> {Capitalize(item.opportunity_type)}</Text>

                        {item.job_start_date && <Text><Iconm name="not-started" color="#407BFF" /> Starts {item.job_start_date}</Text>}
                        <Text><Icona name="profile" color="#407BFF" /> Round -{item.round} {item.round_name}</Text>
                        {item.job_type == 'Remote' ? <Text><Iconz name="home" color="#407BFF" /> Work from Home</Text> : <Text><Iconz name="location-outline" color="#407BFF" /> {item.location}</Text>}
                        <Text><Icon name="money" color="#407BFF" />{item.opportunity_type == 'internship' ? ` ₹${item.stipend_amt}${item.stipend_per}` : ` ₹${item.ctc1} to ${item.ctc2} LPA`}</Text>
                        <Text><Icon name="calendar" color="#407BFF" /> Duration - {item.ctc1} {item.ctc2}</Text>
                        <Text><Iconz name="hourglass-outline" color="#407BFF" /> Apply by {item.due_date}</Text>
                        {!status ? <Text><Iconz name="refresh" color="#407BFF" /> Posted {calculateTimeAgo(item.updated_at)}</Text> : !status && <Text><Iconz name="refresh" color="#407BFF" /> Posted {calculateTimeAgo(item.created_at)}</Text>}
                        {
                            status &&
                            <View>
                                <View style={styles.divider} />
                                <Text style={{ color: applicantsDetails.status == 'under review' ? 'gray' : applicantsDetails.status == "shortlisted" ? 'green' : 'red', fontStyle: 'italic' }}>
                                    <Iconz name="refresh" color={applicantsDetails.status == 'under review' ? 'gray' : applicantsDetails.status == "shortlisted" ? 'green' : 'red'} />
                                    Your application is {applicantsDetails.status}
                                </Text>
                                    {
                                        Object.keys(interview).length > 0 && <View>
                                    <Text>Scheduled on {applicantsDetails.selected_slot_date} at {applicantsDetails.selected_slot_timings}</Text>
                                    <MeetLink url={interview.link} />
                                </View>}
                            </View>
                        }
                    </TouchableOpacity>
                </MotiView>
                <Dialog.Container visible={dialogVisible}>
                    <Dialog.Title>Application Details</Dialog.Title>
                    <ScrollView>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={{ fontSize: 18, color: '#407BFF', fontWeight: 'bold' }}>{item.job_title}</Text>
                            <TouchableOpacity style={{ marginRight: 15 }} onPress={() => { saved ? onClickRemove() : onClickSave() }}>{saved ? <Icon name="bookmark" size={24} color="#407BFF" /> : <Icon name="bookmark-o" size={24} color="#407BFF" />}</TouchableOpacity>
                        </View>
                        <Text style={{ fontSize: 14, color: 'gray' }}><Icon name="building-o" color="#407BFF" /> {item.company_name}</Text>
                        <View style={{ marginTop: 20 }}></View>
                        <Text><Icon name="suitcase" color="#407BFF" /> {Capitalize(item.opportunity_type)}</Text>
                        {item.job_start_date && <Text><Iconm name="not-started" color="#407BFF" /> Starts {item.job_start_date}</Text>}
                        <Text><Icona name="profile" color="#407BFF" /> Round -{item.round} {item.round_name}</Text>
                        {item.job_type == 'Remote' ? <Text><Iconz name="home" color="#407BFF" /> Work from Home</Text> : <Text><Iconz name="location-outline" color="#407BFF" /> {item.location}</Text>}
                        <Text><Icon name="money" color="#407BFF" />{item.opportunity_type == 'internship' ? ` ₹${item.stipend_amt}${item.stipend_per}` : ` ₹${item.ctc1} to ${item.ctc2} LPA`}</Text>
                        {item.job_start_date && <Text><Icon name="calendar" color="#407BFF" /> Duration - {item.ctc1} {item.ctc2}</Text>}
                        <Text><Iconz name="hourglass-outline" color="#407BFF" /> Apply by {item.due_date}</Text>
                        <Text><Iconz name="refresh" color="#407BFF" /> Posted {calculateTimeAgo(item.created_at)}</Text>
                        <View style={styles.divider} />
                        {applicantsDetails.status != 'under review' && <View>
                            {applicantsDetails.status == "shortlisted" &&
                                <View>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Results are out!!!</Text>
                                        <Iconm name="celebration" color="green" size={18} />
                                        <Iconm name="celebration" color="green" size={18} />
                                    </View>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text style={{ color: 'green' }}>Congragulations you have shortlisted to this job/internship. Please, patiently wait for further updates.</Text>
                                    </View>
                                </View>
                            }
                            {applicantsDetails.status == "rejected" &&
                                <View>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Iconf name="alert" color="red" size={18} />
                                        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Your application result is here.</Text>
                                    </View>
                                    <Text style={{ color: 'red' }}>
                                        Your application got rejected. But don't lose hope! let's crack another one.
                                    </Text>
                                </View>
                            }
                            <View style={styles.divider} />
                        </View>}
                        {Object.keys(interview).length > 0 && <View>
                            <Text style={{ fontSize: 16, fontWeight: 'bold' }} >Interview Details</Text>
                            <Text>Scheduled on {applicantsDetails.selected_slot_date} at {applicantsDetails.selected_slot_timings}</Text>
                            <MeetLink url={interview.link} />
                            <Text style={{ color: 'gray', fontStyle: 'italic' }}>Description</Text>
                            <Text>{interview.description}</Text>
                            <View style={styles.divider} />
                        </View>
                        }
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
                        {item.opportunity_type == 'job' &&
                            <View>
                                <Text style={{ fontSize: 16, fontWeight: 'bold', marginTop: 10, marginBottom: 10 }}>Salary</Text>
                                <Text style={{ fontSize: 16 }}>Annual CTC: ₹{item.ctc1} to {item.ctc2} LPA</Text>
                                <Text>Annual CTC breakup:</Text>
                                <Text style={{ color: 'gray' }}>• Fixed component: {item.fixed_pay}{item.ctc_breakup == 'In LPA' ? ' LPA' : '%'}</Text>
                                <Text style={{ color: 'gray' }}>• Variable component: {item.variable_pay}{item.ctc_breakup == 'In LPA' ? ' LPA' : '%'}</Text>
                                {item.other_incentives && <Text style={{ color: 'gray' }}>• Other component: {item.other_incentives}{item.ctc_breakup == 'In LPA' ? ' LPA' : '%'}</Text>}
                            </View>
                        }
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
                        {status && <View>
                            <Text style={{ fontSize: 16, fontWeight: 'bold', marginTop: 10, marginBottom: 10 }}>Your application</Text>
                            <TouchableOpacity onPress={() => {
                                setDialogVisible(false);
                                navigation.navigate('ViewResume');
                            }}><Text style={{ color: '#407BFF' }}>View your resume</Text></TouchableOpacity>
                            <Text style={{ marginTop: 10, color: 'gray', fontStyle: 'italic' }}>Why should you be hired for this role?</Text>
                            <Text style={{ backgroundColor: 'whitesmoke', padding: 15, borderRadius: 10 }}>{applicantsDetails.pitching}</Text>
                        </View>}
                    </ScrollView>
                    <Dialog.Button label="Close" style={{ color: '#407BFF', marginRight: 10 }} onPress={handleCancel} />
                    {!status && <Dialog.Button label="Apply" style={{ color: 'white', backgroundColor: '#407BFF', marginLeft: 10, borderRadius: 5 }} onPress={handleApply} />}
                    {Object.keys(interview).length > 0  && status && !applicantsDetails.selected_slot_date && !applicantsDetails.selected_slot_timings && <Dialog.Button onPress={handleNav} style={{ color: 'white', backgroundColor: '#407BFF', marginLeft: 10, borderRadius: 5 }} label="Select Slot for Interview" />}
                </Dialog.Container>
            </View>
        </MotiView>
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


export const ViewTalentCard = ({ item, fetch, setFetch, navigation }) => {
    const [resume, setResume] = useState({});
    const [talent, setTalent] = useState([]);
    const [student, setStudent] = useState([]);
    const [dialogVisible, setDialogVisible] = useState(false);
    const [remarks, setRemarks] = useState('');
    const [interview, setInterview] = useState({});
    const [applicantsDetails, setApplicantsDetails] = useState({});
    const [show, setShow] = useState('');

    useEffect(() => {
        if (item) {
            ResumeDetailsByTalentID(item.talent_id).then((res) => {
                if (res.status) {
                    setResume(res.data[0]);
                    //console.log(res.data[0])
                }
            })
            TalentDetailsById(item.talent_id).then((res) => {
                if (res.status) {
                    setTalent(res.data[0]);
                    GetStudentByEmail(res.data[0].email).then((res) => {
                        if (res.status) {
                            setStudent(res.data[0]);
                        }
                    })
                }
            })
            ApplicantsByTidAid(item.talent_id, item.application_id).then((res) => {
                if (res.status) {
                    setApplicantsDetails(res.data[0]);
                }
            })
            GetInterviewDetails(item.application_id, item.talent_id).then((res) => {
                if (res.status) {
                    setInterview(res.data[0]);
                } else {
                    setInterview({});
                }
            })
        }
    }, [item])

    const showDialog = () => {
        setDialogVisible(true);
    };

    const handleCancel = () => {
        setDialogVisible(false);
    };

    const handleAccept = () => {
        Alert.alert('Are you sure?', '', [
            {
                text: "Yes",
                onPress: () => {
                    const reqbody = { status: 'shortlisted' }
                    DecisionApplicant(reqbody, item.applicant_id).then((res) => {
                        if (res.status) {
                            setFetch(!fetch)
                            setDialogVisible(false);
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
        Alert.alert('Are you sure?', '', [
            {
                text: "Yes",
                onPress: () => {
                    const reqbody = { status: 'rejected' }
                    DecisionApplicant(reqbody, item.applicant_id).then((res) => {
                        if (res.status) {
                            setFetch(!fetch)
                            setDialogVisible(false);
                        }
                    })
                },
            },
            {
                text: "No",
            },
        ])

    }

    const handleInterview = () => {
        setDialogVisible(false);
        navigation.navigate('ScheduleInterview', { tid: item.talent_id, aid: item.application_id, type: 'create' });
    }

    const handleEditInterview = () => {
        setDialogVisible(false);
        navigation.navigate('ScheduleInterview', { tid: item.talent_id, aid: item.application_id, type: 'edit' });
    }

    const WebLink = ({ url }) => {
        const handleLinkPress = () => {
            setDialogVisible(false);
            Linking.openURL(url);
        };

        return (
            <Text onPress={handleLinkPress} style={{ color: '#407BFF' }}>
                Click Here
            </Text>
        );
    };

    const Iconlinks = ({ icon, url }) => {
        const handleLinkPress = () => {
            setDialogVisible(false);
            Linking.openURL(url);
        };

        return (
            <Icona name={icon} size={20} color="black" onPress={handleLinkPress} style={{ margin: 5 }} />
        );
    }

    const MeetLink = ({ url }) => {
        const handleLinkPress = () => {
            setDialogVisible(false);
            Linking.openURL(url);
        };

        return (
            <Text>Interview Link: <Text style={{ color: '#407BFF' }} onPress={() => handleLinkPress()}>{url}</Text></Text>
        );
    }

    return (
        <MotiView
            from={{ scale: 0 }}
            animate={{ scale: 1 }}
            duration={500}
        >
            <View >
                <MotiView
                    from={{ opacity: 0, translateX: 100 }}
                    animate={{ opacity: 1, translateX: 0 }}
                    duration={1000}
                    delay={500}
                >
                    <TouchableOpacity style={{
                        backgroundColor: 'whitesmoke',
                        width: '92%',
                        margin: 8,
                        borderRadius: 20,
                        shadowOffset: { width: 5, height: 5 },
                        shadowColor: 'black',
                        shadowOpacity: 0.3,
                        shadowRadius: 3,
                        elevation: 1,
                        padding: 20
                    }} onPress={showDialog}>
                        <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{talent.firstname} {talent.lastname}</Text>
                        <Text style={{ fontStyle: 'italic' }}>{student.degree} - {student.semester} Semester</Text>
                        <Text style={{ color: '#407BFF' }}>{student.cgpa} CGPA</Text>
                        {student.blacklog && <Text style={{ color: 'red' }}>{student.backlog_number} ({student.backlog_subject}) backlog</Text>}
                        <View style={styles.divider} />
                        <Text style={{ fontStyle: 'italic', color: 'gray' }}>Why you should hire me?</Text>
                        <Text numberOfLines={5}>{item.pitching}</Text>
                        {Object.keys(interview).length > 0 && <View>
                            <View style={styles.divider} />
                            <Text>Scheduled on {applicantsDetails.selected_slot_date} at {applicantsDetails.selected_slot_timings}</Text>
                            <MeetLink url={interview.link} />
                        </View>}
                    </TouchableOpacity>
                </MotiView>
                <Dialog.Container style={{ width: '100%' }} visible={dialogVisible}>
                    <Dialog.Title>{talent.firstname}'s Application</Dialog.Title>
                    <ScrollView>
                        {Object.keys(interview).length > 0 && <View>
                            <Text style={styles.header1} >Interview Details</Text>
                            <Text>Scheduled on {applicantsDetails.selected_slot_date} at {applicantsDetails.selected_slot_timings}</Text>
                            <MeetLink url={interview.link} />
                            <Text style={{ color: 'gray', fontStyle: 'italic' }}>Description</Text>
                            <Text>{interview.description}</Text>
                            <View style={styles.divider} />
                        </View>}
                        <Text style={{ color: '#407BFF', fontStyle: 'italic' }}>Why you should hire me?</Text>
                        <Text style={{ backgroundColor: 'whitesmoke', padding: 15, borderRadius: 10 }}>{item.pitching}</Text>
                        <View style={styles.divider} />
                        <Text style={styles.header1}><Icon name="graduation-cap" color="gray" /> Education</Text>
                        <Text style={styles.name} > ❖ Senior Secondary(XII)</Text>
                        {student.twelth_details &&
                            <View>
                                <Text>{student.twelth_details.school} - {student.twelth_details.yearofcompletion}</Text>
                                <Text>{student.twelth_details.board} board - {student.twelth_details.stream} - {student.twelth_details.percentage}</Text>
                            </View>
                        }
                        <Text style={styles.name} > ❖ Secondary(X)</Text>
                        {student.tenth_details &&
                            <View>
                                <Text>{student.tenth_details.school} - {student.tenth_details.yearofcompletion}</Text>
                                <Text>{student.tenth_details.board} board - {student.tenth_details.percentage} </Text>
                            </View>
                        }
                        <Text style={styles.name} > ❖ Degree</Text>
                        {
                            student.subject_marks && <View>
                                <Text>{student.degree} - </Text>
                                <Text>{student.semester} Semester - {student.cgpa} CGPA</Text>
                                {student.backlog_number && <Text>{student.backlog_number} backlogs - {student.backlog_subject}</Text>}
                                {
                                    (student.semester == 'I' || student.semester == 'II' || student.semester == 'III' || student.semester == 'IV' || student.semester == 'V' || student.semester == 'VI') && <View>
                                        <Text style={styles.header}>Marks Card</Text>
                                        <Text style={{ color: '#407BFF', fontWeight: 'bold', margin: 10 }}>I semester</Text>
                                        {student.subject_marks && student.subject_marks[0] && student.subject_marks[0].I && student.subject_marks[0].I.length && student.subject_marks[0].I.map((itemss, index) =>
                                        (<View key={index} style={{ margin: 5, marginLeft: 20 }}>
                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', flex: 1 }}>
                                                <Text style={{ fontWeight: 'bold' }}>{itemss.subject} - {itemss.marks}</Text>
                                                <TouchableOpacity>
                                                    {show != itemss.subject ? <Text style={{ color: '#407BFF' }} onPress={() => { setShow(itemss.subject) }}>Subject Details</Text> :
                                                        <Text style={{ color: 'red' }} onPress={() => { setShow('') }}>Close</Text>}
                                                </TouchableOpacity>
                                            </View>
                                            {show == itemss.subject &&
                                                <View>
                                                    <Text>Total no of hours - {itemss.totalnoofhours}</Text>
                                                    <Text>Credits - {itemss.credits}</Text>
                                                    <Text style={{ color: '#407BFF' }}>Syllabus</Text>
                                                    {itemss.syllabus && itemss.syllabus.length > 0 &&
                                                        itemss.syllabus.map((it, ind) => (
                                                            <View key={ind}>
                                                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', flex: 1 }}>
                                                                    <Text>Chapter {ind + 1}: {it.unit}</Text>
                                                                    <Text>No of hours: {it.noofhours}</Text>
                                                                </View>
                                                                <Text>Topics : {it.topics}</Text>
                                                            </View>
                                                        ))}
                                                </View>
                                            }
                                        </View>
                                        ))}
                                    </View>
                                }
                                {
                                    (student.semester == 'II' || student.semester == 'III' || student.semester == 'IV' || student.semester == 'V' || student.semester == 'VI') && <View>
                                        <Text style={{ color: '#407BFF', fontWeight: 'bold', margin: 10 }}>II semester</Text>
                                        {student.subject_marks && student.subject_marks[0] && student.subject_marks[0].II && student.subject_marks[0].II.length && student.subject_marks[0].II.map((itemss, index) =>
                                        (<View key={index} style={{ margin: 5, marginLeft: 20 }}>
                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', flex: 1 }}>
                                                <Text style={{ fontWeight: 'bold' }}>{itemss.subject} - {itemss.marks}</Text>
                                                <TouchableOpacity>
                                                    {show != itemss.subject ? <Text style={{ color: '#407BFF' }} onPress={() => { setShow(itemss.subject) }}>Subject Details</Text> :
                                                        <Text style={{ color: 'red' }} onPress={() => { setShow('') }}>Close</Text>}
                                                </TouchableOpacity>
                                            </View>
                                            {show == itemss.subject &&
                                                <View>
                                                    <Text>Total no of hours - {itemss.totalnoofhours}</Text>
                                                    <Text>Credits - {itemss.credits}</Text>
                                                    <Text style={{ color: '#407BFF' }}>Syllabus</Text>
                                                    {itemss.syllabus && itemss.syllabus.length > 0 &&
                                                        itemss.syllabus.map((it, ind) => (
                                                            <View key={ind}>
                                                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', flex: 1 }}>
                                                                    <Text>Chapter {ind + 1}: {it.unit}</Text>
                                                                    <Text>No of hours: {it.noofhours}</Text>
                                                                </View>
                                                                <Text>Topics : {it.topics}</Text>
                                                            </View>
                                                        ))}
                                                </View>
                                            }
                                        </View>
                                        )
                                        )}
                                    </View>
                                }
                                {
                                    (student.semester == 'III' || student.semester == 'IV' || student.semester == 'V' || student.semester == 'VI') && <View>
                                        <Text style={{ color: '#407BFF', fontWeight: 'bold', margin: 10 }}>III semester</Text>
                                        {student.subject_marks && student.subject_marks[0] && student.subject_marks[0].III && student.subject_marks[0].III.length && student.subject_marks[0].III.map((itemss, index) =>
                                        (<View key={index} style={{ margin: 5, marginLeft: 20 }}>
                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', flex: 1 }}>
                                                <Text style={{ fontWeight: 'bold' }}>{itemss.subject} - {itemss.marks}</Text>
                                                <TouchableOpacity>
                                                    {show != itemss.subject ? <Text style={{ color: '#407BFF' }} onPress={() => { setShow(itemss.subject) }}>Subject Details</Text> :
                                                        <Text style={{ color: 'red' }} onPress={() => { setShow('') }}>Close</Text>}
                                                </TouchableOpacity>
                                            </View>
                                            {show == itemss.subject &&
                                                <View>
                                                    <Text>Total no of hours - {itemss.totalnoofhours}</Text>
                                                    <Text>Credits - {itemss.credits}</Text>
                                                    <Text style={{ color: '#407BFF' }}>Syllabus</Text>
                                                    {itemss.syllabus && itemss.syllabus.length > 0 &&
                                                        itemss.syllabus.map((it, ind) => (
                                                            <View key={ind}>
                                                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', flex: 1 }}>
                                                                    <Text>Chapter {ind + 1}: {it.unit}</Text>
                                                                    <Text>No of hours: {it.noofhours}</Text>
                                                                </View>
                                                                <Text>Topics : {it.topics}</Text>
                                                            </View>
                                                        ))}
                                                </View>
                                            }
                                        </View>
                                        )
                                        )}
                                    </View>
                                }
                                {
                                    (student.semester == 'IV' || student.semester == 'V' || student.semester == 'VI') && <View>
                                        <Text style={{ color: '#407BFF', fontWeight: 'bold', margin: 10 }}>IV semester</Text>
                                        {student.subject_marks && student.subject_marks[0] && student.subject_marks[0].IV && student.subject_marks[0].IV.length && student.subject_marks[0].IV.map((itemss, index) =>
                                        (<View key={index} style={{ margin: 5, marginLeft: 20 }}>
                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', flex: 1 }}>
                                                <Text style={{ fontWeight: 'bold' }}>{itemss.subject} - {itemss.marks}</Text>
                                                <TouchableOpacity>
                                                    {show != itemss.subject ? <Text style={{ color: '#407BFF' }} onPress={() => { setShow(itemss.subject) }}>Subject Details</Text> :
                                                        <Text style={{ color: 'red' }} onPress={() => { setShow('') }}>Close</Text>}
                                                </TouchableOpacity>
                                            </View>
                                            {show == itemss.subject &&
                                                <View>
                                                    <Text>Total no of hours - {itemss.totalnoofhours}</Text>
                                                    <Text>Credits - {itemss.credits}</Text>
                                                    <Text style={{ color: '#407BFF' }}>Syllabus</Text>
                                                    {itemss.syllabus && itemss.syllabus.length > 0 &&
                                                        itemss.syllabus.map((it, ind) => (
                                                            <View key={ind}>
                                                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', flex: 1 }}>
                                                                    <Text>Chapter {ind + 1}: {it.unit}</Text>
                                                                    <Text>No of hours: {it.noofhours}</Text>
                                                                </View>
                                                                <Text>Topics : {it.topics}</Text>
                                                            </View>
                                                        ))}
                                                </View>
                                            }
                                        </View>
                                        )
                                        )}
                                    </View>
                                }
                                {
                                    (student.semester == 'V' || student.semester == 'VI') && <View>
                                        <Text style={{ color: '#407BFF', fontWeight: 'bold', margin: 10 }}>V semester</Text>
                                        {student.subject_marks && student.subject_marks[0] && student.subject_marks[0].V && student.subject_marks[0].V.length && student.subject_marks[0].V.map((itemss, index) =>
                                        (<View key={index} style={{ margin: 5, marginLeft: 20 }}>
                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', flex: 1 }}>
                                                <Text style={{ fontWeight: 'bold' }}>{itemss.subject} - {itemss.marks}</Text>
                                                <TouchableOpacity>
                                                    {show != itemss.subject ? <Text style={{ color: '#407BFF' }} onPress={() => { setShow(itemss.subject) }}>Subject Details</Text> :
                                                        <Text style={{ color: 'red' }} onPress={() => { setShow('') }}>Close</Text>}
                                                </TouchableOpacity>
                                            </View>
                                            {show == itemss.subject &&
                                                <View>
                                                    <Text>Total no of hours - {itemss.totalnoofhours}</Text>
                                                    <Text>Credits - {itemss.credits}</Text>
                                                    <Text style={{ color: '#407BFF' }}>Syllabus</Text>
                                                    {itemss.syllabus && itemss.syllabus.length > 0 &&
                                                        itemss.syllabus.map((it, ind) => (
                                                            <View key={ind}>
                                                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', flex: 1 }}>
                                                                    <Text>Chapter {ind + 1}: {it.unit}</Text>
                                                                    <Text>No of hours: {it.noofhours}</Text>
                                                                </View>
                                                                <Text>Topics : {it.topics}</Text>
                                                            </View>
                                                        ))}
                                                </View>
                                            }
                                        </View>
                                        )
                                        )}
                                    </View>
                                }
                                {
                                    (student.semester == 'VI') && <View>
                                        <Text style={{ color: '#407BFF', fontWeight: 'bold', margin: 10 }}>VI semester</Text>
                                        {student.subject_marks && student.subject_marks[0] && student.subject_marks[0].VI && student.subject_marks[0].VI.length && student.subject_marks[0].VI.map((itemss, index) =>
                                        (<View key={index} style={{ margin: 5, marginLeft: 20 }}>
                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', flex: 1 }}>
                                                <Text style={{ fontWeight: 'bold' }}>{itemss.subject} - {itemss.marks}</Text>
                                                <TouchableOpacity>
                                                    {show != itemss.subject ? <Text style={{ color: '#407BFF' }} onPress={() => { setShow(itemss.subject) }}>Subject Details</Text> :
                                                        <Text style={{ color: 'red' }} onPress={() => { setShow('') }}>Close</Text>}
                                                </TouchableOpacity>
                                            </View>
                                            {show == itemss.subject &&
                                                <View>
                                                    <Text>Total no of hours - {itemss.totalnoofhours}</Text>
                                                    <Text>Credits - {itemss.credits}</Text>
                                                    <Text style={{ color: '#407BFF' }}>Syllabus</Text>
                                                    {itemss.syllabus && itemss.syllabus.length > 0 &&
                                                        itemss.syllabus.map((it, ind) => (
                                                            <View key={ind}>
                                                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', flex: 1 }}>
                                                                    <Text>Chapter {ind + 1}: {it.unit}</Text>
                                                                    <Text>No of hours: {it.noofhours}</Text>
                                                                </View>
                                                                <Text>Topics : {it.topics}</Text>
                                                            </View>
                                                        ))}
                                                </View>
                                            }
                                        </View>
                                        )
                                        )}
                                    </View>
                                }
                            </View>

                        }
                        {
                            resume.skill &&
                            <View>
                                <View style={styles.divider} />
                                <Text style={styles.header1}><Icone name="tools" color="gray" />Skill(s)</Text>
                                <View>
                                    {
                                        resume.skill.map((item, index) => (
                                            <View style={{ margin: 10 }} key={index}>
                                                <Text style={styles.name}> ❖ {item.skill_type}</Text>
                                                <Text>{item.skills_list}</Text>
                                            </View>
                                        ))
                                    }
                                </View>
                            </View>
                        }
                        {
                            resume.project &&
                            <View>
                                <View style={styles.divider} />
                                <Text style={styles.header1}><Icona name="profile" color="gray" /> Project(s)</Text>
                                <View>
                                    {
                                        resume.project.map((item, index) => (
                                            <View style={{ margin: 10 }} key={index}>
                                                <Text style={styles.name}> ❖ {item.title}</Text>
                                                <Text style={{ fontStyle: 'italic', color: 'gray' }}>{item.requirements}</Text>
                                                <Text style={styles.description}>{item.description}</Text>
                                                <WebLink url={item.url} />
                                            </View>
                                        ))
                                    }
                                </View>
                            </View>
                        }
                        {
                            resume.internship &&
                            <View>
                                <View style={styles.divider} />
                                <Text style={styles.header1}><Iconm name="work" color="gray" /> Internship(s)</Text>
                                <View>
                                    {
                                        resume.internship.map((item, index) => (
                                            <View style={{ margin: 10 }} key={index}>
                                                <Text style={styles.name}> ❖ {item.position} - {item.organization}</Text>
                                                <Text style={{ color: 'gray' }}>{item.location}</Text>
                                                <Text >{item.startDate} - {item.endDate}</Text>
                                                <Text style={styles.description}>{item.description}</Text>
                                            </View>
                                        ))
                                    }
                                </View>
                            </View>
                        }
                        {
                            resume.job &&
                            <View>
                                <View style={styles.divider} />
                                <Text style={styles.header1}><Iconm name="work" color="gray" /> Experience</Text>
                                <View>
                                    {
                                        resume.job.map((item, index) => (
                                            <View style={{ margin: 10 }} key={index}>
                                                <Text style={styles.name}> ❖ {item.position} - {item.organization}</Text>
                                                <Text style={{ color: 'gray' }}>{item.location}</Text>
                                                <Text >{item.startDate} - {item.endDate}</Text>
                                                <Text style={styles.description}>{item.description}</Text>
                                            </View>
                                        ))
                                    }
                                </View>
                            </View>
                        }
                        {
                            resume.position_of_responsibility &&
                            <View>
                                <View style={styles.divider} />
                                <Text style={styles.header1}><Icon name="group" color="gray" /> Position of Responsibility</Text>
                                <View>
                                    {
                                        resume.position_of_responsibility.map((item, index) => (
                                            <View style={{ margin: 10 }} key={index}>
                                                <Text style={styles.description}> ❖ {item.description}</Text>
                                            </View>
                                        ))
                                    }
                                </View>
                            </View>
                        }
                        {talent.url && <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>
                            {talent.url.github && <Iconlinks url={talent.url.github} icon={'github'} />}
                            {talent.url.linkedin && <Iconlinks url={talent.url.linkedin} icon={'linkedin-square'} />}
                            {talent.url.dribbble && <Iconlinks url={talent.url.dribbble} icon={'dribbble'} />}
                        </View>}
                        {
                            resume.accomplishment &&
                            <View>
                                <View style={styles.divider} />
                                <Text style={styles.header1}><Icone name="medal" color="gray" /> Accomplishment(s)</Text>
                                <View>
                                    {
                                        resume.accomplishment.map((item, index) => (
                                            <View style={{ margin: 10 }} key={index}>
                                                <Text style={styles.name}> ❖ {item.title}</Text>
                                                <Text style={styles.description}>{item.description}</Text>
                                                {item.url && <WebLink url={item.url} />}
                                            </View>
                                        ))
                                    }
                                </View>
                            </View>
                        }
                    </ScrollView>
                    <Dialog.Button label="Cancle" style={{ color: '#407BFF', marginRight: 10 }} onPress={handleCancel} />
                    {item.status == 'shortlisted' && Object.keys(interview).length == 0 && <Dialog.Button label="Schedule Interview" style={{ color: '#407BFF', marginRight: 10 }} onPress={handleInterview} />}
                    {item.status == 'shortlisted' && Object.keys(interview).length > 0 && <Dialog.Button label="View Interview Details" style={{ color: '#407BFF', marginRight: 10 }} onPress={handleEditInterview} />}
                    {item.status == 'under review' && <Dialog.Button label="Reject" style={{ color: 'red', marginRight: 10 }} onPress={handleReject} />}
                    {item.status == 'under review' && <Dialog.Button label="Accept" style={{ color: '#407BFF', marginRight: 10 }} onPress={handleAccept} />}
                </Dialog.Container>
            </View>
        </MotiView>
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
    header1: {
        fontSize: 16,
        color: 'gray'
    },
    name: {
        fontSize: 14,
        fontWeight: 'bold'
    }, description: {
        fontSize: 14,
    }
})

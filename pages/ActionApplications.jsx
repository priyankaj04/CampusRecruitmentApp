import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, Alert, TextInput } from 'react-native'
import React, { useState, useEffect } from 'react';
import { ApplicantsByApplicationId, UpdateMultipleStatus, AllApplicantsByAid, StudentInfoByTalentId } from '../api';
import { Picker } from '@react-native-picker/picker';
import { ViewTalentCard } from '../components/commonFunctions';
import Checkbox from 'expo-checkbox';
import { MotiView } from 'moti';


const ActionApplications = ({ route, navigation }) => {
    const applicationid = route.params.aid;
    const [applicantDetials, setApplicantDetails] = useState([]);
    const [fetch, setFetch] = useState(false);
    const [status, setStatus] = useState('all');
    const [selected, setSelected] = useState([]);
    const [selection, setSelection] = useState(false);
    const [selectAllChecked, setSelectAllChecked] = useState(false);
    const [course, setCourse] = useState('');
    const [category, setCategory] = useState('');
    const [cgpa, setCgpa] = useState('');
    const [backlog, setBacklog] = useState('');
    const [relation, setRelation] = useState('');
    const [allApplication, setAllapplication] = useState([]);
    const [allStudents, setAllstudents] = useState([]);
    const [filtered, setFiltered] = useState([]);

    useEffect(() => {

        AllApplicantsByAid(applicationid).then((res) => {
            console.log(res);
            if (res.status) {
                setApplicantDetails(res.data);
                setAllapplication(res.data);
                const talentIds = res.data.map((item) => item.talent_id);
                const reqbody = { ids: talentIds }
                StudentInfoByTalentId(reqbody).then((resp) => {
                    console.log(resp);
                    if (resp.status) {
                        setAllstudents(resp.data);
                    } else {
                        setAllstudents([]);
                    }
                })
            } else {
                setApplicantDetails([])
            }
        })
    }, [fetch])

    const Status = [
        { label: 'All', value: "all" },
        { label: 'Not Reviewed yet', value: "under review" },
        { label: 'Shortlisted', value: "shortlisted" },
        { label: 'Rejected', value: "rejected" }
    ]

    const handleCheckboxChange = (id) => {
        if (selected.includes(id)) {
            // Remove the ID from the array
            setSelected(selected.filter((selected) => selected !== id));
        } else {
            // Add the ID to the array
            setSelected([...selected, id]);
        }
    };

    const isCheckboxChecked = (id) => {
        return selected.includes(id);
    };

    const handleApproved = () => {
        console.log(selected);
        Alert.alert(`Are you sure you shortlist ${selected.length} applicant(s)?`, '', [
            {
                text: "Yes",
                onPress: () => {
                    const reqbody = {
                        id: selected,
                        status: 'shortlisted'
                    }
                    UpdateMultipleStatus(reqbody).then((res) => {
                        console.log("shortlisted", res)
                        if (res.status) {
                            setSelection(false);
                            setSelected([]);
                            setSelectAllChecked(false);
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

    const handleRejected = () => {
        console.log(selected)
        Alert.alert(`Are you sure you reject ${selected.length} applicant(s)?`, '', [
            {
                text: "Yes",
                onPress: () => {
                    const reqbody = {
                        id: selected,
                        status: 'rejected'
                    }
                    UpdateMultipleStatus(reqbody).then((res) => {
                        console.log("Rejected", res);
                        if (res.status) {
                            setSelection(false);
                            setSelected([]);
                            setSelectAllChecked(false);
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

    const handleSelectAllChange = () => {
        if (selectAllChecked) {
            setSelected([]);
        } else {
            const allIds = applicantDetials.map((item) => item.applicant_id);
            setSelected(allIds);
        }
        setSelectAllChecked(!selectAllChecked);
    };

    //const Degree = ['Bachelore of Science', 'Bachelore of Computer Science', 'Bachelore of Commerce', 'Bachelore of Arts'];

    const Course = [{ label: 'BCA', value: "Bachelore of Computer Science" },
        { label: 'BCom', value: "Bachelore of Commerce" },
        { label: 'BSc', value: "Bachelore of Science" },
        { label: 'BA', value: "Bachelore of Arts" }
    ]

    const Category = [{ label: 'Course', value: "course" },
    { label: 'CGPA', value: "CGPA" },
    { label: 'Status', value: "Status" },
    { label: 'Backlog', value: "Backlog" }
    ]

    const Relation = [{ label: '>=', value: ">=" },
    { label: '<=', value: "<=" },
    { label: '>', value: ">" },
    { label: '<', value: "<" }
    ]

    const handleStatusChange = (value) => {
        ApplicantsByApplicationId(value, applicationid).then((res) => {
            console.log(res);
            if (res.status) {
                setApplicantDetails(res.data);
            } else {
                setApplicantDetails([])
            }
        })
    }

    const handleCourseChange = (value) => {
        console.log("ARe we here??")
        const filteredData = allStudents
            .filter((applicant) => applicant.degree == value)
            .map((applicant) => applicant.register_no);

        const filteredApplicants = allApplication.filter((applicant) =>
            filteredData.includes(applicant.registerno)
        );

        setApplicantDetails(filteredApplicants);
    }

    const SubmitCGPA = () => {
        if (relation == '>=') {
            const filteredData = allStudents
                .filter((applicant) => applicant.cgpa >= parseFloat(cgpa))
                .map((applicant) => applicant.register_no);

            const filteredApplicants = allApplication.filter((applicant) =>
                filteredData.includes(applicant.registerno)
            );

            setApplicantDetails(filteredApplicants);
        } else if (relation == '<=') {
            const filteredData = allStudents
                .filter((applicant) => applicant.cgpa <= parseFloat(cgpa))
                .map((applicant) => applicant.register_no);

            const filteredApplicants = allApplication.filter((applicant) =>
                filteredData.includes(applicant.registerno)
            );

            setApplicantDetails(filteredApplicants);
        } else if (relation == '<') {
            const filteredData = allStudents
                .filter((applicant) => applicant.cgpa < parseFloat(cgpa))
                .map((applicant) => applicant.register_no);

            const filteredApplicants = allApplication.filter((applicant) =>
                filteredData.includes(applicant.registerno)
            );

            setApplicantDetails(filteredApplicants);
        } else if (relation == '>') {
            const filteredData = allStudents
                .filter((applicant) => applicant.cgpa > parseFloat(cgpa))
                .map((applicant) => applicant.register_no);

            const filteredApplicants = allApplication.filter((applicant) =>
                filteredData.includes(applicant.registerno)
            );

            setApplicantDetails(filteredApplicants);
        }
    };

    const SubmitBacklog = () => {
        if (relation == '>=') {
            const filteredData = allStudents
                .filter((applicant) => applicant.backlog_number >= parseInt(backlog))
                .map((applicant) => applicant.register_no);

            const filteredApplicants = allApplication.filter((applicant) =>
                filteredData.includes(applicant.registerno)
            );

            setApplicantDetails(filteredApplicants);
        } else if (relation == '<=') {
            const filteredData = allStudents
                .filter((applicant) => applicant.backlog_number <= parseInt(backlog))
                .map((applicant) => applicant.register_no);

            const filteredApplicants = allApplication.filter((applicant) =>
                filteredData.includes(applicant.registerno)
            );

            setApplicantDetails(filteredApplicants);
        } else if (relation == '<') {
            const filteredData = allStudents
                .filter((applicant) => applicant.backlog_number < parseInt(backlog))
                .map((applicant) => applicant.register_no);

            const filteredApplicants = allApplication.filter((applicant) =>
                filteredData.includes(applicant.registerno)
            );

            setApplicantDetails(filteredApplicants);
        } else if (relation == '>') {
            const filteredData = allStudents
                .filter((applicant) => applicant.backlog_number > parseInt(backlog))
                .map((applicant) => applicant.register_no);

            const filteredApplicants = allApplication.filter((applicant) =>
                filteredData.includes(applicant.registerno)
            );

            setApplicantDetails(filteredApplicants);
        }
    }

    const handleCategoryChange = (value) => {
        if (value == 'course') {
            const filteredData = allStudents
                .filter((applicant) => applicant.degree == 'Bachelore of Computer Science')
                .map((applicant) => applicant.register_no);

            const filteredApplicants = allApplication.filter((applicant) =>
                filteredData.includes(applicant.registerno)
            );

            setApplicantDetails(filteredApplicants);
        }
        console.log("set up value", value);
    }

    return (
        <ScrollView style={{ width: '100%', backgroundColor: 'white' }}>
            <View style={{ backgroundColor: 'whitesmoke', borderRadius: 25, width: 360, marginLeft: 25, marginTop: 10 }}>
                <Picker
                    selectedValue={status}
                    onValueChange={(itemValue) => {
                        setStatus(itemValue);
                        handleCategoryChange(itemValue);
                    }
                    }>
                    {Category.map((item, index) => <Picker.Item key={index} label={item.label} value={item.value} />)}
                </Picker>
            </View>
            {
                status === 'course' && <View style={{ backgroundColor: 'whitesmoke', borderRadius: 25, width: 360, marginLeft: 25, marginTop: 10 }}>
                    <Picker
                        selectedValue={course}
                        onValueChange={(itemValue) => {
                            setCourse(itemValue);
                            handleCourseChange(itemValue);
                        }
                        }>
                        {Course.map((item, index) => <Picker.Item key={index} label={item.label} value={item.value} />)}
                    </Picker>
                </View>
            }
            {
                status === 'Status' && <View style={{ backgroundColor: 'whitesmoke', borderRadius: 25, width: 360, marginLeft: 25, marginTop: 10 }}>
                    <Picker
                        selectedValue={category}
                        onValueChange={(itemValue) => {
                            setCategory(itemValue);
                            handleStatusChange(itemValue);
                        }
                        }>
                        {Status.map((item, index) => <Picker.Item key={index} label={item.label} value={item.value} />)}
                    </Picker>
                </View>
            }
            {
                status === 'CGPA' &&
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ backgroundColor: 'whitesmoke', borderRadius: 25, width: 120, marginLeft: 25, marginTop: 10 }}>
                        <Picker
                            selectedValue={relation}
                            onValueChange={(itemValue) => {
                                setRelation(itemValue);
                            }
                            }>
                            {Relation.map((item, index) => <Picker.Item key={index} label={item.label} value={item.value} />)}
                        </Picker>
                    </View>
                    <TextInput
                        style={{
                            height: 55,
                            borderColor: 'transparent',
                            borderWidth: 1,
                            width: 120,
                            padding: 8,
                            backgroundColor: 'whitesmoke',
                            fontSize: 16,
                            marginTop: 10,
                            borderRadius: 25,
                            marginLeft: 10
                        }}
                        value={cgpa}
                        onChangeText={(e) => { setCgpa(e) }}
                        placeholder='e.g. 8'
                    />
                        <TouchableOpacity style={{
                            backgroundColor: '#407BFF',
                            padding: 10,
                            borderRadius: 25,
                            width: 100,
                            shadowOffset: { width: 5, height: 5 },
                            shadowColor: 'black',
                            shadowOpacity: 0.8,
                            shadowRadius: 5,
                            elevation: 3,
                            marginTop: 10,
                            marginLeft: 10
                    }} onPress={() => SubmitCGPA()}>
                        <Text style={{color:'white', textAlign:'center', fontSize: 16, fontWeight: 'bold'}}>Filter</Text>
                    </TouchableOpacity>
                </View>
            }
            {
                status === 'Backlog' &&
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ backgroundColor: 'whitesmoke', borderRadius: 25, width: 120, marginLeft: 15, marginTop: 10 }}>
                        <Picker
                            selectedValue={relation}
                            onValueChange={(itemValue) => {
                                setRelation(itemValue);
                            }
                            }>
                            {Relation.map((item, index) => <Picker.Item key={index} label={item.label} value={item.value} />)}
                        </Picker>
                    </View>
                    <TextInput
                        style={{
                            height: 50,
                            borderColor: 'transparent',
                            borderWidth: 1,
                            width: 120,
                            padding: 8,
                            backgroundColor: 'whitesmoke',
                            fontSize: 16,
                            marginTop: 10,
                            borderRadius: 25,
                            marginLeft: 15
                        }}
                        value={backlog}
                        onChangeText={(e) => { setBacklog(e) }}
                        placeholder='e.g. 2'
                        />
                        <TouchableOpacity style={{
                            backgroundColor: '#407BFF',
                            padding: 10,
                            borderRadius: 25,
                            width: 100,
                            shadowOffset: { width: 5, height: 5 },
                            shadowColor: 'black',
                            shadowOpacity: 0.8,
                            shadowRadius: 5,
                            elevation: 3,
                            marginTop: 10,
                            marginLeft: 10
                        }} onPress={() => SubmitBacklog()}>
                            <Text style={{ color: 'white', textAlign: 'center', fontSize: 16, fontWeight: 'bold' }}>Filter</Text>
                        </TouchableOpacity>
                </View>
            }
            {applicantDetials &&
                <MotiView
                    from={{ opacity: 0, translateY: -50 }}
                    animate={{ opacity: 1, translateY: 0 }}
                    duration={1000}
                    delay={500}
                >
                    <Text style={{ marginLeft: 10, margin: 15 }}>{applicantDetials.length} applicant(s)</Text>
                </MotiView>}
            <View style={{ flexDirection: 'row' }}>
                {selection ?
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', flex: 1 }}>
                        <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity style={{ marginLeft: 20 }} onPress={() => handleSelectAllChange()}>
                                <Text style={{ color: '#407BFF' }}> SELECT ALL</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ marginLeft: 20 }} onPress={() => {
                                setSelection(false);
                                setSelected([]);
                                setSelectAllChecked(false);
                            }}>
                                <Text style={{ color: 'red' }}> CANCLE</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity style={{ marginLeft: 20 }} onPress={() => handleApproved()}>
                                <Text style={{ color: '#407BFF' }}> SHORTLIST</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ marginLeft: 20 }} onPress={() => handleRejected()}>
                                <Text style={{ color: 'red' }}> REJECT</Text>
                            </TouchableOpacity>
                        </View>
                    </View> : <TouchableOpacity style={{ marginLeft: 20 }} onPress={() => setSelection(true)} >
                        <Text style={{ color: '#407BFF' }} >SELECT</Text>
                    </TouchableOpacity>}
            </View>
            <View style={{ marginTop: 0 }}>
                {
                    applicantDetials && applicantDetials.length > 0 ?
                        <View>
                            {
                                applicantDetials.map((item, index) => (
                                    <View key={index} style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 10 }}>
                                        {selection &&
                                            <Checkbox
                                                value={isCheckboxChecked(item.applicant_id)}
                                                onValueChange={(e) => {
                                                    handleCheckboxChange(item.applicant_id)
                                                }}
                                                color={isCheckboxChecked(item.applicant_id) ? '#407BFF' : undefined}
                                            />}
                                        <ViewTalentCard item={item} fetch={fetch} setFetch={setFetch} navigation={navigation} />
                                    </View>
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
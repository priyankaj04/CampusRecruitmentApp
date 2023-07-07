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
    const [details, setDetails] = useState([]);

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
        const reqbody = {
            subject: {
                isem,
                iisem,
                iiisem,
                ivsem,
                vsem,
                visem
            }
        }

        UpdateSubjects(reqbody, degree, year).then((res) => {
            if (res.status) {
                // console.log("Updated successfully");
            }
        })
    }

    const onChangePicker = (year, degree) => {
        GetSubjects(degree, year).then((res) => {
            console.log(res);
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
                setDetails([]);
            }
        });
    }

    function addEmptyObject() {
        const emptyObject = {
            subject: '',
            syllabus: [],
            credits: '',
            totalnoofhours: ''
        };

        setDetails(prevDetails => [...prevDetails, emptyObject]);
    }

    function handleSubjectChange(index, value) {
        setDetails(prevDetails => {
            const updatedDetails = [...prevDetails];
            updatedDetails[index].subject = value;
            return updatedDetails;
        });
    }

    function handleCreditsChange(index, value) {
        setDetails(prevDetails => {
            const updatedDetails = [...prevDetails];
            updatedDetails[index].credits = value;
            return updatedDetails;
        });
    }

    function handleUnitChange(detailIndex, syllabusIndex, value) {
        setDetails(prevDetails => {
            const updatedDetails = [...prevDetails];
            updatedDetails[detailIndex].syllabus[syllabusIndex].unit = value;
            return updatedDetails;
        });
    }

    function handleHoursChange(detailIndex, syllabusIndex, value) {
        setDetails(prevDetails => {
            const updatedDetails = [...prevDetails];
            updatedDetails[detailIndex].syllabus[syllabusIndex].hours = value;
            return updatedDetails;
        });
    }

    function handleTopicsChange(detailIndex, syllabusIndex, value) {
        setDetails(prevDetails => {
            const updatedDetails = [...prevDetails];
            updatedDetails[detailIndex].syllabus[syllabusIndex].topics = value;
            return updatedDetails;
        });
    }

    function addSyllabusItem(detailIndex) {
        setDetails(prevDetails => {
            const updatedDetails = [...prevDetails];
            updatedDetails[detailIndex].syllabus.push({
                unit: '',
                hours: '',
                topics: ''
            });
            return updatedDetails;
        });
    }

    function removeSyllabusItem(detailIndex, syllabusIndex) {
        setDetails(prevDetails => {
            const updatedDetails = [...prevDetails];
            updatedDetails[detailIndex].syllabus.splice(syllabusIndex, 1);
            return updatedDetails;
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
                            onChangePicker(year, itemValue);
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
                            onChangePicker(itemValue, degree)
                        }
                        }>
                        {AcademicYear.map((item) => <Picker.Item key={item.value} label={item.value} value={item.value} />)}
                    </Picker>
                </View>
            </View>
            <KeyboardAvoidingView>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 10 }}>
                    <Text style={{ color: '#407BFF', fontSize: 18, fontWeight: 'bold', margin: 10 }}>I semester</Text>
                    <TouchableOpacity style={styles.btn} onPress={() => {
                        const emptyObject = {
                            subject: '',
                            syllabus: [],
                            credits: '',
                            totalnoofhours: ''
                        };

                        setISem(prevDetails => [...prevDetails, emptyObject]);
                    }}>
                        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 22 }}> + </Text>
                    </TouchableOpacity>
                </View>
                {isem && isem.length > 0 && isem.map((item, index) => (
                    <View key={index}>
                        <Text style={styles.label}>Subject Name</Text>
                        <TextInput
                            style={styles.textField}
                            placeholder='e.g. C programming'
                            value={item.subject}
                            onChangeText={value => {
                                setISem(prevDetails => {
                                    const updatedDetails = [...prevDetails];
                                    updatedDetails[index].subject = value;
                                    return updatedDetails;
                                });
                            }}
                        />
                        <Text style={styles.label}>Total number of hours alloted</Text>
                        <TextInput
                            style={styles.textField}
                            placeholder='e.g. 60 hours'
                            value={item.totalnoofhours}
                            onChangeText={value => {
                                setISem(prevDetails => {
                                    const updatedDetails = [...prevDetails];
                                    updatedDetails[index].totalnoofhours = value;
                                    return updatedDetails;
                                });
                            }}
                        />
                        <Text style={styles.label}>Credit Points</Text>
                        <TextInput
                            style={styles.textField}
                            placeholder='e.g. 3'
                            value={item.credits}
                            onChangeText={value => {
                                setISem(prevDetails => {
                                    const updatedDetails = [...prevDetails];
                                    updatedDetails[index].credits = value;
                                    return updatedDetails;
                                });
                            }}
                        />
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ fontSize: 16, color: '#407BFF', margin: 10, fontWeight: 'bold' }}>Syllabus</Text>
                            <TouchableOpacity style={{
                                width: 70,
                                height: 35,
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
                                marginLeft: 15,
                            }} onPress={() => {
                                setISem(prevDetails => {
                                    const updatedDetails = [...prevDetails];
                                    updatedDetails[index].syllabus.push({
                                        unit: '',
                                        noofhours: '',
                                        topics: ''
                                    });
                                    return updatedDetails;
                                });
                            }}>
                                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 14 }}> Add </Text>
                            </TouchableOpacity>
                        </View>
                        {
                            isem[index].syllabus && isem[index].syllabus.map((syllabusItem, syllabusIndex) =>
                                <View key={syllabusIndex}>
                                    <Text style={styles.header}>Chapter 0{syllabusIndex + 1}</Text>
                                    <Text style={styles.label}>Chapter Name</Text>
                                    <TextInput
                                        style={styles.textField}
                                        placeholder='e.g. Introduction to C'
                                        value={syllabusItem.unit}
                                        onChangeText={value => {
                                            setISem(prevDetails => {
                                                const updatedDetails = [...prevDetails];
                                                updatedDetails[index].syllabus[syllabusIndex].unit = value;
                                                return updatedDetails;
                                            });
                                        }}
                                    />
                                    <Text style={styles.label}>Number of hours alloted to this chapter</Text>
                                    <TextInput
                                        style={styles.textField}
                                        placeholder='e.g. 13 hours'
                                        value={syllabusItem.noofhours}
                                        onChangeText={value => {
                                            setISem(prevDetails => {
                                                const updatedDetails = [...prevDetails];
                                                updatedDetails[index].syllabus[syllabusIndex].noofhours = value;
                                                return updatedDetails;
                                            });
                                        }}
                                    />
                                    <Text style={styles.label}>Topics</Text>
                                    <TextInput
                                        style={styles.multiline}
                                        multiline
                                        editable
                                        numberOfLines={8}
                                        placeholder='e.g. Overview, history, importance, difference between C and C++, Object-oriendt Programming, Advantages, Disadvantages etc..'
                                        value={syllabusItem.topics}
                                        onChangeText={value => {
                                            setISem(prevDetails => {
                                                const updatedDetails = [...prevDetails];
                                                updatedDetails[index].syllabus[syllabusIndex].topics = value;
                                                return updatedDetails;
                                            });
                                        }}
                                    />
                                </View>
                            )
                        }
                        <View style={styles.divider} />
                    </View>
                ))}
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 10 }}>
                    <Text style={{ color: '#407BFF', fontSize: 18, fontWeight: 'bold', margin: 10 }}>II semester</Text>
                    <TouchableOpacity style={styles.btn} onPress={() => {
                        const emptyObject = {
                            subject: '',
                            syllabus: [],
                            credits: '',
                            totalnoofhours: ''
                        };

                        setIISem(prevDetails => [...prevDetails, emptyObject]);
                    }}>
                        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 22 }}> + </Text>
                    </TouchableOpacity>
                </View>
                {iisem && iisem.length > 0 && iisem.map((item, index) => (
                    <View key={index}>
                        <Text style={styles.label}>Subject Name</Text>
                        <TextInput
                            style={styles.textField}
                            placeholder='e.g. C programming'
                            value={item.subject}
                            onChangeText={value => {
                                setIISem(prevDetails => {
                                    const updatedDetails = [...prevDetails];
                                    updatedDetails[index].subject = value;
                                    return updatedDetails;
                                });
                            }}
                        />
                        <Text style={styles.label}>Total number of hours alloted</Text>
                        <TextInput
                            style={styles.textField}
                            placeholder='e.g. 60 hours'
                            value={item.totalnoofhours}
                            onChangeText={value => {
                                setIISem(prevDetails => {
                                    const updatedDetails = [...prevDetails];
                                    updatedDetails[index].totalnoofhours = value;
                                    return updatedDetails;
                                });
                            }}
                        />
                        <Text style={styles.label}>Credit Points</Text>
                        <TextInput
                            style={styles.textField}
                            placeholder='e.g. 3'
                            value={item.credits}
                            onChangeText={value => {
                                setIISem(prevDetails => {
                                    const updatedDetails = [...prevDetails];
                                    updatedDetails[index].credits = value;
                                    return updatedDetails;
                                });
                            }}
                        />
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ fontSize: 16, color: '#407BFF', margin: 10, fontWeight: 'bold' }}>Syllabus</Text>
                            <TouchableOpacity style={{
                                width: 70,
                                height: 35,
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
                                marginLeft: 15,
                            }} onPress={() => {
                                setIISem(prevDetails => {
                                    const updatedDetails = [...prevDetails];
                                    updatedDetails[index].syllabus.push({
                                        unit: '',
                                        noofhours: '',
                                        topics: ''
                                    });
                                    return updatedDetails;
                                });
                            }}>
                                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 14 }}> Add </Text>
                            </TouchableOpacity>
                        </View>
                        {
                            iisem[index].syllabus && iisem[index].syllabus.map((syllabusItem, syllabusIndex) =>
                                <View key={syllabusIndex}>
                                    <Text style={styles.header}>Chapter 0{syllabusIndex + 1}</Text>
                                    <Text style={styles.label}>Chapter Name</Text>
                                    <TextInput
                                        style={styles.textField}
                                        placeholder='e.g. Introduction to C'
                                        value={syllabusItem.unit}
                                        onChangeText={value => {
                                            setIISem(prevDetails => {
                                                const updatedDetails = [...prevDetails];
                                                updatedDetails[index].syllabus[syllabusIndex].unit = value;
                                                return updatedDetails;
                                            });
                                        }}
                                    />
                                    <Text style={styles.label}>Number of hours alloted to this chapter</Text>
                                    <TextInput
                                        style={styles.textField}
                                        placeholder='e.g. 13 hours'
                                        value={syllabusItem.noofhours}
                                        onChangeText={value => {
                                            setIISem(prevDetails => {
                                                const updatedDetails = [...prevDetails];
                                                updatedDetails[index].syllabus[syllabusIndex].noofhours = value;
                                                return updatedDetails;
                                            });
                                        }}
                                    />
                                    <Text style={styles.label}>Topics</Text>
                                    <TextInput
                                        style={styles.multiline}
                                        multiline
                                        editable
                                        numberOfLines={8}
                                        placeholder='e.g. Overview, history, importance, difference between C and C++, Object-oriendt Programming, Advantages, Disadvantages etc..'
                                        value={syllabusItem.topics}
                                        onChangeText={value => {
                                            setIISem(prevDetails => {
                                                const updatedDetails = [...prevDetails];
                                                updatedDetails[index].syllabus[syllabusIndex].topics = value;
                                                return updatedDetails;
                                            });
                                        }}
                                    />
                                </View>
                            )
                        }
                        <View style={styles.divider} />
                    </View>
                ))}
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 10 }}>
                    <Text style={{ color: '#407BFF', fontSize: 18, fontWeight: 'bold', margin: 10 }}>III semester</Text>
                    <TouchableOpacity style={styles.btn} onPress={() => {
                        const emptyObject = {
                            subject: '',
                            syllabus: [],
                            credits: '',
                            totalnoofhours: ''
                        };

                        setIIISem(prevDetails => [...prevDetails, emptyObject]);
                    }}>
                        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 22 }}> + </Text>
                    </TouchableOpacity>
                </View>
                {iiisem && iiisem.length > 0 && iiisem.map((item, index) => (
                    <View key={index}>
                        <Text style={styles.label}>Subject Name</Text>
                        <TextInput
                            style={styles.textField}
                            placeholder='e.g. C programming'
                            value={item.subject}
                            onChangeText={value => {
                                setIIISem(prevDetails => {
                                    const updatedDetails = [...prevDetails];
                                    updatedDetails[index].subject = value;
                                    return updatedDetails;
                                });
                            }}
                        />
                        <Text style={styles.label}>Total number of hours alloted</Text>
                        <TextInput
                            style={styles.textField}
                            placeholder='e.g. 60 hours'
                            value={item.totalnoofhours}
                            onChangeText={value => {
                                setIIISem(prevDetails => {
                                    const updatedDetails = [...prevDetails];
                                    updatedDetails[index].totalnoofhours = value;
                                    return updatedDetails;
                                });
                            }}
                        />
                        <Text style={styles.label}>Credit Points</Text>
                        <TextInput
                            style={styles.textField}
                            placeholder='e.g. 3'
                            value={item.credits}
                            onChangeText={value => {
                                setIIISem(prevDetails => {
                                    const updatedDetails = [...prevDetails];
                                    updatedDetails[index].credits = value;
                                    return updatedDetails;
                                });
                            }}
                        />
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ fontSize: 16, color: '#407BFF', margin: 10, fontWeight: 'bold' }}>Syllabus</Text>
                            <TouchableOpacity style={{
                                width: 70,
                                height: 35,
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
                                marginLeft: 15,
                            }} onPress={() => {
                                setIIISem(prevDetails => {
                                    const updatedDetails = [...prevDetails];
                                    updatedDetails[index].syllabus.push({
                                        unit: '',
                                        noofhours: '',
                                        topics: ''
                                    });
                                    return updatedDetails;
                                });
                            }}>
                                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 14 }}> Add </Text>
                            </TouchableOpacity>
                        </View>
                        {
                            iiisem[index].syllabus && iiisem[index].syllabus.map((syllabusItem, syllabusIndex) =>
                                <View key={syllabusIndex}>
                                    <Text style={styles.header}>Chapter 0{syllabusIndex + 1}</Text>
                                    <Text style={styles.label}>Chapter Name</Text>
                                    <TextInput
                                        style={styles.textField}
                                        placeholder='e.g. Introduction to C'
                                        value={syllabusItem.unit}
                                        onChangeText={value => {
                                            setIIISem(prevDetails => {
                                                const updatedDetails = [...prevDetails];
                                                updatedDetails[index].syllabus[syllabusIndex].unit = value;
                                                return updatedDetails;
                                            });
                                        }}
                                    />
                                    <Text style={styles.label}>Number of hours alloted to this chapter</Text>
                                    <TextInput
                                        style={styles.textField}
                                        placeholder='e.g. 13 hours'
                                        value={syllabusItem.noofhours}
                                        onChangeText={value => {
                                            setIIISem(prevDetails => {
                                                const updatedDetails = [...prevDetails];
                                                updatedDetails[index].syllabus[syllabusIndex].noofhours = value;
                                                return updatedDetails;
                                            });
                                        }}
                                    />
                                    <Text style={styles.label}>Topics</Text>
                                    <TextInput
                                        style={styles.multiline}
                                        multiline
                                        editable
                                        numberOfLines={8}
                                        placeholder='e.g. Overview, history, importance, difference between C and C++, Object-oriendt Programming, Advantages, Disadvantages etc..'
                                        value={syllabusItem.topics}
                                        onChangeText={value => {
                                            setIIISem(prevDetails => {
                                                const updatedDetails = [...prevDetails];
                                                updatedDetails[index].syllabus[syllabusIndex].topics = value;
                                                return updatedDetails;
                                            });
                                        }}
                                    />
                                </View>
                            )
                        }
                        <View style={styles.divider} />
                    </View>
                ))}
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 10 }}>
                    <Text style={{ color: '#407BFF', fontSize: 18, fontWeight: 'bold', margin: 10 }}>IV semester</Text>
                    <TouchableOpacity style={styles.btn} onPress={() => {
                        const emptyObject = {
                            subject: '',
                            syllabus: [],
                            credits: '',
                            totalnoofhours: ''
                        };

                        setIVSem(prevDetails => [...prevDetails, emptyObject]);
                    }}>
                        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 22 }}> + </Text>
                    </TouchableOpacity>
                </View>
                {ivsem && ivsem.length > 0 && ivsem.map((item, index) => (
                    <View key={index}>
                        <Text style={styles.label}>Subject Name</Text>
                        <TextInput
                            style={styles.textField}
                            placeholder='e.g. C programming'
                            value={item.subject}
                            onChangeText={value => {
                                setIVSem(prevDetails => {
                                    const updatedDetails = [...prevDetails];
                                    updatedDetails[index].subject = value;
                                    return updatedDetails;
                                });
                            }}
                        />
                        <Text style={styles.label}>Total number of hours alloted</Text>
                        <TextInput
                            style={styles.textField}
                            placeholder='e.g. 60 hours'
                            value={item.totalnoofhours}
                            onChangeText={value => {
                                setIVSem(prevDetails => {
                                    const updatedDetails = [...prevDetails];
                                    updatedDetails[index].totalnoofhours = value;
                                    return updatedDetails;
                                });
                            }}
                        />
                        <Text style={styles.label}>Credit Points</Text>
                        <TextInput
                            style={styles.textField}
                            placeholder='e.g. 3'
                            value={item.credits}
                            onChangeText={value => {
                                setIVSem(prevDetails => {
                                    const updatedDetails = [...prevDetails];
                                    updatedDetails[index].credits = value;
                                    return updatedDetails;
                                });
                            }}
                        />
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ fontSize: 16, color: '#407BFF', margin: 10, fontWeight: 'bold' }}>Syllabus</Text>
                            <TouchableOpacity style={{
                                width: 70,
                                height: 35,
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
                                marginLeft: 15,
                            }} onPress={() => {
                                setIVSem(prevDetails => {
                                    const updatedDetails = [...prevDetails];
                                    updatedDetails[index].syllabus.push({
                                        unit: '',
                                        noofhours: '',
                                        topics: ''
                                    });
                                    return updatedDetails;
                                });
                            }}>
                                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 14 }}> Add </Text>
                            </TouchableOpacity>
                        </View>
                        {
                            ivsem[index].syllabus && ivsem[index].syllabus.map((syllabusItem, syllabusIndex) =>
                                <View key={syllabusIndex}>
                                    <Text style={styles.header}>Chapter 0{syllabusIndex + 1}</Text>
                                    <Text style={styles.label}>Chapter Name</Text>
                                    <TextInput
                                        style={styles.textField}
                                        placeholder='e.g. Introduction to C'
                                        value={syllabusItem.unit}
                                        onChangeText={value => {
                                            setIVSem(prevDetails => {
                                                const updatedDetails = [...prevDetails];
                                                updatedDetails[index].syllabus[syllabusIndex].unit = value;
                                                return updatedDetails;
                                            });
                                        }}
                                    />
                                    <Text style={styles.label}>Number of hours alloted to this chapter</Text>
                                    <TextInput
                                        style={styles.textField}
                                        placeholder='e.g. 13 hours'
                                        value={syllabusItem.noofhours}
                                        onChangeText={value => {
                                            setIVSem(prevDetails => {
                                                const updatedDetails = [...prevDetails];
                                                updatedDetails[index].syllabus[syllabusIndex].noofhours = value;
                                                return updatedDetails;
                                            });
                                        }}
                                    />
                                    <Text style={styles.label}>Topics</Text>
                                    <TextInput
                                        style={styles.multiline}
                                        multiline
                                        editable
                                        numberOfLines={8}
                                        placeholder='e.g. Overview, history, importance, difference between C and C++, Object-oriendt Programming, Advantages, Disadvantages etc..'
                                        value={syllabusItem.topics}
                                        onChangeText={value => {
                                            setIVSem(prevDetails => {
                                                const updatedDetails = [...prevDetails];
                                                updatedDetails[index].syllabus[syllabusIndex].topics = value;
                                                return updatedDetails;
                                            });
                                        }}
                                    />
                                </View>
                            )
                        }
                        <View style={styles.divider} />
                    </View>
                ))}
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 10 }}>
                    <Text style={{ color: '#407BFF', fontSize: 18, fontWeight: 'bold', margin: 10 }}>V semester</Text>
                    <TouchableOpacity style={styles.btn} onPress={() => { 
                        const emptyObject = {
                            subject: '',
                            syllabus: [],
                            credits: '',
                            totalnoofhours: ''
                        };

                        setVSem(prevDetails => [...prevDetails, emptyObject]);
                     }}>
                        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 22 }}> + </Text>
                    </TouchableOpacity>
                </View>
                {vsem && vsem.length > 0 && vsem.map((item, index) => (
                    <View key={index}>
                        <Text style={styles.label}>Subject Name</Text>
                        <TextInput
                            style={styles.textField}
                            placeholder='e.g. C programming'
                            value={item.subject}
                            onChangeText={value => {
                                setVSem(prevDetails => {
                                    const updatedDetails = [...prevDetails];
                                    updatedDetails[index].subject = value;
                                    return updatedDetails;
                                });
                            }}
                        />
                        <Text style={styles.label}>Total number of hours alloted</Text>
                        <TextInput
                            style={styles.textField}
                            placeholder='e.g. 60 hours'
                            value={item.totalnoofhours}
                            onChangeText={value => {
                                setVSem(prevDetails => {
                                    const updatedDetails = [...prevDetails];
                                    updatedDetails[index].totalnoofhours = value;
                                    return updatedDetails;
                                });
                            }}
                        />
                        <Text style={styles.label}>Credit Points</Text>
                        <TextInput
                            style={styles.textField}
                            placeholder='e.g. 3'
                            value={item.credits}
                            onChangeText={value => {
                                setVSem(prevDetails => {
                                    const updatedDetails = [...prevDetails];
                                    updatedDetails[index].credits = value;
                                    return updatedDetails;
                                });
                            }}
                        />
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ fontSize: 16, color: '#407BFF', margin: 10, fontWeight: 'bold' }}>Syllabus</Text>
                            <TouchableOpacity style={{
                                width: 70,
                                height: 35,
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
                                marginLeft: 15,
                            }} onPress={() => {
                                setVSem(prevDetails => {
                                    const updatedDetails = [...prevDetails];
                                    updatedDetails[index].syllabus.push({
                                        unit: '',
                                        noofhours: '',
                                        topics: ''
                                    });
                                    return updatedDetails;
                                });
                            }}>
                                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 14 }}> Add </Text>
                            </TouchableOpacity>
                        </View>
                        {
                            vsem[index].syllabus && vsem[index].syllabus.map((syllabusItem, syllabusIndex) =>
                                <View key={syllabusIndex}>
                                    <Text style={styles.header}>Chapter 0{syllabusIndex + 1}</Text>
                                    <Text style={styles.label}>Chapter Name</Text>
                                    <TextInput
                                        style={styles.textField}
                                        placeholder='e.g. Introduction to C'
                                        value={syllabusItem.unit}
                                        onChangeText={value => {
                                            setVSem(prevDetails => {
                                                const updatedDetails = [...prevDetails];
                                                updatedDetails[index].syllabus[syllabusIndex].unit = value;
                                                return updatedDetails;
                                            });
                                        }}
                                    />
                                    <Text style={styles.label}>Number of hours alloted to this chapter</Text>
                                    <TextInput
                                        style={styles.textField}
                                        placeholder='e.g. 13 hours'
                                        value={syllabusItem.noofhours}
                                        onChangeText={value => {
                                            setVSem(prevDetails => {
                                                const updatedDetails = [...prevDetails];
                                                updatedDetails[index].syllabus[syllabusIndex].noofhours = value;
                                                return updatedDetails;
                                            });
                                        }}
                                    />
                                    <Text style={styles.label}>Topics</Text>
                                    <TextInput
                                        style={styles.multiline}
                                        multiline
                                        editable
                                        numberOfLines={8}
                                        placeholder='e.g. Overview, history, importance, difference between C and C++, Object-oriendt Programming, Advantages, Disadvantages etc..'
                                        value={syllabusItem.topics}
                                        onChangeText={value => {
                                            setVSem(prevDetails => {
                                                const updatedDetails = [...prevDetails];
                                                updatedDetails[index].syllabus[syllabusIndex].topics = value;
                                                return updatedDetails;
                                            });
                                        }}
                                    />
                                </View>
                            )
                        }
                        <View style={styles.divider} />
                    </View>
                ))}
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 10 }}>
                    <Text style={{ color: '#407BFF', fontSize: 18, fontWeight: 'bold', margin: 10 }}>VI semester</Text>
                    <TouchableOpacity style={styles.btn} onPress={() => {
                        const emptyObject = {
                            subject: '',
                            syllabus: [],
                            credits: '',
                            totalnoofhours: ''
                        };
                        setVISem(prevDetails => [...prevDetails, emptyObject]);
                     }}>
                        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 22 }}> + </Text>
                    </TouchableOpacity>
                </View>
                {visem && visem.length > 0 && visem.map((item, index) => (
                    <View key={index}>
                        <Text style={styles.label}>Subject Name</Text>
                        <TextInput
                            style={styles.textField}
                            placeholder='e.g. C programming'
                            value={item.subject}
                            onChangeText={value => {
                                setVISem(prevDetails => {
                                    const updatedDetails = [...prevDetails];
                                    updatedDetails[index].subject = value;
                                    return updatedDetails;
                                });
                            }}
                        />
                        <Text style={styles.label}>Total number of hours alloted</Text>
                        <TextInput
                            style={styles.textField}
                            placeholder='e.g. 60 hours'
                            value={item.totalnoofhours}
                            onChangeText={value => {
                                setVISem(prevDetails => {
                                    const updatedDetails = [...prevDetails];
                                    updatedDetails[index].totalnoofhours = value;
                                    return updatedDetails;
                                });
                            }}
                        />
                        <Text style={styles.label}>Credit Points</Text>
                        <TextInput
                            style={styles.textField}
                            placeholder='e.g. 3'
                            value={item.credits}
                            onChangeText={value => {
                                setVISem(prevDetails => {
                                    const updatedDetails = [...prevDetails];
                                    updatedDetails[index].credits = value;
                                    return updatedDetails;
                                });
                            }}
                        />
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ fontSize: 16, color: '#407BFF', margin: 10, fontWeight: 'bold' }}>Syllabus</Text>
                            <TouchableOpacity style={{
                                width: 70,
                                height: 35,
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
                                marginLeft: 15,
                            }} onPress={() => {
                                setVISem(prevDetails => {
                                    const updatedDetails = [...prevDetails];
                                    updatedDetails[index].syllabus.push({
                                        unit: '',
                                        noofhours: '',
                                        topics: ''
                                    });
                                    return updatedDetails;
                                });
                            }}>
                                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 14 }}> Add </Text>
                            </TouchableOpacity>
                        </View>
                        {
                            visem[index].syllabus && visem[index].syllabus.map((syllabusItem, syllabusIndex) =>
                                <View key={syllabusIndex}>
                                    <Text style={styles.header}>Chapter 0{syllabusIndex + 1}</Text>
                                    <Text style={styles.label}>Chapter Name</Text>
                                    <TextInput
                                        style={styles.textField}
                                        placeholder='e.g. Introduction to C'
                                        value={syllabusItem.unit}
                                        onChangeText={value => {
                                            setVISem(prevDetails => {
                                                const updatedDetails = [...prevDetails];
                                                updatedDetails[index].syllabus[syllabusIndex].unit = value;
                                                return updatedDetails;
                                            });
                                        }}
                                    />
                                    <Text style={styles.label}>Number of hours alloted to this chapter</Text>
                                    <TextInput
                                        style={styles.textField}
                                        placeholder='e.g. 13 hours'
                                        value={syllabusItem.noofhours}
                                        onChangeText={value => {
                                            setVISem(prevDetails => {
                                                const updatedDetails = [...prevDetails];
                                                updatedDetails[index].syllabus[syllabusIndex].noofhours = value;
                                                return updatedDetails;
                                            });
                                        }}
                                    />
                                    <Text style={styles.label}>Topics</Text>
                                    <TextInput
                                        style={styles.multiline}
                                        multiline
                                        editable
                                        numberOfLines={8}
                                        placeholder='e.g. Overview, history, importance, difference between C and C++, Object-oriendt Programming, Advantages, Disadvantages etc..'
                                        value={syllabusItem.topics}
                                        onChangeText={value => {
                                            setVISem(prevDetails => {
                                                const updatedDetails = [...prevDetails];
                                                updatedDetails[index].syllabus[syllabusIndex].topics = value;
                                                return updatedDetails;
                                            });
                                        }}
                                    />
                                </View>
                            )
                        }
                        <View style={styles.divider} />
                    </View>
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
    divider: {
        margin: 15,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
    },
    multiline: {
        borderColor: 'transparent',
        borderWidth: 1,
        width: 360,
        backgroundColor: 'whitesmoke',
        fontSize: 16,
        textAlign: 'left',
        borderRadius: 10,
        padding: 10,
        marginLeft: 25
    },
})
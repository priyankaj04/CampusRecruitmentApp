import { StyleSheet, Text, View, ScrollView, TouchableOpacity, KeyboardAvoidingView, TextInput, Button, ActivityIndicator } from 'react-native'
import React, { useState, useEffect, useRef } from 'react';
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/Entypo';
import Iconz from 'react-native-vector-icons/AntDesign';
import moment from 'moment';
import { RadioButton } from 'react-native-paper';
import { ResumeUpdation, ResumeDetailsByTalentID, GetStudentByEmail, TalentDetailsById } from '../api';
import Checkbox from 'expo-checkbox';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EditResume = ({ navigation }) => {
  //const { resume_id, talent_id } = route.params;
  const [showEducation, setShowEducation] = useState(false);
  const [resumeDetails, setResumeDetails] = useState([]);
  const [fetch, setFetch] = useState(false);
  const [showPosition, setShowPosition] = useState(false);
  const [showInternship, setShowInternship] = useState(false);
  const [showJob, setShowJob] = useState(false);
  const [showProject, setShowProject] = useState(false);
  const [showAccomplishment, setShowAccomplishment] = useState(false);
  const [showSkills, setShowSkills] = useState(false);
  const [talent_id, setTalentid] = useState(null);

  const getData = async () => {
    const value = await AsyncStorage.getItem('talent_id');
    if (value !== null) {
      setTalentid(value);
    }
  }

  useEffect(() => {
    if (!talent_id) {
      getData();
    }
    if (talent_id) {
      ResumeDetailsByTalentID(talent_id).then((res) => {
        if (res.status) {
          setResumeDetails(res.data[0]);
        }
      })
    }
  }, [talent_id, fetch]);


  const ShowEducationCard = (props) => {
    const [student, setStudent] = useState(null);
    const [show, setShow] = useState(null);

    useEffect(() => {
      TalentDetailsById(talent_id).then((res) => {
        if (res.status) {
          GetStudentByEmail(res.data[0].email).then((res) => {
            if (res.status) {
              setStudent(res.data[0]);
            }
          })
        }
      })
    }, [])

    return (
      <View>
        {student && student.subject_marks && <View>
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
        <View style={{
          width: '95%',
          margin: 10,
          alignItems: 'center',
          padding: 5,
        }}>
          <Text style={{ fontStyle: 'italic', color: '#407BFF', fontSize: 12 }}>
            <Icon name="info-with-circle" size={12} color='#407BFF' style={{ marginRight: 10 }} />
            {' '}Any queries or changes in your marks details please reach out to us through Contact Us page.</Text>
        </View>
      </View>
    )
  }

  const ShowPositionCard = (props) => {
    const [showNew, setShowNew] = useState(false);
    const [newDesc, setNewDesc] = useState('');
    const [oldDesc, setOldDesc] = useState([]);
    const [showSave, setShowSave] = useState(false);

    useEffect(() => {
      if (props.resumeDetails.position_of_responsibility && props.resumeDetails.position_of_responsibility.length > 0) {
        //console.log(props.resumeDetails.position_of_responsibility);
        setOldDesc(props.resumeDetails.position_of_responsibility);
      }
    }, [props.resumeDetails])

    const handleSave = (value) => {
      let reqbody = {}
      if (value == "new") {
        if (props.resumeDetails.position_of_responsibility && props.resumeDetails.position_of_responsibility.length > 0) {
          reqbody.position_of_responsibility = [...props.resumeDetails.position_of_responsibility];
          reqbody.position_of_responsibility.push({ id: props.resumeDetails.position_of_responsibility.length, description: newDesc })

        } else {
          reqbody.position_of_responsibility = [{
            id: 0,
            description: newDesc
          }]
        }
        //console.log(reqbody)
        ResumeUpdation(talent_id, reqbody).then((res) => {
          //console.log(res);
          setNewDesc('');
          if (res.status) {
            props.setFetch(!props.fetch);
          }
        })
      } else {
        reqbody.position_of_responsibility = oldDesc;
        ResumeUpdation(talent_id, reqbody).then((res) => {
          //console.log(res);
          setNewDesc('');
          if (res.status) {
            props.setFetch(!props.fetch);
            setShowSave(false);
          }
        })
      }
    }

    const handleDescriptionChange = (e, id) => {
      setShowSave(true);
      const updatedData = oldDesc.map((item) => {
        if (item.id === id) {
          return { ...item, description: e };
        }
        return item;
      });
      setOldDesc(updatedData);
    };

    const handleDelete = (id) => {
      let val = oldDesc;
      let reqbody = {};
      reqbody.position_of_responsibility = val.filter((item) => item.id != id);

      ResumeUpdation(talent_id, reqbody).then((res) => {
        //console.log(res);
        setNewDesc('');
        if (res.status) {
          props.setFetch(!props.fetch);
          setShowSave(false);
        }
      })
    }


    return (
      <View>
        {oldDesc && oldDesc.length > 0 && oldDesc.map((item) =>
          <View key={item.id} style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TextInput
              multiline
              editable
              numberOfLines={4}
              style={styles.multilines}
              value={item.description}
              onChangeText={(e) => { handleDescriptionChange(e, item.id) }}
            />
            <Iconz name="delete" size={22} color='red' onPress={() => handleDelete(item.id)} />
          </View>)}
        {showNew && <View>
          <Text style={styles.label}>If you have been/ are an active part of societies, conducted any
            events or led a team, add details here</Text>

          <TextInput
            multiline
            editable
            numberOfLines={4}
            style={styles.multiline}
            value={newDesc}
            onChangeText={(e) => { setNewDesc(e) }}
          />
        </View>}
        {!showSave ?
          showNew ?
            <TouchableOpacity style={styles.btn} onPress={() => handleSave("new")}>
              <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 18 }}>Save</Text>
            </TouchableOpacity> :
            <TouchableOpacity style={styles.btn} onPress={() => setShowNew(true)}>
              <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 18 }}>Add new</Text>
            </TouchableOpacity> :
          <TouchableOpacity style={styles.btn} onPress={() => handleSave("old")}>
            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 18 }}>Save Changes</Text>
          </TouchableOpacity>
        }
      </View>
    )
  }

  const ShowInternshipCard = (props) => {
    const [newInternship, setNewInternship] = useState({});
    const [oldInternships, setOldInternships] = useState([]);
    const [isChecked, setChecked] = useState(false);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showDatePicker1, setShowDatePicker1] = useState(false);
    const [showDatePickerPro, setShowDatePickerPro] = useState({});
    const [showNew, setShowNew] = useState(false);

    useEffect(() => {
      if (props.resumeDetails.internship && props.resumeDetails.internship.length > 0) {
        //console.log(props.resumeDetails.internship);
        setOldInternships(props.resumeDetails.internship);
      }
    }, [props.resumeDetails])

    const handleSave = (value) => {
      let reqbody = {};
      if (value === "new") {
        if (props.resumeDetails.internship && props.resumeDetails.internship.length > 0) {
          reqbody.internship = [...props.resumeDetails.internship]
          let val = newInternship;
          val.id = props.resumeDetails.internship.length;
          reqbody.internship.push(val)
        } else {
          let val = newInternship;
          val.id = 0;
          reqbody.internship = [val]
        }
      } else {
        //console.log("here is new idea", oldInternships);
        reqbody.internship = oldInternships;
      }
      ResumeUpdation(talent_id, reqbody).then((res) => {
        //console.log(res);
        setNewInternship({});
        if (res.status) {
          props.setFetch(!props.fetch);
          setShowNew(false);
        }
      })
    }

    const handleChange = (e, id, field) => {
      const updatedData = oldInternships.map((item) => {
        if (item.id === id) {
          return { ...item, [field]: e };
        }
        return item;
      });
      setOldInternships(updatedData);
    };

    const handleDatePickerToggle = (id, bool) => {
      setShowDatePickerPro((prevState) => ({
        ...prevState,
        [id]: bool,
      }));
    };

    const handleDelete = (id) => {
      let val = oldInternships;
      let reqbody = {};
      reqbody.internship = val.filter((item) => item.id != id);

      ResumeUpdation(talent_id, reqbody).then((res) => {
        //console.log(res);
        setNewInternship({});
        if (res.status) {
          props.setFetch(!props.fetch);
          setShowNew(false);
        }
      })
    }

    return (
      <View>{
        oldInternships && oldInternships.length > 0 && oldInternships.map((item, index) => <View key={item.id}>
          <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>Internship - {index + 1} </Text>
          <Text style={styles.label}>Position</Text>
          <TextInput
            style={styles.textField}
            value={item.position}
            onChangeText={(e) => { handleChange(e, item.id, "position") }}
          />
          <Text style={styles.label}>Organization</Text>
          <TextInput
            style={styles.textField}
            value={item.organization}
            onChangeText={(e) => { handleChange(e, item.id, "organization") }}
          />
          <Text style={styles.label}>Location</Text>
          <TextInput
            style={styles.textField}
            value={item.location}
            onChangeText={(e) => { handleChange(e, item.id, "location") }}
          />
          <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 20, margin: 5 }}>
            <Checkbox
              value={item.location === "Work from home" ? true : false}
              onValueChange={(e) => {
                if (item.location === "Work from home" ? true : false)
                  handleChange(e, item.id, "location")
                else
                  handleChange("Work from home", item.id, "location")
              }}
              color={item.location === "Work from home" ? '#407BFF' : undefined}
            />
            <Text style={{ color: 'black', marginLeft: 4 }}>Work from home</Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View>
              <Text style={styles.label}>Start Date</Text>
              <View style={{
                backgroundColor: 'whitesmoke',
                height: 50,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                margin: 10,
                marginTop: 0,
                padding: 5,
                borderRadius: 25,
              }}>
                <TextInput
                  style={{
                    height: 50,
                    borderColor: 'transparent',
                    borderWidth: 1,
                    width: 130,
                    padding: 10,
                    fontSize: 16,
                    borderRadius: 25,
                  }}
                  value={item.startDate ? item.startDate.slice(0, 10) : ''}
                  placeholder='YYYY/MM/DD'
                  onChangeText={(e) => { handleChange(e, item.id, "startDate") }}
                />
                <Icon name="calendar" color="gray" size={24} />
              </View>
            </View>
            <View>
              <Text style={styles.label}>End Date</Text>
              <View style={{
                backgroundColor: 'whitesmoke',
                height: 50,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                margin: 10,
                marginTop: 0,
                padding: 5,
                borderRadius: 25,
              }}>
                <TextInput
                  style={{
                    height: 50,
                    borderColor: 'transparent',
                    borderWidth: 1,
                    width: 130,
                    padding: 10,
                    fontSize: 16,
                    borderRadius: 25,
                  }}
                  value={item.endDate ? item.endDate.slice(0, 10) : ''}
                  placeholder='YYYY/MM/DD'
                  onChangeText={(e) => { handleChange(e, item.id, "endDate") }}
                />
                <Icon name="calendar" color="gray" size={24} />
              </View>
            </View>
          </View>
          <View style={{
            width: '95%',
            margin: 5,
            alignItems: 'center',
            padding: 5,
          }}>
            <Text style={{ fontStyle: 'italic', color: '#407BFF', fontSize: 12 }}>
              <Icon name="info-with-circle" size={14} color='#407BFF' style={{ marginRight: 10 }} />
              Mention key internship responsibilites in max 3 - 4 points.
              Use action verbs: Build, Led, Drove, Conceptualized, Learnt, etc.</Text>
          </View>
          <Text style={styles.label}>Work Description</Text>
          <TextInput
            multiline
            editable
            numberOfLines={4}
            style={styles.multiline}
            value={item.description}
            onChangeText={(e) => { handleChange(e, item.id, "description") }}
          />
          <TouchableOpacity style={styles.btn} onPress={() => handleSave("old")}>
            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 18 }}>Save Changes</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleDelete(item.id)}>
            <Text style={{ color: 'red', fontSize: 14, textAlign: 'center', fontWeight: 'bold' }}>Erase Data</Text>
          </TouchableOpacity>
          <View style={styles.divider} />
        </View>)
      }
        <Text style={{ textAlign: 'center', fontWeight: 'bold', marginTop: 15 }}>Add new internship </Text>
        <Text style={styles.label}>Position</Text>
        <TextInput
          style={styles.textField}
          value={newInternship.position}
          onChangeText={(e) => { setNewInternship({ ...newInternship, position: e }) }}
        />
        <Text style={styles.label}>Organization</Text>
        <TextInput
          style={styles.textField}
          value={newInternship.organization}
          onChangeText={(e) => { setNewInternship({ ...newInternship, organization: e }) }}
        />
        <Text style={styles.label}>Location</Text>
        <TextInput
          style={styles.textField}
          value={newInternship.location}
          onChangeText={(e) => { if (!isChecked) setNewInternship({ ...newInternship, location: e }) }}
        />
        <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 20, margin: 5 }}>
          <Checkbox
            value={isChecked}
            onValueChange={(e) => {
              if (isChecked)
                setNewInternship({ ...newInternship, location: "" })
              else
                setNewInternship({ ...newInternship, location: "Work from home" })
              setChecked(!isChecked);
            }}
            color={isChecked ? '#407BFF' : undefined}
          />
          <Text style={{ color: 'black', marginLeft: 4 }}>Work from home</Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View>
            <Text style={styles.label}>Start Date</Text>
            <View style={{
              backgroundColor: 'whitesmoke',
              height: 50,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              margin: 10,
              marginTop: 0,
              padding: 5,
              borderRadius: 25,
            }}>
              <TextInput
                style={{
                  height: 50,
                  borderColor: 'transparent',
                  borderWidth: 1,
                  width: 130,
                  padding: 10,
                  fontSize: 16,
                  borderRadius: 25,
                }}
                value={newInternship.startDate}
                placeholder='YYYY/MM/DD'
                onChangeText={(e) => { setNewInternship({ ...newInternship, startDate: e }) }}
              />
              <Icon name="calendar" color="gray" size={24} />
            </View>
          </View>
          <View>
            <Text style={styles.label}>End Date</Text>
            <View style={{
              backgroundColor: 'whitesmoke',
              height: 50,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              margin: 10,
              marginTop: 0,
              padding: 5,
              borderRadius: 25,
            }}>
              <TextInput
                style={{
                  height: 50,
                  borderColor: 'transparent',
                  borderWidth: 1,
                  width: 130,
                  padding: 10,
                  fontSize: 16,
                  borderRadius: 25,
                }}
                value={newInternship.endDate}
                placeholder='YYYY/MM/DD'
                onChangeText={(e) => { setNewInternship({ ...newInternship, endDate: e }) }}
              />
              <Icon name="calendar" color="gray" size={24} />
            </View>
          </View>
        </View>
        <View style={{
          width: '95%',
          margin: 5,
          alignItems: 'center',
          padding: 5,
        }}>
          <Text style={{ fontStyle: 'italic', color: '#407BFF', fontSize: 12 }}>
            <Icon name="info-with-circle" size={14} color='#407BFF' style={{ marginRight: 10 }} />
            Mention key internship responsibilites in max 3 - 4 points.
            Use action verbs: Build, Led, Drove, Conceptualized, Learnt, etc.</Text>
        </View>
        <Text style={styles.label}>Work Description</Text>
        <TextInput
          multiline
          editable
          numberOfLines={4}
          style={styles.multiline}
          value={newInternship.description}
          onChangeText={(e) => { setNewInternship({ ...newInternship, description: e }) }}
        />
        <TouchableOpacity style={styles.btn} onPress={() => handleSave("new")}>
          <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 18 }}>Save</Text>
        </TouchableOpacity>
      </View>
    )
  }

  const ShowJobCard = (props) => {
    const [newInternship, setNewInternship] = useState({});
    const [oldInternships, setOldInternships] = useState([]);
    const [isChecked, setChecked] = useState(false);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showDatePicker1, setShowDatePicker1] = useState(false);
    const [showDatePickerPro, setShowDatePickerPro] = useState({});
    const [showNew, setShowNew] = useState(false);

    useEffect(() => {
      if (props.resumeDetails.job && props.resumeDetails.job.length > 0) {
        console.log(props.resumeDetails.job);
        setOldInternships(props.resumeDetails.job);
      }
    }, [props.resumeDetails])

    const handleSave = (value) => {
      let reqbody = {};
      if (value === "new") {
        if (props.resumeDetails.job && props.resumeDetails.job.length > 0) {
          reqbody.job = [...props.resumeDetails.job]
          let val = newInternship;
          val.id = props.resumeDetails.job.length;
          reqbody.job.push(val)
        } else {
          let val = newInternship;
          val.id = 0;
          reqbody.job = [val]
        }
      } else {
        //console.log("here is new idea", oldInternships);
        reqbody.job = oldInternships;
      }
      ResumeUpdation(talent_id, reqbody).then((res) => {
        //console.log(res);
        setNewInternship({});
        if (res.status) {
          props.setFetch(!props.fetch);
          setShowNew(false);
        }
      })
    }

    const handleChange = (e, id, field) => {
      const updatedData = oldInternships.map((item) => {
        if (item.id === id) {
          return { ...item, [field]: e };
        }
        return item;
      });
      setOldInternships(updatedData);
    };

    const handleDatePickerToggle = (id, bool) => {
      setShowDatePickerPro((prevState) => ({
        ...prevState,
        [id]: bool,
      }));
    };

    const handleDelete = (id) => {
      let val = oldInternships;
      let reqbody = {};
      reqbody.job = val.filter((item) => item.id != id);

      ResumeUpdation(talent_id, reqbody).then((res) => {
        //console.log(res);
        setNewInternship({});
        if (res.status) {
          props.setFetch(!props.fetch);
          setShowNew(false);
        }
      })
    }

    return (
      <View>{
        oldInternships && oldInternships.length > 0 && oldInternships.map((item, index) => <View key={item.id}>
          <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>Job - {index + 1} </Text>
          <Text style={styles.label}>Position</Text>
          <TextInput
            style={styles.textField}
            value={item.position}
            onChangeText={(e) => { handleChange(e, item.id, "position") }}
          />
          <Text style={styles.label}>Organization</Text>
          <TextInput
            style={styles.textField}
            value={item.organization}
            onChangeText={(e) => { handleChange(e, item.id, "organization") }}
          />
          <Text style={styles.label}>Location</Text>
          <TextInput
            style={styles.textField}
            value={item.location}
            onChangeText={(e) => { handleChange(e, item.id, "location") }}
          />
          <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 20, margin: 5 }}>
            <Checkbox
              value={item.location === "Work from home" ? true : false}
              onValueChange={(e) => {
                if (item.location === "Work from home" ? true : false)
                  handleChange(e, item.id, "location")
                else
                  handleChange("Work from home", item.id, "location")
              }}
              color={item.location === "Work from home" ? '#407BFF' : undefined}
            />
            <Text style={{ color: 'black', marginLeft: 4 }}>Work from home</Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View>
              <Text style={styles.label}>Start Date</Text>
              <View style={{
                backgroundColor: 'whitesmoke',
                height: 50,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                margin: 10,
                marginTop: 0,
                padding: 5,
                borderRadius: 25,
              }}>
                <TextInput
                  style={{
                    height: 50,
                    borderColor: 'transparent',
                    borderWidth: 1,
                    width: 130,
                    padding: 10,
                    fontSize: 16,
                    borderRadius: 25,
                  }}
                  value={item.startDate ? item.startDate.slice(0, 10) : ''}
                  placeholder='YYYY/MM/DD'
                  onChangeText={(e) => { handleChange(e, item.id, "startDate") }}
                />
                <Icon name="calendar" color="gray" size={24} />
              </View>
            </View>
            <View>
              <Text style={styles.label}>End Date</Text>
              <View style={{
                backgroundColor: 'whitesmoke',
                height: 50,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                margin: 10,
                marginTop: 0,
                padding: 5,
                borderRadius: 25,
              }}>
                <TextInput
                  style={{
                    height: 50,
                    borderColor: 'transparent',
                    borderWidth: 1,
                    width: 130,
                    padding: 10,
                    fontSize: 16,
                    borderRadius: 25,
                  }}
                  value={item.endDate ? item.endDate.slice(0, 10) : ''}
                  placeholder='YYYY/MM/DD'
                  onChangeText={(e) => { handleChange(e, item.id, "endDate") }}
                />
                <Icon name="calendar" color="gray" size={24} />
              </View>
            </View>
          </View>
          <View style={{
            width: '95%',
            margin: 5,
            alignItems: 'center',
            padding: 5,
          }}>
            <Text style={{ fontStyle: 'italic', color: '#407BFF', fontSize: 12 }}>
              <Icon name="info-with-circle" size={14} color='#407BFF' style={{ marginRight: 10 }} />
              Mention key internship responsibilites in max 3 - 4 points.
              Use action verbs: Build, Led, Drove, Conceptualized, Learnt, etc.</Text>
          </View>
          <Text style={styles.label}>Work Description</Text>
          <TextInput
            multiline
            editable
            numberOfLines={4}
            style={styles.multiline}
            value={item.description}
            onChangeText={(e) => { handleChange(e, item.id, "description") }}
          />
          <TouchableOpacity style={styles.btn} onPress={() => handleSave("old")}>
            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 18 }}>Save Changes</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleDelete(item.id)}>
            <Text style={{ color: 'red', fontSize: 14, textAlign: 'center', fontWeight: 'bold' }}>Erase Data</Text>
          </TouchableOpacity>
          <View style={styles.divider} />
        </View>)
      }
        <Text style={{ textAlign: 'center', fontWeight: 'bold', marginTop: 15 }}>Add new Job </Text>
        <Text style={styles.label}>Position</Text>
        <TextInput
          style={styles.textField}
          value={newInternship.position}
          onChangeText={(e) => { setNewInternship({ ...newInternship, position: e }) }}
        />
        <Text style={styles.label}>Organization</Text>
        <TextInput
          style={styles.textField}
          value={newInternship.organization}
          onChangeText={(e) => { setNewInternship({ ...newInternship, organization: e }) }}
        />
        <Text style={styles.label}>Location</Text>
        <TextInput
          style={styles.textField}
          value={newInternship.location}
          onChangeText={(e) => { if (!isChecked) setNewInternship({ ...newInternship, location: e }) }}
        />
        <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 20, margin: 5 }}>
          <Checkbox
            value={isChecked}
            onValueChange={(e) => {
              if (isChecked)
                setNewInternship({ ...newInternship, location: "" })
              else
                setNewInternship({ ...newInternship, location: "Work from home" })
              setChecked(!isChecked);
            }}
            color={isChecked ? '#407BFF' : undefined}
          />
          <Text style={{ color: 'black', marginLeft: 4 }}>Work from home</Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View>
            <Text style={styles.label}>Start Date</Text>
            <View style={{
              backgroundColor: 'whitesmoke',
              height: 50,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              margin: 10,
              marginTop: 0,
              padding: 5,
              borderRadius: 25,
            }}>
              <TextInput
                style={{
                  height: 50,
                  borderColor: 'transparent',
                  borderWidth: 1,
                  width: 130,
                  padding: 10,
                  fontSize: 16,
                  borderRadius: 25,
                }}
                value={newInternship.startDate}
                placeholder='YYYY/MM/DD'
                onChangeText={(e) => { setNewInternship({ ...newInternship, startDate: e }) }}
              />
              <Icon name="calendar" color="gray" size={24} />
            </View>
          </View>
          <View>
            <Text style={styles.label}>End Date</Text>
            <View style={{
              backgroundColor: 'whitesmoke',
              height: 50,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              margin: 10,
              marginTop: 0,
              padding: 5,
              borderRadius: 25,
            }}>
              <TextInput
                style={{
                  height: 50,
                  borderColor: 'transparent',
                  borderWidth: 1,
                  width: 130,
                  padding: 10,
                  fontSize: 16,
                  borderRadius: 25,
                }}
                value={newInternship.endDate}
                placeholder='YYYY/MM/DD'
                onChangeText={(e) => { setNewInternship({ ...newInternship, endDate: e }) }}
              />
              <Icon name="calendar" color="gray" size={24} />
            </View>
          </View>
        </View>
        <View style={{
          width: '95%',
          margin: 5,
          alignItems: 'center',
          padding: 5,
        }}>
          <Text style={{ fontStyle: 'italic', color: '#407BFF', fontSize: 12 }}>
            <Icon name="info-with-circle" size={14} color='#407BFF' style={{ marginRight: 10 }} />
            Mention key internship responsibilites in max 3 - 4 points.
            Use action verbs: Build, Led, Drove, Conceptualized, Learnt, etc.</Text>
        </View>
        <Text style={styles.label}>Work Description</Text>
        <TextInput
          multiline
          editable
          numberOfLines={4}
          style={styles.multiline}
          value={newInternship.description}
          onChangeText={(e) => { setNewInternship({ ...newInternship, description: e }) }}
        />
        <TouchableOpacity style={styles.btn} onPress={() => handleSave("new")}>
          <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 18 }}>Save</Text>
        </TouchableOpacity>
      </View>
    )
  }

  const ShowProjectCard = (props) => {

    const [oldProjects, setOldProjects] = useState([]);
    const [newProject, setNewProject] = useState({});

    useEffect(() => {
      if (props.resumeDetails.project && props.resumeDetails.project.length > 0) {
        console.log(props.resumeDetails.project);
        setOldProjects(props.resumeDetails.project);
      }
    }, [props.resumeDetails])

    const handleSave = (value) => {
      let reqbody = {};
      if (value === "new") {
        if (props.resumeDetails.project && props.resumeDetails.project.length > 0) {
          reqbody.project = [...props.resumeDetails.project]
          let val = newProject;
          val.id = props.resumeDetails.project[props.resumeDetails.project.length - 1].id + 1;
          reqbody.project.push(val)
        } else {
          let val = newProject;
          val.id = 0;
          reqbody.project = [val]
        }
      } else {
        //console.log("here is new idea", oldSkills);
        reqbody.project = oldProjects;
      }
      ResumeUpdation(talent_id, reqbody).then((res) => {
        //console.log(res);
        setNewProject({});
        if (res.status) {
          props.setFetch(!props.fetch);
        }
      })
    }

    const handleChange = (e, id, field) => {
      const updatedData = oldProjects.map((item) => {
        if (item.id === id) {
          return { ...item, [field]: e };
        }
        return item;
      });
      setOldProjects(updatedData);
    };

    const handleDelete = (id) => {
      let val = oldProjects;
      let reqbody = {};
      reqbody.project = val.filter((item) => item.id != id);
      ResumeUpdation(talent_id, reqbody).then((res) => {
        //console.log(res);
        setNewProject({});
        if (res.status) {
          props.setFetch(!props.fetch);
        }
      })
    }


    return (
      <View>
        {oldProjects && oldProjects.length > 0 && oldProjects.map((item, index) => <View key={item.id}>
          <Text style={{ textAlign: 'center', fontWeight: 'bold', marginTop: 15 }}>Project - {index + 1} </Text>
          <Text style={styles.label} >Title of the project</Text>
          <TextInput
            style={styles.textField}
            value={item.title}
            onChangeText={(e) => { handleChange(e, item.id, "title") }}
            placeholder='e.g. Talent Connect'
          />
          <Text style={styles.label} >Requirements</Text>
          <TextInput
            style={styles.textField}
            value={item.requirements}
            onChangeText={(e) => { handleChange(e, item.id, "requirements") }}
            placeholder='e.g. React Native, PostgreSQL,...'
          />
          <Text style={styles.label} >Description</Text>
          <TextInput
            style={styles.multiline}
            value={item.description}
            multiline
            editable
            numberOfLines={6}
            onChangeText={(e) => { handleChange(e, item.id, "description") }}
            placeholder='Description about project'
          />
          <Text style={styles.label} >Project Reference/Link</Text>
          <TextInput
            style={styles.textField}
            value={item.url}
            onChangeText={(e) => { handleChange(e, item.id, "url") }}
            placeholder='https://talentconnect.in'
          />
          <TouchableOpacity style={styles.btn} onPress={() => handleSave("old")}>
            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 18 }}>Save Changes</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleDelete(item.id)}>
            <Text style={{ color: 'red', fontSize: 14, textAlign: 'center', fontWeight: 'bold' }}>Erase Data</Text>
          </TouchableOpacity>
          <View style={styles.divider} />
        </View>)}

        <Text style={{ textAlign: 'center', fontWeight: 'bold', marginTop: 15 }}>Add new project </Text>
        <Text style={styles.label} >Title of the project</Text>
        <TextInput
          style={styles.textField}
          value={newProject.title}
          onChangeText={(e) => { setNewProject({ ...newProject, title: e }) }}
          placeholder='e.g. Talent Connect'
        />
        <Text style={styles.label} >Requirements</Text>
        <TextInput
          style={styles.textField}
          value={newProject.requirements}
          onChangeText={(e) => { setNewProject({ ...newProject, requirements: e }) }}
          placeholder='e.g. React Native, PostgreSQL,...'
        />
        <Text style={styles.label} >Description</Text>
        <TextInput
          style={styles.multiline}
          value={newProject.description}
          multiline
          editable
          numberOfLines={6}
          onChangeText={(e) => { setNewProject({ ...newProject, description: e }) }}
          placeholder='Description about project'
        />
        <Text style={styles.label} >Project Reference/Link</Text>
        <TextInput
          style={styles.textField}
          value={newProject.url}
          onChangeText={(e) => { setNewProject({ ...newProject, url: e }) }}
          placeholder='https://talentconnect.in'
        />
        <TouchableOpacity style={styles.btn} onPress={() => handleSave("new")}>
          <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 18 }}>Save</Text>
        </TouchableOpacity>
      </View>
    )
  }

  const ShowSkillsCard = (props) => {
    const [oldSkills, setOldSkills] = useState([]);
    const [newSkills, setNewSkills] = useState({});

    useEffect(() => {
      if (props.resumeDetails.skill && props.resumeDetails.skill.length > 0) {
        console.log(props.resumeDetails.skill);
        setOldSkills(props.resumeDetails.skill);
      }
    }, [props.resumeDetails])

    const handleSave = (value) => {
      let reqbody = {};
      if (value === "new") {
        if (props.resumeDetails.skill && props.resumeDetails.skill.length > 0) {
          reqbody.skill = [...props.resumeDetails.skill]
          let val = newSkills;
          val.id = props.resumeDetails.skill[props.resumeDetails.skill.length - 1].id + 1;
          reqbody.skill.push(val)
        } else {
          let val = newSkills;
          val.id = 0;
          reqbody.skill = [val]
        }
      } else {
        //console.log("here is new idea", oldSkills);
        reqbody.skill = oldSkills;
      }
      ResumeUpdation(talent_id, reqbody).then((res) => {
        //console.log(res);
        setNewSkills({});
        if (res.status) {
          props.setFetch(!props.fetch);
        }
      })
    }

    const handleChange = (e, id, field) => {
      const updatedData = oldSkills.map((item) => {
        if (item.id === id) {
          return { ...item, [field]: e };
        }
        return item;
      });
      setOldSkills(updatedData);
    };

    const handleDelete = (id) => {
      let val = oldSkills;
      let reqbody = {};
      reqbody.skill = val.filter((item) => item.id != id);

      ResumeUpdation(talent_id, reqbody).then((res) => {
        //console.log(res);
        setNewSkills({});
        if (res.status) {
          props.setFetch(!props.fetch);
        }
      })
    }

    return (
      <View>
        {oldSkills && oldSkills.length > 0 && oldSkills.map((item, index) => <View key={item.id}>
          <Text style={{ textAlign: 'center', fontWeight: 'bold', marginTop: 15 }}>Skill - {index + 1} </Text>
          <TextInput
            style={styles.textField}
            value={item.skill_type}
            onChangeText={(e) => { handleChange(e, item.id, "skill_type") }}
            placeholder='e.g. Web Technologies'
          />
          <Text style={styles.label}>List of Skills</Text>
          <TextInput
            style={styles.textField}
            value={item.skills_list}
            onChangeText={(e) => { handleChange(e, item.id, "skills_list") }}
            placeholder='e.g. MERN(MongoDB, ExpressJS, ReactJS, NodeJS) stack, KnexJS, ViteJS, ...'
          />
          <TouchableOpacity style={styles.btn} onPress={() => handleSave("old")}>
            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 18 }}>Save Changes</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleDelete(item.id)}>
            <Text style={{ color: 'red', fontSize: 14, textAlign: 'center', fontWeight: 'bold' }}>Erase Data</Text>
          </TouchableOpacity>
          <View style={styles.divider} />
        </View>)}
        <Text style={{ textAlign: 'center', fontWeight: 'bold', marginTop: 15 }}>Add new skill </Text>
        <Text style={styles.label} >Skill type</Text>
        <TextInput
          style={styles.textField}
          value={newSkills.skill_type}
          onChangeText={(e) => { setNewSkills({ ...newSkills, skill_type: e }) }}
          placeholder='e.g. Web Technologies'
        />
        <Text style={styles.label}>List of Skills</Text>
        <TextInput
          style={styles.textField}
          value={newSkills.skills_list}
          onChangeText={(e) => { setNewSkills({ ...newSkills, skills_list: e }) }}
          placeholder='e.g. MongoDB, ExpressJS, ReactJS, NodeJS, KnexJS, ViteJS, ...'
        />
        <TouchableOpacity style={styles.btn} onPress={() => handleSave("new")}>
          <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 18 }}>Save</Text>
        </TouchableOpacity>
      </View>
    )
  }

  const ShowAccomplishmentCard = (props) => {

    const [oldAccomp, setOldAccomp] = useState([]);
    const [newAccomp, setNewAccomp] = useState({});

    useEffect(() => {
      if (props.resumeDetails.accomplishment && props.resumeDetails.accomplishment.length > 0) {
        console.log(props.resumeDetails.accomplishment);
        setOldAccomp(props.resumeDetails.accomplishment);
      }
    }, [props.resumeDetails])

    const handleSave = (value) => {
      let reqbody = {};
      if (value === "new") {
        if (props.resumeDetails.accomplishment && props.resumeDetails.accomplishment.length > 0) {
          reqbody.accomplishment = [...props.resumeDetails.accomplishment]
          let val = newAccomp;
          val.id = props.resumeDetails.accomplishment[props.resumeDetails.accomplishment.length - 1].id + 1;
          reqbody.accomplishment.push(val)
        } else {
          let val = newAccomp;
          val.id = 0;
          reqbody.accomplishment = [val]
        }
      } else {
        //console.log("here is new idea", oldAccomp);
        reqbody.accomplishment = oldAccomp;
      }
      ResumeUpdation(talent_id, reqbody).then((res) => {
        //console.log(res);
        setNewAccomp({});
        if (res.status) {
          props.setFetch(!props.fetch);
        }
      })
    }

    const handleChange = (e, id, field) => {
      const updatedData = oldAccomp.map((item) => {
        if (item.id === id) {
          return { ...item, [field]: e };
        }
        return item;
      });
      setOldAccomp(updatedData);
    };

    const handleDelete = (id) => {
      let val = oldAccomp;
      let reqbody = {};
      reqbody.accomplishment = val.filter((item) => item.id != id);

      ResumeUpdation(talent_id, reqbody).then((res) => {
        //console.log(res);
        setNewAccomp({});
        if (res.status) {
          props.setFetch(!props.fetch);
        }
      })
    }
    return (
      <View>
        {oldAccomp && oldAccomp.length > 0 && oldAccomp.map((item, index) => <View key={item.id}>
          <Text style={{ textAlign: 'center', fontWeight: 'bold', marginTop: 15 }}>Accomplishment - {index + 1} </Text>
          <Text style={styles.label} >Title of your accomplishment</Text>
          <TextInput
            style={styles.textField}
            value={item.title}
            onChangeText={(e) => { handleChange(e, item.id, "title") }}
            placeholder='e.g. University Topper'
          />
          <Text style={styles.label} >Description</Text>
          <TextInput
            style={styles.multiline}
            value={item.description}
            multiline
            editable
            numberOfLines={6}
            onChangeText={(e) => { handleChange(e, item.id, "description") }}
            placeholder='Description about your accomplishment'
          />
          <Text style={styles.label} >Reference/Blog link</Text>
          <TextInput
            style={styles.textField}
            value={item.url}
            onChangeText={(e) => { handleChange(e, item.id, "url") }}
            placeholder='https://bcu.topperlists.in'
          />
          <TouchableOpacity style={styles.btn} onPress={() => handleSave("old")}>
            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 18 }}>Save Changes</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleDelete(item.id)}>
            <Text style={{ color: 'red', fontSize: 14, textAlign: 'center', fontWeight: 'bold' }}>Erase Data</Text>
          </TouchableOpacity>
          <View style={styles.divider} />
        </View>)}

        <Text style={{ textAlign: 'center', fontWeight: 'bold', marginTop: 15 }}>Add new accomplishment </Text>
        <Text style={styles.label} >Title of your accomplishment</Text>
        <TextInput
          style={styles.textField}
          value={newAccomp.title}
          onChangeText={(e) => { setNewAccomp({ ...newAccomp, title: e }) }}
          placeholder='e.g. University Topper'
        />
        <Text style={styles.label} >Description</Text>
        <TextInput
          style={styles.multiline}
          value={newAccomp.description}
          multiline
          editable
          numberOfLines={6}
          onChangeText={(e) => { setNewAccomp({ ...newAccomp, description: e }) }}
          placeholder='Description about your accomplishment'
        />
        <Text style={styles.label} >Reference/Blog link</Text>
        <TextInput
          style={styles.textField}
          value={newAccomp.url}
          onChangeText={(e) => { setNewAccomp({ ...newAccomp, url: e }) }}
          placeholder='https://bcu.topperlists.in'
        />
        <TouchableOpacity style={styles.btn} onPress={() => handleSave("new")}>
          <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 18 }}>Save</Text>
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <ScrollView>
      <View style={{
        width: '95%',
        margin: 10,
        alignItems: 'center',
        padding: 5,
      }}>
        <Text style={{ fontStyle: 'italic', color: '#407BFF', fontSize: 12 }}>
          <Icon name="info-with-circle" size={12} color='#407BFF' style={{ marginRight: 10 }} />
          Whenever you apply to an internship or job, this is the resume that the employer will see,
          always make sure it is up to date.</Text>
      </View>

      <View style={{
        backgroundColor: 'white',
        borderRadius: 10,
        margin: 10,
        minHeight: 50,
        padding: 10,
      }}>
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between'
        }}>
          <Text style={styles.header}>Education Details</Text>
          {showEducation ? <TouchableOpacity style={{ justifyContent: 'center' }} onPress={() => { setShowEducation(false) }}>
            <Icon name="minus" size={28} color='#407BFF' />
          </TouchableOpacity> : <TouchableOpacity style={{ justifyContent: 'center' }} onPress={() => { setShowEducation(true) }}>
            <Icon name="plus" size={28} color='#407BFF' />
          </TouchableOpacity>}
        </View>
        {showEducation && <ShowEducationCard setShowEducation={setShowEducation} />}
      </View>

      <View style={{
        backgroundColor: 'white',
        borderRadius: 10,
        margin: 10,
        minHeight: 50,
        padding: 10,
      }}>
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between'
        }}>
          <Text style={styles.header}>Position of Responsibility</Text>
          {showPosition ? <TouchableOpacity style={{ justifyContent: 'center' }} onPress={() => { setShowPosition(false) }}>
            <Icon name="minus" size={28} color='#407BFF' />
          </TouchableOpacity> : <TouchableOpacity style={{ justifyContent: 'center' }} onPress={() => { setShowPosition(true) }}>
            <Icon name="plus" size={28} color='#407BFF' />
          </TouchableOpacity>}
        </View>
        {showPosition && <ShowPositionCard setShowPosition={setShowPosition} fetch={fetch} setFetch={setFetch} resumeDetails={resumeDetails} />}
      </View>

      <View style={{
        backgroundColor: 'white',
        borderRadius: 10,
        margin: 10,
        minHeight: 50,
        padding: 10,
      }}>
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between'
        }}>
          <Text style={styles.header}>Internships</Text>
          {showInternship ? <TouchableOpacity style={{ justifyContent: 'center' }} onPress={() => { setShowInternship(false) }}>
            <Icon name="minus" size={28} color='#407BFF' />
          </TouchableOpacity> : <TouchableOpacity style={{ justifyContent: 'center' }} onPress={() => { setShowInternship(true) }}>
            <Icon name="plus" size={28} color='#407BFF' />
          </TouchableOpacity>}
        </View>
        {showInternship && <ShowInternshipCard setShowInternship={setShowInternship} fetch={fetch} setFetch={setFetch} resumeDetails={resumeDetails} />}
      </View>

      <View style={{
        backgroundColor: 'white',
        borderRadius: 10,
        margin: 10,
        minHeight: 50,
        padding: 10,
      }}>
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between'
        }}>
          <Text style={styles.header}>Jobs</Text>
          {showJob ? <TouchableOpacity style={{ justifyContent: 'center' }} onPress={() => { setShowJob(false) }}>
            <Icon name="minus" size={28} color='#407BFF' />
          </TouchableOpacity> : <TouchableOpacity style={{ justifyContent: 'center' }} onPress={() => { setShowJob(true) }}>
            <Icon name="plus" size={28} color='#407BFF' />
          </TouchableOpacity>}
        </View>
        {showJob && <ShowJobCard setShowJob={setShowJob} fetch={fetch} setFetch={setFetch} resumeDetails={resumeDetails} />}
      </View>

      <View style={{
        backgroundColor: 'white',
        borderRadius: 10,
        margin: 10,
        minHeight: 50,
        padding: 10,
      }}>
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between'
        }}>
          <Text style={styles.header}>Projects</Text>
          {showProject ? <TouchableOpacity style={{ justifyContent: 'center' }} onPress={() => { setShowProject(false) }}>
            <Icon name="minus" size={28} color='#407BFF' />
          </TouchableOpacity> : <TouchableOpacity style={{ justifyContent: 'center' }} onPress={() => { setShowProject(true) }}>
            <Icon name="plus" size={28} color='#407BFF' />
          </TouchableOpacity>}
        </View>
        {showProject && <ShowProjectCard setShowProject={setShowProject} fetch={fetch} setFetch={setFetch} resumeDetails={resumeDetails} />}
      </View>

      <View style={{
        backgroundColor: 'white',
        borderRadius: 10,
        margin: 10,
        minHeight: 50,
        padding: 10,
      }}>
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between'
        }}>
          <Text style={styles.header}>Skills</Text>
          {showSkills ? <TouchableOpacity style={{ justifyContent: 'center' }} onPress={() => { setShowSkills(false) }}>
            <Icon name="minus" size={28} color='#407BFF' />
          </TouchableOpacity> : <TouchableOpacity style={{ justifyContent: 'center' }} onPress={() => { setShowSkills(true) }}>
            <Icon name="plus" size={28} color='#407BFF' />
          </TouchableOpacity>}
        </View>
        {showSkills && <ShowSkillsCard setShowSkills={setShowSkills} fetch={fetch} setFetch={setFetch} resumeDetails={resumeDetails} />}
      </View>

      <View style={{
        backgroundColor: 'white',
        borderRadius: 10,
        margin: 10,
        minHeight: 50,
        padding: 10,
      }}>
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between'
        }}>
          <Text style={styles.header}>Accomplishments</Text>
          {showAccomplishment ? <TouchableOpacity style={{ justifyContent: 'center' }} onPress={() => { setShowAccomplishment(false) }}>
            <Icon name="minus" size={28} color='#407BFF' />
          </TouchableOpacity> : <TouchableOpacity style={{ justifyContent: 'center' }} onPress={() => { setShowAccomplishment(true) }}>
            <Icon name="plus" size={28} color='#407BFF' />
          </TouchableOpacity>}
        </View>
        {showAccomplishment && <ShowAccomplishmentCard setShowAccomplishment={setShowAccomplishment} fetch={fetch} setFetch={setFetch} resumeDetails={resumeDetails} />}
      </View>
      <TouchableOpacity style={styles.btnpro} onPress={() => navigation.navigate("ViewResume", { talent_id: talent_id, resume_id: resumeDetails.resume_id })}>
        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 18 }}>View Resume</Text>
      </TouchableOpacity>

    </ScrollView>
  )
}

export default EditResume

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
    marginLeft: 10
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
    elevation: 3
  },
  multiline: {
    minHeight: 50,
    borderColor: 'transparent',
    borderWidth: 1,
    width: 360,
    padding: 8,
    backgroundColor: 'whitesmoke',
    margin: 8,
    fontSize: 16,
    textAlign: 'left',
    borderRadius: 25,
  },
  datePickerStyle: {
    width: 230,
  },
  divider: {
    marginTop: 5,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  }, multilines: {
    minHeight: 50,
    borderColor: 'transparent',
    borderWidth: 1,
    width: 320,
    padding: 8,
    backgroundColor: 'whitesmoke',
    margin: 8,
    fontSize: 16,
    textAlign: 'left',
    borderRadius: 25,
  }, btnpro: {
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
    marginLeft: 28
  }
})
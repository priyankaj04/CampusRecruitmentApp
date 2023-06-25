import { StyleSheet, Text, View, ScrollView, Linking } from 'react-native'
import React, { useState, useEffect } from 'react';
import { ResumeDetailsByTalentID, TalentDetailsById, GetStudentByEmail } from '../api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ViewResume = ({ route, navigation }) => {
  //const { talent_id, resume_id } = route.params;
  //const talent_id = '21e3369b-f853-41e9-aa02-7a08c7531646'
  const [details, setDetails] = useState([]);
  const [talentDetails, setTalentDetails] = useState([]);
  const [fetch, setFetch] = useState(false);
  const [talent_id, setTalentid] = useState(null);
  const [registerno, setRegisterno] = useState(null);
  const [education, setEducation] = useState({});

  const getData = async () => {
    setTalentid(await AsyncStorage.getItem('talent_id'));
    setRegisterno(await AsyncStorage.getItem('register_no'))
  }

  useEffect(() => {
    if (!talent_id) {
      getData();
    }
    if (talent_id) {
      ResumeDetailsByTalentID(talent_id).then((res) => {
        if (res.status) {
          setDetails(res.data[0]);
        }
      })
      TalentDetailsById(talent_id).then((res) => {
        if (res.status) {
          setTalentDetails(res.data[0]);
          GetStudentByEmail(res.data[0].email).then((resp) => {
            if (resp.status) {
              setEducation(resp.data[0]);
              console.log("response: ", resp.data[0]);
            }
          })
        }
      })
    }
  }, [fetch, talent_id, registerno]);

  const WebLink = ({ url }) => {
    const handleLinkPress = () => {
      Linking.openURL(url);
    };

    return (
      <Text onPress={handleLinkPress} style={{ color: '#407BFF' }}>
        Click Here
      </Text>
    );
  };

  return (
    <ScrollView>
      <View style={{ width: '96%', margin: 10, backgroundColor: 'white', borderRadius: 10, padding: 10 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <Text style={styles.header}>{talentDetails.firstname} {talentDetails.lastname}</Text>
          </View>
          <View style={{ flexDirection: 'column' }}>
            <Text style={styles.normal}>{talentDetails.email}</Text>
            {talentDetails.contactno && <Text style={styles.normal}>+91 {talentDetails.contactno}</Text>}
            {talentDetails.city && <Text style={styles.normal}>{talentDetails.city}</Text>}
          </View>
        </View>

        <View>
          {
            education && <View>
              <View style={styles.divider} />
              <Text style={styles.header1}>Education</Text>
              {education && education.tenth_details && <View style={{ margin: 10 }}>
                <Text style={styles.name}> ❖ {education.tenth_details.school} - {education.tenth_details.board}</Text>
                <Text>X (secondary)</Text>
                <Text>{education.tenth_details.yearofcompletion} - {education.tenth_details.percentage}</Text>
                <Text style={{ ...styles.name, marginTop: 10 }}> ❖ {education.twelth_details.school} - {education.twelth_details.board}</Text>
                <Text>XII (senior secondary)</Text>
                <Text>{education.twelth_details.yearofcompletion} - {education.twelth_details.stream}, {education.twelth_details.percentage}</Text>
                <Text style={{...styles.name, marginTop: 10 }}> ❖ {education.degree}</Text>
                <Text>{education.stream} - {education.semester} semester</Text>
                <Text>{education.cgpa} CGPA</Text>
                {education.backlog_number && <Text>{education.backlog_number} backlog(s) ({education.backlog_subject})</Text>}
              </View>}
            </View>
          }
          {
            details.skill &&
            <View>
              <View style={styles.divider} />
              <Text style={styles.header1}>Skills</Text>
              <View>
                {
                  details.skill.map((item, index) => (
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
            details.project &&
            <View>
              <View style={styles.divider} />
              <Text style={styles.header1}>Projects</Text>
              <View>
                {
                  details.project.map((item, index) => (
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
            details.internship &&
            <View>
              <View style={styles.divider} />
              <Text style={styles.header1}>Internships</Text>
              <View>
                {
                  details.internship.map((item, index) => (
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
            details.job &&
            <View>
              <View style={styles.divider} />
              <Text style={styles.header1}>Experience</Text>
              <View>
                {
                  details.job.map((item, index) => (
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
            details.position_of_responsibility &&
            <View>
              <View style={styles.divider} />
              <Text style={styles.header1}>Position of Responsibility</Text>
              <View>
                {
                  details.position_of_responsibility.map((item, index) => (
                    <View style={{ margin: 10 }} key={index}>
                      <Text style={styles.description}> ❖ {item.description}</Text>
                    </View>
                  ))
                }
              </View>
            </View>
          }
          {
            details.accomplishment &&
            <View>
              <View style={styles.divider} />
              <Text style={styles.header1}>Accomplishments</Text>
              <View>
                {
                  details.accomplishment.map((item, index) => (
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
        </View>
      </View>
    </ScrollView>
  )
}

export default ViewResume

const styles = StyleSheet.create({
  header: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  header1: {
    fontSize: 16,
    color: 'gray'
  },
  normal: {
    fontSize: 14
  }, divider: {
    margin: 5,
    borderBottomColor: '#407BFF',
    borderBottomWidth: 1,
  }, name: {
    fontSize: 14,
    fontWeight: 'bold'
  }, description: {
    fontSize: 14,
  }
})
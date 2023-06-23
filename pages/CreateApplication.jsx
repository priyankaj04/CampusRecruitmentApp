import { StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity, ClearText } from 'react-native'
import React, { useState, useEffect } from 'react';
import { RadioButton } from 'react-native-paper';
import Checkbox from 'expo-checkbox';
import Icon from 'react-native-vector-icons/Entypo';
import { CreateJob, RecruiterDetailsById } from '../api';
import Toastable, { showToastable } from 'react-native-toastable';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CreateApplication = ({ navigation }) => {
  const [jobDetails, setJobdetails] = useState({});
  const [id, setId] = useState(null);
  const [recruiterdetails, setRecruiterdetails] = useState({});

  const getData = async () => {
    setId(await AsyncStorage.getItem('recruiter_id'));
  }

  useEffect(() => {
    if (!id) {
      getData();
    }
    if (id) {
      RecruiterDetailsById(id).then((res) => {
        if (res.status) {
          setRecruiterdetails(res.data[0]);
          console.log(res.data[0])
        }
      })
    }
  }, [id])

  const handleClick = () => {
    if (!jobDetails.opportunity_type || !jobDetails.job_title || !jobDetails.skills || !jobDetails.job_type || !jobDetails.number_of_openings || !jobDetails.job_start_date
      || !jobDetails.job_description || !jobDetails.preference || !jobDetails.alternate_mobile || !jobDetails.eligibility || !jobDetails.due_date) {
      showToastable({
        message: "Fill all the fields to improve chances to attract more applicants.",
        duration: 3000,
        status: 'info'
      })
    }
    jobDetails.company_name = recruiterdetails.company_name;
    CreateJob(id, jobDetails).then((res) => {
      console.log("this is response", res);
      if (res.status) {
        setJobdetails({});
        showToastable({
          message: "Job is created successfully, and sent for reviewing.",
          duration: 3000,
          status: 'success'
        })
      } else {
        showToastable({
          message: res.message,
          duration: 3000,
          status: 'info'
        })
        console.log("ERROR", res.message);
      }
    })
  }

  return (
    <View>
      <View style={{ position: 'absolute', top: 10, width: '100%', height: 70, zIndex: 9999, }}>
        <Toastable statusMap={{
          success: 'rgba(66, 126, 255, 0.85)',
          info: 'rgba(0, 0, 0, 0.85)'
        }} />
      </View>
      <ScrollView>
        <View style={{ backgroundColor: 'white', width: "95%", margin: 10, borderRadius: 10 }}>
          <Text style={styles.header}>Opportunity type</Text>
          <View style={{ flexDirection: 'row', marginLeft: 10 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <RadioButton
                value="internship"
                label="Internship"
                status={jobDetails.opportunity_type === 'internship' ? 'checked' : 'unchecked'}
                onPress={() => { setJobdetails({ ...jobDetails, opportunity_type: "internship" }) }}
              />
              <Text style={{ textAlign: 'center' }}>Internship</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <RadioButton
                value="job"
                label="Job"
                status={jobDetails.opportunity_type === 'job' ? 'checked' : 'unchecked'}
                onPress={() => { setJobdetails({ ...jobDetails, opportunity_type: "job" }) }}
              />
              <Text style={{ textAlign: 'center' }}>Job</Text>
            </View>
          </View>
          <View style={styles.divider} />
          {
            jobDetails.opportunity_type == 'internship' ? <Text style={styles.header}>Internship details</Text> : <Text style={styles.header}>Job details</Text>
          }
          {
            jobDetails.opportunity_type == 'internship' ? <Text style={styles.label}>Internship profile</Text> : <Text style={styles.label}>Job title</Text>
          }
          <TextInput
            style={styles.textField}
            value={jobDetails.job_title}
            onChangeText={(e) => { setJobdetails({ ...jobDetails, job_title: e }) }}
            placeholder={jobDetails.opportunity_type == 'internship' ? 'e.g. Android App Development' : 'e.g. Software Engineer Trainee'}
          />
          <Text style={styles.label}>Skills required</Text>
          <TextInput
            style={styles.textField}
            value={jobDetails.skills}
            onChangeText={(e) => { setJobdetails({ ...jobDetails, skills: e }) }}
            placeholder='e.g. Java'
          />
          {jobDetails.opportunity_type == 'internship' ? <Text style={styles.label}>Internship type</Text> : <Text style={styles.label}>Job type</Text>}
          <View style={{ flexDirection: 'row', marginLeft: 10 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <RadioButton
                value="In-office/Hybrid"
                label="In-office/Hybrid"
                status={jobDetails.job_type === 'In-office/Hybrid' ? 'checked' : 'unchecked'}
                onPress={() => { setJobdetails({ ...jobDetails, job_type: "In-office/Hybrid" }) }}
              />
              <Text style={{ textAlign: 'center' }}>In-office/Hybrid</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <RadioButton
                value="job"
                label="Job"
                status={jobDetails.job_type === 'Remote' ? 'checked' : 'unchecked'}
                onPress={() => { setJobdetails({ ...jobDetails, job_type: "Remote" }) }}
              />
              <Text style={{ textAlign: 'center' }}>Remote</Text>
            </View>
          </View>
          {jobDetails.job_type == "In-office/Hybrid" && <View>
            <Text style={styles.label}>Location</Text>
            <TextInput
              style={styles.textField}
              value={jobDetails.location}
              onChangeText={(e) => { setJobdetails({ ...jobDetails, location: e }) }}
              placeholder='e.g. Koramangala,Bengaluru'
            />
          </View>}
          <Text style={styles.label}>Number of openings</Text>
          <TextInput
            style={styles.textField}
            value={jobDetails.number_of_openings}
            onChangeText={(e) => { setJobdetails({ ...jobDetails, number_of_openings: e }) }}
            placeholder='e.g. 4'
          />
          <View style={{ flexDirection: 'row', margin: 5 }}>
            <View>
              <Text style={styles.label}>Total Number of rounds</Text>
              <TextInput
                style={styles.towinonepro}
                value={jobDetails.rounds}
                onChangeText={(e) => { setJobdetails({ ...jobDetails, rounds: e }) }}
                placeholder='e.g. 3'
              />
            </View>
            <View>
              <Text style={styles.label}>Current round</Text>
              <TextInput
                style={styles.towinonepro}
                value={jobDetails.round}
                onChangeText={(e) => { setJobdetails({ ...jobDetails, round: e }) }}
                placeholder='e.g. 2'
              />
            </View>
          </View>
          <Text style={styles.label}>Round Name</Text>
          <TextInput
            style={styles.textField}
            value={jobDetails.round_name}
            onChangeText={(e) => { setJobdetails({ ...jobDetails, round_name: e }) }}
            placeholder='e.g. Technical Round'
          />
          <Text style={styles.label}>Eligibility</Text>
          <TextInput
            style={styles.textField}
            value={jobDetails.eligibility}
            onChangeText={(e) => { setJobdetails({ ...jobDetails, eligibility: e }) }}
            placeholder='e.g. Any Bachelor Degree'
          />
          {jobDetails.opportunity_type == 'internship' && <View>
            <Text style={styles.label}>Internship start date</Text>
            <View style={{ flexDirection: 'row', marginLeft: 10 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <RadioButton
                  value="Immediately (within next 30 days)"
                  label="Immediately (within next 30 days)"
                  status={jobDetails.job_start_date === 'Immediately (within next 30 days)' ? 'checked' : 'unchecked'}
                  onPress={() => { setJobdetails({ ...jobDetails, job_start_date: "Immediately (within next 30 days)" }) }}
                />
                <Text style={{ textAlign: 'center' }}>Immediately (within next 30 days)</Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <RadioButton
                  value="Later"
                  label="Later"
                  status={jobDetails.job_start_date === 'Later' ? 'checked' : 'unchecked'}
                  onPress={() => { setJobdetails({ ...jobDetails, job_start_date: "Later" }) }}
                />
                <Text style={{ textAlign: 'center' }}>Later</Text>
              </View>
            </View>
          </View>
          }
          <Text style={styles.label}>Last Date to apply</Text>
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
                width: 320,
                padding: 10,
                fontSize: 16,
                borderRadius: 25,
              }}
              value={jobDetails.due_date}
              onChangeText={(e) => { setJobdetails({ ...jobDetails, due_date: e }) }}
              placeholder='format DD/MM/YYYY'
            />
            <Icon name="calendar" color="#407BFF" size={24} />
          </View>
          {jobDetails.opportunity_type === "internship" &&
            <View>
              <Text style={styles.label}>Internship duration</Text>
              <Text style={{ color: '#407BFF', fontStyle: 'italic', fontSize: 12, marginLeft: 25, margin: 0 }}>Shorter the duration, more the applications</Text>
              <Text style={styles.label}>Choose duration</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center', margin: 10, flex: 1, justifyContent: 'space-evenly' }}>
                <TextInput
                  style={styles.towinone}
                  value={jobDetails.ctc1}
                  onChangeText={(e) => { setJobdetails({ ...jobDetails, ctc1: e }) }}
                  placeholder='e.g. 3'
                />
                <TextInput
                  style={styles.towinone}
                  value={jobDetails.ctc2}
                  onChangeText={(e) => { setJobdetails({ ...jobDetails, ctc2: e }) }}
                  placeholder='e.g. months'
                />
              </View>
            </View>
          }
          {jobDetails.opportunity_type == 'internship' ? <Text style={styles.label}>Intern's responsibilities</Text> : <Text style={styles.label}>Job description</Text>}
          {jobDetails.opportunity_type === 'internship' && <Text style={{ color: '#407BFF', fontStyle: 'italic', fontSize: 12, marginLeft: 25, margin: 0 }}>Internship posts with detailed job description receive significantly more applications.</Text>}
          <TextInput
            style={styles.multiline}
            multiline
            editable
            numberOfLines={8}
            value={jobDetails.job_description}
            onChangeText={(e) => { setJobdetails({ ...jobDetails, job_description: e }) }}
            placeholder={jobDetails.opportunity_type == 'internship' ? `Selected intern's day-to-day responsibilites include: ` : 'Key responsibilities'}
          />
          <Text style={styles.label}>Do you have any candidate preferences? (Optional)</Text>
          <TextInput
            style={styles.multiline}
            multiline
            editable
            numberOfLines={8}
            value={jobDetails.preference}
            onChangeText={(e) => { setJobdetails({ ...jobDetails, preference: e }) }}
            placeholder={jobDetails.opportunity_type == 'internship' ? 'e.g. Computer Science students preffered' : 'e.g. Only Computer Science graduates preferred'}
          />
          <View style={styles.divider} />
          {jobDetails.opportunity_type == 'internship' ?
            <View>
              <Text style={styles.header}>Stipend & perks</Text>
              <Text style={styles.label}>Stipend</Text>
              <View style={{
                flexDirection: 'row',
                flexWrap: 'wrap'
              }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <RadioButton
                    value="Fixed"
                    label="Fixed"
                    status={jobDetails.stipend_type === 'Fixed' ? 'checked' : 'unchecked'}
                    onPress={() => { setJobdetails({ ...jobDetails, stipend_type: "Fixed" }) }}
                  />
                  <Text style={{ textAlign: 'center' }}>Fixed</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <RadioButton
                    value="In %"
                    label="In %"
                    status={jobDetails.stipend_type === 'Negotiable' ? 'checked' : 'unchecked'}
                    onPress={() => { setJobdetails({ ...jobDetails, stipend_type: "Negotiable" }) }}
                  />
                  <Text style={{ textAlign: 'center' }}>Negotiable</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <RadioButton
                    value="Performance Based"
                    label="Performance Based"
                    status={jobDetails.stipend_type === 'Performance Based' ? 'checked' : 'unchecked'}
                    onPress={() => { setJobdetails({ ...jobDetails, stipend_type: "Performance Based" }) }}
                  />
                  <Text style={{ textAlign: 'center' }}>Performance Based</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <RadioButton
                    value="Unpaid"
                    label="Unpaid"
                    status={jobDetails.stipend_type === 'Unpaid' ? 'checked' : 'unchecked'}
                    onPress={() => { setJobdetails({ ...jobDetails, stipend_type: "Unpaid" }) }}
                  />
                  <Text style={{ textAlign: 'center' }}>Unpaid</Text>
                </View>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', margin: 20, flex: 1, justifyContent: 'flex-start' }}>
                <Text>₹</Text>
                <TextInput
                  style={{
                    height: 50,
                    borderColor: 'transparent',
                    borderWidth: 1,
                    width: 230,
                    padding: 8,
                    backgroundColor: 'whitesmoke',
                    fontSize: 16,
                    marginTop: 0,
                    borderRadius: 25,
                    marginLeft: 10
                  }}
                  value={jobDetails.stipend_amt}
                  onChangeText={(e) => { setJobdetails({ ...jobDetails, stipend_amt: e }) }}
                  placeholder='e.g. 10000'
                />
                <TextInput
                  style={{
                    height: 50,
                    borderColor: 'transparent',
                    borderWidth: 1,
                    width: 100,
                    padding: 8,
                    backgroundColor: 'whitesmoke',
                    fontSize: 16,
                    marginTop: 0,
                    borderRadius: 25,
                    marginLeft: 10
                  }}
                  value={jobDetails.stipend_per}
                  onChangeText={(e) => { setJobdetails({ ...jobDetails, stipend_per: e }) }}
                  placeholder='/month'
                />
              </View>
              <Text style={styles.label}>Perks (Optional)</Text>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 20, margin: 5 }}>
                  <Checkbox
                    value={jobDetails.perks1 === "Certificate" ? true : false}
                    onValueChange={(e) => {
                      if (jobDetails.perks1 === "Certificate" ? true : false)
                        setJobdetails({ ...jobDetails, perks1: "" })
                      else
                        setJobdetails({ ...jobDetails, perks1: "Certificate" })
                    }}
                    color={jobDetails.perks1 === "Certificate" ? '#407BFF' : undefined}
                  />
                  <Text style={{ color: 'black', marginLeft: 4 }}>Certificate</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 20, margin: 5 }}>
                  <Checkbox
                    value={jobDetails.perks2 === "Flexible work hours" ? true : false}
                    onValueChange={(e) => {
                      if (jobDetails.perks2 === "Flexible work hours" ? true : false)
                        setJobdetails({ ...jobDetails, perks2: "" })
                      else
                        setJobdetails({ ...jobDetails, perks2: "Flexible work hours" })
                    }}
                    color={jobDetails.perks2 === "Flexible work hours" ? '#407BFF' : undefined}
                  />
                  <Text style={{ color: 'black', marginLeft: 4 }}>Flexible work hours</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 20, margin: 5 }}>
                  <Checkbox
                    value={jobDetails.perks3 === "Letter of recommendation" ? true : false}
                    onValueChange={(e) => {
                      if (jobDetails.perks3 === "Letter of recommendation" ? true : false)
                        setJobdetails({ ...jobDetails, perks3: "" })
                      else
                        setJobdetails({ ...jobDetails, perks3: "Letter of recommendation" })
                    }}
                    color={jobDetails.perks3 === "Letter of recommendation" ? '#407BFF' : undefined}
                  />
                  <Text style={{ color: 'black', marginLeft: 4 }}>Letter of recommendation</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 20, margin: 5 }}>
                  <Checkbox
                    value={jobDetails.perks4 === "5 days a week" ? true : false}
                    onValueChange={(e) => {
                      if (jobDetails.perks4 === "5 days a week" ? true : false)
                        setJobdetails({ ...jobDetails, perks4: "" })
                      else
                        setJobdetails({ ...jobDetails, perks4: "5 days a week" })
                    }}
                    color={jobDetails.perks4 === "5 days a week" ? '#407BFF' : undefined}
                  />
                  <Text style={{ color: 'black', marginLeft: 4 }}>5 days a week</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 20, margin: 5 }}>
                  <Checkbox
                    value={jobDetails.perks5 === "Informal dress code" ? true : false}
                    onValueChange={(e) => {
                      if (jobDetails.perks5 === "Informal dress code" ? true : false)
                        setJobdetails({ ...jobDetails, perks5: "" })
                      else
                        setJobdetails({ ...jobDetails, perks5: "Informal dress code" })
                    }}
                    color={jobDetails.perks5 === "Informal dress code" ? '#407BFF' : undefined}
                  />
                  <Text style={{ color: 'black', marginLeft: 4 }}>Informal dress code</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 20, margin: 5 }}>
                  <Checkbox
                    value={jobDetails.perks6 === "Free snacks & beverages" ? true : false}
                    onValueChange={(e) => {
                      if (jobDetails.perks6 === "Free snacks & beverages" ? true : false)
                        setJobdetails({ ...jobDetails, perks6: "" })
                      else
                        setJobdetails({ ...jobDetails, perks6: "Free snacks & beverages" })
                    }}
                    color={jobDetails.perks6 === "Free snacks & beverages" ? '#407BFF' : undefined}
                  />
                  <Text style={{ color: 'black', marginLeft: 4 }}>Free snacks & beverages</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 20, margin: 5 }}>
                  <Checkbox
                    value={jobDetails.perks7 === "Pre-placement offer" ? true : false}
                    onValueChange={(e) => {
                      if (jobDetails.perks7 === "Pre-placement offer" ? true : false)
                        setJobdetails({ ...jobDetails, perks7: "" })
                      else
                        setJobdetails({ ...jobDetails, perks7: "Pre-placement offer" })
                    }}
                    color={jobDetails.perks7 === "Pre-placement offer" ? '#407BFF' : undefined}
                  />
                  <Text style={{ color: 'black', marginLeft: 4 }}>Pre-placement offer</Text>
                </View>
              </View>
            </View> :
            <View>
              <Text style={styles.header}>Salary & perks</Text>
              <Text style={styles.label}>CTC</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center', margin: 10, flex: 1, justifyContent: 'space-evenly' }}>
                <TextInput
                  style={styles.towinone}
                  value={jobDetails.ctc1}
                  onChangeText={(e) => { setJobdetails({ ...jobDetails, ctc1: e }) }}
                  placeholder='e.g. 5.2'
                />
                <Text> to </Text>
                <TextInput
                  style={styles.towinone}
                  value={jobDetails.ctc2}
                  onChangeText={(e) => { setJobdetails({ ...jobDetails, ctc2: e }) }}
                  placeholder='e.g. 6.5'
                />
              </View>
              <Text style={styles.label}>CTC breakup</Text>
              <Text style={{ color: '#407BFF', fontStyle: 'italic', fontSize: 12, marginLeft: 25, margin: 0 }}>Transparent CTC breakup attracts top candidates</Text>
              <View style={{ flexDirection: 'row', marginLeft: 10 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <RadioButton
                    value="In %"
                    label="In %"
                    status={jobDetails.ctc_breakup === 'In %' ? 'checked' : 'unchecked'}
                    onPress={() => { setJobdetails({ ...jobDetails, ctc_breakup: "In %" }) }}
                  />
                  <Text style={{ textAlign: 'center' }}>In %</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <RadioButton
                    value="In LPA"
                    label="In LPA"
                    status={jobDetails.ctc_breakup === 'In LPA' ? 'checked' : 'unchecked'}
                    onPress={() => { setJobdetails({ ...jobDetails, ctc_breakup: "In LPA" }) }}
                  />
                  <Text style={{ textAlign: 'center' }}>In LPA</Text>
                </View>
              </View>
              <Text style={styles.label}>Fixed pay</Text>
              <Text style={{ color: '#407BFF', fontStyle: 'italic', fontSize: 12, marginLeft: 25, margin: 0 }}>Fixed pay is the fixed component of the CTC</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center', margin: 10, flex: 1, justifyContent: 'flex-start' }}>
                <TextInput
                  style={styles.towinone}
                  value={jobDetails.fixed_pay}
                  onChangeText={(e) => { setJobdetails({ ...jobDetails, fixed_pay: e }) }}
                  placeholder='e.g. 5.2'
                />
                <Text> LPA</Text>
              </View>
              <Text style={styles.label}>Variable pay</Text>
              <Text style={{ color: '#407BFF', fontStyle: 'italic', fontSize: 12, marginLeft: 25, margin: 0 }}>Variable pay includes performane based cash incentives and bonuses</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center', margin: 10, flex: 1, justifyContent: 'flex-start' }}>
                <TextInput
                  style={styles.towinone}
                  value={jobDetails.variable_pay}
                  onChangeText={(e) => { setJobdetails({ ...jobDetails, variable_pay: e }) }}
                  placeholder='e.g. 1.4'
                />
                <Text> LPA</Text>
              </View>
              <Text style={styles.label}>Other Incentives</Text>
              <Text style={{ color: '#407BFF', fontStyle: 'italic', fontSize: 12, marginLeft: 25, margin: 0 }}>Other incentives may include joining bonus, relocation assistance, gratuity, etc.</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center', margin: 10, flex: 1, justifyContent: 'flex-start' }}>
                <TextInput
                  style={styles.towinone}
                  value={jobDetails.other_incentives}
                  onChangeText={(e) => { setJobdetails({ ...jobDetails, other_incentives: e }) }}
                  placeholder='e.g. 0.4'
                />
                <Text> LPA</Text>
              </View>
              <Text style={styles.label}>Perks (Optional)</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 20, margin: 5 }}>
                <Checkbox
                  value={jobDetails.perks1 === "5 days a week" ? true : false}
                  onValueChange={(e) => {
                    if (jobDetails.perks1 === "5 days a week" ? true : false)
                      setJobdetails({ ...jobDetails, perks1: "" })
                    else
                      setJobdetails({ ...jobDetails, perks1: "5 days a week" })
                  }}
                  color={jobDetails.perks1 === "5 days a week" ? '#407BFF' : undefined}
                />
                <Text style={{ color: 'black', marginLeft: 4 }}>5 days a week</Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 20, margin: 5 }}>
                <Checkbox
                  value={jobDetails.perks2 === "Health Insurance" ? true : false}
                  onValueChange={(e) => {
                    if (jobDetails.perks2 === "Health Insurance" ? true : false)
                      setJobdetails({ ...jobDetails, perks2: "" })
                    else
                      setJobdetails({ ...jobDetails, perks2: "Health Insurance" })
                  }}
                  color={jobDetails.perks2 === "Health Insurance" ? '#407BFF' : undefined}
                />
                <Text style={{ color: 'black', marginLeft: 4 }}>Health Insurance</Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 20, margin: 5 }}>
                <Checkbox
                  value={jobDetails.perks3 === "Life Insurance" ? true : false}
                  onValueChange={(e) => {
                    if (jobDetails.perks3 === "Life Insurance" ? true : false)
                      setJobdetails({ ...jobDetails, perks3: "" })
                    else
                      setJobdetails({ ...jobDetails, perks3: "Life Insurance" })
                  }}
                  color={jobDetails.perks3 === "Life Insurance" ? '#407BFF' : undefined}
                />
                <Text style={{ color: 'black', marginLeft: 4 }}>Life Insurace</Text>
              </View>
            </View>
          }
          <View style={styles.divider} />
          <Text style={styles.header}>Cover letter, availability & assessment question</Text>
          <Text style={{ color: '#407BFF', fontStyle: 'italic', fontSize: 12, marginLeft: 25, margin: 0 }}>Cover letter & availability question will be asked to every applicant by default. If you wish, you may ask two more cutomized questions as an assessment</Text>
          <Text style={styles.label}>Cover Letter</Text>
          <Text style={{ color: 'black', marginLeft: 15 }}>Why should you be hired for this role?</Text>
          <Text style={styles.label}>Availability</Text>
          <Text style={{ color: 'black', marginLeft: 15 }}>Are you available for a full-time remote job starting immediately? If not, what is the earliest date you can start this job?</Text>
          <View style={styles.divider} />
          <Text style={styles.header}>Alternate mobile number for this post</Text>
          <Text style={{ color: '#407BFF', fontStyle: 'italic', fontSize: 12, marginLeft: 25, margin: 0 }}>Our team will calal you on the number in case of any query regarding this post only. Primary account number will not be updated.</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', margin: 10, flex: 1, justifyContent: 'flex-start' }}>
            <Text>+91</Text>
            <TextInput
              style={{
                height: 50,
                borderColor: 'transparent',
                borderWidth: 1,
                width: 330,
                padding: 8,
                backgroundColor: 'whitesmoke',
                fontSize: 16,
                marginTop: 0,
                borderRadius: 25,
                marginLeft: 10
              }}
              value={jobDetails.alternate_mobile}
              onChangeText={(e) => { setJobdetails({ ...jobDetails, alternate_mobile: e }) }}
              placeholder='9944332211'
            />
          </View>

          <TouchableOpacity style={styles.btn} onPress={() => {
            handleClick()
          }}>
            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 18 }}>Post Job</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  )
}

export default CreateApplication

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
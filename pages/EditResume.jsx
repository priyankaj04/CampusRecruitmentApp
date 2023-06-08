import { StyleSheet, Text, View, ScrollView, TouchableOpacity, KeyboardAvoidingView, TextInput, Button, ActivityIndicator } from 'react-native'
import React, { useState, useEffect, useRef } from 'react';
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/Entypo';
import moment from 'moment';
import { RadioButton } from 'react-native-paper';
import { ResumeUpdation, ResumeDetailsByTalentID } from '../api';
import Checkbox from 'expo-checkbox';
import DateTimePicker from '@react-native-community/datetimepicker';

const EditResume = ({ route, navigation }) => {
  const { resume_id, talent_id } = route.params;
  const [showEducation, setShowEducation] = useState(false);
  const [resumeDetails, setResumeDetails] = useState([]);
  const [fetch, setFetch] = useState(false);
  const [showPosition, setShowPosition] = useState(false);
  const [showInternship, setShowInternship] = useState(false);
  const [showJob, setShowJob] = useState(false);
  const [showProject, setShowProject] = useState(false);
  const [showAccomplishment, setShowAccomplishment] = useState(false);
  const [showSkills, setShowSkills] = useState(false);


  useEffect(() => {
    ResumeDetailsByTalentID(talent_id).then((res) => {
      if (res.status) {
        setResumeDetails(res.data[0]);
      }
    })
  }, [fetch])

  const ShowEducationCard = (props) => {

    const [selectedLevel, setSelectedLevel] = useState('ug/pg');
    const [college, setCollege] = useState('');
    const [collegeD, setCollegeD] = useState('');
    const [collegeP, setCollegeP] = useState('');
    const [sYear, setSYear] = useState(2023);
    const [eYear, setEYear] = useState(2023);
    const [sYearD, setSYearD] = useState(2023);
    const [eYearD, setEYearD] = useState(2023);
    const [sYearP, setSYearP] = useState(2023);
    const [eYearP, setEYearP] = useState(2023);
    const [degree, setDegree] = useState('');
    const [stream, setStream] = useState('');
    const [streamD, setStreamD] = useState('');
    const [streamP, setStreamP] = useState('');
    const [performanceS, setPerformanceS] = useState('');
    const [performance, setPerformance] = useState('');
    const [performanceST, setPerformanceST] = useState('');
    const [performanceT, setPerformanceT] = useState('');
    const [performanceSD, setPerformanceSD] = useState('');
    const [performanceD, setPerformanceD] = useState('');
    const [performanceSP, setPerformanceSP] = useState('');
    const [performanceP, setPerformanceP] = useState('');
    const [yearofcompletion, setYearofcompletion] = useState(2023);
    const [maticulationstatus, setMaticulationstatus] = useState('');
    const [board, setBoard] = useState('');
    const [school, setSchool] = useState('');
    const [save, setSave] = useState(false);
    const [savePro, setSavePro] = useState(false);


    useEffect(() => {
      if (resumeDetails.education.length > 0) {
        resumeDetails.education.map((item) => {
          console.log(item);
          if (item.level == 'ug/pg') {
            setCollege(item.college);
            setSYear(item.startYear);
            setEYear(item.endYear);
            setDegree(item.degree);
            setPerformance(item.performance);
            setPerformanceS(item.performanceScale);
            setStream(item.stream);
          } else if (item.level == '10th/12th') {
            setMaticulationstatus(item.maticulationstatus);
            setBoard(item.board);
            setSchool(item.school);
            setYearofcompletion(item.yearofcompletion);
            setPerformanceT(item.performance)
            setPerformanceST(item.performanceScale);
          } else if (item.level === 'diploma') {
            setCollegeD(item.college);
            setSYearD(item.startYear);
            setEYearD(item.endYear);
            setPerformanceD(item.performance);
            setPerformanceSD(item.performanceScale);
            setStreamD(item.stream);
          } else if (item.level === 'phd') {
            setCollegeP(item.college);
            setSYearP(item.startYear);
            setEYearP(item.endYear);
            setPerformanceP(item.performance);
            setPerformanceSP(item.performanceScale);
            setStreamP(item.stream);
          }
        })
      }
    }, [props.resumeDetails])

    const performanceScale = [{
      label: 'Percentage',
      value: 'percentage'
    }, {
      label: 'CGPA (/10)',
      value: 'cgpa(/10)'
    }, {
      label: 'CGPA (/9)',
      value: 'cgpa(/9)'
    }, {
      label: 'CGPA (/8)',
      value: 'cgpa(/8)'
    }, {
      label: 'CGPA (/7)',
      value: 'cgpa(/7)'
    }, {
      label: 'CGPA (/5)',
      value: 'cgpa(/5)'
    }, {
      label: 'CGPA (/4)',
      value: 'cgpa(/4)'
    }]

    const startYear = [
      { "label": "1978", "value": 1978 },
      { "label": "1979", "value": 1979 },
      { "label": "1980", "value": 1980 },
      { "label": "1981", "value": 1981 },
      { "label": "1982", "value": 1982 },
      { "label": "1983", "value": 1983 },
      { "label": "1984", "value": 1984 },
      { "label": "1985", "value": 1985 },
      { "label": "1986", "value": 1986 },
      { "label": "1987", "value": 1987 },
      { "label": "1988", "value": 1988 },
      { "label": "1989", "value": 1989 },
      { "label": "1990", "value": 1990 },
      { "label": "1991", "value": 1991 },
      { "label": "1992", "value": 1992 },
      { "label": "1993", "value": 1993 },
      { "label": "1994", "value": 1994 },
      { "label": "1995", "value": 1995 },
      { "label": "1996", "value": 1996 },
      { "label": "1997", "value": 1997 },
      { "label": "1998", "value": 1998 },
      { "label": "1999", "value": 1999 },
      { "label": "2000", "value": 2000 },
      { "label": "2001", "value": 2001 },
      { "label": "2002", "value": 2002 },
      { "label": "2003", "value": 2003 },
      { "label": "2004", "value": 2004 },
      { "label": "2005", "value": 2005 },
      { "label": "2006", "value": 2006 },
      { "label": "2007", "value": 2007 },
      { "label": "2008", "value": 2008 },
      { "label": "2009", "value": 2009 },
      { "label": "2010", "value": 2010 },
      { "label": "2011", "value": 2011 },
      { "label": "2012", "value": 2012 },
      { "label": "2013", "value": 2013 },
      { "label": "2014", "value": 2014 },
      { "label": "2015", "value": 2015 },
      { "label": "2016", "value": 2016 },
      { "label": "2017", "value": 2017 },
      { "label": "2018", "value": 2018 },
      { "label": "2019", "value": 2019 },
      { "label": "2020", "value": 2020 },
      { "label": "2021", "value": 2021 },
      { "label": "2022", "value": 2022 },
      { "label": "2023", "value": 2023 }]

    const endYear = [
      { "label": "1978", "value": 1978 },
      { "label": "1979", "value": 1979 },
      { "label": "1980", "value": 1980 },
      { "label": "1981", "value": 1981 },
      { "label": "1982", "value": 1982 },
      { "label": "1983", "value": 1983 },
      { "label": "1984", "value": 1984 },
      { "label": "1985", "value": 1985 },
      { "label": "1986", "value": 1986 },
      { "label": "1987", "value": 1987 },
      { "label": "1988", "value": 1988 },
      { "label": "1989", "value": 1989 },
      { "label": "1990", "value": 1990 },
      { "label": "1991", "value": 1991 },
      { "label": "1992", "value": 1992 },
      { "label": "1993", "value": 1993 },
      { "label": "1994", "value": 1994 },
      { "label": "1995", "value": 1995 },
      { "label": "1996", "value": 1996 },
      { "label": "1997", "value": 1997 },
      { "label": "1998", "value": 1998 },
      { "label": "1999", "value": 1999 },
      { "label": "2000", "value": 2000 },
      { "label": "2001", "value": 2001 },
      { "label": "2002", "value": 2002 },
      { "label": "2003", "value": 2003 },
      { "label": "2004", "value": 2004 },
      { "label": "2005", "value": 2005 },
      { "label": "2006", "value": 2006 },
      { "label": "2007", "value": 2007 },
      { "label": "2008", "value": 2008 },
      { "label": "2009", "value": 2009 },
      { "label": "2010", "value": 2010 },
      { "label": "2011", "value": 2011 },
      { "label": "2012", "value": 2012 },
      { "label": "2013", "value": 2013 },
      { "label": "2014", "value": 2014 },
      { "label": "2015", "value": 2015 },
      { "label": "2016", "value": 2016 },
      { "label": "2017", "value": 2017 },
      { "label": "2018", "value": 2018 },
      { "label": "2019", "value": 2019 },
      { "label": "2020", "value": 2020 },
      { "label": "2021", "value": 2021 },
      { "label": "2022", "value": 2022 },
      { "label": "2023", "value": 2023 },
      { "label": "2024", "value": 2024 },
      { "label": "2025", "value": 2025 },
      { "label": "2026", "value": 2026 },
      { "label": "2027", "value": 2027 },
      { "label": "2028", "value": 2028 }]


    const handleClick = () => {
      let reqbody = {};
      setSave(true);
      if (props.resumeDetails.education.length === 0 || !props.resumeDetails.education.length || !props.resumeDetails.education) {
        if (selectedLevel === 'ug/pg') {
          reqbody.education = [{
            level: selectedLevel,
            college,
            startYear: sYear,
            endYear: eYear,
            degree: degree,
            stream: stream,
            performanceScale: performanceS,
            performance: performance
          }]
        } else if (selectedLevel === '10th/12th') {
          reqbody.education = [{
            level: selectedLevel,
            maticulationstatus,
            yearofCompletion: yearofcompletion,
            board,
            school,
            performanceScale: performanceST,
            performance: performanceT
          }]
        } else if (selectedLevel === 'diploma') {
          reqbody.education = [{
            level: selectedLevel,
            college: collegeD,
            startYear: sYearD,
            endYear: eYearD,
            stream: streamD,
            performanceScale: performanceSD,
            performance: performanceD
          }]
        }
        else if (selectedLevel === 'phd') {
          reqbody.education = [{
            level: selectedLevel,
            college: collegeP,
            startYear: sYearP,
            endYear: eYearP,
            stream: streamP,
            performanceScale: performanceSP,
            performance: performanceP
          }]
        }
      } else {

        const newData = [...props.resumeDetails.education];
        const existingIndex = newData.findIndex((item) => item.level === selectedLevel);


        if (existingIndex !== -1) {

          if (selectedLevel === 'ug/pg') {
            newData[existingIndex].college = college
            newData[existingIndex].startYear = sYear
            newData[existingIndex].endYear = eYear
            newData[existingIndex].degree = degree
            newData[existingIndex].stream = stream
            newData[existingIndex].performanceScale = performanceS
            newData[existingIndex].performance = performance
          } else if (selectedLevel === '10th/12th') {
            newData[existingIndex].level = selectedLevel;
            newData[existingIndex].maticulationstatus = maticulationstatus
            newData[existingIndex].yearofCompletion = yearofcompletion
            newData[existingIndex].board = board
            newData[existingIndex].school = school
            newData[existingIndex].performanceScale = performanceST
            newData[existingIndex].performance = performanceT
          } else if (selectedLevel === 'diploma') {
            newData[existingIndex].level = selectedLevel
            newData[existingIndex].college = collegeD
            newData[existingIndex].startYear = sYearD
            newData[existingIndex].endYear = eYearD
            newData[existingIndex].stream = streamD
            newData[existingIndex].performanceScale = performanceSD
            newData[existingIndex].performance = performanceD
          }
          else if (selectedLevel === 'phd') {
            newData[existingIndex].level = selectedLevel
            newData[existingIndex].college = collegeP
            newData[existingIndex].startYear = sYearP
            newData[existingIndex].endYear = eYearP
            newData[existingIndex].stream = streamP
            newData[existingIndex].performanceScale = performanceSP
            newData[existingIndex].performance = performanceP
          }
          reqbody.education = newData;
        } else {
          if (selectedLevel === 'ug/pg') {
            newData.push({
              level: selectedLevel,
              college,
              startYear: sYear,
              endYear: eYear,
              degree: degree,
              stream: stream,
              performanceScale: performanceS,
              performance: performance
            })
          } else if (selectedLevel === '10th/12th') {
            newData.push({
              level: selectedLevel,
              maticulationstatus,
              yearofCompletion: yearofcompletion,
              board,
              school,
              performanceScale: performanceST,
              performance: performanceT
            })
          } else if (selectedLevel === 'diploma') {
            newData.push({
              level: selectedLevel,
              college: collegeD,
              startYear: sYearD,
              endYear: eYearD,
              stream: streamD,
              performanceScale: performanceSD,
              performance: performanceD
            })
          } else if (selectedLevel === 'phd') {
            newData.push({
              level: selectedLevel,
              college: collegeP,
              startYear: sYearP,
              endYear: eYearP,
              stream: streamP,
              performanceScale: performanceSP,
              performance: performanceP
            })
          }
          reqbody.education = newData;
        }
      }

      ResumeUpdation(talent_id, reqbody).then((res) => {
        console.log(res);
        if (res.status) {
          //props.setShowEducation(false);
          props.setFetch(!props.fetch)
        }
        setSave(false);
      })
    }

    const handleErase = () => {
      setSavePro(true);
      let data = props.resumeDetails.education.filter((item) => item.level != selectedLevel);
      let reqbody = {};
      reqbody.education = data;
      ResumeUpdation(talent_id, reqbody).then((res) => {
        console.log(res);
        if (res.status) {
          //props.setShowEducation(false);
          props.setFetch(!props.fetch)
        }
        setSavePro(false);
      })
    }


    return (
      <View>
        <Text style={styles.label}>Select Level</Text>
        <View style={{ backgroundColor: 'whitesmoke', borderRadius: 25, width: 360, marginLeft: 10 }}>
          <Picker
            //ref={pickerRef}
            selectedValue={selectedLevel}
            style={{}}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedLevel(itemValue)
            }>
            <Picker.Item label="Graduation/Post graduation details" value="ug/pg" />
            <Picker.Item label="X(secondary) details" value="10th/12th" />
            <Picker.Item label="Diploma details" value="diploma" />
            <Picker.Item label="PhD details" value="phd" />
          </Picker>
        </View>
        {selectedLevel && selectedLevel === 'ug/pg' && <View>
          <Text style={styles.label}>College</Text>
          <TextInput
            style={styles.textField}
            value={college}
            onChangeText={(e) => { setCollege(e) }}
          />
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View>
              <Text style={styles.label}>Start Year</Text>
              <View style={{ backgroundColor: 'whitesmoke', borderRadius: 25, width: 165, marginLeft: 10 }}>
                <Picker
                  //ref={sDateRef}
                  selectedValue={sYear}
                  onValueChange={(itemValue, itemIndex) =>
                    setSYear(itemValue)
                  }>
                  {startYear.map((item) => <Picker.Item key={item.value} label={item.label} value={item.value} />)}
                </Picker>
              </View>
            </View>
            <View>
              <Text style={styles.label}>End Year</Text>
              <View style={{ backgroundColor: 'whitesmoke', borderRadius: 25, width: 165, marginLeft: 10 }}>
                <Picker
                  //ref={eDateRef}
                  selectedValue={eYear}
                  onValueChange={(itemValue, itemIndex) =>
                    setEYear(itemValue)
                  }>
                  {endYear.map((item) => <Picker.Item key={item.value} label={item.label} value={item.value} />)}
                </Picker>
              </View>
            </View>
          </View>
          <Text style={styles.label}>Degree</Text>
          <TextInput
            style={styles.textField}
            value={degree}
            onChangeText={(e) => { setDegree(e) }}
          />
          <Text style={styles.label}>Stream</Text>
          <TextInput
            style={styles.textField}
            value={stream}
            onChangeText={(e) => { setStream(e) }}
          />
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View>
              <Text style={styles.label}>Performance Scale</Text>
              <View style={{ backgroundColor: 'whitesmoke', borderRadius: 25, width: 165, marginLeft: 10 }}>
                <Picker
                  //ref={pScaleRef}
                  selectedValue={performanceS}
                  onValueChange={(itemValue, itemIndex) =>
                    setPerformanceS(itemValue)
                  }>
                  {performanceScale.map((item) => <Picker.Item key={item.value} label={item.label} value={item.value} />)}
                </Picker>
              </View>
            </View>
            <View>
              <Text style={styles.label}>Performance</Text>
              <TextInput
                style={{
                  height: 50,
                  borderColor: 'transparent',
                  borderWidth: 1,
                  width: 165,
                  padding: 8,
                  backgroundColor: 'whitesmoke',
                  fontSize: 16,
                  marginTop: 0,
                  borderRadius: 25,
                  marginLeft: 10
                }}
                value={performance}
                onChangeText={(e) => { setPerformance(e) }}
              />
            </View></View>
        </View>}


        {selectedLevel && selectedLevel === '10th/12th' && <View>
          <Text style={styles.label}>Matriculation Status</Text>
          <View style={{ flexDirection: 'row', marginLeft: 10 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <RadioButton
                value="pursuing"
                label="Pursuing"
                status={maticulationstatus === 'pursuing' ? 'checked' : 'unchecked'}
                onPress={() => { setMaticulationstatus('pursuing'); }}
              />
              <Text style={{ textAlign: 'center' }}>Pursuing</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <RadioButton
                value="completed"
                label="Completed"
                status={maticulationstatus === 'completed' ? 'checked' : 'unchecked'}
                onPress={() => { setMaticulationstatus('completed') }}
              />
              <Text style={{ textAlign: 'center' }}>Completed</Text>
            </View>
          </View>
          {maticulationstatus === 'completed' ? <Text style={styles.label}>Year of completion</Text> : <Text style={styles.label}>Expected year of completion</Text>}
          <View style={{ backgroundColor: 'whitesmoke', borderRadius: 25, width: 360, marginLeft: 10 }}>
            <Picker
              //ref={sDateRef}
              selectedValue={yearofcompletion}
              onValueChange={(itemValue, itemIndex) =>
                setYearofcompletion(itemValue)
              }>
              {endYear.map((item) => <Picker.Item key={item.value} label={item.label} value={item.value} />)}
            </Picker>
          </View>
          <Text style={styles.label}>Board</Text>
          <TextInput
            style={styles.textField}
            value={board}
            onChangeText={(e) => { setBoard(e) }}
          />
          <Text style={styles.label}>School</Text>
          <TextInput
            style={styles.textField}
            value={school}
            onChangeText={(e) => { setSchool(e) }}
          />
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View>
              <Text style={styles.label}>Performance Scale</Text>
              <View style={{ backgroundColor: 'whitesmoke', borderRadius: 25, width: 165, marginLeft: 10 }}>
                <Picker
                  //ref={pScaleRef}
                  selectedValue={performanceST}
                  onValueChange={(itemValue, itemIndex) =>
                    setPerformanceST(itemValue)
                  }>
                  {performanceScale.map((item) => <Picker.Item key={item.value} label={item.label} value={item.value} />)}
                </Picker>
              </View>
            </View>
            <View>
              <Text style={styles.label}>Performance</Text>
              <TextInput
                style={{
                  height: 50,
                  borderColor: 'transparent',
                  borderWidth: 1,
                  width: 165,
                  padding: 8,
                  backgroundColor: 'whitesmoke',
                  fontSize: 16,
                  marginTop: 0,
                  borderRadius: 25,
                  marginLeft: 10
                }}
                value={performanceT}
                onChangeText={(e) => { setPerformanceT(e) }}
              />
            </View></View>
        </View>}
        {selectedLevel && (selectedLevel === 'diploma') && <View>
          <Text style={styles.label}>College</Text>
          <TextInput
            style={styles.textField}
            value={collegeD}
            onChangeText={(e) => { setCollegeD(e) }}
          />
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View>
              <Text style={styles.label}>Start Year</Text>
              <View style={{ backgroundColor: 'whitesmoke', borderRadius: 25, width: 165, marginLeft: 10 }}>
                <Picker
                  //ref={sDateRef}
                  selectedValue={sYearD}
                  onValueChange={(itemValue, itemIndex) =>
                    setSYearD(itemValue)
                  }>
                  {startYear.map((item) => <Picker.Item key={item.value} label={item.label} value={item.value} />)}
                </Picker>
              </View>
            </View>
            <View>
              <Text style={styles.label}>End Year</Text>
              <View style={{ backgroundColor: 'whitesmoke', borderRadius: 25, width: 165, marginLeft: 10 }}>
                <Picker
                  //ref={eDateRef}
                  selectedValue={eYearD}
                  onValueChange={(itemValue, itemIndex) =>
                    setEYearD(itemValue)
                  }>
                  {endYear.map((item) => <Picker.Item key={item.value} label={item.label} value={item.value} />)}
                </Picker>
              </View>
            </View>
          </View>
          <Text style={styles.label}>Stream</Text>
          <TextInput
            style={styles.textField}
            value={streamD}
            onChangeText={(e) => { setStreamD(e) }}
          />
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View>
              <Text style={styles.label}>Performance Scale</Text>
              <View style={{ backgroundColor: 'whitesmoke', borderRadius: 25, width: 165, marginLeft: 10 }}>
                <Picker
                  //ref={pScaleRef}
                  selectedValue={performanceSD}
                  onValueChange={(itemValue, itemIndex) =>
                    setPerformanceSD(itemValue)
                  }>
                  {performanceScale.map((item) => <Picker.Item key={item.value} label={item.label} value={item.value} />)}
                </Picker>
              </View>
            </View>
            <View>
              <Text style={styles.label}>Performance</Text>
              <TextInput
                style={{
                  height: 50,
                  borderColor: 'transparent',
                  borderWidth: 1,
                  width: 165,
                  padding: 8,
                  backgroundColor: 'whitesmoke',
                  fontSize: 16,
                  marginTop: 0,
                  borderRadius: 25,
                  marginLeft: 10
                }}
                value={performanceD}
                onChangeText={(e) => { setPerformanceD(e) }}
              />
            </View></View>
        </View>}
        {selectedLevel && (selectedLevel === 'phd') && <View>
          <Text style={styles.label}>College</Text>
          <TextInput
            style={styles.textField}
            value={collegeP}
            onChangeText={(e) => { setCollegeP(e) }}
          />
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View>
              <Text style={styles.label}>Start Year</Text>
              <View style={{ backgroundColor: 'whitesmoke', borderRadius: 25, width: 165, marginLeft: 10 }}>
                <Picker
                  //ref={sDateRef}
                  selectedValue={sYearP}
                  onValueChange={(itemValue, itemIndex) =>
                    setSYearP(itemValue)
                  }>
                  {startYear.map((item) => <Picker.Item key={item.value} label={item.label} value={item.value} />)}
                </Picker>
              </View>
            </View>
            <View>
              <Text style={styles.label}>End Year</Text>
              <View style={{ backgroundColor: 'whitesmoke', borderRadius: 25, width: 165, marginLeft: 10 }}>
                <Picker
                  //ref={eDateRef}
                  selectedValue={eYearP}
                  onValueChange={(itemValue, itemIndex) =>
                    setEYearP(itemValue)
                  }>
                  {endYear.map((item) => <Picker.Item key={item.value} label={item.label} value={item.value} />)}
                </Picker>
              </View>
            </View>
          </View>
          <Text style={styles.label}>Stream</Text>
          <TextInput
            style={styles.textField}
            value={streamP}
            onChangeText={(e) => { setStreamP(e) }}
          />
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View>
              <Text style={styles.label}>Performance Scale</Text>
              <View style={{ backgroundColor: 'whitesmoke', borderRadius: 25, width: 165, marginLeft: 10 }}>
                <Picker
                  //ref={pScaleRef}
                  selectedValue={performanceSP}
                  onValueChange={(itemValue, itemIndex) =>
                    setPerformanceSP(itemValue)
                  }>
                  {performanceScale.map((item) => <Picker.Item key={item.value} label={item.label} value={item.value} />)}
                </Picker>
              </View>
            </View>
            <View>
              <Text style={styles.label}>Performance</Text>
              <TextInput
                style={{
                  height: 50,
                  borderColor: 'transparent',
                  borderWidth: 1,
                  width: 165,
                  padding: 8,
                  backgroundColor: 'whitesmoke',
                  fontSize: 16,
                  marginTop: 0,
                  borderRadius: 25,
                  marginLeft: 10
                }}
                value={performanceP}
                onChangeText={(e) => { setPerformanceP(e) }}
              />
            </View></View>
        </View>}
        {save ? <View style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <ActivityIndicator size="large" color="#407BFF" />
        </View> : <TouchableOpacity style={styles.btn} onPress={() => handleClick()}>
          <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 18 }}>Save</Text>
        </TouchableOpacity>
        }
        {savePro ? <View style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <ActivityIndicator size="large" color="#407BFF" />
        </View> : <TouchableOpacity onPress={() => handleErase()}>
          <Text style={{ color: 'red', fontSize: 14, textAlign: 'center', fontWeight: 'bold' }}>Erase Data</Text>
        </TouchableOpacity>
        }
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
        console.log(props.resumeDetails.position_of_responsibility);
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
        console.log(reqbody)
        ResumeUpdation(talent_id, reqbody).then((res) => {
          console.log(res);
          setNewDesc('');
          if (res.status) {
            props.setFetch(!props.fetch);
          }
        })
      } else {
        reqbody.position_of_responsibility = oldDesc;
        ResumeUpdation(talent_id, reqbody).then((res) => {
          console.log(res);
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

    return (
      <View>
        {oldDesc && oldDesc.length > 0 && oldDesc.map((item) => <TextInput
          key={item.id}
          multiline
          editable
          numberOfLines={4}
          style={styles.multiline}
          value={item.description}
          onChangeText={(e) => { handleDescriptionChange(e, item.id) }}
        />)}
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
        console.log(props.resumeDetails.internship);
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

    return (
      <View>{
        oldInternships && oldInternships.length > 0 && oldInternships.map((item, index) => <View key={item.id}>
          <Text style={{textAlign:'center', fontWeight:'bold'}}>Internship - {index + 1} </Text>
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
                  editable={false}
                />
                <Icon name="calendar" color="gray" size={24} onPress={() => handleDatePickerToggle(item.id, true)} />
              </View>
              {showDatePickerPro[item.id] && (
                <DateTimePicker
                  value={item.startDate || new Date()}
                  mode="date"
                  display="default"
                  onChange={(e, d) => {
                    if (d) {
                      handleChange(d, item.id, "startDate")
                    }
                    handleDatePickerToggle(item.id, false);
                  }}
                />
              )}
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
                  editable={false}
                />
                <Icon name="calendar" color="gray" size={24} onPress={() => handleDatePickerToggle(item.id, true)} />
              </View>
              {showDatePickerPro[item.id] && (
                <DateTimePicker
                  value={item.endDate || new Date()}
                  mode="date"
                  display="default"
                  onChange={(e, d) => {
                    if (d) {
                      handleChange(d, item.id, "endDate")
                    }
                    handleDatePickerToggle(item.id, false);
                  }}
                />
              )}
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
                value={newInternship.startDate ? newInternship.startDate.toISOString().slice(0, 10) : ''}
                editable={false}
              />
              <Icon name="calendar" color="gray" size={24} onPress={() => setShowDatePicker(true)} />
            </View>
            {showDatePicker && (
              <DateTimePicker
                value={newInternship.startDate || new Date()}
                mode="date"
                display="default"
                onChange={(e, d) => {
                  if (d) {
                    setNewInternship({ ...newInternship, startDate: d })
                  }
                  setShowDatePicker(false);
                }}
              />
            )}
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
                value={newInternship.endDate ? newInternship.endDate.toISOString().slice(0, 10) : ''}
                editable={false}
              />
              <Icon name="calendar" color="gray" size={24} onPress={() => setShowDatePicker1(true)} />
            </View>
            {showDatePicker1 && (
              <DateTimePicker
                value={newInternship.endDate || new Date()}
                mode="date"
                display="default"
                onChange={(e, d) => {
                  if (d) {
                    setNewInternship({ ...newInternship, endDate: d })
                  }
                  setShowDatePicker1(false);
                }}
              />
            )}
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
                  editable={false}
                />
                <Icon name="calendar" color="gray" size={24} onPress={() => handleDatePickerToggle(item.id, true)} />
              </View>
              {showDatePickerPro[item.id] && (
                <DateTimePicker
                  value={item.startDate || new Date()}
                  mode="date"
                  display="default"
                  onChange={(e, d) => {
                    if (d) {
                      handleChange(d, item.id, "startDate")
                    }
                    handleDatePickerToggle(item.id, false);
                  }}
                />
              )}
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
                  editable={false}
                />
                <Icon name="calendar" color="gray" size={24} onPress={() => handleDatePickerToggle(item.id, true)} />
              </View>
              {showDatePickerPro[item.id] && (
                <DateTimePicker
                  value={item.endDate || new Date()}
                  mode="date"
                  display="default"
                  onChange={(e, d) => {
                    if (d) {
                      handleChange(d, item.id, "endDate")
                    }
                    handleDatePickerToggle(item.id, false);
                  }}
                />
              )}
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
                value={newInternship.startDate ? newInternship.startDate.toISOString().slice(0, 10) : ''}
                editable={false}
              />
              <Icon name="calendar" color="gray" size={24} onPress={() => setShowDatePicker(true)} />
            </View>
            {showDatePicker && (
              <DateTimePicker
                value={newInternship.startDate || new Date()}
                mode="date"
                display="default"
                onChange={(e, d) => {
                  if (d) {
                    setNewInternship({ ...newInternship, startDate: d })
                  }
                  setShowDatePicker(false);
                }}
              />
            )}
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
                value={newInternship.endDate ? newInternship.endDate.toISOString().slice(0, 10) : ''}
                editable={false}
              />
              <Icon name="calendar" color="gray" size={24} onPress={() => setShowDatePicker1(true)} />
            </View>
            {showDatePicker1 && (
              <DateTimePicker
                value={newInternship.endDate || new Date()}
                mode="date"
                display="default"
                onChange={(e, d) => {
                  if (d) {
                    setNewInternship({ ...newInternship, endDate: d })
                  }
                  setShowDatePicker1(false);
                }}
              />
            )}
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
    return (
      <View>
        <Text>Its Project</Text>
      </View>
    )
  }

  const ShowSkillsCard = (props) => {
    return (
      <View>
        <Text>Its Skills</Text>
      </View>
    )
  }

  const ShowAccomplishmentCard = (props) => {
    return (
      <View>
        <Text>Its Accomplishment</Text>
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
          <Text style={styles.header}>Education</Text>
          {showEducation ? <TouchableOpacity style={{ justifyContent: 'center' }} onPress={() => { setShowEducation(false) }}>
            <Icon name="minus" size={28} color='#407BFF' />
          </TouchableOpacity> : <TouchableOpacity style={{ justifyContent: 'center' }} onPress={() => { setShowEducation(true) }}>
            <Icon name="plus" size={28} color='#407BFF' />
          </TouchableOpacity>}
        </View>
        {showEducation && <ShowEducationCard setShowEducation={setShowEducation} fetch={fetch} setFetch={setFetch} resumeDetails={resumeDetails} />}
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
  },
})
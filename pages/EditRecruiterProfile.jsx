import { StyleSheet, Text, View, Image, KeyboardAvoidingView, TextInput, ActivityIndicator, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react';
import { RecruiterDetailsById, UpdateRecruiterDetailsById } from '../api';
import { ScrollView } from 'react-native-gesture-handler';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/Entypo';

const EditRecruiterProfile = ({ route, navigation }) => {
  const { id } = route.params;
  const [profileDetails, setProfileDetails] = useState({})
  const [details, setDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [save, setSave] = useState(false);
  const [dataUri, setDataUri] = useState(null);

  const handleClick = () => {
    setSave(true);
    const reqbody = profileDetails;
    if (dataUri) {
      reqbody.logo_url = dataUri;
    }
    UpdateRecruiterDetailsById(reqbody, details.recruiter_id).then((res) => {
      console.log('RESPONSE', res);
      if (res.status) {
        setSave(false);
        navigation.navigate('RecruiterProfile');
      }
      setSave(false);
    })
  }

  useEffect(() => {
    RecruiterDetailsById(id).then((res) => {
      if (res.status) {
        //console.log(res)
        setDataUri(res.data[0].logo_url)
        setDetails(res.data[0]);
        setIsLoading(false);
        setProfileDetails(res.data[0]);
      }
    })
  }, []);

  const selectImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      console.log('Permission denied');
      return;
    }

    const imageResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!imageResult.canceled) {
      const selectedAssetUri = imageResult.assets[0].uri;

      const fileInfo = await FileSystem.getInfoAsync(selectedAssetUri, { size: true });
      const fileContent = await FileSystem.readAsStringAsync(selectedAssetUri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      setDataUri(`data:${fileInfo.mimeType};base64,${fileContent}`)
      //console.log(sizeOf(`data:${fileInfo.mimeType};base64,${fileContent}`))
    }
  };

  const NoofEmployees = [{
    label: "10-25 employees", value: "10-25",
  }, {
    label: "25-50 employees", value: "25-50",
    }, {
    label: "50-75 employees", value: "50-75",
    }, {
    label: "75-100 employees", value: "75-100",
    }, {
    label: "100+ employees", value: "100+",
    }, {
    label: "Corporate", value: "200+",
  }]

  return (
    <ScrollView>
      {isLoading ? <View style={{
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <ActivityIndicator size="large" color="#407BFF" />
      </View> :
        <View style={{
          backgroundColor: 'white',
          margin: 10,
          width: '95%',
          padding: 8,
          borderRadius: 25,
          flexDirection: 'column',
          alignItems: 'center'
        }}>
          <View style={{
            width: '95%',
            margin: 10,
            alignItems: 'center',
            padding: 5,
          }}>
            <Text style={{ fontStyle: 'italic', color: '#407BFF', fontSize: 14 }}>
              <Icon name="info-with-circle" size={14} color='#407BFF' style={{ marginRight: 10 }} />
              Complete your profile details to attract and engage more students,
              increasing the chances of receiving a higher number of applications.</Text>
          </View>
          {dataUri ?
            <Image source={{ uri: dataUri }}
              style={{
                width: 150,
                height: 150,
                borderRadius: 100,
                margin: 10
              }} />
            :
            <Image source={require('../assets/female.png')}
              style={{
                width: 150,
                height: 150,
                borderRadius: 100
              }} />
          }
          <TouchableOpacity style={styles.edit} onPress={() => selectImage()}><Text style={{ color: 'white' }}>Edit Picture</Text></TouchableOpacity>
          <KeyboardAvoidingView >
            <View>
              <Text style={styles.header}>Personal Information</Text>
              <Text style={styles.label}>First name*</Text>
              <TextInput
                value={profileDetails.firstname}
                onChangeText={(text) => { setProfileDetails({ ...profileDetails, firstname: text }) }}
                style={styles.textField}
              />
              <Text style={styles.label}>Last name*</Text>
              <TextInput
                value={profileDetails.lastname}
                onChangeText={(text) => { setProfileDetails({ ...profileDetails, lastname: text }) }}
                style={styles.textField}
              />
              <Text style={styles.label}>Email* </Text>
              <TextInput
                value={profileDetails.email}
                onChangeText={(text) => { setProfileDetails({ ...profileDetails, email: text }) }}
                style={styles.textField}
              />
              <Text style={styles.header}>Company Details</Text>
              <Text style={styles.label}>Industry</Text>
              <TextInput
                value={profileDetails.industry}
                onChangeText={(text) => { setProfileDetails({ ...profileDetails, industry: text }) }}
                style={styles.textField}
              />
              <Text style={styles.label}>Number of Employees</Text>
              <TextInput
                value={profileDetails.noofemployees}
                onChangeText={(e) => setProfileDetails({ ...profileDetails, noofemployees: e })}
                style={styles.textField}
              />
              <Text style={styles.label}>Number of Employees</Text>
              <View style={{ backgroundColor: 'whitesmoke', borderRadius: 25, width: 360, marginLeft: 10 }}>
                <Picker
                  //ref={pScaleRef}
                  selectedValue={profileDetails.noofemployees}
                  onValueChange={(itemValue, itemIndex) =>
                    setProfileDetails({ ...profileDetails, noofemployees: itemValue })
                  }>
                  {NoofEmployees.map((item) => <Picker.Item key={item.value} label={item.label} value={item.value} />)}
                </Picker>
              </View>
              <Text style={styles.label}>City</Text>
              <TextInput
                value={profileDetails.city}
                onChangeText={(e) => setProfileDetails({ ...profileDetails, city: e })}
                style={styles.textField}
              />
              <Text style={styles.label}>Address</Text>
              <TextInput
                value={profileDetails.address}
                onChangeText={(e) => setProfileDetails({ ...profileDetails, address: e })}
                style={styles.textField}
              />
              <Text style={styles.label}>Contact Number</Text>
              <TextInput
                value={profileDetails.contact_no}
                onChangeText={(e) => setProfileDetails({ ...profileDetails, contact_no: e })}
                style={styles.textField}
              />
              <Text style={styles.label}>Description</Text>
              <TextInput
                multiline
                editable
                numberOfLines={4}
                value={profileDetails.description}
                onChangeText={(e) => setProfileDetails({ ...profileDetails, description: e })}
                style={styles.multiline}
              />
              <Text style={styles.label}>Company Website/Url</Text>
              <TextInput
                value={profileDetails.url}
                onChangeText={(e) => setProfileDetails({ ...profileDetails, url: e })}
                style={styles.textField}
              />
              <View style={styles.btncontainer}>
                {save ? <View style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                  <ActivityIndicator size="large" color="#407BFF" />
                </View> : <TouchableOpacity style={styles.btn} onPress={() => handleClick()}>
                  <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 18 }}>Save</Text>
                </TouchableOpacity>
                }
              </View>
            </View>
          </KeyboardAvoidingView>
        </View >
      }
    </ScrollView>
  )
}

export default EditRecruiterProfile

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
  btn: {
    width: 350,
    height: 50,
    backgroundColor: '#407BFF',
    color: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    marginTop: 20,
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
  btncontainer: {
    backgroundColor: 'white',
  },
  label: {
    marginBottom: 0,
    color: 'gray',
    marginLeft: 25,
    marginTop: 10
  },
  edit: {
    backgroundColor: '#407BFF',
    padding: 10,
    borderRadius: 25,
    shadowOffset: { width: 5, height: 5 },
    shadowColor: 'black',
    shadowOpacity: 0.8,
    shadowRadius: 5,
    elevation: 3
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 10,
    marginTop: 15
  }
})
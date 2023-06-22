import { StyleSheet, Text, View, Image, KeyboardAvoidingView, TextInput, ActivityIndicator, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react';
import { TalentDetailsById, UpdateTalentDetailsById } from '../api';
import { ScrollView } from 'react-native-gesture-handler';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EditProfile = ({ navigation }) => {

  const [details, setDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [branch, setBranch] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [fieldofexpertise, setFieldOfExpertise] = useState('');
  const [semester, setSemester] = useState('');
  const [bio, setBio] = useState('');
  const [contactno, setContactno] = useState('');
  const [whatappno, setWhatappno] = useState('');
  const [city, setCity] = useState('');
  const [email, setEmail] = useState('');
  const [save, setSave] = useState(false);
  const [dataUri, setDataUri] = useState(null);
  const [id, setId] = useState(null);

  const getData = async () => {
    const value = await AsyncStorage.getItem('talent_id');
    if (value) { setId(value); }
    console.log("talent id", await AsyncStorage.getItem('talent_id'))
  }

  useEffect(() => {
    if (!id) {
      getData();
    }
    if (id) {
      TalentDetailsById(id).then((res) => {
        if (res.status) {
          console.log(res)
          setDataUri(res.data[0].profile_url)
          setDetails(res.data[0]);
          setIsLoading(false);
          setEmail(res.data[0].email);
          setFirstname(res.data[0].firstname);
          setLastname(res.data[0].lastname);
          setBranch(res.data[0].branch);
          setFieldOfExpertise(res.data[0].fieldofexpertise);
          setSemester(res.data[0].semester);
          setBio(res.data[0].about);
          setContactno(res.data[0].contactno);
          setWhatappno(res.data[0].whatappno);
          setCity(res.data[0].city);
        }
      })
    }
  }, [id]);

  const Courses = [
    { label: 'Bachelor of Science', value: 'bsc' },
    { label: 'Bachelor of Computer Application', value: 'bca' },
    { label: 'Bachelor of Commerce', value: 'bcom' },
    { label: 'Bachelor of Arts', value: 'ba' },
    { label: 'Bachelor of Education', value: 'bed' },
    { label: 'Bachelor of Vocational Studies', value: 'bvoc' },
    { label: 'Master of Science', value: 'msc' },
    { label: 'Master of Commerce', value: 'mcom' },
    { label: 'Master of Arts', value: 'ma' },
  ]

  const handleClick = () => {
    setSave(true);
    const reqbody = {
      branch,
      fieldofexpertise,
      semester,
      about: bio,
      contactno,
      whatappno,
      city
    }
    if (dataUri) {
      reqbody.profile_url = dataUri;
    }
    UpdateTalentDetailsById(reqbody, details.talent_id).then((res) => {
      //console.log('RESPONSE', res);
      if (res.status) {
        setSave(false);
        navigation.navigate('Profile');
      }
      setSave(false);
    })
  }

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

  const handleNav = () => {
    navigation.navigate("EditResume");
  }


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
          <Text style={{
            fontSize: 18,
            color: '#407BFF',
            textAlign: 'center',
            margin: 10,
            fontWeight: 'bold',
          }}>Complete Your Profile to Boost Your Chances!</Text>
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
                value={firstname}
                onChangeText={(text) => { setFirstname(text) }}
                style={styles.textField}
              />
              <Text style={styles.label}>Last name*</Text>
              <TextInput
                value={lastname}
                onChangeText={(text) => { setLastname(text) }}
                style={styles.textField}
              />
              <Text style={styles.label}>Email</Text>
              <TextInput
                value={email}
                onChangeText={(text) => { setEmail(text) }}
                style={styles.textField}
              />
              <Text style={styles.label}>City</Text>
              <TextInput
                value={city}
                onChangeText={(e) => setCity(e)}
                style={styles.textField}
              />
              <Text style={styles.label}>Bio</Text>
              <TextInput
                editable
                multiline
                numberOfLines={4}
                style={styles.multiline}
                value={bio}
                onChangeText={(e) => setBio(e)}
              />
              <Text style={styles.header}>Academics</Text>
              <Text style={styles.label}>Branch</Text>
              <TextInput
                value={branch}
                onChangeText={(text) => { setBranch(text) }}
                style={styles.textField}
              />
              <Text style={styles.label}>Field of interest</Text>
              <TextInput
                value={fieldofexpertise}
                onChangeText={(e) => setFieldOfExpertise(e)}
                style={styles.textField}
              />
              <Text style={styles.label}>Semester</Text>
              <TextInput
                value={semester}
                onChangeText={(e) => setSemester(e)}
                style={styles.textField}
              />

              <TouchableOpacity
                onPress={() => { handleNav(); }}
                style={{
                  backgroundColor: '#407BFF',
                  width: 130,
                  alignItems: 'center',
                  margin: 10,
                  padding: 7,
                  borderRadius: 25,
                  shadowOffset: { width: 5, height: 5 },
                  shadowColor: 'black',
                  shadowOpacity: 0.8,
                  shadowRadius: 5,
                  elevation: 3,
                  marginLeft: 20
                }}>
                <Text style={{ color: 'white', fontSize: 16 }}>Edit Resume</Text>
              </TouchableOpacity>
              <Text style={styles.header}>Contact Details</Text>
              <Text style={styles.label}>Contact Number</Text>
              <TextInput
                style={styles.textField}
                value={contactno}
                onChangeText={(e) => setContactno(e)}
              />
              <Text style={styles.label}>Whatsapp Number</Text>
              <TextInput
                style={styles.textField}
                value={whatappno}
                onChangeText={(e) => setWhatappno(e)}
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

export default EditProfile

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
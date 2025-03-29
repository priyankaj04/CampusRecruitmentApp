import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, KeyboardAvoidingView, TextInput, ActivityIndicator, TouchableOpacity } from 'react-native';
import { TalentDetailsById, UpdateTalentDetailsById } from '../api';
import { ScrollView } from 'react-native-gesture-handler';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Iconz from 'react-native-vector-icons/AntDesign';
import { MotiView, useAnimationState } from 'moti';

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
  const [links, setLinks] = useState({});
  const [id, setId] = useState(null);

  useEffect(() => {
    const getData = async () => {
      const value = await AsyncStorage.getItem('talent_id');
      if (value) {
        setId(value);
      }
      console.log("talent id", await AsyncStorage.getItem('talent_id'));
    };

    if (!id) {
      getData();
    }

    if (id) {
      TalentDetailsById(id).then((res) => {
        if (res.status) {
          setDataUri(res.data[0].profile_url);
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
          setLinks(res.data[0].url);
        }
      });
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
  ];

  const handleClick = () => {
    setSave(true);
    const reqbody = {
      branch,
      fieldofexpertise,
      semester,
      about: bio,
      contactno,
      whatappno,
      city,
      url: links,
    };

    if (dataUri) {
      reqbody.profile_url = dataUri;
    };

    UpdateTalentDetailsById(reqbody, details.talent_id).then((res) => {
      if (res.status) {
        setSave(false);
        navigation.navigate('Profile');
      }
      setSave(false);
    });
  };

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

      setDataUri(`data:${fileInfo.mimeType};base64,${fileContent}`);
    }
  };

  const handleNav = () => {
    navigation.navigate('EditResume');
  };

  const bioAnimationState = useAnimationState({
    closed: {
      opacity: 0,
      translateX: 20,
    },
    open: {
      opacity: 1,
      translateX: 0,
    },
  });

  return (
    <ScrollView>
      {isLoading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#407BFF" />
        </View>
      ) : (
        <View style={styles.container}>
          <Text style={styles.heading}>Complete Your Profile to Boost Your Chances!</Text>
          <MotiView
            from={{ opacity: 0, translateX: -100 }}
            animate={{ opacity: 1, translateX: 0 }}
            transition={{ type: 'timing', duration: 1000 }}
          >
            {dataUri ? (
              <Image source={{ uri: dataUri }} style={styles.profileImage} />
            ) : (
              <Image source={require('../assets/female.png')} style={styles.profileImage} />
            )}
          </MotiView>
          <TouchableOpacity style={styles.editButton} onPress={selectImage}>
            <Text style={styles.editButtonText}>Edit Picture</Text>
          </TouchableOpacity>
          <KeyboardAvoidingView>
            <View>
              <Text style={styles.sectionHeading}>Personal Information</Text>
              <MotiView
                from={{ opacity: 0, translateX: -100 }}
                animate={{ opacity: 1, translateX: 0 }}
                transition={{ type: 'timing', duration: 1000 }}
                delay={500}
              >
                <Text style={styles.label}>First name*</Text>
                <TextInput
                  value={firstname}
                  onChangeText={setFirstname}
                  style={styles.textField}
                />
              </MotiView>
              <MotiView
                from={{ opacity: 0, translateX: -100 }}
                animate={{ opacity: 1, translateX: 0 }}
                transition={{ type: 'timing', duration: 1000 }}
                delay={1000}
              >
                <Text style={styles.label}>Last name*</Text>
                <TextInput
                  value={lastname}
                  onChangeText={setLastname}
                  style={styles.textField}
                  delay={1500}
                />
              </MotiView>
              <MotiView
                from={{ opacity: 0, translateX: -100 }}
                animate={{ opacity: 1, translateX: 0 }}
                transition={{ type: 'timing', duration: 1000 }}
                delay={2000}
              >
                <Text style={styles.label}>Email</Text>
                <TextInput
                  value={email}
                  editable={false}
                  onChangeText={setEmail}
                  style={styles.textField}
                />
              </MotiView>
              <MotiView
                from={{ opacity: 0, translateX: -100 }}
                animate={{ opacity: 1, translateX: 0 }}
                transition={{ type: 'timing', duration: 1000 }}
                delay={2500}
              >
                <Text style={styles.label}>City</Text>
                <TextInput
                  value={city}
                  onChangeText={setCity}
                  style={styles.textField}
                />
              </MotiView>
              <MotiView
                from={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ type: 'timing', duration: 1000 }}
                delay={3000}
                style={styles.bioContainer}
              >
                <Text style={styles.label}>Bio</Text>
                <MotiView
                  state={bioAnimationState}
                  transition={{ type: 'timing', duration: 500, delay: 500 }}
                  style={styles.bioInputContainer}
                >
                  <TextInput
                    editable
                    multiline
                    numberOfLines={4}
                    style={styles.multiline}
                    value={bio}
                    onChangeText={setBio}
                  />
                </MotiView>
              </MotiView>
              <MotiView
                from={{ opacity: 0, translateX: -100 }}
                animate={{ opacity: 1, translateX: 0 }}
                transition={{ type: 'timing', duration: 1000 }}
                delay={3500}
              >
                <TouchableOpacity
                  onPress={handleNav}
                  style={styles.editResumeButton}
                >
                  <Text style={styles.editResumeButtonText}>Edit Resume</Text>
                </TouchableOpacity>
              </MotiView>
              <Text style={styles.sectionHeading}>Contact Details</Text>
              <MotiView
                from={{ opacity: 0, translateX: -100 }}
                animate={{ opacity: 1, translateX: 0 }}
                transition={{ type: 'timing', duration: 1000 }}
                delay={4000}
              >
                <Text style={styles.label}>Contact Number</Text>
                <TextInput
                  style={styles.textField}
                  value={contactno}
                  onChangeText={setContactno}
                />
              </MotiView>
              <MotiView
                from={{ opacity: 0, translateX: -100 }}
                animate={{ opacity: 1, translateX: 0 }}
                transition={{ type: 'timing', duration: 1000 }}
                delay={4500}
              >
                <Text style={styles.label}>Whatsapp Number</Text>
                <TextInput
                  style={styles.textField}
                  value={whatappno}
                  onChangeText={setWhatappno}
                />
              </MotiView>
              <Text style={styles.sectionHeading}>Url/Links</Text>
              <MotiView
                from={{ opacity: 0, translateX: -100 }}
                animate={{ opacity: 1, translateX: 0 }}
                transition={{ type: 'timing', duration: 1000 }}
                delay={5000}
              >
                <View style={styles.linkContainer}>
                  <Iconz name="github" color="black" size={20} />
                  <TextInput
                    style={styles.linkInput}
                    value={links && links.github ? links.github : ''}
                    onChangeText={(text) => setLinks({ ...links, github: text })}
                    placeholder="https://github.com/priyankaj04"
                  />

                </View>
              </MotiView>
              <MotiView
                from={{ opacity: 0, translateX: -100 }}
                animate={{ opacity: 1, translateX: 0 }}
                transition={{ type: 'timing', duration: 1000 }}
                delay={5500}
              >
                <View style={styles.linkContainer}>
                  <Iconz name="linkedin-square" color="black" size={20} />
                  <TextInput
                    style={styles.linkInput}
                    value={links && links.linkedin ? links.linkedin : ''}
                    onChangeText={(text) => setLinks({ ...links, linkedin: text })}
                    placeholder="https://www.linkedin.com/priyanka-j-687572213"
                  />
                </View>
              </MotiView>
              <MotiView
                from={{ opacity: 0, translateX: -100 }}
                animate={{ opacity: 1, translateX: 0 }}
                transition={{ type: 'timing', duration: 1000 }}
                delay={5500}
              >
                <View style={styles.linkContainer}>
                  <Iconz name="dribbble" color="black" size={20} />
                  <TextInput
                    style={styles.linkInput}
                    value={links && links.dribbble ? links.dribbble : ''}
                    onChangeText={(text) => setLinks({ ...links, dribbble: text })}
                    placeholder="https://dribbble.com/priyankaj04"
                  />
                </View>
              </MotiView>
              <MotiView
                from={{ opacity: 0, translateX: -100 }}
                animate={{ opacity: 1, translateX: 0 }}
                transition={{ type: 'timing', duration: 1000 }}
                delay={6000}
              >
                <View style={styles.buttonContainer}>
                  {save ? (
                    <View style={styles.loaderContainer}>
                      <ActivityIndicator size="large" color="#407BFF" />
                    </View>
                  ) : (
                    <TouchableOpacity style={styles.saveButton} onPress={handleClick}>
                      <Text style={styles.saveButtonText}>Save</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </MotiView>
            </View>
          </KeyboardAvoidingView>
        </View>
      )}
    </ScrollView>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    margin: 10,
    width: '95%',
    padding: 8,
    borderRadius: 25,
    flexDirection: 'column',
    alignItems: 'center',
  },
  loaderContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontSize: 18,
    color: '#407BFF',
    textAlign: 'center',
    margin: 10,
    fontWeight: 'bold',
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 100,
    margin: 10,
  },
  editButton: {
    backgroundColor: '#407BFF',
    padding: 10,
    borderRadius: 25,
    shadowOffset: { width: 5, height: 5 },
    shadowColor: 'black',
    shadowOpacity: 0.8,
    shadowRadius: 5,
    elevation: 3,
  },
  editButtonText: {
    color: 'white',
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
    marginLeft: 10,
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
  editResumeButton: {
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
    marginLeft: 20,
  },
  editResumeButtonText: {
    color: 'white',
    fontSize: 16,
  },
  sectionHeading: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 10,
    marginTop: 15,
  },
  label: {
    marginBottom: 0,
    color: 'gray',
    marginLeft: 25,
    marginTop: 10,
  },
  linkContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
  },
  linkInput: {
    width: 330,
    marginLeft: 10,
    backgroundColor: 'whitesmoke',
    borderRadius: 25,
    padding: 8,
    fontSize: 16,
  },
  buttonContainer: {
    backgroundColor: 'white',
  },
  saveButton: {
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
    elevation: 3,
  },
  saveButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
});
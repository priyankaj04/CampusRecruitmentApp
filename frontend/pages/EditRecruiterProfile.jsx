import { StyleSheet, Text, View, Image, KeyboardAvoidingView, TextInput, ActivityIndicator, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { RecruiterDetailsById, UpdateRecruiterDetailsById } from '../api';
import { ScrollView } from 'react-native-gesture-handler';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/Entypo';
import { MotiView } from 'moti';

const EditRecruiterProfile = ({ route, navigation }) => {
  const { id } = route.params;
  const [profileDetails, setProfileDetails] = useState({});
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
      if (res.status) {
        setSave(false);
        setIsLoading(false);
      }
      setSave(false);
      setIsLoading(false);
    });
  };

  useEffect(() => {
    RecruiterDetailsById(id).then((res) => {
      if (res.status) {
        setDataUri(res.data[0].logo_url);
        setDetails(res.data[0]);
        setIsLoading(false);
        setProfileDetails(res.data[0]);
      }
    });
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

      setDataUri(`data:${fileInfo.mimeType};base64,${fileContent}`);
    }
  };

  const NoofEmployees = [
    { label: '10-25 employees', value: '10-25' },
    { label: '25-50 employees', value: '25-50' },
    { label: '50-75 employees', value: '50-75' },
    { label: '75-100 employees', value: '75-100' },
    { label: '100+ employees', value: '100+' },
    { label: 'Corporate', value: '200+' },
  ];

  const handleChangeFirstname = (text) => {
    setProfileDetails({ ...profileDetails, firstname: text });
  };

  const handleChangeLastname = (text) => {
    setProfileDetails({ ...profileDetails, lastname: text });
  };

  const handleChangeEmail = (text) => {
    setProfileDetails({ ...profileDetails, email: text });
  };

  const handleChangeIndustry = (text) => {
    setProfileDetails({ ...profileDetails, industry: text });
  };

  const handleChangeNoOfEmployees = (value) => {
    setProfileDetails({ ...profileDetails, noofemployees: value });
  };

  const handleChangeCity = (text) => {
    setProfileDetails({ ...profileDetails, city: text });
  };

  const handleChangeAddress = (text) => {
    setProfileDetails({ ...profileDetails, address: text });
  };

  const handleChangeContactNumber = (text) => {
    setProfileDetails({ ...profileDetails, contactno: text });
  };

  const handleChangeDescription = (text) => {
    setProfileDetails({ ...profileDetails, description: text });
  };

  const handleChangeCompanyWebsite = (text) => {
    setProfileDetails({ ...profileDetails, url: text });
  };

  return (
    <ScrollView>
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#407BFF" />
        </View>
      ) : (
        <View style={styles.container}>
          <MotiView
            from={{ opacity: 0, translateX: -100 }}
            animate={{ opacity: 1, translateX: 0 }}
            transition={{ type: 'timing', duration: 1000 }}
            style={styles.profileContainer}
          >
            <Text style={styles.infoText}>
              <Icon name="info-with-circle" size={14} color="#407BFF" style={styles.infoIcon} />
              Complete your profile details to attract and engage more students,
              increasing the chances of receiving a higher number of applications.
            </Text>
            {dataUri ? (
              <Image source={{ uri: dataUri }} style={styles.profileImage} />
            ) : (
              <Image source={require('../assets/female.png')} style={styles.profileImage} />
            )}
            <TouchableOpacity style={styles.editButton} onPress={selectImage}>
              <Text style={styles.editButtonText}>Edit Picture</Text>
            </TouchableOpacity>
          </MotiView>
          <KeyboardAvoidingView>
            <View>
              <Text style={styles.header}>Personal Information</Text>
              <MotiView
                from={{ opacity: 0, translateX: -100 }}
                animate={{ opacity: 1, translateX: 0 }}
                transition={{ type: 'timing', duration: 1000 }}
              >
                <Text style={styles.label}>First name*</Text>
                <TextInput
                  value={profileDetails.firstname}
                  onChangeText={handleChangeFirstname}
                  style={styles.textField}
                />
              </MotiView>
              <MotiView
                from={{ opacity: 0, translateX: -100 }}
                animate={{ opacity: 1, translateX: 0 }}
                transition={{ type: 'timing', duration: 1000 }}
              >
                <Text style={styles.label}>Last name*</Text>
                <TextInput
                  value={profileDetails.lastname}
                  onChangeText={handleChangeLastname}
                  style={styles.textField}
                />
              </MotiView>
              <MotiView
                from={{ opacity: 0, translateX: -100 }}
                animate={{ opacity: 1, translateX: 0 }}
                transition={{ type: 'timing', duration: 1000 }}
              >
                <Text style={styles.label}>Email* </Text>
                <TextInput
                  value={profileDetails.email}
                  onChangeText={handleChangeEmail}
                  style={styles.textField}
                />
              </MotiView>
              <Text style={styles.header}>Company Details</Text>
              <MotiView
                from={{ opacity: 0, translateX: -100 }}
                animate={{ opacity: 1, translateX: 0 }}
                transition={{ type: 'timing', duration: 1000 }}
                delay={500}
              >
                <Text style={styles.label}>Industry</Text>
                <TextInput
                  value={profileDetails.industry}
                  onChangeText={handleChangeIndustry}
                  style={styles.textField}
                />
              </MotiView>
              <MotiView
                from={{ opacity: 0, translateX: -100 }}
                animate={{ opacity: 1, translateX: 0 }}
                transition={{ type: 'timing', duration: 1000 }}
                delay={1000}
              >
                <Text style={styles.label}>Number of Employees</Text>
                <View style={styles.pickerContainer}>
                  <Picker
                    selectedValue={profileDetails.noofemployees}
                    onValueChange={handleChangeNoOfEmployees}
                  >
                    {NoofEmployees.map((item) => (
                      <Picker.Item key={item.value} label={item.label} value={item.value} />
                    ))}
                  </Picker>
                </View>
              </MotiView>
              <MotiView
                from={{ opacity: 0, translateX: -100 }}
                animate={{ opacity: 1, translateX: 0 }}
                transition={{ type: 'timing', duration: 1000 }}
                delay={1000}
              >
                <Text style={styles.label}>City</Text>
                <TextInput
                  value={profileDetails.city}
                  onChangeText={handleChangeCity}
                  style={styles.textField}
                />
              </MotiView>
              <MotiView
                from={{ opacity: 0, translateX: -100 }}
                animate={{ opacity: 1, translateX: 0 }}
                transition={{ type: 'timing', duration: 1000 }}
                delay={1000}
              >
                <Text style={styles.label}>Address</Text>

                <TextInput
                  value={profileDetails.address}
                  onChangeText={handleChangeAddress}
                  style={styles.textField}
                />
              </MotiView>
              <MotiView
                from={{ opacity: 0, translateX: -100 }}
                animate={{ opacity: 1, translateX: 0 }}
                transition={{ type: 'timing', duration: 1000 }}
                delay={1000}
              >
                <Text style={styles.label}>Contact Number</Text>

                <TextInput
                  value={profileDetails.contactno}
                  onChangeText={handleChangeContactNumber}
                  style={styles.textField}
                />
              </MotiView>
              <MotiView
                from={{ opacity: 0, translateX: -100 }}
                animate={{ opacity: 1, translateX: 0 }}
                transition={{ type: 'timing', duration: 1000 }}
                delay={1000}
              >
                <Text style={styles.label}>Description</Text>

                <TextInput
                  multiline
                  editable
                  numberOfLines={4}
                  value={profileDetails.description}
                  onChangeText={handleChangeDescription}
                  style={styles.multiline}
                />
              </MotiView>
              <MotiView
                from={{ opacity: 0, translateX: -100 }}
                animate={{ opacity: 1, translateX: 0 }}
                transition={{ type: 'timing', duration: 1000 }}
                delay={1000}
              >
                <Text style={styles.label}>Company Website/Url</Text>

                <TextInput
                  value={profileDetails.url}
                  onChangeText={handleChangeCompanyWebsite}
                  style={styles.textField}
                />
              </MotiView>
              <MotiView
                from={{ opacity: 0, translateX: -100 }}
                animate={{ opacity: 1, translateX: 0 }}
                transition={{ type: 'timing', duration: 1000 }}
                delay={1000}
              >
                <View style={styles.btncontainer}>
                  {save ? (
                    <View style={styles.loadingContainer}>
                      <ActivityIndicator size="large" color="#407BFF" />
                    </View>
                  ) : (
                    <TouchableOpacity style={styles.btn} onPress={handleClick}>
                      <Text style={styles.btnText}>Save</Text>
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

export default EditRecruiterProfile;

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
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileContainer: {
    width: '95%',
    margin: 10,
    alignItems: 'center',
    padding: 5,
  },
  infoText: {
    fontStyle: 'italic',
    color: '#407BFF',
    fontSize: 14,
  },
  infoIcon: {
    marginRight: 10,
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
    elevation: 3,
  },
  btnText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
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
  pickerContainer: {
    backgroundColor: 'whitesmoke',
    borderRadius: 25,
    width: 360,
    marginLeft: 10,
  },
  label: {
    marginBottom: 0,
    color: 'gray',
    marginLeft: 25,
    marginTop: 10,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 10,
    marginTop: 15,
  },
});
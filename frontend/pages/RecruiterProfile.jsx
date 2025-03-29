import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icona from 'react-native-vector-icons/AntDesign';
import { ScrollView } from 'react-native-gesture-handler';
import { RecruiterDetailsById } from '../api';
import { Capitalize } from "../components/commonFunctions";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MotiView } from 'moti';

const RecruiterProfile = ({ navigation }) => {
  const [details, setDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [id, setId] = useState(null);

  const getData = async () => {
    setId(await AsyncStorage.getItem('recruiter_id'));
  };

  useEffect(() => {
    if (!id) {
      getData();
    }
    if (id) {
      RecruiterDetailsById(id).then((res) => {
        if (res.status) {
          setDetails(res.data[0]);
          setIsLoading(false);
        }
      });
    }
  }, [id]);

  const removeItem = async () => {
    await AsyncStorage.multiRemove(['recruiter_id', 'user_type']);
  };

  const handleNav = () => {
    removeItem().then(() => {
      navigation.reset({
        index: 0,
        routes: [{ name: 'Getstarted' }],
      });
      navigation.navigate('Getstarted');
    });
  };

  return (
    <ScrollView>
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#407BFF" />
        </View>
      ) : (
        <>
          <MotiView
            from={{ translateX: -100 }}
            animate={{ translateX: 0 }}
            duration={500}
          >
            <View style={styles.profileContainer}>
              <Image
                source={require('../assets/female.png')}
                style={styles.profileImage}
              />
              <View style={styles.profileInfo}>
                <Text style={styles.name}>
                  {Capitalize(details.firstname)} {Capitalize(details.lastname)}
                </Text>
                <Text style={styles.email}>{details.email}</Text>
                <Text style={styles.companyName}>{details.company_name}</Text>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('EditRecruiterProfile', { id: id })
                  }
                  style={styles.editProfileButton}
                >
                  <Text style={styles.editProfileButtonText}>Edit Profile</Text>
                </TouchableOpacity>
              </View>
            </View>
          </MotiView>
          <MotiView
            from={{ opacity: 0, translateX: -100 }}
            animate={{ opacity: 1, translateX: 0 }}
            duration={500}
            delay={1000}
          >
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() =>
                navigation.navigate('ChangePassword', { id: id, type: 'recruiter' })
              }
            >
              <Text style={styles.menuItemText}>
                <Icon name="key-variant" size={24} color="#407BFF" /> Change Password
              </Text>
              <Icon name="chevron-right" size={18} color="gray" />
            </TouchableOpacity>
          </MotiView>
          <MotiView
            from={{ opacity: 0, translateX: -100 }}
            animate={{ opacity: 1, translateX: 0 }}
            duration={500}
            delay={1500}
          >
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() =>
                navigation.navigate('Report', { id: id, type: 'recruiter' })
              }
            >
              <Text style={styles.menuItemText}>
                <Icona name="piechart" size={24} color="#407BFF" /> Report
              </Text>
              <Icon name="chevron-right" size={18} color="gray" />
            </TouchableOpacity>
          </MotiView>
          <MotiView
            from={{ opacity: 0, translateX: -100 }}
            animate={{ opacity: 1, translateX: 0 }}
            duration={500}
            delay={2000}
          >
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => navigation.navigate('Contact', { id: id, type: 'recruiter' })}
            >
              <Text style={styles.menuItemText}>
                <Icon name="chat-outline" size={24} color="#407BFF" /> Contact Us
              </Text>
              <Icon name="chevron-right" size={18} color="gray" />
            </TouchableOpacity>
          </MotiView>
          <MotiView
            from={{ opacity: 0, translateX: -100 }}
            animate={{ opacity: 1, translateX: 0 }}
            duration={500}
            delay={2500}
          >
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => navigation.navigate('About')}
            >
              <Text style={styles.menuItemText}>
                <Icon name="information-outline" size={24} color="#407BFF" /> About Us
              </Text>
              <Icon name="chevron-right" size={18} color="gray" />
            </TouchableOpacity>
          </MotiView>
          <MotiView
            from={{ opacity: 0, translateX: -100 }}
            animate={{ opacity: 1, translateX: 0 }}
            duration={500}
            delay={3000}
          >
            <TouchableOpacity
              style={styles.logoutButton}
              onPress={handleNav}
            >
              <Text style={styles.logoutButtonText}>Logout</Text>
              <Icon name="chevron-right" size={18} color="gray" />
            </TouchableOpacity>
          </MotiView>
        </>
      )}
    </ScrollView>
  );
};

export default RecruiterProfile;

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileContainer: {
    backgroundColor: 'white',
    margin: 20,
    width: '90%',
    padding: 8,
    borderRadius: 25,
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 100,
  },
  profileInfo: {
    marginLeft: 20,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 0,
  },
  email: {
    fontWeight: 'bold',
    color: 'gray',
    margin: 0,
  },
  companyName: {
    fontWeight: 'bold',
    color: 'gray',
    margin: 0,
  },
  editProfileButton: {
    backgroundColor: '#407BFF',
    width: 100,
    alignItems: 'center',
    marginVertical: 5,
    padding: 7,
    borderRadius: 8,
    shadowOffset: { width: 5, height: 5 },
    shadowColor: 'black',
    shadowOpacity: 0.8,
    shadowRadius: 5,
    elevation: 3,
  },
  editProfileButtonText: {
    color: 'white',
    fontSize: 16,
  },
  menuItem: {
    backgroundColor: 'white',
    width: '90%',
    margin: 20,
    marginTop: 5,
    padding: 20,
    justifyContent: 'space-between',
    flexDirection: 'row',
    borderRadius: 15,
    alignItems: 'center',
  },
  menuItemText: {
    fontSize: 20,
    alignItems: 'center',
    textAlign: 'center',
  },
  logoutButton: {
    backgroundColor: 'white',
    width: '90%',
    margin: 20,
    marginTop: 5,
    padding: 20,
    justifyContent: 'space-between',
    flexDirection: 'row',
    borderRadius: 15,
    alignItems: 'center',
  },
  logoutButtonText: {
    fontSize: 20,
    alignItems: 'center',
    textAlign: 'center',
    color: 'red',
  },
});
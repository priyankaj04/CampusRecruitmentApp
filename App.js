import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, StatusBar } from 'react-native';
import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import Login from './pages/Login';
import Register from './pages/Register';
import About from './pages/About';
import Profile from './pages/Profile';
import Saved from './pages/Saved';
import Jobprofile from './pages/Jobprofile';
import Home from './pages/Home'
import Getstarted from './pages/Getstarted';
import Terms from './pages/Terms';
import PrivatePolicy from './pages/PrivatePolicy';
import Notification from './pages/Notification';
import SplashScreen from './pages/SplashScreen';
import EditProfile from './pages/EditProfile';
import ChangePassword from './pages/ChangePassword';
import ContactUs from './pages/ContactUs';
import ViewQueries from './pages/ViewQueries';
import EditResume from './pages/EditResume';
import CreateApplication from './pages/CreateApplication';
import RecruiterHome from './pages/RecruiterHome';
import RecruiterLogin from './pages/RecruiterLogin';
import RecruiterNotification from './pages/RecruiterNotification';
import RecruiterRegister from './pages/RecruiterRegister';
import RecruiterProfile from './pages/RecruiterProfile';
import EditRecruiterProfile from './pages/EditRecruiterProfile';
import ViewResume from './pages/ViewResume';
import SendOTP from './pages/SendOTP';
import ForgotPassword from './pages/ForgotPassword';
import SmsOTP from './pages/SmsOTP';
import Dashboard from './pages/Dashboard';
import AdminProfile from './pages/AdminProfile';
import AdminQueries from './pages/AdminQueries';
import AdminChangepassword from './pages/AdminChangepassword';
import CreateStudent from './pages/CreateStudent';
import StudentPage from './pages/StudentPage';
import ViewActionJobs from './pages/ViewActionJobs';
import RecruiterJobPage from './pages/RecruiterJobPage';
import EditApplication from './pages/EditApplication';
import ApplyforJob from './pages/ApplyforJob';
import ActionApplications from './pages/ActionApplications';
import ScheduleInterview from './pages/ScheduleInterview';
import Subjects from './pages/Subjects';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const IndexDashboard = ({ navigation }) => {
  return (
    <Drawer.Navigator initialRouteName="StudentPage">
      <Drawer.Screen name="Dashboard" component={Dashboard} options={{
        title: "Home"
      }} />
      <Drawer.Screen name="StudentPage" component={StudentPage} options={{
        title: 'Students'
      }} />
      <Drawer.Screen name="AdminQueries" component={AdminQueries} options={{
        title: 'Queries'
      }} />
      <Drawer.Screen name="Subjects" component={Subjects} options={{
        title: 'Subjects'
      }} />
      <Drawer.Screen name="AdminChangepassword" component={AdminChangepassword} options={{
        title: 'Change Password'
      }} />
      <Drawer.Screen name="AdminProfile" component={AdminProfile} options={{
        title: 'Profile'
      }} />
    </Drawer.Navigator>
  );
}

const HomePage = ({ navigation }) => {
  return (
    <Tab.Navigator initialRouteName='Home' screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;
        if (route.name === 'Home') {
          iconName = "home";
        } else if (route.name === 'Profile') {
          iconName = 'user';
        } else if (route.name === 'Saved') {
          iconName = 'bookmark';
        } else if (route.name === 'Jobprofile') {
          iconName = 'suitcase';
        }

        // You can return any component that you like here!
        return <Icon name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: '#407BFF',
      tabBarInactiveTintColor: 'gray',
    })}>
      <Tab.Screen name="Home" component={Home}
        options={{
          title: 'Home',
          headerRight: () => (
            <Icon
              name="bell"
              size={22}
              color="black"
              style={{ marginLeft: 5, marginRight: 15 }}
              onPress={() => navigation.navigate('Notification')}
            />
          ),
        }} />
      <Tab.Screen name="Saved" component={Saved} />
      <Tab.Screen name="Jobprofile" component={Jobprofile} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}

const RecruiterHomes = ({ navigation }) => {
  return (
    <Tab.Navigator initialRouteName='RecruiterHome' screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;
        if (route.name === 'RecruiterHome') {
          iconName = "home";
        } else if (route.name === 'RecruiterProfile') {
          iconName = 'user';
        } else if (route.name === 'CreateApplication') {
          iconName = 'plus';
        }

        // You can return any component that you like here!
        return <Icon name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: '#407BFF',
      tabBarInactiveTintColor: 'gray',
    })}>
      <Tab.Screen name="RecruiterHome" component={RecruiterHome}
        options={{
          title: 'Home',
          headerRight: () => (
            <Icon
              name="bell"
              size={22}
              color="black"
              style={{ marginLeft: 5, marginRight: 15 }}
              onPress={() => navigation.navigate('RecruiterNotification')}
            />
          ),
        }} />
      <Tab.Screen name="CreateApplication" options={{
        title: 'Create Applicaiton',
      }} component={CreateApplication} />
      <Tab.Screen name="RecruiterProfile" options={{
        title: 'Profile',
      }} component={RecruiterProfile} />
    </Tab.Navigator>
  );
}

export default function App() {
  const navigationRef = useNavigationContainerRef();

  return (
    <NavigationContainer ref={navigationRef} independent={true} >
      <StatusBar hidden />
      <Stack.Navigator screenOptions={{ gestureEnabled: false }} initialRouteName="SplashScreen">
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={{
            title: '',
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Getstarted"
          component={Getstarted}
          options={{
            title: 'Get Started',
            headerStyle: {
              backgroundColor: '#407BFF',
              color: 'white'
            },
            headerTintColor: 'white',
          }}
        />
        <Stack.Screen
          name="Index"
          component={HomePage}
          options={{
            headerShown: false,
            title: '',
            headerTintColor: { color: "white" },
          }}
        />
        <Stack.Screen
          name="IndexDashboard"
          component={IndexDashboard}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="IndexRecruiter"
          component={RecruiterHomes}
          options={{
            headerShown: false,
            title: '',
            headerTintColor: { color: "white" },
          }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerShown: false,
            title: '',
            headerTintColor: { color: "white" },
          }}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{
            headerShown: false,
            title: '',
            headerTintColor: { color: "white" },
          }}
        />
        <Stack.Screen
          name="RecruiterLogin"
          component={RecruiterLogin}
          options={{
            headerShown: false,
            title: '',
            headerTintColor: { color: "white" },
          }}
        />
        <Stack.Screen
          name="RecruiterRegister"
          component={RecruiterRegister}
          options={{
            headerShown: false,
            title: '',
            headerTintColor: { color: "white" },
          }}
        />
        <Stack.Screen
          name="SMSOTP"
          component={SmsOTP}
          options={{
            headerShown: false,
            title: '',
            headerTintColor: { color: "white" },
          }}
        />

        <Stack.Screen
          name="EditProfile"
          component={EditProfile}
          options={{
            title: "Edit information",
            headerLeft: () => (
              <Icon
                name="angle-left"
                size={30}
                color="black"
                style={{ marginLeft: 5, marginRight: 10 }}
                onPress={() => navigationRef.navigate('Profile')}
              />
            ),
          }}
        />
        <Stack.Screen
          name="EditRecruiterProfile"
          component={EditRecruiterProfile}
          options={{
            title: "Edit information",
            headerLeft: () => (
              <Icon
                name="angle-left"
                size={30}
                color="black"
                style={{ marginLeft: 5, marginRight: 10 }}
                onPress={() => navigationRef.navigate('RecruiterProfile')}
              />
            ),
          }}
        />

        <Stack.Screen
          name="EditResume"
          component={EditResume}
          options={{
            title: "Edit Resume",
            headerLeft: () => (
              <Icon
                name="angle-left"
                size={30}
                color="black"
                style={{ marginLeft: 5, marginRight: 10 }}
                onPress={() => navigationRef.navigate('EditProfile')}
              />
            ),
          }}
        />
        <Stack.Screen
          name="ChangePassword"
          component={ChangePassword}
          options={{
            title: "Change Password",
            headerLeft: () => (
              <Icon
                name="angle-left"
                size={30}
                color="black"
                style={{ marginLeft: 5, marginRight: 10 }}
                onPress={() => navigationRef.goBack()}
              />
            ),
          }}
        />
        <Stack.Screen
          name="ScheduleInterview"
          component={ScheduleInterview}
          options={{
            title: "Schedule Interview",
            headerLeft: () => (
              <Icon
                name="angle-left"
                size={30}
                color="black"
                style={{ marginLeft: 5, marginRight: 10 }}
                onPress={() => navigationRef.goBack()}
              />
            ),
          }}
        />
        <Stack.Screen
          name="ApplyforJob"
          component={ApplyforJob}
          options={{
            title: "Apply",
            headerLeft: () => (
              <Icon
                name="angle-left"
                size={30}
                color="black"
                style={{ marginLeft: 5, marginRight: 10 }}
                onPress={() => navigationRef.goBack()}
              />
            ),
          }}
        />
        <Stack.Screen
          name="ActionApplications"
          component={ActionApplications}
          options={{
            title: "Applicants",
            headerLeft: () => (
              <Icon
                name="angle-left"
                size={30}
                color="black"
                style={{ marginLeft: 5, marginRight: 10 }}
                onPress={() => navigationRef.goBack()}
              />
            ),
          }}
        />
        <Stack.Screen
          name="EditApplication"
          component={EditApplication}
          options={{
            title: "Edit Application",
            headerLeft: () => (
              <Icon
                name="angle-left"
                size={30}
                color="black"
                style={{ marginLeft: 5, marginRight: 10 }}
                onPress={() => navigationRef.goBack()}
              />
            ),
          }}
        />
        <Stack.Screen
          name="CreateStudent"
          component={CreateStudent}
          options={{
            title: "Create Student",
            headerLeft: () => (
              <Icon
                name="angle-left"
                size={30}
                color="black"
                style={{ marginLeft: 5, marginRight: 10 }}
                onPress={() => navigationRef.goBack()}
              />
            ),
          }}
        />
        <Stack.Screen
          name="ViewActionJobs"
          component={ViewActionJobs}
          options={{
            title: "Approve Jobs",
            headerLeft: () => (
              <Icon
                name="angle-left"
                size={30}
                color="black"
                style={{ marginLeft: 5, marginRight: 10 }}
                onPress={() => navigationRef.goBack()}
              />
            ),
          }}
        />
        <Stack.Screen
          name="RecruiterJobPage"
          component={RecruiterJobPage}
          options={{
            title: "Approve Jobs",
            headerLeft: () => (
              <Icon
                name="angle-left"
                size={30}
                color="black"
                style={{ marginLeft: 5, marginRight: 10 }}
                onPress={() => navigationRef.goBack()}
              />
            ),
          }}
        />
        <Stack.Screen
          name="SendOTP"
          component={SendOTP}
          options={{
            title: "OTP Verification",
            headerLeft: () => (
              <Icon
                name="angle-left"
                size={30}
                color="black"
                style={{ marginLeft: 5, marginRight: 10 }}
                onPress={() => navigationRef.goBack()}
              />
            ),
          }}
        />
        <Stack.Screen
          name="ForgotPassword"
          component={ForgotPassword}
          options={{
            title: "Forgot Password",
            headerLeft: () => (
              <Icon
                name="angle-left"
                size={30}
                color="black"
                style={{ marginLeft: 5, marginRight: 10 }}
                onPress={() => navigationRef.goBack()}
              />
            ),
          }}
        />
        <Stack.Screen
          name="ViewResume"
          component={ViewResume}
          options={{
            title: "Your Resume",
            headerLeft: () => (
              <Icon
                name="angle-left"
                size={30}
                color="black"
                style={{ marginLeft: 5, marginRight: 10 }}
                onPress={() => navigationRef.goBack()}
              />
            ),
          }}
        />
        <Stack.Screen
          name="About"
          component={About}
          options={{
            title: "",
            headerLeft: () => (
              <Icon
                name="angle-left"
                size={30}
                color="black"
                style={{ marginLeft: 5, marginRight: 10 }}
                onPress={() => navigationRef.goBack()}
              />
            ),
          }}
        />
        <Stack.Screen
          name="Contact"
          component={ContactUs}
          options={{
            title: "",
            headerLeft: () => (
              <Icon
                name="angle-left"
                size={30}
                color="black"
                style={{ marginLeft: 5, marginRight: 10 }}
                onPress={() => navigationRef.goBack()}
              />
            ),
          }}
        />
        <Stack.Screen
          name="ViewQueries"
          component={ViewQueries}
          options={{
            title: "",
            headerLeft: () => (
              <Icon
                name="angle-left"
                size={30}
                color="black"
                style={{ marginLeft: 5, marginRight: 10 }}
                onPress={() => navigationRef.navigate('Contact')}
              />
            ),
          }}
        />
        <Stack.Screen
          name="TermsandConditions"
          component={Terms}
          options={{
            title: "Terms and Conditions",
            headerLeft: () => (
              <Icon
                name="angle-left"
                size={30}
                color="black"
                style={{ marginLeft: 5, marginRight: 10 }}
                onPress={() => navigationRef.navigate('Register')}
              />
            ),
          }}
        />
        <Stack.Screen
          name="PrivatePolicy"
          component={PrivatePolicy}
          options={{
            title: "Private Policy",
            headerLeft: () => (
              <Icon
                name="angle-left"
                size={30}
                color="black"
                style={{ marginLeft: 5, marginRight: 10 }}
                onPress={() => navigationRef.navigate('Register')}
              />
            ),
          }}
        />
        <Stack.Screen
          name="Notification"
          component={Notification}
          options={{
            title: "Notification",
            headerLeft: () => (
              <Icon
                name="angle-left"
                size={30}
                color="black"
                style={{ marginLeft: 5, marginRight: 10 }}
                onPress={() => navigationRef.navigate('Index')}
              />
            ),
          }}
        />
        <Stack.Screen
          name="RecruiterNotification"
          component={RecruiterNotification}
          options={{
            title: "Notification",
            headerLeft: () => (
              <Icon
                name="angle-left"
                size={30}
                color="black"
                style={{ marginLeft: 5, marginRight: 10 }}
                onPress={() => navigationRef.navigate('RecruiterHome')}
              />
            ),
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});

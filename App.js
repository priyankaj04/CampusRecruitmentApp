import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, StatusBar } from 'react-native';
import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import Index from './pages/Index'
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

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

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

export default function App() {
  const navigationRef = useNavigationContainerRef();

  return (
    <NavigationContainer ref={navigationRef} independent={true} >
      <StatusBar hidden />
      <Stack.Navigator screenOptions={{ gestureEnabled: false }} initialRouteName="EditProfile">
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
                onPress={() => navigationRef.navigate('Index')}
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
                onPress={() => navigationRef.navigate('Profile')}
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
                onPress={() => navigationRef.navigate('Profile')}
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
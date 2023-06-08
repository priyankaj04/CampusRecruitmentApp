import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import Home from './Home';


const Tab = createBottomTabNavigator();

const Index = () => {
    return (
        <NavigationContainer independent={true}>
            <Tab.Navigator
                
            >
                <Tab.Screen name="Home" component={Home} />
                <Tab.Screen name="Profile" component={Profile} />
                
            </Tab.Navigator>
        </NavigationContainer>
    )
}

export default Index

const styles = StyleSheet.create({})
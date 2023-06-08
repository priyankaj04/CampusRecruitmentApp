import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';


const NavBar = ({navigation}) => {

  const [isClicked, setIsClicked] = useState('profile');

  return (
    <View>
      <View style={styles.navbar}>
        <View style={styles.navbarContainer}>
          <TouchableOpacity style={isClicked === 'home' ? styles.clickedButton : styles.button} onPress={() => { setIsClicked('home'); navigation.navigate('Home'); }}>
            <Icon name="home" size={28} color={isClicked === 'home' ? '#19A7CE' : 'gray'} />
            <Text style={{ color: 'white', fontSize: 10, color: isClicked === 'home' ? '#19A7CE' : 'gray' }}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity style={isClicked === 'bookmark' ? styles.clickedButton : styles.button} onPress={() => { setIsClicked('bookmark'); navigation.navigate('Saved'); }}>
            <Icon name="bookmark" size={28} color={isClicked === 'bookmark' ? '#19A7CE' : 'gray'} />
            <Text style={{ color: 'white', fontSize: 10, color: isClicked === 'bookmark' ? '#19A7CE' : 'gray' }}>Saved</Text>
          </TouchableOpacity>
          <TouchableOpacity style={isClicked === 'suitcase' ? styles.clickedButton : styles.button} onPress={() => { setIsClicked('suitcase'); navigation.navigate('Jobprofile'); }}>
            <Icon name="suitcase" size={28} color={isClicked === 'suitcase' ? '#19A7CE' : 'gray'} />
            <Text style={{ color: 'white', fontSize: 10, color: isClicked === 'suitcase' ? '#19A7CE' : 'gray' }}>Job Profiles</Text>
          </TouchableOpacity>
          <TouchableOpacity style={isClicked === 'user' ? styles.clickedButton : styles.button} onPress={() => { setIsClicked('user'); navigation.navigate('Profile'); }}>
            <Icon name="user" size={28} color={isClicked === 'user' ? '#19A7CE' : 'gray'} />
            <Text style={{ color: 'white', fontSize: 10, color: isClicked === 'user' ? '#19A7CE' : 'gray' }}>Profile</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default NavBar

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#142896',
    width: '100%',
    height: '100%'
  },
  navbar: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
    position: 'absolute',
    bottom: 15,
  },
  navbarContainer: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    width: '90%',
    padding: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    borderRadius: 30,
  },
  button: {
    alignItems: 'center',
  },
  clickedButton: {
    alignItems: 'center',
    transform: [{ scale: 1.2 }],
    borderRadius: 50,
    bakcgroundColor: '#f2f2f2',
  }
})
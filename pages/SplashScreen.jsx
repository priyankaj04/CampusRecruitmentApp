import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { MotiView, useAnimationState } from 'moti';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SplashScreen = ({ navigation }) => {
  const [type, setType] = useState(null);
  const wavingTextAnimationState = useAnimationState({
    from: { rotate: '0deg', translateY: 0 },
    waving: { rotate: '10deg', translateY: -10 },
  });

  const getData = async () => {
    setType(await AsyncStorage.getItem('user_type'));
    const value = await AsyncStorage.getItem('user_type');
    console.log(value);
    if (value == 'talent') {
      navigation.reset({
        index: 0,
        routes: [{ name: 'Index' }],
      });
      navigation.navigate('Index');
    } else if (value == 'recruiter') {
      navigation.reset({
        index: 0,
        routes: [{ name: 'IndexRecruiter' }],
      });
      navigation.navigate('IndexRecruiter');
    } else if (value == 'admin') {
      navigation.reset({
        index: 0,
        routes: [{ name: 'IndexDashboard' }],
      });
      navigation.navigate('IndexDashboard');
    } else if (value == 'hod') {
      navigation.reset({
        index: 0,
        routes: [{ name: 'Subjects' }],
      });
      navigation.navigate('Subjects');
    } else {
      navigation.reset({
        index: 0,
        routes: [{ name: 'Getstarted' }],
      });
      navigation.navigate('Getstarted');
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      getData();
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <MotiView style={styles.container} from={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1000 }}>
      <MotiView
        from={{ opacity: 0, translateY: 100 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: 'timing', duration: 1500 }}
        style={styles.logoContainer}
      >
        <Image source={require('../assets/puzzle.png')} style={styles.logo} />
      </MotiView>
      <MotiView
        state={wavingTextAnimationState}
        from={{ opacity: 0, translateY: 100 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: 'timing', duration: 1500 }}
        delay={500}
        style={styles.textContainer}
      >
        <Text style={styles.text}>TALENT</Text>

        <MotiView
          state={wavingTextAnimationState}
          from={{ opacity: 0, translateY: 100 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'timing', duration: 1500 }}
          delay={1000}
        >
          <Text style={styles.text}> CONNECT</Text>
        </MotiView>
      </MotiView>
      <MotiView
        from={{ opacity: 0, translateY: 100 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: 'timing', duration: 1000 }}
        delay={2000}
      >
        <Text style={styles.footerText}>© COPYRIGHT POLICY</Text>
      </MotiView>
    </MotiView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#407BFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
  },
  logo: {
    width: 300,
    height: 300,
  },
  textContainer: {
    flexDirection: 'row',
    marginTop: 30,
  },
  text: {
    fontSize: 26,
    fontWeight: 'bold',
    color: 'white',
  },
  footerText: {
    fontSize: 14,
    color: 'white',
    position: 'absolute',
    bottom: -220,
    right: -75
  },
});

export default SplashScreen;
import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { MotiView } from 'moti';

const Getstarted = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome to a world of possibilities!!!</Text>
            <Text style={styles.subtitle}>
                Begin your campus recruitment transformation with TALENT CONNECT and open doors to success
            </Text>
            <MotiView
                from={{ opacity: 0, translateY: -100 }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{ type: 'timing', duration: 1000 }}
                style={styles.imageContainer}
            >
                <Image source={require('../assets/getStarted.png')} style={styles.image} />
            </MotiView>
            <MotiView
                from={{ opacity: 0, translateX: -100 }}
                animate={{ opacity: 1, translateX: 0 }}
                transition={{ type: 'timing', duration: 1000 }}
                delay={500}
            >
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Register')}>
                    <Text style={styles.buttonText}>Join as Student</Text>
                </TouchableOpacity>
            </MotiView>
            <MotiView
                from={{ opacity: 0, translateX: -100 }}
                animate={{ opacity: 1, translateX: 0 }}
                transition={{ type: 'timing', duration: 1000 }}
                delay={1000}
            >
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('RecruiterRegister')}>
                    <Text style={{ ...styles.buttonText, color: 'black' }}>Join as Recruiter</Text>
                </TouchableOpacity>
            </MotiView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#407BFF',
    },
    title: {
        margin: 15,
        fontSize: 24,
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 16,
        margin: 0,
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        fontStyle: 'italic',
    },
    imageContainer: {
        width: '100%',
        height: 500,
    },
    image: {
        width: '100%',
        height: '100%',
    },
    button: {
        width: '90%',
        height: 50,
        padding: 10,
        backgroundColor: 'white',
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 5,
        marginLeft: 20
    },
    buttonText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#407BFF',
    },
});

export default Getstarted;
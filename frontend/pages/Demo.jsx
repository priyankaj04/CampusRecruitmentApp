import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Animated } from 'react-native';
import { MotiView } from 'moti';
import Icon from 'react-native-vector-icons/FontAwesome';

const Demo = () => {
    const scaleAnimation = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        const scaleTo = 1.2; // Target scale value
        const animationDuration = 1500; // Animation duration in milliseconds
        const interval = 15000; // Interval between animations in milliseconds

        const animate = () => {
            Animated.sequence([
                Animated.timing(scaleAnimation, {
                    toValue: 1.2,
                    duration: animationDuration,
                    useNativeDriver: true,
                }),
                Animated.timing(scaleAnimation, {
                    toValue: 1,
                    duration: animationDuration,
                    useNativeDriver: true,
                }),
            ]).start();
        };
        const intervalId = setInterval(animate, interval);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <Animated.View
                style={{
                    transform: [{ scale: scaleAnimation }],
                }}
            >
                <Icon name="camera-retro" size={24} />
            </Animated.View>
            {/* Add more icons as needed */}
        </View>
    );
};

export default Demo;

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
        margin: 15,
        marginLeft: 25,
    },
});

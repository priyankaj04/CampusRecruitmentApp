import { StyleSheet, Text, View, Button, TextInput, ScrollView } from 'react-native'
import React, { useState } from 'react';
import { MotiView } from 'moti';

const Demo = () => {

    return (
        <View>
            <MotiView
                from={{ opacity: 0, translateY: 100 }}
                animate={{ opacity: 1, translateY: 0 }}
                duration={500}
            >
                <Text style={{fontSize: 26}}>Hello, Moti!</Text>
            </MotiView>
        </View>
    )
}

export default Demo

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
        marginLeft: 25
    },
})
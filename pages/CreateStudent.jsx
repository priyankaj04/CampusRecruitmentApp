import { StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity, ClearText } from 'react-native'
import React, { useState, useEffect } from 'react';
import { RadioButton } from 'react-native-paper';
import Checkbox from 'expo-checkbox';
import Icon from 'react-native-vector-icons/Entypo';
import { CreateJob } from '../api';
import Toastable, { showToastable } from 'react-native-toastable';
import AsyncStorage from '@react-native-async-storage/async-storage'

const CreateStudent = () => {
    const id = AsyncStorage.getItem('admin_id');

    return (
        <View>
            <View style={{ position: 'absolute', top: 10, width: '100%', height: 70, zIndex: 9999, }}>
                <Toastable statusMap={{
                    success: 'rgba(66, 126, 255, 0.85)',
                    info: 'rgba(0, 0, 0, 0.85)'
                }} />
            </View>
            <ScrollView>
                <View style={{ backgroundColor: 'white', width: "95%", margin: 10, borderRadius: 10 }}>
                    <Text style={styles.header}>Stream</Text>
                    <View style={{ flexDirection: 'row', marginLeft: 10 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <RadioButton
                                value="job"
                                label="Job"
                                status="checked"
                                onPress={() => { }}
                            />
                            <Text style={{ textAlign: 'center' }}>Job</Text>
                        </View>
                    </View>
                    <View style={styles.divider} />
                    <Text style={styles.header}>Internship details</Text>
                    <Text style={styles.label}>Internship profile</Text>
                    <TextInput
                        style={styles.textField}
                        value={""}
                        onChangeText={(e) => { }}
                    />
                    <Text style={styles.label}>Skills required</Text>
                    <TextInput
                        style={styles.textField}
                        value={""}
                        onChangeText={(e) => { }}
                        placeholder='e.g. Java'
                    />
                    <Text style={styles.label}>Internship type</Text>
                    <View style={{ flexDirection: 'row', marginLeft: 10 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <RadioButton
                                value="In-office/Hybrid"
                                label="In-office/Hybrid"
                                status="checked"
                                onPress={() => { }}
                            />
                            <Text style={{ textAlign: 'center' }}>In-office/Hybrid</Text>
                        </View>
                    </View>
                    <View>
                        <Text style={styles.label}>Location</Text>
                        <TextInput
                            style={styles.textField}
                            value={""}
                            onChangeText={(e) => { }}
                            placeholder='e.g. Koramangala,Bengaluru'
                        />
                    </View>
                    <Text style={styles.label}>Number of openings</Text>
                    <TextInput
                        style={styles.textField}
                        value={""}
                        onChangeText={(e) => { }}
                        placeholder='e.g. 4'
                    />
                    <View style={{ flexDirection: 'row', margin: 5 }}>
                        <View>
                            <Text style={styles.label}>Total Number of rounds</Text>
                            <TextInput
                                style={styles.towinonepro}
                                value={""}
                                onChangeText={(e) => { }}
                                placeholder='e.g. 3'
                            />
                        </View>
                        <View>
                            <Text style={styles.label}>Current round</Text>
                            <TextInput
                                style={styles.towinonepro}
                                value={""}
                                onChangeText={(e) => { }}
                                placeholder='e.g. 2'
                            />
                        </View>
                    </View>
                    <Text style={styles.label}>Round Name</Text>
                    <TextInput
                        style={styles.textField}
                        value={""}
                        onChangeText={(e) => { }}
                        placeholder='e.g. Technical Round'
                    />
                    <Text style={styles.label}>Eligibility</Text>
                    <TextInput
                        style={styles.textField}
                        value={""}
                        onChangeText={(e) => { }}
                        placeholder='e.g. Any Bachelor Degree'
                    />
                    {jobDetails.opportunity_type == 'internship' && <View>
                        <Text style={styles.label}>Internship start date</Text>
                        <View style={{ flexDirection: 'row', marginLeft: 10 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <RadioButton
                                    value="Immediately (within next 30 days)"
                                    label="Immediately (within next 30 days)"
                                    status="checked"
                                    onPress={() => { }}
                                />
                                <Text style={{ textAlign: 'center' }}>Immediately (within next 30 days)</Text>
                            </View>
                        </View>
                    </View>
                    }
                    <Text style={styles.label}>Last Date to apply</Text>
                    <View style={{
                        backgroundColor: 'whitesmoke',
                        height: 50,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: 10,
                        marginTop: 0,
                        padding: 5,
                        borderRadius: 25,
                    }}>
                        <TextInput
                            style={{
                                height: 50,
                                borderColor: 'transparent',
                                borderWidth: 1,
                                width: 320,
                                padding: 10,
                                fontSize: 16,
                                borderRadius: 25,
                            }}
                            value={""}
                            onChangeText={(e) => { }}
                            placeholder='format DD/MM/YYYY'
                        />
                        <Icon name="calendar" color="#407BFF" size={24} />
                    </View>
                    <View>
                        <Text style={styles.label}>Internship duration</Text>
                        <Text style={{ color: '#407BFF', fontStyle: 'italic', fontSize: 12, marginLeft: 25, margin: 0 }}>Shorter the duration, more the applications</Text>
                        <Text style={styles.label}>Choose duration</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', margin: 10, flex: 1, justifyContent: 'space-evenly' }}>
                            <TextInput
                                style={styles.towinone}
                                value={""}
                                onChangeText={(e) => { }}
                                placeholder='e.g. 3'
                            />
                            <TextInput
                                style={styles.towinone}
                                value={""}
                                onChangeText={(e) => { }}
                                placeholder='e.g. months'
                            />
                        </View>
                    </View>
                    <Text style={styles.label}>Intern's responsibilities</Text>
                    <Text style={{ color: '#407BFF', fontStyle: 'italic', fontSize: 12, marginLeft: 25, margin: 0 }}>Internship posts with detailed job description receive significantly more applications.</Text>
                    <TextInput
                        style={styles.multiline}
                        multiline
                        editable
                        numberOfLines={8}
                        value={""}
                        onChangeText={(e) => { }}
                        placeholder='internship'
                    />
                    <Text style={styles.label}>Do you have any candidate preferences? (Optional)</Text>
                    <TextInput
                        style={styles.multiline}
                        multiline
                        editable
                        numberOfLines={8}
                        value={""}
                        onChangeText={(e) => { }}
                        placeholder='internship'
                    />

                    <TouchableOpacity style={styles.btn} onPress={() => {
                        handleClick()
                    }}>
                        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 18 }}>Post Job</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    )
}

export default CreateStudent

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
        marginLeft: 15
    },
    label: {
        marginBottom: 0,
        color: 'gray',
        marginLeft: 25,
        marginTop: 10
    },
    header: {
        fontSize: 20,
        fontWeight: 'bold',
        margin: 10,
        marginTop: 15
    },
    btn: {
        width: 350,
        height: 50,
        backgroundColor: '#407BFF',
        color: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10,
        borderRadius: 25,
        shadowOffset: { width: 5, height: 5 },
        shadowColor: 'black',
        shadowOpacity: 0.8,
        shadowRadius: 5,
        elevation: 3,
        marginLeft: 20
    },
    multiline: {
        minHeight: 50,
        borderColor: 'transparent',
        borderWidth: 1,
        width: 360,
        padding: 8,
        backgroundColor: 'whitesmoke',
        marginLeft: 15,
        fontSize: 16,
        textAlign: 'left',
        borderRadius: 25,
    },
    datePickerStyle: {
        width: 230,
    },
    divider: {
        margin: 15,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
    },
    multilines: {
        minHeight: 50,
        borderColor: 'transparent',
        borderWidth: 1,
        width: 320,
        padding: 8,
        backgroundColor: 'whitesmoke',
        marginLeft: 15,
        fontSize: 16,
        textAlign: 'left',
        borderRadius: 25,
    },
    towinone: {
        height: 50,
        borderColor: 'transparent',
        borderWidth: 1,
        width: 160,
        padding: 8,
        backgroundColor: 'whitesmoke',
        fontSize: 16,
        marginTop: 0,
        borderRadius: 25,
        marginLeft: 10
    },
    towinonepro: {
        height: 50,
        borderColor: 'transparent',
        borderWidth: 1,
        width: 180,
        padding: 8,
        backgroundColor: 'whitesmoke',
        fontSize: 16,
        marginTop: 0,
        borderRadius: 25,
        marginLeft: 5
    }
})
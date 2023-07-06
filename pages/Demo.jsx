import { StyleSheet, Text, View, Button, TextInput, ScrollView } from 'react-native'
import React, { useState } from 'react'

const Demo = () => {
    const [details, setDetails] = useState([]);

    function addEmptyObject() {
        const emptyObject = {
            subject: '',
            syllabus: [],
            credits: ''
        };

        setDetails(prevDetails => [...prevDetails, emptyObject]);
    }

    function handleSubjectChange(index, value) {
        setDetails(prevDetails => {
            const updatedDetails = [...prevDetails];
            updatedDetails[index].subject = value;
            return updatedDetails;
        });
    }

    function handleCreditsChange(index, value) {
        setDetails(prevDetails => {
            const updatedDetails = [...prevDetails];
            updatedDetails[index].credits = value;
            return updatedDetails;
        });
    }

    function handleUnitChange(detailIndex, syllabusIndex, value) {
        setDetails(prevDetails => {
            const updatedDetails = [...prevDetails];
            updatedDetails[detailIndex].syllabus[syllabusIndex].unit = value;
            return updatedDetails;
        });
    }

    function handleHoursChange(detailIndex, syllabusIndex, value) {
        setDetails(prevDetails => {
            const updatedDetails = [...prevDetails];
            updatedDetails[detailIndex].syllabus[syllabusIndex].hours = value;
            return updatedDetails;
        });
    }

    function handleTopicsChange(detailIndex, syllabusIndex, value) {
        setDetails(prevDetails => {
            const updatedDetails = [...prevDetails];
            updatedDetails[detailIndex].syllabus[syllabusIndex].topics = value;
            return updatedDetails;
        });
    }

    function addSyllabusItem(detailIndex) {
        setDetails(prevDetails => {
            const updatedDetails = [...prevDetails];
            updatedDetails[detailIndex].syllabus.push({
                unit: '',
                hours: '',
                topics: ''
            });
            return updatedDetails;
        });
    }

    function removeSyllabusItem(detailIndex, syllabusIndex) {
        setDetails(prevDetails => {
            const updatedDetails = [...prevDetails];
            updatedDetails[detailIndex].syllabus.splice(syllabusIndex, 1);
            return updatedDetails;
        });
    }

    return (
        <ScrollView>
            <Text>Demo</Text>
            {details.map((detail, detailIndex) => (
                <View key={detailIndex}>
                    <Text style={styles.label}>Subject Name</Text>
                    <TextInput
                        style={styles.textField}
                        value={detail.subject}
                        onChangeText={value => {
                            handleSubjectChange(detailIndex, value)
                        }}
                    />
                    <Text style={styles.label}>Credits Points</Text>
                    <TextInput
                        style={styles.textField}
                        value={detail.credits}
                        onChangeText={value => {
                            handleCreditsChange(detailIndex, value)
                        }}
                    />
                    <Text style={styles.label}>Subject Name</Text>  
                    <TextInput
                        style={styles.textField}
                        value={detail.subject}
                        onChangeText={value => {
                            handleSubjectChange(detailIndex, value)
                        }}
                    />
                    <Text style={styles.label}>Subject Name</Text>
                    <TextInput
                        style={styles.textField}
                        value={detail.subject}
                        onChangeText={value => {
                            handleSubjectChange(detailIndex, value)
                        }}
                    />
                    <Text style={styles.label}>Subject Name</Text>
                    <TextInput
                        style={styles.textField}
                        value={detail.subject}
                        onChangeText={value => {
                            handleSubjectChange(detailIndex, value)
                        }}
                    />
                    <Text style={styles.label}>Subject Name</Text>
                    <TextInput
                        style={styles.textField}
                        value={detail.subject}
                        onChangeText={value => {
                            handleSubjectChange(detailIndex, value)
                        }}
                    />
                </View>
            ))}
            <Button title="button" onPress={addEmptyObject} />
        </ScrollView>
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
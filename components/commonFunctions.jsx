import React, { useRef, useState, useEffect } from "react";
import moment from "moment";
import { StyleSheet, View, TextInput, Pressable, TouchableOpacity, ScrollView, Text } from 'react-native';
import { GetApplicationsForAdmin, RecruiterDetailsById } from '../api';
import Icon from 'react-native-vector-icons/FontAwesome';

export const Capitalize = (text) => {
    return text.charAt(0).toUpperCase() + text.slice(1)
}

export const calculateTimeAgo = (datetime) => {
    const now = moment();
    const time = moment(datetime);
    const diffMinutes = now.diff(time, 'minutes');
    const diffHours = now.diff(time, 'hours');
    console.log(now)

    if (diffMinutes < 1) {
        return 'Just now';
    } else if (diffMinutes === 1) {
        return '1 min ago';
    } else if (diffHours < 1) {
        return `${diffMinutes} mins ago`;
    } else if (diffHours === 1) {
        return '1 hour ago';
    } else if (time.isSame(now, 'day')) {
        return `${diffHours} hours ago`;
    } else if (time.isSame(now.clone().subtract(1, 'days'), 'day')) {
        return 'Yesterday';
    } else {
        return `${moment(datetime).format("DD/MM/YYYY HH:MM")}`;
    }
};

export const OTPInput = ({ code, setCode, maximumLength, setIsPinReady }) => {
    const boxArray = new Array(maximumLength).fill(0);
    const inputRef = useRef();

    const [isInputBoxFocused, setIsInputBoxFocused] = useState(false);

    const handleOnPress = () => {
        setIsInputBoxFocused(true);
        inputRef.current.focus();
    };

    const handleOnBlur = () => {
        setIsInputBoxFocused(false);
    };

    useEffect(() => {
        // update pin ready status
        setIsPinReady(code.length === maximumLength);
        // clean up function
        return () => {
            setIsPinReady(false);
        };
    }, [code]);
    const boxDigit = (_, index) => {
        const emptyInput = "";
        const digit = code[index] || emptyInput;

        const isCurrentValue = index === code.length;
        const isLastValue = index === maximumLength - 1;
        const isCodeComplete = code.length === maximumLength;

        const isValueFocused = isCurrentValue || (isLastValue && isCodeComplete);

        return (
            <View style={isInputBoxFocused && isValueFocused ? styles.SplitBoxesFocused : styles.SplitBoxes} key={index}>
                <Text style={styles.SplitBoxText}>{digit}</Text>
            </View>
        );
    };

    return (
        <View style={styles.OTPInputContainer}>
            <Pressable style={styles.SplitOTPBoxesContainer} onPress={handleOnPress}>
                {boxArray.map(boxDigit)}
            </Pressable>
            <TextInput
                style={styles.TextInputHidden}
                value={code}
                onChangeText={setCode}
                maxLength={maximumLength}
                ref={inputRef}
                onBlur={handleOnBlur}
            />
        </View>
    );
};

export const JobCards = ({ type, id }) => {
    const [details, setDetails] = useState([]);
    const [recruiterdetails, setRecruiterDetails] = useState({});

    useEffect(() => {
        if (type == 'admin') {
            GetApplicationsForAdmin().then((res) => {
                console.log(res);
                if (res.status) {
                    RecruiterDetailsById(res.data[0].recruiter_id).then((resp) => {
                        console.log("Recruiter", resp)
                        if (resp.status) {
                            setRecruiterDetails(resp.data[0]);
                        }
                    })
                    setDetails(res.data);
                }
            })
        }
    }, [id])

    return (<View>
        <ScrollView horizontal >
            {details && details.length > 0 && details.map((item, index) => (
                <View key={index} style={styles.card}>
                    <Text style={{ color: '#407BFF', fontSize: 18, fontWeight: 'bold' }}>{item.job_title}</Text>
                    <Text style={{ color: 'gray', fontStyle: 'italic', }}>Round {item.round}, {item.round_name}</Text>
                    <Text><Icon name="building-o" />{item.company_name} - <Text>{calculateTimeAgo(item.created_at)}</Text></Text>
                    <Text numberOfLines={3} ellipsizeMode='tail' >Eligibility - {item.eligibility}</Text>
                    <Text>{item.due_date}</Text>
                </View>
            ))}
        </ScrollView>
    </View>)
}

export const styles = StyleSheet.create({
    OTPInputContainer: {
        justifyContent: "center",
        alignItems: "center",
    }, textInputView: {
        borderBottomWidth: 1,
        width: 35,
        borderBottomColor: '#407BFF',
        justifyContent: 'center',
        alignItems: 'center'
    }, textInputStyle: {
        fontSize: 20
    },
    SplitOTPBoxesContainer: {
        width: "80%",
        flexDirection: "row",
        justifyContent: "space-evenly",
    },
    TextInputHidden: {
        borderColor: "#e5e5e5",
        borderWidth: "1px",
        borderRadius: "5px",
        padding: "15px",
        marginTop: "50px",
        color: "white",
        position: "absolute",
        opacity: 0,
    },
    SplitBoxes: {
        borderColor: "#e5e5e5",
        borderEidth: "2px",
        borderRadius: "5px",
        padding: "12px",
        width: "50px",
    },
    SplitBoxesFocused: {
        borderColor: "#ecdbba",
        backgroundColor: "gray",
    },
    SplitBoxText: {
        fontSize: "20px",
        textAlign: "center",
        color: "#e5e5e5",
    }, card: {
        backgroundColor: 'white',
        width: 220,
        height: 220,
        padding: 15,
        margin: 8,
        borderRadius: 10,
        shadowOffset: { width: 5, height: 5 },
        shadowColor: 'black',
        shadowOpacity: 0.8,
        shadowRadius: 5,
        elevation: 3,
    }
})

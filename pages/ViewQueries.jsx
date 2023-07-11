import { StyleSheet, Text, View, ScrollView, ActivityIndicator, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import { MotiView } from 'moti';
import { AllQueryById } from '../api';
import { calculateTimeAgo } from '../components/commonFunctions';

const ViewQueries = ({ route, navigation }) => {
    const id = route.params.id;
    const [query, setQuery] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        AllQueryById(id).then((res) => {
            if (res.status) {
                setQuery(res.data.sort((a, b) => {
                    const datetimeA = new Date(a.created_at);
                    const datetimeB = new Date(b.created_at);
                    return datetimeB - datetimeA;
                }));
            }
            setLoading(false);
        });
    }, []);

    return (
        <ScrollView>
            {loading ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#407BFF" />
                </View>
            ) : (
                <>
                    {query && query.length > 0 ? (
                        <MotiView
                            from={{ opacity: 0, translateX: -100 }}
                            animate={{ opacity: 1, translateX: 0 }}
                            transition={{ type: 'timing', duration: 500 }}
                        >
                            <View style={styles.queryContainer}>
                                {query.map((item, index) => (
                                    <MotiView
                                        key={item.query_id}
                                        from={{ opacity: 0, translateX: -100 }}
                                        animate={{ opacity: 1, translateX: 0 }}
                                        transition={{ type: 'timing', duration: 500, delay: index * 500 }}
                                    >
                                        <View style={styles.queryItem}>
                                            <Text style={styles.timeText}>{calculateTimeAgo(item.created_at)}</Text>
                                            <View style={styles.divider} />
                                            <Text style={styles.queryText}>Query: {item.message}</Text>
                                            {item.reply && <Text style={styles.replyText}>Reply: {item.reply}</Text>}
                                        </View>
                                    </MotiView>
                                ))}
                            </View>
                        </MotiView>
                    ) : (
                        <MotiView
                            from={{ opacity: 0, translateX: -100 }}
                            animate={{ opacity: 1, translateX: 0 }}
                            transition={{ type: 'timing', duration: 1000 }}
                            style={styles.noQueryContainer}
                        >
                            <Image
                                source={require('../assets/Nodata.png')}
                                style={styles.noQueryImage}
                            />
                            <Text style={styles.noQueryText}>No queries yet.</Text>
                        </MotiView>
                    )}
                </>
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    queryContainer: {
        margin: 10
    },
    queryItem: {
        backgroundColor: 'white',
        width: '95%',
        padding: 10,
        marginBottom: 20,
        borderRadius: 10,
        marginLeft: 8
    },
    timeText: {
        fontWeight: 'bold',
        fontSize: 16
    },
    divider: {
        marginTop: 5,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1
    },
    queryText: {
        fontSize: 16
    },
    replyText: {
        fontSize: 16,
        marginTop: 5
    },
    noQueryContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    noQueryImage: {
        width: 200,
        height: 200
    },
    noQueryText: {
        marginTop: 10,
        fontSize: 16
    },
    loadingContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default ViewQueries;
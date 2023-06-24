import { StyleSheet, Text, View, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import { RecruiterDetailsById, GetApplicationsForAdmin } from '../api';
import { ScrollView } from 'react-native-gesture-handler';
import { ActionJobCard } from '../components/commonFunctions'

const ViewActionJobs = () => {
    const [details, setDetails] = useState({});
    const [recruiterDetails, setRecruiterDetails] = useState({});
    const [fetch, setFetch] = useState(false);

    useEffect(() => {
        GetApplicationsForAdmin().then((res) => {
            if (res.status) {
                RecruiterDetailsById(res.data[0].recruiter_id).then((resp) => {
                    if (resp.status) {
                        setRecruiterDetails(resp.data[0]);
                    }
                })
                setDetails(res.data);
            }
        })
    }, [fetch])
    return (
        <ScrollView>
            {
                details && details.length > 0 ?
                    <View style={{ width: '100%', backgroundColor: 'white', margin: 0, padding: 20 }}>
                        {details.map((item, index) => (<ActionJobCard key={index} item={item} fetch={fetch} setFetch={setFetch} />))}
                    </View> :
                    <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Image
                            source={require('../assets/Nodata.png')}
                            style={{ width: 200, height: 200 }}
                        />
                        <Text>No new jobs uploaded by recruiters.</Text>
                    </View>
            }
        </ScrollView>
    )
}

export default ViewActionJobs

const styles = StyleSheet.create({})
import React from 'react';
import { View, Text } from 'react-native';
import { PieChart } from 'react-native-chart-kit';

const Report = () => {
    const chartData = [
        { name: 'Rejected students', population: 35, color: '#FF6384' },
        { name: 'Placed Students', population: 25, color: '#36A2EB' },
        { name: 'In Review', population: 40, color: '#FFCE56' },
    ];


    return (
        <View style={{ width: '100%', height: '100%', backgroundColor: 'white', padding: 20 }}>
            <Text style={{ color: '#407BFF', fontSize: 22, fontWeight: 'bold', textAlign: 'center' }}>Report</Text>
            <Text style={{ fontSize: 14, textAlign: 'center' }}>(2020 - 2023 batch)</Text>
            <PieChart
                data={chartData}
                width={700}
                height={400}
                chartConfig={{
                    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
                }}
                accessor="population"
                backgroundColor="transparent"
                paddingLeft="15"
            />
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10, marginLeft: 15 }}>
                {chartData.map((data, index) => (
                    <View key={index} style={{ flexDirection: 'row', alignItems: 'center', marginRight: 10 }}>
                        <View style={{ width: 10, height: 10, backgroundColor: data.color, marginRight: 5 }} />
                        <Text>{data.name}</Text>
                    </View>
                ))}
            </View>
            <View style={{padding: 20}}>
                <Text style={{fontSize: 16}}>Total number of students applied: 679</Text>
                <Text style={{ fontSize: 16 }}>Total number of students got placed: 450</Text>
                <Text style={{ fontSize: 16 }}>Total number of students got rejected: 229</Text>
                <Text style={{ fontSize: 16 }}>Total number of opportunity given: 780</Text>
                <Text style={{ fontSize: 16 }}>Total number of companies visited: 27</Text>
            </View>
        </View>
    );
};

export default Report;
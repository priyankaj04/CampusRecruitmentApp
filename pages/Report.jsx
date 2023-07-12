import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { MotiView, AnimatePresence } from 'moti';

const Report = () => {
    const chartData = [
        { name: 'Rejected students', population: 35, color: '#FF6384' },
        { name: 'Placed Students', population: 25, color: '#36A2EB' },
        { name: 'In Review', population: 40, color: '#FFCE56' },
    ];

    return (
        <View style={{ width: '100%', height: '100%', backgroundColor: 'white', padding: 20 }}>
            <AnimatePresence>
                <MotiView
                    from={{
                        translateY: -100,
                        opacity: 0,
                    }}
                    animate={{
                        translateY: 0,
                        opacity: 1,
                    }}
                    exit={{
                        translateY: -100,
                        opacity: 0,
                    }}
                    transition={{
                        duration: 1500,
                    }}
                >
                    <Text style={{ color: '#407BFF', fontSize: 22, fontWeight: 'bold', textAlign: 'center' }}>Report</Text>
                </MotiView>
            </AnimatePresence>
            <AnimatePresence>
                <MotiView
                    from={{
                        translateY: -100,
                        opacity: 0,
                    }}
                    animate={{
                        translateY: 0,
                        opacity: 1,
                    }}
                    exit={{
                        translateY: -100,
                        opacity: 0,
                    }}
                    transition={{
                        duration: 1500,
                        delay: 2000,
                    }}
                >
                    <Text style={{ fontSize: 14, textAlign: 'center' }}>(2020 - 2023 batch)</Text>
                </MotiView>
            </AnimatePresence>
            <MotiView
                from={{
                    scale: 0
                }}
                animate={{
                    scale: 1
                }}
                exit={{
                    scale: 0
                }}
                transition={{
                    duration: 1500,
                    delay: 2000
                }}
            >
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
            </MotiView>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10, marginLeft: 15 }}>
                {chartData.map((data, index) => (
                    <AnimatePresence key={index}>
                        <MotiView
                            from={{
                                translateY: -20,
                                opacity: 0,
                            }}
                            animate={{
                                translateY: 0,
                                opacity: 1,
                            }}
                            exit={{
                                translateY: -20,
                                opacity: 0,
                            }}
                            transition={{
                                duration: 1500,
                                delay: 2000 + index * 500,
                            }}
                        >
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 10 }}>
                                <View style={{ width: 10, height: 10, backgroundColor: data.color, marginRight: 5 }} />
                                <Text>{data.name}</Text>
                            </View>
                        </MotiView>
                    </AnimatePresence>
                ))}
            </View>
            <View style={{ padding: 20 }}>
                <MotiView
                    from={{
                        translateY: -20,
                        opacity: 0,
                    }}
                    animate={{
                        translateY: 0,
                        opacity: 1,
                    }}
                    exit={{
                        translateY: -20,
                        opacity: 0,
                    }}
                    transition={{
                        duration: 1500,
                        delay: 2000 + chartData.length + 500,
                    }}
                >
                    <Text style={{ fontSize: 16 }}>Total number of students applied: 679</Text>
                </MotiView>
                <MotiView
                    from={{
                        translateY: -20,
                        opacity: 0,
                    }}
                    animate={{
                        translateY: 0,
                        opacity: 1,
                    }}
                    exit={{
                        translateY: -20,
                        opacity: 0,
                    }}
                    transition={{
                        duration: 1500,
                        delay: 2500,
                    }}
                >
                    <Text style={{ fontSize: 16 }}>Total number of students got placed: 450</Text>
                </MotiView>
                <MotiView
                    from={{
                        translateY: -20,
                        opacity: 0,
                    }}
                    animate={{
                        translateY: 0,
                        opacity: 1,
                    }}
                    exit={{
                        translateY: -20,
                        opacity: 0,
                    }}
                    transition={{
                        duration: 1500,
                        delay: 3000,
                    }}
                >
                    <Text style={{ fontSize: 16 }}>Total number of students got rejected: 229</Text>
                </MotiView>
                <MotiView
                    from={{
                        translateY: -20,
                        opacity: 0,
                    }}
                    animate={{
                        translateY: 0,
                        opacity: 1,
                    }}
                    exit={{
                        translateY: -20,
                        opacity: 0,
                    }}
                    transition={{
                        duration: 1500,
                        delay: 3500,
                    }}
                >
                    <Text style={{ fontSize: 16 }}>Total number of opportunity given: 780</Text>
                </MotiView>
                <MotiView
                    from={{
                        translateY: -20,
                        opacity: 0,
                    }}
                    animate={{
                        translateY: 0,
                        opacity: 1,
                    }}
                    exit={{
                        translateY: -20,
                        opacity: 0,
                    }}
                    transition={{
                        duration: 1500,
                        delay: 4000,
                    }}
                >
                    <Text style={{ fontSize: 16 }}>Total number of companies visited: 27</Text>
                </MotiView>
            </View>
        </View>
    );
};

export default Report;

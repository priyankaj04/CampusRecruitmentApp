import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React from 'react'

const PrivatePolicy = () => {
    return (
        <ScrollView>
            <View style={{ padding: 20 }}>
                <Text style={{fontSize: 16, marginTop: 5, marginBottom: 5}}>1. Information We Collect</Text>
                <Text style={{margin: 5, fontSize: 16}}>1.1 Personal Information:</Text>
                <Text style={{ margin: 5 }}>1.1.1 For Students: When creating an account, you may be asked to provide personal information such as your name, contact details, educational background, skills, and work experience.</Text>
                <Text style={{ margin: 5 }}>1.1.2 For Employers: When registering on our system, we may collect personal information including company details, contact information, and job posting information.</Text>
                <Text style={{ margin: 5 }}>1.1.3 For Academic Institutions: We may collect personal information about institutional contacts, such as names, titles, and contact details.</Text>
                <Text style={{ margin: 5 }}>1.2 Usage and Log Data:</Text>
                <Text style={{ margin: 5 }}>We may collect information about how you use our system, including log data such as IP addresses, browser type, pages visited, and timestamps. This information is used for system administration, troubleshooting, and improving our services.</Text>
                <Text style={{ fontSize: 16, marginTop: 5, marginBottom: 5 }}>2. Use of Information</Text>
                <Text style={{ margin: 5, fontSize: 16 }}>2.1 System Operation and Enhancement:</Text>
                <Text style={{margin: 5}}>We use the collected information to operate, maintain, and improve the Campus Recruitment Management System. This includes managing user accounts, facilitating communication between students and employers, and enhancing the system's functionality and user experience.</Text>
                <Text style={{ margin: 5, fontSize: 16 }}>2.2 Communication:</Text>
                <Text style={{ margin: 5 }}>We may use your contact information to send you important system updates, notifications, newsletters, and promotional materials related to our services. You can opt out of receiving these communications at any time.</Text>
                <Text style={{ margin: 5, fontSize: 16 }}>2.3 Aggregated Data:</Text>
                <Text style={{ margin: 5 }}>We may analyze and aggregate non-personal information for statistical purposes, such as trends analysis or research. This information does not personally identify any individual user.</Text>
                <Text style={{ fontSize: 16, marginTop: 5, marginBottom: 5 }}>3. Data Sharing and Disclosure</Text>
                <Text style={{ margin: 5, fontSize: 16 }}>3.1 Service Providers:</Text>
                <Text style={{ margin: 5 }}>We may engage trusted third-party service providers to assist in operating and maintaining our system or to perform certain services on our behalf. These providers have access to personal information only as necessary to fulfill their contractual obligations and are obligated to maintain the confidentiality and security of the data.</Text>
                <Text style={{ margin: 5, fontSize: 16 }}>3.2 Legal Requirements:</Text>
                <Text style={{ margin: 5 }}>We may disclose personal information if required to do so by law or in response to valid legal requests, such as subpoenas, court orders, or government regulations.</Text>
                <Text style={{ margin: 5, fontSize: 16 }}>3.3 Consent:</Text>
                <Text style={{ margin: 5 }}>We will not share your personal information with any third parties for marketing purposes without your explicit consent.</Text>
                <Text style={{ fontSize: 16, marginTop: 5, marginBottom: 5 }}>4. Data Security</Text>
                <Text style={{ margin: 5 }}>We implement reasonable security measures to protect the confidentiality, integrity, and availability of personal information collected through our system. However, no method of transmission or storage is completely secure, and we cannot guarantee absolute data security.</Text>
                <Text style={{ fontSize: 16, marginTop: 5, marginBottom: 5 }}>5. Data Retention</Text>
                <Text style={{ margin: 5 }}>We retain personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law.</Text>
                <Text style={{ fontSize: 16, marginTop: 5, marginBottom: 5 }}>6. Your Rights and Choices</Text>
                <Text style={{ margin: 5 }}>You have the right to access, update, correct, or delete your personal information. You may also have the right to object to or restrict certain data processing activities. Please contact us using the information provided below to exercise your rights or if you have any questions or concerns about your privacy.</Text>
                <Text style={{ fontSize: 16, marginTop: 5, marginBottom: 5 }}>7. Changes to this Privacy Policy</Text>
                <Text style={{ margin: 5 }}>We reserve the right to modify or update this Privacy Policy from time to time. We will notify you of any significant changes by posting the updated policy on our website or through other appropriate communication channels. Your continued use of the system after such modifications constitute your acceptance of the updated Privacy Policy.</Text>
                <Text style={{ fontSize: 16, marginTop: 5, marginBottom: 5 }}>8. Contact Us</Text>
                <Text style={{ margin: 5 }}>If you have any questions, comments, or concerns regarding this Privacy Policy or our privacy practices, please email us at priyankaj_r20@bms.edu.in</Text>
                <Text></Text>
            </View>
        </ScrollView>
    )
}

export default PrivatePolicy

const styles = StyleSheet.create({})
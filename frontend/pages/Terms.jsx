import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React from 'react'

const Terms = () => {
    return (
        <ScrollView>
            <View style={{ padding: 20 }}>
                <Text style={{ fontSize: 18, textAlign: 'center', margin: 10 }}> Terms and Conditions for Campus Recruitment Management System </Text>
                <Text style={{ fontSize: 16, }}>1. Acceptance of Terms</Text>
                <Text style={{ fontSize: 16, }}> By accessing or using the Campus Recruitment Management System provided by TALENT CONNECT, you agree to comply with and be bound by these terms and conditions. If you do not agree with any part of these terms, you must refrain from using the system. </Text>
                <Text style={{ fontSize: 16, }}>2. User Accounts</Text>
                <Text style={{ fontSize: 16, }}>2.1 Registration: Users may be required to create an account to access certain features of the system. You must provide accurate and complete information during the registration process and keep your account credentials confidential.</Text>
                <Text style={{ fontSize: 16, }}>2.2 Account Responsibility: You are responsible for all activities that occur under your account. Any unauthorized use of your account should be reported to TALENT CONNECT immediately.</Text>
                <Text style={{ fontSize: 16, }}>3. System Usage</Text>
                <Text style={{ fontSize: 16, }}>3.1 Permitted Use: Users are granted a limited, non-exclusive, and non-transferable right to access and use the Campus Recruitment Management System for its intended purpose, in compliance with these terms and any applicable laws or regulations.</Text>
                <Text style={{ fontSize: 16, }}>3.2 Prohibited Activities: Users must not engage in any activities that may disrupt or interfere with the functioning of the system or compromise its security. This includes, but is not limited to, unauthorized access, data scraping, spamming, or any actions that violate intellectual property rights.</Text>
                <Text style={{ fontSize: 16, }}>4. Privacy and Data Protection</Text>
                <Text style={{ fontSize: 16, }}>4.1 Data Collection: TALENT CONNECT collects and processes personal information in accordance with its Privacy Policy. By using the system, you consent to the collection, use, and storage of your data as outlined in the Privacy Policy.</Text>
                <Text style={{ fontSize: 16, }}>4.2 Data Confidentiality: TALENT CONNECT will take reasonable measures to protect the confidentiality and security of user data. However, users are responsible for ensuring the accuracy and legality of the information they provide through the system.</Text>
                <Text style={{ fontSize: 16, }}>5. Intellectual Property Rights</Text>
                <Text style={{ fontSize: 16, }}>5.1 Ownership: TALENT CONNECT retains all rights, title, and interest in and to the Campus Recruitment Management System, including all intellectual property rights.</Text>
                <Text style={{ fontSize: 16, }}>5.2 User Content: By submitting content (such as job postings, resumes, or messages) to the system, you grant TALENT CONNECT a non-exclusive, royalty-free, worldwide license to use, reproduce, modify, and display such content for the purpose of operating and improving the system.</Text>
                <Text style={{ fontSize: 16, }}>6. Limitation of Liability</Text>
                <Text style={{ fontSize: 16, }}>To the fullest extent permitted by law, TALENT CONNECT shall not be liable for any direct, indirect, incidental, consequential, or exemplary damages arising from the use or inability to use the Campus Recruitment Management System.</Text>
                <Text style={{ fontSize: 16, }}>7. Modification and Termination</Text>
                <Text style={{ fontSize: 16, }}>TALENT CONNECT reserves the right to modify, suspend, or terminate the system, or these terms and conditions, at any time without prior notice. Users are advised to review the terms periodically for any updates or changes.</Text>
                <Text style={{ fontSize: 16, }}>8. Governing Law and Jurisdiction</Text>
                <Text style={{ fontSize: 16, }}>These terms and conditions shall be governed by and construed in accordance with the laws of Indian Government. Any disputes arising from the use of the system shall be subject to the exclusive jurisdiction of the courts of Indian Government.</Text>
            </View>
        </ScrollView>
    )
}

export default Terms

const styles = StyleSheet.create({})
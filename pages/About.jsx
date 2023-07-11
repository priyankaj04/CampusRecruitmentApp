import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { MotiView, AnimatePresence } from 'moti';

const About = () => {
  const paragraphs = [
    {
      text: 'Welcome to TALENT CONNECT, the leading provider of Campus Recruitment Management Systems. We are dedicated to revolutionizing the way universities and organizations streamline their recruitment processes and connect with talented students and graduates.',
    },
    {
      text: 'At TALENT CONNECT, we understand the challenges faced by both academic institutions and employers in managing campus recruitment. Our innovative and intuitive platform offers a comprehensive suite of tools and features designed to simplify and optimize every aspect of the recruitment process.',
    },
    {
      text: 'With our Campus Recruitment Management System, universities can effortlessly manage job postings, schedule interviews, and collaborate with employers to ensure seamless communication. Our platform empowers students by providing them with a centralized hub to explore job opportunities, submit applications, and showcase their skills and achievements to potential employers.',
    },
    {
      text: 'Our team at TALENT CONNECT is comprised of industry experts and technology enthusiasts who are passionate about bridging the gap between academia and industry. We are committed to delivering a user-friendly, scalable, and secure system that meets the unique needs of our clients.',
    },
  ];

  const keyFeatures = [
    'Job Posting and Application Management: Easily create and manage job postings, and efficiently review and process applications.',
    'Interview Scheduling and Management: Seamlessly schedule and coordinate interviews, ensuring a smooth and efficient recruitment process.',
    'Candidate Profile and Resume Management: Students can create comprehensive profiles, upload resumes, and showcase their skills and experiences.',
    'Employer Collaboration: Foster strong partnerships between universities and employers, enabling effective communication and collaboration throughout the recruitment cycle.',
    'Analytics and Reporting: Gain valuable insights into recruitment trends, track key metrics, and generate reports to optimize recruitment strategies.',
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Who are we?</Text>
      <AnimatePresence>
        {paragraphs.map((paragraph, index) => (
          <MotiView
            key={index}
            from={{ opacity: 0, translateY: 100 }}
            animate={{ opacity: 1, translateY: 0 }}
            exit={{ opacity: 0, translateY: -100 }}
            transition={{ type: 'timing', duration: 1000 }}
          >
            <Text style={styles.paragraph}>
              {paragraph.text}
            </Text>
          </MotiView>
        ))}
      </AnimatePresence>
      <Text style={styles.subtitle}>Key features of our Campus Recruitment Management System include:</Text>
      <AnimatePresence>
        {keyFeatures.map((feature, index) => (
          <MotiView
            key={index}
            from={{ opacity: 0, translateX: -100 }}
            animate={{ opacity: 1, translateX: 0 }}
            exit={{ opacity: 0, translateX: 100 }}
            transition={{ type: 'timing', duration: 1000 }}
          >
            <Text style={styles.feature}>
              {`${index + 1}. ${feature}`}
            </Text>
          </MotiView>
        ))}
      </AnimatePresence>
      <Text style={styles.paragraph}>
        We take pride in our commitment to customer satisfaction, providing ongoing support and regular updates to ensure our clients' success. Our dedication to security and data privacy means that your information is always safe and protected.
      </Text>
      <Text style={styles.paragraph}>
        Discover how TALENT CONNECT can transform your campus recruitment processes and help you unlock the potential of talented individuals. Get in touch with our team today to schedule a demo or learn more about our innovative solutions.
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  title: {
    color: '#407BFF',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  paragraph: {
    fontSize: 18,
    paddingVertical: 15,
  },
  subtitle: {
    fontSize: 18,
    paddingVertical: 15,
    fontWeight: 'bold',
  },
  feature: {
    fontSize: 18,
    paddingVertical: 10,
    paddingLeft: 26,
  },
});

export default About;
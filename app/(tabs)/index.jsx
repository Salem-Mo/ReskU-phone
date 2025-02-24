import React from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, Linking, StyleSheet } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container}>
      {/* Hero Section */}
      <View style={styles.hero}>

        <TouchableOpacity style={styles.ctaButton}>
          <Text style={styles.ctaText}>Emergency</Text>
        </TouchableOpacity>
      </View>

      {/* Features Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Key Features</Text>
        <View style={styles.featuresGrid}>
          {[
            { icon: 'map-marker-radius', title: 'Real-Time Emergency Map', text: 'Live incident tracking with Mapbox integration' },
            { icon: 'alert-octagon', title: 'Instant Help Requests', text: 'Alert nearby users within 5km radius' },
            { icon: 'chat-processing', title: 'Emergency Chat System', text: 'Direct messaging & group coordination' },
            { icon: 'clock-fast', title: '4-Minute Response Target', text: 'Verified 80% volunteer engagement rate' },
          ].map((feature, index) => (
            <View key={index} style={styles.featureCard}>
              <MaterialCommunityIcons name={feature.icon} size={32} color="#e74c3c" />
              <Text style={styles.featureTitle}>{feature.title}</Text>
              <Text style={styles.featureText}>{feature.text}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Impact Stats */}
      <View style={styles.statsSection}>
        <Text style={styles.statHeading}>Proven Impact</Text>
        <View style={styles.statsGrid}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>30%</Text>
            <Text style={styles.statLabel}>Reduction in Fatalities</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>4min</Text>
            <Text style={styles.statLabel}>Average Response Time</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>5km</Text>
            <Text style={styles.statLabel}>Instant Help Radius</Text>
          </View>
        </View>
      </View>

      {/* How It Works */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Three Steps to Save Lives</Text>
        <View style={styles.stepsContainer}>
          {[
            '1. Request Help',
          '2. Connect Instantly',
          '3. Get Assistance'
        ].map((step, index) => (
            <View key={index} style={styles.stepCard}>
              <Text style={styles.stepNumber}>0{index + 1}</Text>
              <Text style={styles.stepText}>{step}</Text>
              <Ionicons name="arrow-forward" size={24} color="#2c3e50" />
            </View>
          ))}
        </View>
      </View>

      {/* Credits & Team */}
      <View style={styles.creditsSection}>
        <Text style={styles.sectionTitle}>Our Mission</Text>
        <Text style={styles.missionText}>
          Developed with React Native, Node.js, and MongoDB, we're bridging the gap between 
          emergency needs and immediate response through community power.
        </Text>
        <TouchableOpacity
          style={styles.learnMoreButton}
          onPress={() => Linking.openURL('https://your-documentation-link')}
        >
          <Text style={styles.learnMoreText}>Learn About Our Technology</Text>
        </TouchableOpacity>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>Join 50,000+ lifesavers today</Text>
        <TouchableOpacity style={styles.footerCta}>
          <Text style={styles.footerCtaText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  hero: {
    padding: 30,
    alignItems: 'center',
    backgroundColor: '#2c3e50',
    paddingBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#ecf0f1',
    textAlign: 'center',
    marginBottom: 20,
  },
  heroImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  ctaButton: {
    backgroundColor: '#e74c3c',
    padding: 15,
    borderRadius: "50%",
    height:"200",
    width: '200',
    alignItems: 'center',
  },
  ctaText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 24,
    marginTop: 55,
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 20,
    textAlign: 'center',
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  featureCard: {
    width: '48%',
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
    marginTop: 10,
    textAlign: 'center',
  },
  featureText: {
    fontSize: 14,
    color: '#7f8c8d',
    textAlign: 'center',
    marginTop: 5,
  },
  statsSection: {
    backgroundColor: '#2c3e50',
    padding: 20,
  },
  statHeading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 20,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#e74c3c',
  },
  statLabel: {
    fontSize: 14,
    color: '#ecf0f1',
    textAlign: 'center',
    marginTop: 5,
  },
  stepsContainer: {
    marginTop: 10,
  },
  stepCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  stepNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#e74c3c',
    marginRight: 15,
  },
  stepText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
    flex: 1,
  },
  creditsSection: {
    padding: 20,
    backgroundColor: '#ecf0f1',
  },
  missionText: {
    fontSize: 16,
    color: '#2c3e50',
    textAlign: 'center',
    marginBottom: 20,
  },
  learnMoreButton: {
    backgroundColor: '#2c3e50',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
  },
  learnMoreText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  footer: {
    padding: 20,
    backgroundColor: '#2c3e50',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 18,
    color: 'white',
    marginBottom: 10,
  },
  footerCta: {
    backgroundColor: '#e74c3c',
    padding: 15,
    borderRadius: 25,
    width: '80%',
    alignItems: 'center',
  },
  footerCtaText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
});
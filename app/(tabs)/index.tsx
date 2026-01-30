import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');

export default function HomeScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      {/* Main Content */}
      <ScrollView
        contentContainerStyle={[styles.contentContainer, { paddingTop: insets.top + 10, paddingBottom: 100 }]}
        showsVerticalScrollIndicator={false}
      >

        {/* Header Section */}
        <View style={styles.headerContainer}>
          <View style={styles.headerTexts}>
            <Text style={styles.welcomeText}>Welcome back</Text>
            <Text style={styles.appTitle}>Car Portal</Text>
          </View>
          <View style={styles.headerIcons}>
            <View style={styles.notificationBadge}>
              <Image source={require('../../assets/images/notification_icon.png')} style={{ width: 24, height: 24 }} resizeMode="contain" />
              <View style={styles.badge}><Text style={styles.badgeText}>3</Text></View>
            </View>
            <Image
              source={{ uri: 'https://i.pravatar.cc/150' }}
              style={styles.profileImage}
            />
          </View>
        </View>

        {/* Hero Section */}
        <View style={styles.heroSection}>
          <Image
            source={require('../../assets/images/hero-car 1.png')}
            style={styles.heroImage}
            resizeMode="cover"
          />
          <View style={styles.heroOverlay}>
            <Text style={styles.gerayoText}>Gerayo</Text>
            <Text style={styles.heroSubtitle}>Your Car Management System</Text>
          </View>
        </View>

        {/* Upcoming Inspections */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Upcoming Inspections</Text>

          <TouchableOpacity style={[styles.card, styles.cardBlueBorder]}>
            <View style={styles.cardIconContainerBlue}>
              <Ionicons name="time-outline" size={24} color="#2D5EFF" />
            </View>
            <View style={styles.cardContent}>
              <View style={styles.cardHeaderRow}>
                <Text style={styles.plateNumber}>RAB 123A</Text>
                <View style={styles.daysLeftContainer}>
                  <Text style={styles.daysLeftBlue}>30</Text>
                  <Text style={styles.daysLeftLabel}>days left</Text>
                </View>
              </View>
              <Text style={styles.carModel}>Toyota Corolla</Text>
              <Text style={styles.nextInspection}>Next inspection: January 2026</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.card, styles.cardRedBorder]}>
            <View style={styles.cardIconContainerRed}>
              <Ionicons name="alert-circle-outline" size={24} color="#D32F2F" />
            </View>
            <View style={styles.cardContent}>
              <View style={styles.cardHeaderRow}>
                <Text style={styles.plateNumber}>RAC 456B</Text>
                <View style={styles.daysLeftContainer}>
                  <Text style={styles.daysLeftRed}>5</Text>
                  <Text style={styles.daysLeftLabel}>days left</Text>
                </View>
              </View>
              <Text style={styles.carModel}>Honda Civic</Text>
              <Text style={styles.nextInspection}>Next inspection: January 2026</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Police Announcements */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Police Announcements</Text>

          <TouchableOpacity style={[styles.card, styles.cardDarkBorder]}>
            <View style={styles.cardIconContainerPurple}>
              <Ionicons name="notifications" size={24} color="#A020F0" />
            </View>
            <View style={styles.cardContent}>
              <View style={styles.cardHeaderRow}>
                <Text style={styles.announcementTitle}>New Traffic Suggestion</Text>
                <Text style={styles.announcementDate}>Jan 14</Text>
              </View>
              <Text style={styles.announcementText} numberOfLines={2}>
                Starting February 1st, new speed limits will be enforced on all major highways.
              </Text>
            </View>
          </TouchableOpacity>

          {/* Small gap for second item if needed, but keeping it simple for the "scroll-free" feel */}
        </View>

      </ScrollView>

      {/* Custom Bottom Footer - Floating */}
      <View style={[styles.footer, { paddingBottom: insets.bottom > 0 ? insets.bottom : 20 }]}>
        <TouchableOpacity style={styles.footerItem}>
          <View style={styles.activeFooterIcon}>
            <Image source={require('../../assets/images/material-symbols_home-outline-rounded.png')} style={{ width: 24, height: 24, tintColor: '#FFF' }} resizeMode="contain" />
          </View>
          <Text style={styles.activeFooterText}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.footerItem} onPress={() => router.push('/your-cars')}>
          <Image source={require('../../assets/images/car_icon.png')} style={{ width: 24, height: 24, tintColor: '#666' }} resizeMode="contain" />
          <Text style={styles.footerText}>Your Car</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.footerItem}>
          <Image source={require('../../assets/images/mdi_calendar-outline.png')} style={{ width: 24, height: 24, tintColor: '#666' }} resizeMode="contain" />
          <Text style={styles.footerText}>Appointment</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.footerItem}>
          <Image source={require('../../assets/images/material-symbols_settings-outline-rounded.png')} style={{ width: 24, height: 24, tintColor: '#666' }} resizeMode="contain" />
          <Text style={styles.footerText}>Management</Text>
        </TouchableOpacity>
      </View>
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#050511', // Very dark background
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'flex-start',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
    marginTop: 10,
  },
  headerTexts: {
    alignItems: 'flex-start',
  },
  welcomeText: {
    fontFamily: 'Cairo',
    fontSize: 24,
    color: '#FFF',
    marginBottom: 4,
    // textShadowColor: '#000',
    // textShadowOffset: { width: -1, height: 1 },
    // textShadowRadius: 1,
    // Note: React Native text shadow is different from CSS "stroke". using basics for now.
  },
  appTitle: {
    fontFamily: 'Cairo', // Assuming Cairo is loaded, otherwise standard font
    fontSize: 36,
    color: '#FFF',
    fontWeight: 'bold',
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
    marginTop: 10
  },
  notificationBadge: {
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: 'red',
    borderRadius: 10,
    width: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1
  },
  badgeText: {
    fontFamily: 'Cairo',
    color: '#FFF',
    fontSize: 10,
    fontWeight: 'bold'
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#2D5EFF'
  },
  heroSection: {
    alignItems: 'center',
    marginBottom: 25,
    position: 'relative',
    height: 200, // Approximating the 202px height
    width: '100%',
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#000', // Fallback
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  heroOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingBottom: 15,
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)', // Slight tint near bottom for text readability
  },
  gerayoText: {
    fontFamily: 'Cairo',
    fontSize: 24,
    color: '#FFF',
    marginBottom: 2,
    marginTop: 10,
  },
  heroSubtitle: {
    fontFamily: 'Cairo',
    fontSize: 16,
    color: 'rgba(255,255,255,0.8)',
  },
  sectionContainer: {
    marginBottom: 20,
    width: '100%',
  },
  sectionTitle: {
    fontFamily: 'Cairo',
    fontSize: 20,
    color: '#FFF',
    marginBottom: 10,
    textAlign: 'center',
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#131722',
    borderRadius: 10,
    padding: 15,
    marginBottom: 12,
    alignItems: 'center',
    borderWidth: 1,
  },
  cardBlueBorder: {
    borderColor: '#2D5EFF',
  },
  cardRedBorder: {
    borderColor: '#4E2328', // Dark red as requested
  },
  cardDarkBorder: {
    borderColor: '#262B3B',
  },
  cardIconContainerBlue: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: 'rgba(45, 94, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  cardIconContainerRed: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: 'rgba(211, 47, 47, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  cardIconContainerPurple: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: 'rgba(160, 32, 240, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  cardContent: {
    flex: 1,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  plateNumber: {
    fontFamily: 'Cairo',
    color: '#FFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  daysLeftContainer: {
    alignItems: 'flex-end'
  },
  daysLeftBlue: {
    fontFamily: 'Cairo',
    color: '#2D5EFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  daysLeftRed: {
    fontFamily: 'Cairo',
    color: '#D32F2F',
    fontSize: 16,
    fontWeight: 'bold',
  },
  daysLeftLabel: {
    fontFamily: 'Cairo',
    color: '#999',
    fontSize: 10
  },
  carModel: {
    fontFamily: 'Cairo',
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },
  nextInspection: {
    fontFamily: 'Cairo',
    color: '#888',
    fontSize: 12,
  },
  announcementTitle: {
    fontFamily: 'Cairo',
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold'
  },
  announcementDate: {
    fontFamily: 'Cairo',
    color: '#888',
    fontSize: 12
  },
  announcementText: {
    fontFamily: 'Cairo',
    color: '#AAA',
    fontSize: 12,
    lineHeight: 16
  },
  footer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    height: 70, // Fixed height from spec
    backgroundColor: '#161B2B',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#262B3B',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 10,
    // Shadow for elevation
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,
    elevation: 8,
  },
  footerItem: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  activeFooterIcon: {
    backgroundColor: '#2D5EFF',
    width: 36,
    height: 36,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 2
  },
  activeFooterText: {
    fontFamily: 'Cairo',
    color: '#FFF',
    fontSize: 10,
    fontWeight: 'bold'
  },
  footerText: {
    fontFamily: 'Cairo',
    color: '#666',
    fontSize: 10,
    marginTop: 4
  }
});

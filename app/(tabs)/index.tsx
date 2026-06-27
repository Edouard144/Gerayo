import { FloatingFooter } from '@/components/FloatingFooter';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      <ScrollView
        contentContainerStyle={[styles.contentContainer, { paddingTop: insets.top + 12, paddingBottom: 120 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Header Row */}
        <View style={styles.headerRow}>
          <View style={styles.headerTexts}>
            <Text style={styles.welcomeText}>Welcome back</Text>
            <Text style={styles.appTitle}>Car Portal</Text>
          </View>
          <View style={styles.headerIcons}>
            <TouchableOpacity style={styles.notifButton}>
              <Ionicons name="notifications-outline" size={22} color="#FFF" />
              <View style={styles.badge}>
                <Text style={styles.badgeText}>3</Text>
              </View>
            </TouchableOpacity>
            <View style={styles.avatarCircle}>
              <Ionicons name="person" size={20} color="#FFF" />
            </View>
          </View>
        </View>

        {/* Hero Banner */}
        <View style={styles.heroSection}>
          <Image
            source={require('../../assets/images/hero-car 1.png')}
            style={styles.heroImage}
            resizeMode="cover"
          />
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.7)']}
            style={styles.heroOverlay}
          >
            <Text style={styles.gerayoText}>Gerayo</Text>
            <Text style={styles.heroSubtitle}>Your Car Management System</Text>
          </LinearGradient>
        </View>

        {/* Upcoming Inspections */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Upcoming Inspections</Text>

          <View style={[styles.card, { borderColor: '#2D5EFF' }]}>
            <View style={styles.cardRow}>
              <LinearGradient
                colors={['#3B6CF2', '#5D5FEF', '#7B4DFF']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.cardIcon}
              >
                <Ionicons name="document-text" size={18} color="#FFF" />
              </LinearGradient>
              <View style={styles.cardInfo}>
                <Text style={styles.plateNumber}>RAB 123A</Text>
                <Text style={styles.carModel}>Toyota Corolla</Text>
              </View>
              <View style={styles.daysContainer}>
                <Text style={[styles.daysNumber, { color: '#2D5EFF' }]}>25</Text>
                <Text style={styles.daysLabel}>days left</Text>
              </View>
            </View>
            <View style={styles.cardDivider} />
            <Text style={styles.cardFooter}>Next inspection : January 2026</Text>
          </View>

          <View style={[styles.card, { borderColor: '#D32F2F' }]}>
            <View style={styles.cardRow}>
              <LinearGradient
                colors={['#3B6CF2', '#5D5FEF', '#7B4DFF']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.cardIcon}
              >
                <Ionicons name="warning" size={18} color="#FFF" />
              </LinearGradient>
              <View style={styles.cardInfo}>
                <Text style={styles.plateNumber}>RAE 789C</Text>
                <Text style={styles.carModel}>Volkswagen Golf</Text>
              </View>
              <View style={styles.daysContainer}>
                <Text style={[styles.daysNumber, { color: '#D32F2F' }]}>02</Text>
                <Text style={styles.daysLabel}>days left</Text>
              </View>
            </View>
            <View style={styles.cardDivider} />
            <Text style={styles.cardFooter}>Next inspection : Feb 2026</Text>
          </View>
        </View>

        {/* Police Announcements */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Police Announcements</Text>

          <TouchableOpacity style={styles.announcementCard} activeOpacity={0.7}>
            <View style={[styles.announcementSidebar, { backgroundColor: '#2D5EFF' }]} />
            <View style={styles.announcementBody}>
              <View style={[styles.announcementIcon, { backgroundColor: 'rgba(45, 94, 255, 0.12)' }]}>
                <Ionicons name="megaphone" size={20} color="#2D5EFF" />
              </View>
              <View style={styles.announcementContent}>
                <View style={styles.announcementTop}>
                  <Text style={styles.announcementTitle}>New Traffic Suggestion</Text>
                  <Text style={styles.announcementDate}>2h ago</Text>
                </View>
                <Text style={styles.announcementText} numberOfLines={2}>
                  All vehicles must complete their annual inspection by the end of the month. Book your appointment now.
                </Text>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.announcementCard} activeOpacity={0.7}>
            <View style={[styles.announcementSidebar, { backgroundColor: '#FFB800' }]} />
            <View style={styles.announcementBody}>
              <View style={[styles.announcementIcon, { backgroundColor: 'rgba(255, 184, 0, 0.12)' }]}>
                <Ionicons name="time" size={20} color="#FFB800" />
              </View>
              <View style={styles.announcementContent}>
                <View style={styles.announcementTop}>
                  <Text style={styles.announcementTitle}>Vehicle Inspection Reminder</Text>
                  <Text style={styles.announcementDate}>1d ago</Text>
                </View>
                <Text style={styles.announcementText} numberOfLines={2}>
                  Your vehicle RAB 123A is due for inspection in 25 days. Please schedule an appointment.
                </Text>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.announcementCard} activeOpacity={0.7}>
            <View style={[styles.announcementSidebar, { backgroundColor: '#D32F2F' }]} />
            <View style={styles.announcementBody}>
              <View style={[styles.announcementIcon, { backgroundColor: 'rgba(211, 47, 47, 0.12)' }]}>
                <Ionicons name="alert-circle" size={20} color="#D32F2F" />
              </View>
              <View style={styles.announcementContent}>
                <View style={styles.announcementTop}>
                  <Text style={styles.announcementTitle}>Accident Detected</Text>
                  <Text style={styles.announcementDate}>2d ago</Text>
                </View>
                <Text style={styles.announcementText} numberOfLines={2}>
                  An accident has been reported on your usual route. Expect delays of up to 20 minutes.
                </Text>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.announcementCard} activeOpacity={0.7}>
            <View style={[styles.announcementSidebar, { backgroundColor: '#666' }]} />
            <View style={styles.announcementBody}>
              <View style={[styles.announcementIcon, { backgroundColor: 'rgba(102, 102, 102, 0.12)' }]}>
                <Ionicons name="shield-checkmark" size={20} color="#999" />
              </View>
              <View style={styles.announcementContent}>
                <View style={styles.announcementTop}>
                  <Text style={styles.announcementTitle}>Road Safety Week</Text>
                  <Text style={styles.announcementDate}>Jan 14</Text>
                </View>
                <Text style={styles.announcementText} numberOfLines={2}>
                  Join us in promoting road safety. Check your vehicle lights, brakes, and tires regularly.
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <FloatingFooter activeTab="home" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#050511',
  },
  contentContainer: {
    paddingHorizontal: 20,
  },

  // Header
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTexts: {
    flex: 1,
  },
  welcomeText: {
    fontFamily: 'CairoMedium',
    fontSize: 15,
    color: 'rgba(255,255,255,0.55)',
    marginBottom: 2,
  },
  appTitle: {
    fontFamily: 'CairoBold',
    fontSize: 28,
    color: '#FFF',
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  notifButton: {
    position: 'relative',
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.08)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  badge: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: '#EF4444',
    borderRadius: 7,
    minWidth: 14,
    height: 14,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 3,
  },
  badgeText: {
    fontFamily: 'CairoBold',
    color: '#FFF',
    fontSize: 9,
    lineHeight: 14,
  },
  avatarCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(99, 102, 241, 0.25)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Hero
  heroSection: {
    height: 180,
    borderRadius: 18,
    overflow: 'hidden',
    marginBottom: 24,
    backgroundColor: '#131722',
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
    height: '60%',
    justifyContent: 'flex-end',
    paddingHorizontal: 18,
    paddingBottom: 16,
  },
  gerayoText: {
    fontFamily: 'CairoBold',
    fontSize: 22,
    color: '#FFF',
    marginBottom: 2,
  },
  heroSubtitle: {
    fontFamily: 'CairoMedium',
    fontSize: 13,
    color: 'rgba(255,255,255,0.75)',
  },

  // Sections
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontFamily: 'CairoBold',
    fontSize: 17,
    color: '#FFF',
    marginBottom: 14,
  },

  // Inspection Cards
  card: {
    backgroundColor: '#131722',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  cardInfo: {
    flex: 1,
  },
  plateNumber: {
    fontFamily: 'CairoBold',
    color: '#FFF',
    fontSize: 15,
    marginBottom: 2,
  },
  carModel: {
    fontFamily: 'CairoMedium',
    color: 'rgba(255,255,255,0.6)',
    fontSize: 13,
  },
  daysContainer: {
    alignItems: 'center',
    width: 50,
  },
  daysNumber: {
    fontFamily: 'CairoBold',
    fontSize: 22,
    lineHeight: 26,
  },
  daysLabel: {
    fontFamily: 'CairoMedium',
    color: 'rgba(255,255,255,0.45)',
    fontSize: 10,
  },
  cardDivider: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.06)',
    marginVertical: 12,
  },
  cardFooter: {
    fontFamily: 'CairoMedium',
    color: 'rgba(255,255,255,0.5)',
    fontSize: 13,
  },

  // Announcements
  announcementCard: {
    backgroundColor: '#131722',
    borderRadius: 14,
    flexDirection: 'row',
    overflow: 'hidden',
    marginBottom: 10,
  },
  announcementSidebar: {
    width: 4,
  },
  announcementBody: {
    flex: 1,
    flexDirection: 'row',
    padding: 14,
    alignItems: 'flex-start',
  },
  announcementIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  announcementContent: {
    flex: 1,
  },
  announcementTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  announcementTitle: {
    fontFamily: 'CairoBold',
    color: '#FFF',
    fontSize: 14,
    flex: 1,
  },
  announcementDate: {
    fontFamily: 'CairoMedium',
    color: 'rgba(255,255,255,0.35)',
    fontSize: 11,
    marginLeft: 8,
  },
  announcementText: {
    fontFamily: 'CairoMedium',
    color: 'rgba(255,255,255,0.5)',
    fontSize: 12,
    lineHeight: 18,
  },
});

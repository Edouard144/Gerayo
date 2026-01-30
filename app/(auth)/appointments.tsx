import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function AppointmentsScreen() {
  const insets = useSafeAreaInsets();
  const [cars] = useState([
    { id: '1', plateNumber: 'RAB 121A', model: 'Toyota Corolla', year: '2020', color: 'Silver', nextInspection: 'Feb 15, 2026' },
    { id: '2', plateNumber: 'RAC 456B', model: 'Honda Civic', year: '2019', color: 'Black', nextInspection: 'Jan 25, 2026' },
  ]);

  const openScheduler = (car: any) => {
    router.push({
      pathname: '/schedule-appointment',
      params: {
        plateNumber: car.plateNumber,
        model: car.model,
        year: car.year,
        color: car.color,
      },
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <ScrollView contentContainerStyle={[styles.content, { paddingTop: insets.top + 20, paddingBottom: 100 }]} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Schedule Appointment</Text>
        <Text style={styles.subtitle}>Select a car to view appointments</Text>

        <Text style={styles.sectionLabel}>Choose a car to manage appointments:</Text>

        <View style={styles.list}>
          {cars.map((car) => (
            <TouchableOpacity key={car.id} style={styles.card} onPress={() => openScheduler(car)}>
              <View style={styles.iconWrap}>
                <Ionicons name="car-outline" size={24} color="#5B7FFF" />
              </View>
              <View style={styles.cardBody}>
                <View style={styles.cardHeader}>
                  <Text style={styles.plate}>{car.plateNumber}</Text>
                  <Ionicons name="ellipsis-horizontal" size={18} color="#888" />
                </View>
                <Text style={styles.meta}>{car.model} • {car.year}</Text>
                <Text style={styles.meta}>Color: {car.color}</Text>
                <View style={styles.row}>
                  <Text style={styles.label}>Next Inspection</Text>
                  <View style={styles.rightRow}>
                    <Ionicons name="chevron-forward" size={16} color="#999" style={{ marginRight: 6 }} />
                    <Text style={styles.date}>{car.nextInspection}</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <View style={[styles.footer, { paddingBottom: insets.bottom > 0 ? insets.bottom : 20 }]}>
        <TouchableOpacity style={styles.footerItem} onPress={() => router.push('/')}>
          <Image source={require('../../assets/images/material-symbols_home-outline-rounded.png')} style={{ width: 24, height: 24, tintColor: '#666' }} />
          <Text style={styles.footerText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerItem} onPress={() => router.push('/your-cars')}>
          <Image source={require('../../assets/images/car_icon.png')} style={{ width: 24, height: 24, tintColor: '#666' }} />
          <Text style={styles.footerText}>Your Car</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerItem}>
          <View style={styles.activeIcon}>
            <Image source={require('../../assets/images/mdi_calendar-outline.png')} style={{ width: 24, height: 24, tintColor: '#FFF' }} />
          </View>
          <Text style={styles.activeText}>Appointment</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerItem}>
          <Image source={require('../../assets/images/material-symbols_settings-outline-rounded.png')} style={{ width: 24, height: 24, tintColor: '#666' }} />
          <Text style={styles.footerText}>Management</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#050511' },
  content: { paddingHorizontal: 20 },
  title: { fontFamily: 'Cairo', fontSize: 28, fontWeight: 'bold', color: '#FFF', marginBottom: 6 },
  subtitle: { fontFamily: 'Cairo', fontSize: 13, color: '#999', marginBottom: 16 },
  sectionLabel: { fontFamily: 'Cairo', fontSize: 13, color: '#9aa', marginBottom: 10 },
  list: { gap: 12 },
  card: { flexDirection: 'row', backgroundColor: '#1A1F2E', borderRadius: 16, padding: 12, borderWidth: 1, borderColor: '#262B3B' },
  iconWrap: { width: 44, height: 44, borderRadius: 12, backgroundColor: 'rgba(91,127,255,0.15)', justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  cardBody: { flex: 1 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  plate: { fontFamily: 'Cairo', fontSize: 16, fontWeight: 'bold', color: '#FFF' },
  meta: { fontFamily: 'Cairo', fontSize: 12, color: '#AAA' },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 },
  label: { fontFamily: 'Cairo', fontSize: 12, color: '#999' },
  rightRow: { flexDirection: 'row', alignItems: 'center' },
  date: { fontFamily: 'Cairo', fontSize: 12, fontWeight: '600', color: '#5B7FFF' },
  footer: { position: 'absolute', bottom: 20, left: 20, right: 20, height: 70, backgroundColor: '#161B2B', borderRadius: 10, borderWidth: 1, borderColor: '#262B3B', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', paddingHorizontal: 10, elevation: 8 },
  footerItem: { alignItems: 'center', justifyContent: 'center' },
  activeIcon: { backgroundColor: '#2D5EFF', width: 36, height: 36, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginBottom: 2 },
  activeText: { fontFamily: 'Cairo', color: '#FFF', fontSize: 10, fontWeight: 'bold' },
  footerText: { fontFamily: 'Cairo', color: '#666', fontSize: 10, marginTop: 4 },
});
import { FloatingFooter } from '@/components/FloatingFooter';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

export default function ManagementScreen() {
  const insets = useSafeAreaInsets();
  const [selectedCarId, setSelectedCarId] = useState<string | null>(null);

  // Mock car data - keeping it consistent with other pages
  const cars = [
    {
      id: '1',
      plateNumber: 'RAB 121A',
      brand: 'Toyota',
      model: 'Corolla',
      year: '2020',
      color: 'Silver',
      nextInspection: 'Feb 15, 2026',
    },
    {
      id: '2',
      plateNumber: 'RAC 456B',
      brand: 'Honda',
      model: 'Civic',
      year: '2019',
      color: 'Black',
      nextInspection: 'Jan 25, 2026',
    },
  ];

  // Mock fines data
  const trafficFines = [
    {
      id: 'f1',
      type: 'Speeding - 80km/h in 60km/h zone',
      location: 'KG 11 Ave',
      date: 'Jan 10, 2026',
      amount: '50,000 RWF',
      isPaid: false,
    },
    {
      id: 'f2',
      type: 'Parking violation',
      location: 'City Center',
      date: 'Dec 15, 2025',
      amount: '20,000 RWF',
      isPaid: true,
    },
  ];

  const selectedCar = cars.find(c => c.id === selectedCarId);
  const totalUnpaidAmount = trafficFines
    .filter(f => !f.isPaid)
    .reduce((sum, f) => sum + parseInt(f.amount.replace(/[^0-9]/g, '')), 0)
    .toLocaleString() + ' RWF';
  const unpaidCount = trafficFines.filter(f => !f.isPaid).length;

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      <ScrollView
        contentContainerStyle={[
          styles.contentContainer,
          { paddingBottom: 120 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        {!selectedCar ? (
          <View style={[styles.header, { marginTop: 50 }]}>
            <Text style={styles.pageTitle}>Car Management</Text>
            <Text style={styles.pageSubtitle}>View fines and car details</Text>
          </View>
        ) : (
          <View style={[styles.headerAlt, { marginTop: 50 }]}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => setSelectedCarId(null)}
            >
              <Ionicons name="chevron-back" size={24} color="#FFF" />
            </TouchableOpacity>

            <View style={styles.titleWrapper}>
              <Text style={styles.appointmentsTitle}>Car Management</Text>
              <Text style={styles.appointmentsSubtitle}>{selectedCar.plateNumber}</Text>
            </View>
          </View>
        )}

        {!selectedCar ? (
          <>
            <Text style={styles.sectionInstruction}>Choose a car to view details:</Text>

            <View style={styles.carsContainer}>
              {cars.map((car) => (
                <TouchableOpacity
                  key={car.id}
                  style={styles.carCard}
                  onPress={() => setSelectedCarId(car.id)}
                >
                  <View style={styles.carCardLeft}>
                    <LinearGradient
                      colors={['#3B6CF2', '#5D5FEF', '#7B4DFF']}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                      style={styles.carIconContainer}
                    >
                      <Image
                        source={require('../../assets/images/car_icon_on_your_cars_page.png')}
                        style={styles.carIconImage}
                        resizeMode="contain"
                      />
                    </LinearGradient>
                    <View style={styles.bottomSpace} />
                  </View>
                  <View style={styles.carDetails}>
                    <View style={styles.carHeaderRow}>
                      <View>
                        <Text style={styles.plateNumber}>{car.plateNumber}</Text>
                        <Text style={styles.carInfo}>
                          {car.brand} {car.model} • {car.year}
                        </Text>
                        <Text style={styles.carColor}>Color: {car.color}</Text>
                      </View>
                      <Ionicons name="chevron-forward" size={20} color="rgba(255, 255, 255, 0.6)" style={styles.chevron} />
                    </View>

                    <View style={styles.dividerContainer}>
                      <View style={styles.cardDivider} />
                      <View style={styles.inspectionRow}>
                        <Text style={styles.inspectionLabel}>Next Inspection</Text>
                        <Text style={styles.inspectionDate}>{car.nextInspection}</Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </>
        ) : (
          <View style={styles.detailContent}>
            {/* Vehicle Information Card */}
            <View style={styles.detailCard}>
              <Text style={styles.detailCardTitle}>Vehicle Information</Text>
              <View style={styles.infoGrid}>
                <View style={styles.infoItem}>
                  <Text style={styles.infoLabel}>Brand</Text>
                  <Text style={styles.infoValue}>{selectedCar.brand}</Text>
                </View>
                <View style={styles.infoItem}>
                  <Text style={styles.infoLabel}>Model</Text>
                  <Text style={styles.infoValue}>{selectedCar.model}</Text>
                </View>
                <View style={styles.infoItem}>
                  <Text style={styles.infoLabel}>Year</Text>
                  <Text style={styles.infoValue}>{selectedCar.year}</Text>
                </View>
                <View style={styles.infoItem}>
                  <Text style={styles.infoLabel}>Color</Text>
                  <Text style={styles.infoValue}>{selectedCar.color}</Text>
                </View>
              </View>
            </View>

            {/* Unpaid Fine Summary Card */}
            {unpaidCount > 0 && (
              <View style={styles.unpaidFineCard}>
                <View style={[styles.statusIconContainer, { backgroundColor: 'rgba(239, 68, 68, 0.1)' }]}>
                  <Ionicons name="warning" size={24} color="#EF4444" />
                </View>
                <View style={styles.unpaidTextContainer}>
                  <Text style={styles.unpaidCountText}>{unpaidCount} unpaid fine</Text>
                  <Text style={styles.unpaidAmountText}>{totalUnpaidAmount}</Text>
                </View>
              </View>
            )}

            {/* Traffic Fines Section */}
            <View style={styles.finesSectionHeader}>
              <Ionicons name="document-text-outline" size={24} color="#FFF" />
              <Text style={styles.finesSectionTitle}>Traffic Fines</Text>
            </View>

            <View style={styles.finesList}>
              {trafficFines.map((fine) => (
                <View key={fine.id} style={styles.fineCard}>
                  <View style={styles.fineCardTop}>
                    <View style={[styles.fineStatusIcon, {
                      backgroundColor: fine.isPaid ? '#192734' : 'rgba(239, 68, 68, 0.1)',
                      width: fine.isPaid ? 35 : 40,
                      height: fine.isPaid ? 35 : 40,
                      borderRadius: fine.isPaid ? 17.5 : 10,
                    }]}>
                      {fine.isPaid ? (
                        <Image
                          source={require('../../assets/images/fine_paid.png')}
                          style={styles.finePaidAsset}
                          resizeMode="contain"
                        />
                      ) : (
                        <Ionicons
                          name="warning"
                          size={20}
                          color="#EF4444"
                        />
                      )}
                    </View>
                    <View style={styles.fineTargetInfo}>
                      <Text style={styles.fineType} numberOfLines={1}>{fine.type}</Text>
                      <View style={styles.fineLocationRow}>
                        <Ionicons name="location-outline" size={12} color="#A1B1C8" />
                        <Text style={styles.fineLocationText}>{fine.location}</Text>
                      </View>
                    </View>
                  </View>

                  <View style={styles.fineCardDivider} />

                  <View style={styles.fineCardBottom}>
                    <View style={styles.fineDateRow}>
                      <Ionicons name="calendar-outline" size={12} color="#A1B1C8" />
                      <Text style={styles.fineDateText}>{fine.date}</Text>
                    </View>
                    <View style={styles.fineActionRow}>
                      <Text style={[styles.fineAmountText, { color: fine.isPaid ? '#FFF' : '#EF4444' }]}>
                        {fine.isPaid ? '$ ' : ''}{fine.amount}
                      </Text>
                      {!fine.isPaid ? (
                        <TouchableOpacity style={styles.payButton}>
                          <LinearGradient
                            colors={['#3B6CF2', '#5D5FEF']}
                            style={styles.payGradient}
                          >
                            <Text style={styles.payButtonText}>Pay</Text>
                          </LinearGradient>
                        </TouchableOpacity>
                      ) : (
                        <View style={styles.paidBadge}>
                          <Ionicons name="checkmark" size={10} color="#3B6CF2" />
                          <Text style={styles.paidBadgeText}>Paid</Text>
                        </View>
                      )}
                    </View>
                  </View>
                </View>
              ))}
            </View>
          </View>
        )}
      </ScrollView>

      <FloatingFooter activeTab="management" />
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
  header: {
    marginBottom: 20,
  },
  pageTitle: {
    fontFamily: 'CairoBold',
    fontSize: 24,
    color: '#FFF',
    marginBottom: -10,
  },
  pageSubtitle: {
    fontFamily: 'Cairo',
    fontSize: 16,
    color: '#A1B1C8',
    marginTop: 0,
  },
  sectionInstruction: {
    fontFamily: 'Cairo',
    fontSize: 16,
    color: '#A1B1C8',
    marginBottom: 16,
    marginTop: 10,
  },
  carsContainer: {
    gap: 16,
  },
  carCard: {
    width: '100%',
    height: 125,
    flexDirection: 'row',
    backgroundColor: '#131722',
    borderRadius: 10,
    padding: 16,
    borderWidth: 1,
    borderColor: '#262B3B',
    marginBottom: 12,
  },
  carCardLeft: {
    marginRight: 18,
    alignItems: 'center',
  },
  carIconContainer: {
    width: 49,
    height: 44,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  carIconImage: {
    width: 28,
    height: 28,
    tintColor: '#FFF',
  },
  bottomSpace: {
    flex: 1,
  },
  carDetails: {
    flex: 1,
    paddingTop: 2,
  },
  carHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  plateNumber: {
    fontFamily: 'CairoBold',
    fontSize: 20,
    color: '#FFF',
    lineHeight: 24,
    marginBottom: -1,
  },
  carInfo: {
    fontFamily: 'Cairo',
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.4)',
    lineHeight: 18,
    marginTop: 0,
    marginBottom: -1,
  },
  carColor: {
    fontFamily: 'Cairo',
    fontSize: 12.5,
    color: 'rgba(255, 255, 255, 0.4)',
    lineHeight: 16,
    marginBottom: 9,
  },
  chevron: {
    opacity: 0.6,
    marginTop: 10,
    marginRight: 4,
  },
  dividerContainer: {
    marginLeft: -67,
  },
  cardDivider: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginBottom: 3,
    width: '100%',
  },
  inspectionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 4,
    width: '100%',
  },
  inspectionLabel: {
    fontFamily: 'Cairo',
    fontSize: 12,
    color: '#999',
  },
  inspectionDate: {
    fontFamily: 'Cairo',
    fontSize: 13,
    fontWeight: '600',
    color: '#3B6CF2',
  },
  headerAlt: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  backButton: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: '#131722',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#262B3B',
  },
  titleWrapper: {
    flex: 1,
    justifyContent: 'space-between',
    height: 45,
    paddingVertical: 1,
  },
  appointmentsTitle: {
    fontFamily: 'CairoBold',
    fontSize: 24,
    color: '#FFF',
    lineHeight: 24,
  },
  appointmentsSubtitle: {
    fontFamily: 'Cairo',
    fontSize: 16,
    color: '#A1B1C8',
    lineHeight: 16,
  },
  detailContent: {
    gap: 20,
  },
  detailCard: {
    backgroundColor: '#131722',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#262B3B',
  },
  detailCardTitle: {
    fontFamily: 'CairoBold',
    fontSize: 16,
    color: '#FFF',
    marginBottom: 16,
  },
  infoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 24,
  },
  infoItem: {
    width: '45%',
  },
  infoLabel: {
    fontFamily: 'Cairo',
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.4)',
    marginBottom: 2,
  },
  infoValue: {
    fontFamily: 'CairoBold',
    fontSize: 14,
    color: '#FFF',
  },
  unpaidFineCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#131722',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(239, 68, 68, 0.2)',
    gap: 16,
  },
  statusIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  unpaidTextContainer: {
    flex: 1,
  },
  unpaidCountText: {
    fontFamily: 'Cairo',
    fontSize: 14,
    color: '#A1B1C8',
  },
  unpaidAmountText: {
    fontFamily: 'CairoBold',
    fontSize: 20,
    color: '#EF4444',
  },
  finesSectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 10,
  },
  finesSectionTitle: {
    fontFamily: 'CairoBold',
    fontSize: 18,
    color: '#FFF',
  },
  finesList: {
    gap: 12,
  },
  fineCard: {
    backgroundColor: '#131722',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#262B3B',
  },
  fineCardTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  fineStatusIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  finePaidAsset: {
    width: 20,
    height: 20,
  },
  fineTargetInfo: {
    flex: 1,
  },
  fineType: {
    fontFamily: 'CairoBold',
    fontSize: 14,
    color: '#FFF',
  },
  fineLocationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 2,
  },
  fineLocationText: {
    fontFamily: 'Cairo',
    fontSize: 11,
    color: '#A1B1C8',
  },
  fineCardDivider: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    marginVertical: 12,
  },
  fineCardBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  fineDateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  fineDateText: {
    fontFamily: 'Cairo',
    fontSize: 11,
    color: '#A1B1C8',
  },
  fineActionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  fineAmountText: {
    fontFamily: 'CairoBold',
    fontSize: 12,
  },
  payButton: {
    borderRadius: 8,
    overflow: 'hidden',
  },
  payGradient: {
    paddingHorizontal: 16,
    paddingVertical: 6,
  },
  payButtonText: {
    fontFamily: 'CairoBold',
    fontSize: 12,
    color: '#FFF',
  },
  paidBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(59, 108, 242, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    gap: 4,
  },
  paidBadgeText: {
    fontFamily: 'CairoBold',
    fontSize: 10,
    color: '#3B6CF2',
  },
});

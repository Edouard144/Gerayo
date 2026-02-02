import { FloatingFooter } from '@/components/FloatingFooter';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
    Dimensions,
    Image,
    Modal,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

interface Location {
    id: string;
    name: string;
    address: string;
}

interface TimeSlot {
    id: string;
    time: string;
    available: boolean;
}

interface UpcomingAppointment {
    id: string;
    type: string;
    date: string;
    time: string;
    location: string;
}

const APPOINTMENT_TYPES = [
    { id: 'inspection', label: 'Car inspection' },
    { id: 'service', label: 'Service Appointment' },
    { id: 'registration', label: 'Registration' },
    { id: 'other', label: 'Other appointment' },
];

const LOCATIONS: Location[] = [
    { id: '1', name: 'City Center Inspection Station', address: 'KN 3 Rd, Kigali – Open 08:00–17:00' },
    { id: '2', name: 'KG 11 Ave Station', address: 'KG 11 Ave, Kigali – Open 08:00–17:00' },
    { id: '3', name: 'Kimironko Branch Office', address: 'Kimironko, Kigali – Open 08:00–16:00' },
];

const TIME_SLOTS: TimeSlot[] = [
    { id: '1', time: '09:00 – 09:30', available: true },
    { id: '2', time: '09:30 – 10:00', available: true },
    { id: '3', time: '10:00 – 10:30', available: false },
    { id: '4', time: '10:30 – 11:00', available: true },
    { id: '5', time: '11:00 – 11:30', available: true },
    { id: '6', time: '11:30 – 12:00', available: true },
    { id: '7', time: '14:00 – 14:30', available: true },
    { id: '8', time: '14:30 – 15:00', available: false },
    { id: '9', time: '15:00 – 15:30', available: true },
    { id: '10', time: '15:30 – 16:00', available: true },
];

export default function ScheduleAppointmentScreen() {
    const insets = useSafeAreaInsets();

    // Mock car data
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

    // State
    const [selectedCarId, setSelectedCarId] = useState<string | null>(null);
    const [isAppointmentModalVisible, setIsAppointmentModalVisible] = useState(false);
    const [appointmentType, setAppointmentType] = useState('inspection');
    const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
    const [selectedDate, setSelectedDate] = useState('');
    const [notes, setNotes] = useState('');
    const [isTypeDropdownOpen, setIsTypeDropdownOpen] = useState(false);

    // Validation errors
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    // Mock upcoming appointments
    const [upcomingAppointments, setUpcomingAppointments] = useState<UpcomingAppointment[]>([
        {
            id: '1',
            type: 'Car inspection',
            date: 'Mon, 5 Jan 2026',
            time: '09:00–09:30',
            location: 'City Center',
        },
    ]);

    const validateForm = () => {
        const newErrors: { [key: string]: string } = {};

        if (!selectedLocation) {
            newErrors.location = 'Please select a location.';
        }
        if (!selectedDate) {
            newErrors.date = 'Please select a date.';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleConfirmAppointment = () => {
        if (validateForm()) {
            const newAppointment: UpcomingAppointment = {
                id: Math.random().toString(36).substr(2, 9),
                type: APPOINTMENT_TYPES.find(t => t.id === appointmentType)?.label || 'Car inspection',
                date: selectedDate,
                time: '10:00 AM', // Default for now
                location: selectedLocation || 'RNP Station',
            };

            setUpcomingAppointments([...upcomingAppointments, newAppointment]);
            setIsAppointmentModalVisible(false);

            // Success log
            console.log('Appointment added:', newAppointment);
        }
    };

    const isFormValid = selectedLocation && selectedDate;

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
                {/* Header Logic */}
                {!selectedCarId ? (
                    <>
                        <View style={[styles.header, { marginTop: 50 }]}>
                            <Text style={styles.pageTitle}>Schedule Appointment</Text>
                            <Text style={styles.pageSubtitle}>Select a car to view appointments</Text>
                        </View>

                        <Text style={styles.sectionInstruction}>Choose a car to manage appointments:</Text>

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
                                                <Text style={styles.inspectionLabel}>Next Inspection</Text>                                                <Text style={styles.inspectionDate}>{car.nextInspection}</Text>
                                            </View>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </>
                ) : (
                    <>
                        <View style={[styles.headerAlt, { marginTop: 50 }]}>
                            <TouchableOpacity
                                style={styles.backButton}
                                onPress={() => setSelectedCarId(null)}
                            >
                                <Ionicons name="chevron-back" size={24} color="#FFF" />
                            </TouchableOpacity>

                            <View style={styles.titleWrapper}>
                                <Text style={styles.appointmentsTitle}>Appointments</Text>
                                <Text style={styles.appointmentsSubtitle}>
                                    {cars.find(c => c.id === selectedCarId)?.plateNumber} - 1 appointment(s)
                                </Text>
                            </View>

                            <TouchableOpacity
                                onPress={() => setIsAppointmentModalVisible(true)}
                            >
                                <LinearGradient
                                    colors={['#3B6CF2', '#5D5FEF', '#7B4DFF']}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 0 }}
                                    style={styles.addButtonAlt}
                                >
                                    <Ionicons name="add" size={28} color="#FFF" />
                                </LinearGradient>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.appointmentsList}>
                            {upcomingAppointments.map((appointment) => (
                                <View key={appointment.id} style={styles.appointmentCard}>
                                    <View style={styles.appointmentCardContent}>
                                        <View>
                                            <View style={styles.appointmentHeaderRow}>
                                                <Text style={styles.appointmentMainLabel}>{appointment.type}</Text>
                                                <View style={styles.statusBadge}>
                                                    <Ionicons name="time-outline" size={14} color="#3B6CF2" />
                                                    <Text style={styles.statusText}>Scheduled</Text>
                                                </View>
                                            </View>
                                            <Text style={styles.appointmentPlate}>{cars.find(c => c.id === selectedCarId)?.plateNumber}</Text>

                                            <View style={[styles.appointmentDetailRow, { marginTop: 4 }]}>
                                                <Ionicons name="calendar-outline" size={15} color="#A1B1C8" />
                                                <Text style={styles.appointmentDetailText}>{appointment.date} • {appointment.time}</Text>
                                            </View>
                                        </View>

                                        <View style={styles.appointmentDetailRow}>
                                            <Ionicons name="location-outline" size={15} color="#A1B1C8" />
                                            <Text style={styles.appointmentDetailText}>{appointment.location}</Text>
                                        </View>
                                    </View>
                                </View>
                            ))}
                        </View>
                    </>
                )}

            </ScrollView>

            {/* New Appointment Modal */}
            <Modal
                visible={isAppointmentModalVisible}
                transparent={true}
                animationType="slide"
                onRequestClose={() => setIsAppointmentModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <View style={styles.modalHeader}>
                            <View>
                                <Text style={styles.modalTitle}>New Appointment</Text>
                                <View style={styles.modalTitleAccent} />
                            </View>
                            <TouchableOpacity
                                onPress={() => setIsAppointmentModalVisible(false)}
                                style={styles.closeButton}
                            >
                                <Ionicons name="close" size={24} color="#FFF" />
                            </TouchableOpacity>
                        </View>

                        <ScrollView showsVerticalScrollIndicator={false}>
                            <View style={styles.modalForm}>
                                <View style={[styles.formItem, { zIndex: 100 }]}>
                                    <Text style={styles.modalLabel}>Appointment Type</Text>
                                    <TouchableOpacity
                                        style={[styles.dropdownHeader, isTypeDropdownOpen && styles.dropdownHeaderActive]}
                                        onPress={() => setIsTypeDropdownOpen(!isTypeDropdownOpen)}
                                    >
                                        <Text style={styles.dropdownText}>
                                            {APPOINTMENT_TYPES.find(t => t.id === appointmentType)?.label}
                                        </Text>
                                        <Ionicons
                                            name={isTypeDropdownOpen ? "chevron-up" : "chevron-down"}
                                            size={20}
                                            color="#A1B1C8"
                                        />
                                    </TouchableOpacity>

                                    {isTypeDropdownOpen && (
                                        <View style={styles.dropdownList}>
                                            {APPOINTMENT_TYPES.map((type) => (
                                                <TouchableOpacity
                                                    key={type.id}
                                                    style={styles.dropdownOption}
                                                    onPress={() => {
                                                        setAppointmentType(type.id);
                                                        setIsTypeDropdownOpen(false);
                                                    }}
                                                >
                                                    <Text style={[
                                                        styles.dropdownOptionText,
                                                        appointmentType === type.id && styles.dropdownOptionTextSelected
                                                    ]}>
                                                        {type.label}
                                                    </Text>
                                                    {appointmentType === type.id && (
                                                        <Ionicons name="checkmark" size={18} color="#3B6CF2" />
                                                    )}
                                                </TouchableOpacity>
                                            ))}
                                        </View>
                                    )}
                                </View>

                                <View style={styles.formItem}>
                                    <Text style={styles.modalLabel}>Date</Text>
                                    <View style={styles.iconInputWrapper}>
                                        <TextInput
                                            style={styles.modalInput}
                                            placeholder="mm/dd/yyy"
                                            placeholderTextColor="#444"
                                            value={selectedDate}
                                            onChangeText={setSelectedDate}
                                        />
                                        <Ionicons name="calendar-outline" size={20} color="#444" style={styles.inputIcon} />
                                    </View>
                                </View>

                                <View style={styles.formItem}>
                                    <Text style={styles.modalLabel}>Location</Text>
                                    <TextInput
                                        style={styles.modalInput}
                                        placeholder="e.g , Central Inspection Center"
                                        placeholderTextColor="#444"
                                        value={selectedLocation || ''}
                                        onChangeText={setSelectedLocation}
                                    />
                                </View>
                            </View>

                            <TouchableOpacity
                                style={[styles.confirmModalButton, !isFormValid && { opacity: 0.5 }]}
                                onPress={handleConfirmAppointment}
                                disabled={!isFormValid}
                            >
                                <LinearGradient
                                    colors={['#3B6CF2', '#5D5FEF', '#7B4DFF']}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 0 }}
                                    style={styles.confirmModalGradient}
                                >
                                    <Text style={styles.confirmModalText}>Confirm</Text>
                                </LinearGradient>
                            </TouchableOpacity>
                        </ScrollView>
                    </View>
                </View>
            </Modal>

            <FloatingFooter activeTab="appointment" />
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
    addButtonAlt: {
        width: 45,
        height: 45,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    appointmentsList: {
        gap: 16,
    },
    appointmentCard: {
        width: '100%',
        height: 112,
        backgroundColor: '#131722',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#262B3B',
        paddingHorizontal: 16,
        paddingTop: 10,
        paddingBottom: 8,
        justifyContent: 'center',
    },
    appointmentCardContent: {
        flex: 1,
        justifyContent: 'space-between',
        paddingVertical: 2,
    },
    appointmentHeaderRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    appointmentMainLabel: {
        fontFamily: 'CairoBold',
        fontSize: 16,
        color: '#FFF',
    },
    statusBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(59, 108, 242, 0.1)',
        paddingHorizontal: 6,
        paddingVertical: 1,
        borderRadius: 12,
        gap: 3,
    },
    statusText: {
        fontFamily: 'Cairo',
        fontSize: 10,
        color: '#3B6CF2',
    },
    appointmentPlate: {
        fontFamily: 'Cairo',
        fontSize: 11.5,
        color: '#A1B1C8',
        marginTop: -2,
    },
    appointmentDetailRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
    },
    appointmentDetailText: {
        fontFamily: 'Cairo',
        fontSize: 12,
        color: '#A1B1C8',
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
        fontSize: 11,
        color: '#999',
    },
    inspectionDate: {
        fontFamily: 'Cairo',
        fontSize: 12,
        fontWeight: '600',
        color: '#3B6CF2',
    },
    twoColumnLayout: {
        flexDirection: 'row',
        gap: 20,
        marginTop: 30,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.8)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    modalContent: {
        width: '100%',
        maxWidth: 400,
        backgroundColor: '#131722',
        borderRadius: 20,
        padding: 24,
        borderWidth: 1,
        borderColor: '#262B3B',
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 24,
    },
    modalTitle: {
        fontFamily: 'CairoBold',
        fontSize: 24,
        color: '#FFF',
    },
    modalTitleAccent: {
        height: 3,
        backgroundColor: '#3B6CF2',
        width: 140,
        marginTop: -2,
    },
    closeButton: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.1)',
    },
    modalForm: {
        gap: 20,
    },
    formItem: {
        gap: 8,
    },
    modalLabel: {
        fontFamily: 'Cairo',
        fontSize: 14,
        color: '#FFF',
    },
    dropdownText: {
        fontFamily: 'Cairo',
        fontSize: 16,
        color: '#FFF',
    },
    iconInputWrapper: {
        position: 'relative',
    },
    modalInput: {
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 14,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.1)',
        fontFamily: 'Cairo',
        fontSize: 16,
        color: '#FFF',
    },
    inputIcon: {
        position: 'absolute',
        right: 16,
        top: 15,
    },
    confirmModalButton: {
        marginTop: 30,
        marginBottom: 10,
    },
    confirmModalGradient: {
        borderRadius: 12,
        paddingVertical: 16,
        alignItems: 'center',
    },
    confirmModalText: {
        fontFamily: 'CairoBold',
        fontSize: 18,
        color: '#FFF',
    },
    dropdownHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 14,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.1)',
    },
    dropdownHeaderActive: {
        borderColor: '#3B6CF2',
    },
    dropdownList: {
        position: 'absolute',
        top: 68, // (label height + gap + header height)
        left: 0,
        right: 0,
        backgroundColor: '#1A1E2E',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.1)',
        overflow: 'hidden',
        zIndex: 1000,
        elevation: 5,
    },
    dropdownOption: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 14,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255, 255, 255, 0.05)',
    },
    dropdownOptionText: {
        fontFamily: 'Cairo',
        fontSize: 15,
        color: 'rgba(255, 255, 255, 0.7)',
    },
    dropdownOptionTextSelected: {
        color: '#FFF',
        fontFamily: 'CairoBold',
    },
});

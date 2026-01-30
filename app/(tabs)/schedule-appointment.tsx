import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
    Dimensions,
    Image,
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
    { id: 'fine', label: 'Fine related meeting' },
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

    // Mock car data - in real app, this would come from route params
    const car = {
        plateNumber: 'RAD 123 C',
        model: 'Toyota Corolla',
        year: '2020',
        color: 'Silver',
    };

    // Form state
    const [appointmentType, setAppointmentType] = useState('inspection');
    const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);
    const [notes, setNotes] = useState('');

    // Validation errors
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    // Mock upcoming appointments
    const [upcomingAppointments] = useState<UpcomingAppointment[]>([
        {
            id: '1',
            type: 'Car inspection',
            date: 'Mon, 5 Jan 2026',
            time: '09:00–09:30',
            location: 'City Center',
        },
    ]);

    const getAppointmentTypeLabel = () => {
        return APPOINTMENT_TYPES.find(t => t.id === appointmentType)?.label || '';
    };

    const getLocationName = () => {
        return LOCATIONS.find(l => l.id === selectedLocation)?.name || '';
    };

    const getTimeSlotLabel = () => {
        return TIME_SLOTS.find(t => t.id === selectedTimeSlot)?.time || '';
    };

    const validateForm = () => {
        const newErrors: { [key: string]: string } = {};

        if (!selectedLocation) {
            newErrors.location = 'Please select a location.';
        }
        if (!selectedDate) {
            newErrors.date = 'Please select a date.';
        }
        if (!selectedTimeSlot) {
            newErrors.time = 'Please select a time slot.';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleConfirmAppointment = () => {
        if (validateForm()) {
            // In real app, submit to backend
            console.log('Appointment confirmed');
            // Show success message or navigate
        }
    };

    const isFormValid = selectedLocation && selectedDate && selectedTimeSlot;

    return (
        <View style={styles.container}>
            <StatusBar style="light" />

            <ScrollView
                contentContainerStyle={[
                    styles.contentContainer,
                    { paddingTop: insets.top + 20, paddingBottom: 100 },
                ]}
                showsVerticalScrollIndicator={false}
            >
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.pageTitle}>Schedule Appointments</Text>
                    <Text style={styles.breadcrumb}>Car Portal / Schedule</Text>
                </View>

                {/* Car Context Card */}
                <View style={styles.carContextCard}>
                    <View style={styles.carIconWrapper}>
                        <Ionicons name="car-sport" size={32} color="#5B7FFF" />
                    </View>
                    <View style={styles.carContextContent}>
                        <Text style={styles.carPlateNumber}>{car.plateNumber}</Text>
                        <Text style={styles.carDetails}>
                            {car.model} {car.year} • {car.color}
                        </Text>
                        <Text style={styles.carDescription}>
                            Schedule a visit for inspections, fines, or other services for this vehicle.
                        </Text>
                    </View>
                </View>

                {/* Two Column Layout */}
                <View style={styles.twoColumnLayout}>
                    {/* Left Column - Form */}
                    <View style={styles.leftColumn}>
                        <View style={styles.formCard}>
                            <Text style={styles.formTitle}>New appointment</Text>
                            <Text style={styles.formSubtitle}>
                                Fill in the details to schedule a visit for this vehicle.
                            </Text>

                            {/* Appointment Type */}
                            <View style={styles.formSection}>
                                <Text style={styles.label}>Appointment type</Text>
                                <View style={styles.pillContainer}>
                                    {APPOINTMENT_TYPES.map((type) => (
                                        <TouchableOpacity
                                            key={type.id}
                                            style={[
                                                styles.pill,
                                                appointmentType === type.id && styles.pillActive,
                                            ]}
                                            onPress={() => setAppointmentType(type.id)}
                                        >
                                            <Text
                                                style={[
                                                    styles.pillText,
                                                    appointmentType === type.id && styles.pillTextActive,
                                                ]}
                                            >
                                                {type.label}
                                            </Text>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            </View>

                            {/* Location */}
                            <View style={styles.formSection}>
                                <Text style={styles.label}>Location</Text>
                                {LOCATIONS.map((location) => (
                                    <TouchableOpacity
                                        key={location.id}
                                        style={[
                                            styles.locationCard,
                                            selectedLocation === location.id && styles.locationCardActive,
                                        ]}
                                        onPress={() => {
                                            setSelectedLocation(location.id);
                                            setErrors({ ...errors, location: '' });
                                        }}
                                    >
                                        <View style={styles.locationContent}>
                                            <Text style={styles.locationName}>{location.name}</Text>
                                            <Text style={styles.locationAddress}>{location.address}</Text>
                                        </View>
                                        {selectedLocation === location.id && (
                                            <Ionicons name="checkmark-circle" size={24} color="#5B7FFF" />
                                        )}
                                    </TouchableOpacity>
                                ))}
                                {errors.location && (
                                    <Text style={styles.errorText}>{errors.location}</Text>
                                )}
                            </View>

                            {/* Date */}
                            <View style={styles.formSection}>
                                <Text style={styles.label}>Date</Text>
                                <TextInput
                                    style={[styles.input, errors.date && styles.inputError]}
                                    placeholder="Select date (e.g., 2026-01-10)"
                                    placeholderTextColor="#666"
                                    value={selectedDate}
                                    onChangeText={(text) => {
                                        setSelectedDate(text);
                                        setErrors({ ...errors, date: '' });
                                    }}
                                />
                                {errors.date && <Text style={styles.errorText}>{errors.date}</Text>}
                            </View>

                            {/* Time Slots */}
                            <View style={styles.formSection}>
                                <Text style={styles.label}>Time</Text>
                                <View style={styles.timeSlotGrid}>
                                    {TIME_SLOTS.map((slot) => (
                                        <TouchableOpacity
                                            key={slot.id}
                                            style={[
                                                styles.timeSlot,
                                                selectedTimeSlot === slot.id && styles.timeSlotActive,
                                                !slot.available && styles.timeSlotDisabled,
                                            ]}
                                            onPress={() => {
                                                if (slot.available) {
                                                    setSelectedTimeSlot(slot.id);
                                                    setErrors({ ...errors, time: '' });
                                                }
                                            }}
                                            disabled={!slot.available}
                                        >
                                            <Text
                                                style={[
                                                    styles.timeSlotText,
                                                    selectedTimeSlot === slot.id && styles.timeSlotTextActive,
                                                    !slot.available && styles.timeSlotTextDisabled,
                                                ]}
                                            >
                                                {slot.time}
                                            </Text>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                                {errors.time && <Text style={styles.errorText}>{errors.time}</Text>}
                            </View>

                            {/* Notes */}
                            <View style={styles.formSection}>
                                <Text style={styles.label}>Notes (optional)</Text>
                                <TextInput
                                    style={[styles.textarea]}
                                    placeholder="Add any information for the officer or inspector (e.g., special car condition, preferred entrance, etc.)"
                                    placeholderTextColor="#666"
                                    value={notes}
                                    onChangeText={setNotes}
                                    multiline
                                    numberOfLines={4}
                                    textAlignVertical="top"
                                />
                            </View>
                        </View>
                    </View>

                    {/* Right Column - Summary */}
                    <View style={styles.rightColumn}>
                        {/* Appointment Summary */}
                        <View style={styles.summaryCard}>
                            <Text style={styles.summaryTitle}>Appointment summary</Text>

                            <View style={styles.summaryRow}>
                                <Text style={styles.summaryLabel}>Car</Text>
                                <Text style={styles.summaryValue}>
                                    {car.model} {car.year} – {car.color} – {car.plateNumber}
                                </Text>
                            </View>

                            <View style={styles.summaryRow}>
                                <Text style={styles.summaryLabel}>Type</Text>
                                <Text style={styles.summaryValue}>{getAppointmentTypeLabel()}</Text>
                            </View>

                            <View style={styles.summaryRow}>
                                <Text style={styles.summaryLabel}>Location</Text>
                                <Text style={styles.summaryValue}>
                                    {getLocationName() || 'Not selected'}
                                </Text>
                            </View>

                            <View style={styles.summaryRow}>
                                <Text style={styles.summaryLabel}>Date & time</Text>
                                <Text style={styles.summaryValue}>
                                    {selectedDate && selectedTimeSlot
                                        ? `${selectedDate} – ${getTimeSlotLabel()}`
                                        : 'Not selected'}
                                </Text>
                            </View>

                            <View style={styles.summaryRow}>
                                <Text style={styles.summaryLabel}>Estimated fee</Text>
                                <Text style={styles.summaryFee}>20,000 RWF</Text>
                            </View>

                            <TouchableOpacity
                                style={[
                                    styles.confirmButton,
                                    !isFormValid && styles.confirmButtonDisabled,
                                ]}
                                onPress={handleConfirmAppointment}
                                disabled={!isFormValid}
                            >
                                <Text style={styles.confirmButtonText}>Confirm appointment</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.cancelButton}
                                onPress={() => router.back()}
                            >
                                <Text style={styles.cancelButtonText}>Cancel</Text>
                            </TouchableOpacity>
                        </View>

                        {/* Upcoming Appointments */}
                        <View style={styles.upcomingCard}>
                            <Text style={styles.upcomingTitle}>Upcoming appointments</Text>

                            {upcomingAppointments.length > 0 ? (
                                upcomingAppointments.map((appointment) => (
                                    <View key={appointment.id} style={styles.appointmentRow}>
                                        <Text style={styles.appointmentText}>
                                            {appointment.type} – {appointment.date} – {appointment.time} –{' '}
                                            {appointment.location}
                                        </Text>
                                    </View>
                                ))
                            ) : (
                                <Text style={styles.emptyText}>
                                    No upcoming appointments. Schedule one using the form on the left.
                                </Text>
                            )}
                        </View>
                    </View>
                </View>
            </ScrollView>

            {/* Custom Bottom Footer - Floating */}
            <View style={[styles.footer, { paddingBottom: insets.bottom > 0 ? insets.bottom : 20 }]}>
                <TouchableOpacity style={styles.footerItem} onPress={() => router.push('/')}>
                    <Image
                        source={require('../../assets/images/material-symbols_home-outline-rounded.png')}
                        style={{ width: 24, height: 24, tintColor: '#666' }}
                        resizeMode="contain"
                    />
                    <Text style={styles.footerText}>Home</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.footerItem} onPress={() => router.push('/your-cars')}>
                    <Image
                        source={require('../../assets/images/car_icon.png')}
                        style={{ width: 24, height: 24, tintColor: '#666' }}
                        resizeMode="contain"
                    />
                    <Text style={styles.footerText}>Your Car</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.footerItem}>
                    <View style={styles.activeFooterIcon}>
                        <Image
                            source={require('../../assets/images/mdi_calendar-outline.png')}
                            style={{ width: 24, height: 24, tintColor: '#FFF' }}
                            resizeMode="contain"
                        />
                    </View>
                    <Text style={styles.activeFooterText}>Appointment</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.footerItem}>
                    <Image
                        source={require('../../assets/images/material-symbols_settings-outline-rounded.png')}
                        style={{ width: 24, height: 24, tintColor: '#666' }}
                        resizeMode="contain"
                    />
                    <Text style={styles.footerText}>Management</Text>
                </TouchableOpacity>
            </View>
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
        fontFamily: 'Cairo',
        fontSize: 32,
        fontWeight: 'bold',
        color: '#FFF',
        marginBottom: 4,
    },
    breadcrumb: {
        fontFamily: 'Cairo',
        fontSize: 13,
        color: '#888',
    },
    carContextCard: {
        flexDirection: 'row',
        backgroundColor: '#131722',
        borderRadius: 16,
        padding: 20,
        marginBottom: 24,
        borderWidth: 1,
        borderColor: 'rgba(151, 151, 151, 0.2)',
    },
    carIconWrapper: {
        width: 60,
        height: 60,
        borderRadius: 12,
        backgroundColor: 'rgba(91, 127, 255, 0.15)',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    carContextContent: {
        flex: 1,
    },
    carPlateNumber: {
        fontFamily: 'Cairo',
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FFF',
        marginBottom: 4,
    },
    carDetails: {
        fontFamily: 'Cairo',
        fontSize: 14,
        color: '#AAA',
        marginBottom: 8,
    },
    carDescription: {
        fontFamily: 'Cairo',
        fontSize: 12,
        color: '#888',
        lineHeight: 18,
    },
    twoColumnLayout: {
        flexDirection: width > 768 ? 'row' : 'column',
        gap: 20,
    },
    leftColumn: {
        flex: width > 768 ? 0.6 : 1,
    },
    rightColumn: {
        flex: width > 768 ? 0.4 : 1,
        gap: 20,
    },
    formCard: {
        backgroundColor: '#131722',
        borderRadius: 16,
        padding: 20,
        borderWidth: 1,
        borderColor: 'rgba(151, 151, 151, 0.2)',
    },
    formTitle: {
        fontFamily: 'Cairo',
        fontSize: 22,
        fontWeight: 'bold',
        color: '#FFF',
        marginBottom: 4,
    },
    formSubtitle: {
        fontFamily: 'Cairo',
        fontSize: 13,
        color: '#888',
        marginBottom: 24,
    },
    formSection: {
        marginBottom: 24,
    },
    label: {
        fontFamily: 'Cairo',
        fontSize: 15,
        fontWeight: '600',
        color: '#FFF',
        marginBottom: 12,
    },
    pillContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
    },
    pill: {
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 20,
        backgroundColor: '#1A1F2E',
        borderWidth: 1,
        borderColor: 'rgba(151, 151, 151, 0.2)',
    },
    pillActive: {
        backgroundColor: '#5B7FFF',
        borderColor: '#5B7FFF',
    },
    pillText: {
        fontFamily: 'Cairo',
        fontSize: 14,
        color: '#AAA',
    },
    pillTextActive: {
        color: '#FFF',
        fontWeight: '600',
    },
    locationCard: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#1A1F2E',
        borderRadius: 12,
        padding: 16,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: 'rgba(151, 151, 151, 0.2)',
    },
    locationCardActive: {
        borderColor: '#5B7FFF',
        borderWidth: 2,
    },
    locationContent: {
        flex: 1,
    },
    locationName: {
        fontFamily: 'Cairo',
        fontSize: 15,
        fontWeight: '600',
        color: '#FFF',
        marginBottom: 4,
    },
    locationAddress: {
        fontFamily: 'Cairo',
        fontSize: 12,
        color: '#888',
    },
    input: {
        fontFamily: 'Cairo',
        backgroundColor: '#1A1F2E',
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 14,
        fontSize: 15,
        color: '#FFF',
        borderWidth: 1,
        borderColor: 'rgba(151, 151, 151, 0.2)',
    },
    inputError: {
        borderColor: '#D32F2F',
    },
    textarea: {
        fontFamily: 'Cairo',
        backgroundColor: '#1A1F2E',
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 14,
        fontSize: 15,
        color: '#FFF',
        borderWidth: 1,
        borderColor: 'rgba(151, 151, 151, 0.2)',
        minHeight: 100,
    },
    timeSlotGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
    },
    timeSlot: {
        paddingHorizontal: 14,
        paddingVertical: 10,
        borderRadius: 20,
        backgroundColor: '#1A1F2E',
        borderWidth: 1,
        borderColor: 'rgba(151, 151, 151, 0.2)',
    },
    timeSlotActive: {
        backgroundColor: '#5B7FFF',
        borderColor: '#5B7FFF',
    },
    timeSlotDisabled: {
        backgroundColor: '#0F1219',
        opacity: 0.5,
    },
    timeSlotText: {
        fontFamily: 'Cairo',
        fontSize: 13,
        color: '#AAA',
    },
    timeSlotTextActive: {
        color: '#FFF',
        fontWeight: '600',
    },
    timeSlotTextDisabled: {
        color: '#555',
    },
    errorText: {
        fontFamily: 'Cairo',
        fontSize: 12,
        color: '#D32F2F',
        marginTop: 6,
    },
    summaryCard: {
        backgroundColor: '#131722',
        borderRadius: 16,
        padding: 20,
        borderWidth: 1,
        borderColor: 'rgba(151, 151, 151, 0.2)',
    },
    summaryTitle: {
        fontFamily: 'Cairo',
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FFF',
        marginBottom: 20,
    },
    summaryRow: {
        marginBottom: 16,
    },
    summaryLabel: {
        fontFamily: 'Cairo',
        fontSize: 13,
        color: '#888',
        marginBottom: 4,
    },
    summaryValue: {
        fontFamily: 'Cairo',
        fontSize: 14,
        color: '#FFF',
    },
    summaryFee: {
        fontFamily: 'Cairo',
        fontSize: 16,
        fontWeight: 'bold',
        color: '#5B7FFF',
    },
    confirmButton: {
        backgroundColor: '#5B7FFF',
        borderRadius: 12,
        paddingVertical: 16,
        alignItems: 'center',
        marginTop: 24,
        marginBottom: 12,
    },
    confirmButtonDisabled: {
        backgroundColor: '#3A3F4E',
        opacity: 0.5,
    },
    confirmButtonText: {
        fontFamily: 'Cairo',
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FFF',
    },
    cancelButton: {
        alignItems: 'center',
        paddingVertical: 12,
    },
    cancelButtonText: {
        fontFamily: 'Cairo',
        fontSize: 14,
        color: '#888',
    },
    upcomingCard: {
        backgroundColor: '#131722',
        borderRadius: 16,
        padding: 20,
        borderWidth: 1,
        borderColor: 'rgba(151, 151, 151, 0.2)',
    },
    upcomingTitle: {
        fontFamily: 'Cairo',
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFF',
        marginBottom: 16,
    },
    appointmentRow: {
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(151, 151, 151, 0.1)',
    },
    appointmentText: {
        fontFamily: 'Cairo',
        fontSize: 13,
        color: '#AAA',
        lineHeight: 18,
    },
    emptyText: {
        fontFamily: 'Cairo',
        fontSize: 13,
        color: '#666',
        fontStyle: 'italic',
    },
    footer: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
        height: 70,
        backgroundColor: '#161B2B',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#262B3B',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingHorizontal: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
        elevation: 8,
    },
    footerItem: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    activeFooterIcon: {
        backgroundColor: '#2D5EFF',
        width: 36,
        height: 36,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 2,
    },
    activeFooterText: {
        fontFamily: 'Cairo',
        color: '#FFF',
        fontSize: 10,
        fontWeight: 'bold',
    },
    footerText: {
        fontFamily: 'Cairo',
        color: '#666',
        fontSize: 10,
        marginTop: 4,
    },
});

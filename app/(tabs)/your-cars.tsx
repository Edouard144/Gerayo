import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
    Animated,
    Dimensions,
    Image,
    KeyboardAvoidingView,
    Modal,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');

interface Car {
    id: string;
    plateNumber: string;
    brand: string;
    model: string;
    year: string;
    color: string;
    nextInspection: string;
}

export default function YourCarsScreen() {
    const insets = useSafeAreaInsets();
    const [cars, setCars] = useState<Car[]>([
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
    ]);

    const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);
    const [plateNumber, setPlateNumber] = useState('');
    const [slideAnim] = useState(new Animated.Value(height));

    const openBottomSheet = () => {
        setIsBottomSheetVisible(true);
        Animated.spring(slideAnim, {
            toValue: 0,
            useNativeDriver: true,
            tension: 50,
            friction: 8,
        }).start();
    };

    const closeBottomSheet = () => {
        Animated.timing(slideAnim, {
            toValue: height,
            duration: 300,
            useNativeDriver: true,
        }).start(() => {
            setIsBottomSheetVisible(false);
            setPlateNumber('');
        });
    };

    const handleAddCar = () => {
        if (plateNumber.trim()) {
            const newCar: Car = {
                id: Date.now().toString(),
                plateNumber: plateNumber.toUpperCase(),
                brand: 'Toyota',
                model: 'Camry',
                year: '2024',
                color: 'White',
                nextInspection: 'Mar 15, 2027',
            };
            setCars([...cars, newCar]);
            closeBottomSheet();
        }
    };

    return (
        <View style={styles.container}>
            <StatusBar style="light" />

            {/* Main Content */}
            <ScrollView
                contentContainerStyle={[
                    styles.contentContainer,
                    { paddingTop: insets.top + 20, paddingBottom: 100 },
                ]}
                showsVerticalScrollIndicator={false}
            >
                {/* Header Section */}
                <View style={styles.header}>
                    <View>
                        <Text style={styles.pageTitle}>Your Cars</Text>
                        <Text style={styles.vehicleCount}>
                            {cars.length} vehicle{cars.length !== 1 ? 's' : ''} registered
                        </Text>
                    </View>
                    <TouchableOpacity style={styles.addButton} onPress={openBottomSheet}>
                        <Ionicons name="add" size={20} color="#FFF" />
                        <Text style={styles.addButtonText}>Add Car</Text>
                    </TouchableOpacity>
                </View>

                {/* Cars List Container */}
                <View style={styles.carsContainer}>
                    {cars.map((car) => (
                        <TouchableOpacity key={car.id} style={styles.carCard}>
                            <View style={styles.carIconContainer}>
                                <Ionicons name="car-outline" size={28} color="#5B7FFF" />
                            </View>
                            <View style={styles.carDetails}>
                                <Text style={styles.plateNumber}>{car.plateNumber}</Text>
                                <Text style={styles.carInfo}>
                                    {car.brand} {car.model} • {car.year}
                                </Text>
                                <Text style={styles.carColor}>Color: {car.color}</Text>
                                <View style={styles.inspectionRow}>
                                    <Text style={styles.inspectionLabel}>Next Inspection</Text>
                                    <Text style={styles.inspectionDate}>{car.nextInspection}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>

            {/* Bottom Sheet Modal */}
            <Modal
                visible={isBottomSheetVisible}
                transparent
                animationType="none"
                onRequestClose={closeBottomSheet}
            >
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={styles.modalContainer}
                >
                    <TouchableOpacity
                        style={styles.modalOverlay}
                        activeOpacity={1}
                        onPress={closeBottomSheet}
                    />
                    <Animated.View
                        style={[
                            styles.bottomSheet,
                            {
                                transform: [{ translateY: slideAnim }],
                                paddingBottom: insets.bottom + 20,
                            },
                        ]}
                    >
                        {/* Bottom Sheet Header */}
                        <View style={styles.sheetHeader}>
                            <Text style={styles.sheetTitle}>Register New Car</Text>
                            <TouchableOpacity
                                style={styles.closeButton}
                                onPress={closeBottomSheet}
                            >
                                <Ionicons name="close" size={24} color="#FFF" />
                            </TouchableOpacity>
                        </View>

                        {/* Form */}
                        <View style={styles.formContainer}>
                            <Text style={styles.inputLabel}>Plate Number</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="e.g., RAB 123A"
                                placeholderTextColor="#666"
                                value={plateNumber}
                                onChangeText={setPlateNumber}
                                autoCapitalize="characters"
                                autoCorrect={false}
                            />
                            <Text style={styles.helperText}>
                                Enter your vehicle's plate number. The car details will be verified
                                and added to your collection.
                            </Text>

                            {/* Submit Button */}
                            <TouchableOpacity
                                style={[
                                    styles.submitButton,
                                    !plateNumber.trim() && styles.submitButtonDisabled,
                                ]}
                                onPress={handleAddCar}
                                disabled={!plateNumber.trim()}
                            >
                                <Text style={styles.submitButtonText}>Add Car</Text>
                            </TouchableOpacity>
                        </View>
                    </Animated.View>
                </KeyboardAvoidingView>
            </Modal>

            {/* Custom Bottom Footer - Floating */}
            <View style={[styles.footer, { paddingBottom: insets.bottom > 0 ? insets.bottom : 20 }]}>
                <TouchableOpacity style={styles.footerItem} onPress={() => router.push('/')}>
                    <Image source={require('../../assets/images/material-symbols_home-outline-rounded.png')} style={{ width: 24, height: 24, tintColor: '#666' }} resizeMode="contain" />
                    <Text style={styles.footerText}>Home</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.footerItem}>
                    <View style={styles.activeFooterIcon}>
                        <Image source={require('../../assets/images/car_icon.png')} style={{ width: 24, height: 24, tintColor: '#FFF' }} resizeMode="contain" />
                    </View>
                    <Text style={styles.activeFooterText}>Your Car</Text>
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
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 25,
    },
    pageTitle: {
        fontFamily: 'Cairo',
        fontSize: 32,
        fontWeight: 'bold',
        color: '#FFF',
        marginBottom: 4,
    },
    vehicleCount: {
        fontFamily: 'Cairo',
        fontSize: 13,
        color: '#999',
    },
    addButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#5B7FFF',
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 20,
        gap: 6,
    },
    addButtonText: {
        fontFamily: 'Cairo',
        fontSize: 14,
        fontWeight: '600',
        color: '#FFF',
    },
    carsContainer: {
        gap: 16,
    },
    carCard: {
        flexDirection: 'row',
        backgroundColor: '#1A1F2E',
        borderRadius: 16,
        padding: 16,
        borderWidth: 1,
        borderColor: '#262B3B',
    },
    carIconContainer: {
        width: 60,
        height: 60,
        borderRadius: 12,
        backgroundColor: 'rgba(91, 127, 255, 0.15)',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    carDetails: {
        flex: 1,
    },
    plateNumber: {
        fontFamily: 'Cairo',
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFF',
        marginBottom: 4,
    },
    carInfo: {
        fontFamily: 'Cairo',
        fontSize: 14,
        color: '#AAA',
        marginBottom: 2,
    },
    carColor: {
        fontFamily: 'Cairo',
        fontSize: 13,
        color: '#888',
        marginBottom: 12,
    },
    inspectionRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
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
        color: '#5B7FFF',
    },
    modalContainer: {
        flex: 1,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
    },
    bottomSheet: {
        backgroundColor: '#1A1F2E',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        paddingTop: 20,
        paddingHorizontal: 20,
        minHeight: 400,
    },
    sheetHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24,
    },
    sheetTitle: {
        fontFamily: 'Cairo',
        fontSize: 22,
        fontWeight: 'bold',
        color: '#FFF',
    },
    closeButton: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    formContainer: {
        gap: 12,
    },
    inputLabel: {
        fontFamily: 'Cairo',
        fontSize: 15,
        fontWeight: '600',
        color: '#FFF',
        marginBottom: 4,
    },
    input: {
        fontFamily: 'Cairo',
        backgroundColor: '#262B3B',
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 14,
        fontSize: 16,
        color: '#FFF',
        borderWidth: 1,
        borderColor: '#3A3F4E',
    },
    helperText: {
        fontFamily: 'Cairo',
        fontSize: 12,
        color: '#888',
        lineHeight: 18,
        marginBottom: 20,
    },
    submitButton: {
        backgroundColor: '#5B7FFF',
        borderRadius: 12,
        paddingVertical: 16,
        alignItems: 'center',
        marginTop: 10,
    },
    submitButtonDisabled: {
        backgroundColor: '#3A3F4E',
        opacity: 0.5,
    },
    submitButtonText: {
        fontFamily: 'Cairo',
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FFF',
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

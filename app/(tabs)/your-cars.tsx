import { FloatingFooter } from '@/components/FloatingFooter';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
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
                    { paddingBottom: 120 },
                ]}
                showsVerticalScrollIndicator={false}
            >
                {/* Header Section - 35px from top (matching Home) */}
                <View style={[styles.header, { marginTop: 35 }]}>
                    <View>
                        <Text style={styles.pageTitle}>Your Cars</Text>
                        <Text style={styles.vehicleCount}>
                            {cars.length} vehicle{cars.length !== 1 ? 's' : ''} registered
                        </Text>
                    </View>
                    <TouchableOpacity onPress={openBottomSheet}>
                        <LinearGradient
                            colors={['#3B6CF2', '#5D5FEF', '#7B4DFF']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={styles.addButton}
                        >
                            <Ionicons name="add" size={20} color="#FFF" />
                            <Text style={styles.addButtonText}>Add Car</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>

                {/* Cars List Container */}
                <View style={styles.carsContainer}>
                    {cars.map((car) => (
                        <TouchableOpacity key={car.id} style={styles.carCard}>
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
                                <Text style={styles.plateNumber}>{car.plateNumber}</Text>
                                <Text style={styles.carInfo}>
                                    {car.brand} {car.model} • {car.year}
                                </Text>
                                <Text style={styles.carColor}>Color: {car.color}</Text>
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
                                onPress={handleAddCar}
                                disabled={!plateNumber.trim()}
                                style={!plateNumber.trim() ? { opacity: 0.5 } : {}}
                            >
                                <LinearGradient
                                    colors={['#3B6CF2', '#5D5FEF', '#7B4DFF']}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 0 }}
                                    style={[
                                        styles.submitButton,
                                        !plateNumber.trim() && styles.submitButtonDisabled,
                                    ]}
                                >
                                    <Text style={styles.submitButtonText}>Add Car</Text>
                                </LinearGradient>
                            </TouchableOpacity>
                        </View>
                    </Animated.View>
                </KeyboardAvoidingView>
            </Modal>

            <FloatingFooter activeTab="your-cars" />
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
        alignItems: 'center',
        marginBottom: 25,
    },
    pageTitle: {
        fontFamily: 'CairoBold',
        fontSize: 24,
        color: '#FFF',
        marginBottom: 4,
    },
    vehicleCount: {
        fontFamily: 'Cairo',
        fontSize: 16,
        color: '#999',
        marginTop: -10,
    },
    addButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 10, // Reduced from 20
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
        width: '100%', // Responsive width
        height: 125,
        flexDirection: 'row',
        backgroundColor: '#131722',
        borderRadius: 10,
        padding: 16,
        borderWidth: 1,
        borderColor: '#262B3B',
        marginBottom: 12,
    },
    carIconImage: {
        width: 28,
        height: 28,
        tintColor: '#FFF',
    },
    carIconContainer: {
        width: 49,
        height: 44,
        borderRadius: 10, // Reduced radius
        justifyContent: 'center',
        alignItems: 'center',
    },
    carCardLeft: {
        marginRight: 18,
        alignItems: 'center',
    },
    bottomSpace: {
        flex: 1,
    },
    carDetails: {
        flex: 1,
        paddingTop: 2, // Align with top of icon
    },
    plateNumber: {
        fontFamily: 'CairoBold',
        fontSize: 20,
        color: '#FFF',
        lineHeight: 24, // Controlled height
        marginBottom: -1,
    },
    carInfo: {
        fontFamily: 'Cairo',
        fontSize: 14,
        color: 'rgba(255, 255, 255, 0.4)',
        lineHeight: 18, // Controlled height
        marginTop: 0,
        marginBottom: -1,
    },
    carColor: {
        fontFamily: 'Cairo',
        fontSize: 12.5,
        color: 'rgba(255, 255, 255, 0.4)',
        lineHeight: 16,
        marginBottom: 9, // Increased from 6
    },
    dividerContainer: {
        marginLeft: -67, // Pull back to align with icon container (49 width + 18 margin)
    },
    cardDivider: {
        height: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        marginBottom: 3, // Reduced from 6
        width: '100%',
    },
    inspectionRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: 4, // "Next Inspection" starts few pixels after line starts
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
        fontFamily: 'CairoBold',
        fontSize: 22,
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
        fontFamily: 'CairoBold',
        fontSize: 16,
        color: '#FFF',
    },
});

import { Cairo_500Medium, Cairo_700Bold, useFonts } from '@expo-google-fonts/cairo';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
    Dimensions,
    Image,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View
} from 'react-native';
import { AnimatedScreen } from '../../components/AnimatedScreen';
import { HapticButton } from '../../components/HapticButton';

const { width } = Dimensions.get('window');

export default function VehicleSetupScreen() {
    const router = useRouter();
    const [fontsLoaded] = useFonts({
        Cairo_500Medium,
        Cairo_700Bold,
    });

    // State for Car Type Toggle (Old vs Modern)
    const [carType, setCarType] = useState<'old' | 'modern'>('modern');
    const [scrolled, setScrolled] = useState(false);
    const [plateNumber, setPlateNumber] = useState('');
    const isPlateValid = plateNumber.length >= 6;

    if (!fontsLoaded) {
        return <View style={{ flex: 1, backgroundColor: '#1a1a3a' }} />;
    }

    const handleScroll = (event: any) => {
        const y = event.nativeEvent.contentOffset.y;
        if (y > 10 && !scrolled) {
            setScrolled(true);
        } else if (y <= 10 && scrolled) {
            setScrolled(false);
        }
    };

    return (
        <AnimatedScreen>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.container}
            >
                <StatusBar style="light" />

                {/* Header Section */}
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Gerayo</Text>
                </View>

                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={[styles.mainScroll, { paddingTop: 120 }]}
                    onScroll={handleScroll}
                    scrollEventThrottle={16}
                >
                    {/* Car Image Section */}
                    <View style={styles.imageContainer}>
                        <Image
                            source={require('../../assets/images/second_car.png')}
                            style={styles.carImage}
                            resizeMode="contain"
                        />
                    </View>

                    {/* Form Section */}
                    <View style={[
                        styles.formContainer,
                        {
                            borderTopLeftRadius: scrolled ? 0 : 56,
                            borderTopRightRadius: scrolled ? 0 : 56,
                        }
                    ]}>
                        <View style={styles.scrollContent}>
                            <Text style={styles.formTitle}>Register your Car</Text>

                            {/* Car Type Toggle */}
                            <Text style={styles.label}>Car Type</Text>
                            <View style={styles.toggleContainer}>
                                <HapticButton
                                    style={[styles.toggleButton, carType === 'old' ? styles.activeToggle : styles.inactiveToggle]}
                                    onPress={() => setCarType('old')}
                                >
                                    <Text style={[styles.toggleText, carType === 'old' ? styles.activeText : styles.inactiveText]}>Old</Text>
                                </HapticButton>

                                <HapticButton
                                    style={[styles.toggleButton, carType === 'modern' ? styles.activeToggle : styles.inactiveToggle]}
                                    onPress={() => setCarType('modern')}
                                >
                                    <Text style={[styles.toggleText, carType === 'modern' ? styles.activeText : styles.inactiveText]}>Modern</Text>
                                </HapticButton>
                            </View>

                            {/* Plate Number Input */}
                            <Text style={styles.label}>Plate number</Text>
                            <View style={styles.plateWrapper}>
                                <View style={styles.plateContainer}>
                                    <View style={styles.countryCode}>
                                        <Text style={styles.countryCodeText}>RW</Text>
                                        <Ionicons name="chevron-down" size={16} color="#fff" />
                                    </View>
                                    <TextInput
                                        style={styles.plateInput}
                                        placeholder=""
                                        placeholderTextColor="#666"
                                        value={plateNumber}
                                        onChangeText={setPlateNumber}
                                        clearButtonMode="while-editing"
                                        autoCapitalize="characters"
                                    />
                                </View>
                                {isPlateValid && (
                                    <Ionicons name="checkmark-circle" size={20} color="#4CAF50" style={styles.inputIcon} />
                                )}
                            </View>

                            {/* Spacer */}
                            <View style={{ height: 40 }} />

                            {/* Continue Button */}
                            <HapticButton
                                style={styles.primaryButton}
                                onPress={() => router.replace('/(tabs)')}
                            >
                                <Text style={styles.primaryButtonText}>Continue</Text>
                            </HapticButton>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </AnimatedScreen>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1a1a3a',
    },
    header: {
        position: 'absolute',
        top: 30,
        left: 0,
        right: 0,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 20,
    },
    headerTitle: {
        fontFamily: 'Cairo_500Medium',
        fontSize: 40,
        fontWeight: '500',
        color: '#FFFFFF',
        textAlign: 'center',
        width: 119,
        height: 22,
        lineHeight: 22,
    },
    imageContainer: {
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    carImage: {
        width: width * 0.8,
        height: 150,
    },
    mainScroll: {
        flexGrow: 1,
    },
    formContainer: {
        backgroundColor: '#D9D9D9',
        borderTopLeftRadius: 56,
        borderTopRightRadius: 56,
        minHeight: Dimensions.get('window').height - 100 - 200 - 20, // Approx remaining height
        // Card Shadow
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 5,
    },
    scrollContent: {
        paddingHorizontal: 32,
        paddingVertical: 32,
        alignItems: 'center',
    },
    formTitle: {
        fontFamily: 'Cairo_500Medium',
        fontSize: 24,
        color: '#333',
        marginBottom: 20,
    },
    label: {
        fontFamily: 'Cairo_500Medium',
        fontSize: 16,
        color: '#666',
        alignSelf: 'center',
        marginBottom: 10,
    },
    toggleContainer: {
        flexDirection: 'row',
        gap: 20,
        marginBottom: 24,
        width: 296,
        justifyContent: 'center',
        alignSelf: 'center',
    },
    toggleButton: {
        flex: 1,
        height: 44,
        borderRadius: 16, // Matching general aesthetic
        justifyContent: 'center',
        alignItems: 'center',
    },
    activeToggle: {
        backgroundColor: '#004080',
    },
    inactiveToggle: {
        backgroundColor: '#fff',
    },
    activeText: {
        color: '#000',
    },
    inactiveText: {
        color: '#000',
    },
    toggleText: {
        fontFamily: 'Cairo_500Medium',
        fontSize: 16,
    },
    plateContainer: {
        flexDirection: 'row',
        width: 296,
        gap: 0, // Touching
        alignSelf: 'center',
    },
    countryCode: {
        backgroundColor: '#4285F4',
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        paddingHorizontal: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 4,
        width: 80,
        height: 44,
    },
    countryCodeText: {
        color: '#fff',
        fontSize: 16,
        fontFamily: 'Cairo_500Medium',
    },
    plateInput: {
        flex: 1,
        backgroundColor: '#fff',
        height: 44,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        paddingHorizontal: 16,
        fontSize: 16,
        fontFamily: 'Cairo_500Medium',
        color: '#333',
        outlineStyle: 'none',
    } as any,
    plateWrapper: {
        width: 296,
        alignSelf: 'center',
        position: 'relative',
        justifyContent: 'center',
    },
    inputIcon: {
        position: 'absolute',
        right: 12,
    },
    primaryButton: {
        backgroundColor: '#004080',
        borderRadius: 25,
        width: 230,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
        elevation: 8,
    },
    primaryButtonText: {
        color: '#fff',
        fontSize: 18,
        fontFamily: 'Cairo_500Medium',
    },
});

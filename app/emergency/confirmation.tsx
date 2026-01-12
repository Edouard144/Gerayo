import { Cairo_500Medium, Cairo_700Bold, useFonts } from '@expo-google-fonts/cairo';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {
    Dimensions,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

const { width } = Dimensions.get('window');

export default function EmergencyConfirmationScreen() {
    const router = useRouter();
    const [fontsLoaded] = useFonts({
        Cairo_500Medium,
        Cairo_700Bold,
    });

    if (!fontsLoaded) {
        return <View style={{ flex: 1, backgroundColor: '#1a1458' }} />;
    }

    return (
        <LinearGradient
            colors={['#1A1458', '#054B8D']}
            locations={[0.68, 1]}
            style={styles.container}
        >
            <StatusBar style="light" />

            {/* Header Section */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Gerayo</Text>
            </View>

            <View style={styles.contentContainer}>
                {/* Success Icon */}
                <View style={styles.iconContainer}>
                    <View style={styles.iconCircle}>
                        <Ionicons name="checkmark" size={60} color="#4CAF50" />
                    </View>
                </View>

                {/* Message Section */}
                <View style={styles.messageBox}>
                    <Text style={styles.title}>Assistance on the Way</Text>
                    <Text style={styles.subtitle}>
                        Your emergency alert has been received. Our team and local authorities have been notified of your location.
                    </Text>
                </View>

                {/* Action Button */}
                <TouchableOpacity
                    style={styles.primaryButton}
                    onPress={() => router.push('/(tabs)')}
                >
                    <Text style={styles.primaryButtonText}>Return Home</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.secondaryButton}
                    onPress={() => router.back()}
                >
                    <Text style={styles.secondaryButtonText}>Back to Emergency</Text>
                </TouchableOpacity>
            </View>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    header: {
        position: 'absolute',
        top: 30,
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
        lineHeight: 40,
    },
    contentContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 30,
        width: '100%',
    },
    iconContainer: {
        marginBottom: 40,
    },
    iconCircle: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 10,
    },
    messageBox: {
        alignItems: 'center',
        marginBottom: 60,
    },
    title: {
        fontFamily: 'Cairo_700Bold',
        fontSize: 28,
        color: '#FFFFFF',
        textAlign: 'center',
        marginBottom: 16,
    },
    subtitle: {
        fontFamily: 'Cairo_500Medium',
        fontSize: 16,
        color: '#D1D1D1',
        textAlign: 'center',
        lineHeight: 24,
    },
    primaryButton: {
        backgroundColor: '#004080',
        borderRadius: 25,
        width: width * 0.7,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
        elevation: 8,
    },
    primaryButtonText: {
        color: '#fff',
        fontSize: 18,
        fontFamily: 'Cairo_500Medium',
    },
    secondaryButton: {
        paddingVertical: 10,
    },
    secondaryButtonText: {
        color: '#FFFFFF',
        fontSize: 14,
        fontFamily: 'Cairo_500Medium',
        textDecorationLine: 'underline',
    },
});

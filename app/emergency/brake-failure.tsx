import { Cairo_500Medium, Cairo_700Bold, useFonts } from '@expo-google-fonts/cairo';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {
    Dimensions,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

const { width } = Dimensions.get('window');

export default function BrakeFailureScreen() {
    const router = useRouter();
    const [fontsLoaded] = useFonts({
        Cairo_500Medium,
        Cairo_700Bold,
    });

    if (!fontsLoaded) {
        return <View style={{ flex: 1, backgroundColor: '#1a1458' }} />;
    }

    const instructions = [
        "Stay Calm: Do not panic; keep your eyes on the road.",
        "Downshift: Shift to a lower gear to use engine braking.",
        "Pump Brakes: Try pumping the brake pedal rapidly to build pressure.",
        "Handbrake: Use the emergency/handbrake gently and gradually.",
        "Hazard Lights: Turn on hazards and use your horn to warn others.",
        "Find a Safe Stop: Look for an open area or an uphill slope to slow down."
    ];

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

            <ScrollView
                contentContainerStyle={styles.scrollContainer}
                showsVerticalScrollIndicator={false}
            >
                {/* Warning Icon */}
                <View style={styles.iconContainer}>
                    <View style={styles.iconCircle}>
                        <MaterialCommunityIcons name="car-brake-alert" size={70} color="#FF3B30" />
                    </View>
                </View>

                {/* Title Section */}
                <View style={styles.messageBox}>
                    <Text style={styles.title}>BRAKE FAILURE</Text>
                    <Text style={styles.subtitle}>
                        Follow these instructions immediately to safely stop your vehicle.
                    </Text>
                </View>

                {/* Instructions List */}
                <View style={styles.instructionsContainer}>
                    {instructions.map((item, index) => (
                        <View key={index} style={styles.instructionItem}>
                            <Ionicons name="alert-circle" size={20} color="#FFD700" style={styles.bulletIcon} />
                            <Text style={styles.instructionText}>{item}</Text>
                        </View>
                    ))}
                </View>

                {/* Action Buttons */}
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={styles.primaryButton}
                        onPress={() => console.log("Calling Emergency Services...")} // Placeholder for call action
                    >
                        <Ionicons name="call" size={24} color="#FFF" style={{ marginRight: 10 }} />
                        <Text style={styles.primaryButtonText}>Call Emergency</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.secondaryActionBtn}
                        onPress={() => router.push('/emergency/confirmation')}
                    >
                        <Ionicons name="notifications" size={24} color="#FFF" style={{ marginRight: 10 }} />
                        <Text style={styles.secondaryButtonText}>Notify Nearby Help</Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => router.back()}
                >
                    <Text style={styles.backButtonText}>Cancel Emergency</Text>
                </TouchableOpacity>
            </ScrollView>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollContainer: {
        alignItems: 'center',
        paddingHorizontal: 30,
        paddingTop: 100,
        paddingBottom: 40,
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
        lineHeight: 40,
    },
    iconContainer: {
        marginBottom: 30,
    },
    iconCircle: {
        width: 130,
        height: 130,
        borderRadius: 65,
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.4,
        shadowRadius: 12,
        elevation: 12,
    },
    messageBox: {
        alignItems: 'center',
        marginBottom: 30,
    },
    title: {
        fontFamily: 'Cairo_700Bold',
        fontSize: 32,
        color: '#FF3B30',
        textAlign: 'center',
        marginBottom: 8,
    },
    subtitle: {
        fontFamily: 'Cairo_500Medium',
        fontSize: 16,
        color: '#E0E0E0',
        textAlign: 'center',
        lineHeight: 24,
    },
    instructionsContainer: {
        width: '100%',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: 20,
        padding: 20,
        marginBottom: 40,
    },
    instructionItem: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 12,
    },
    bulletIcon: {
        marginTop: 4,
        marginRight: 10,
    },
    instructionText: {
        fontFamily: 'Cairo_500Medium',
        fontSize: 15,
        color: '#FFFFFF',
        flex: 1,
        lineHeight: 22,
    },
    buttonContainer: {
        width: '100%',
        alignItems: 'center',
    },
    primaryButton: {
        flexDirection: 'row',
        backgroundColor: '#FF3B30',
        borderRadius: 30,
        width: width * 0.8,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
        elevation: 8,
    },
    primaryButtonText: {
        color: '#fff',
        fontSize: 20,
        fontFamily: 'Cairo_700Bold',
    },
    secondaryActionBtn: {
        flexDirection: 'row',
        backgroundColor: '#004080',
        borderRadius: 30,
        width: width * 0.8,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
        elevation: 8,
    },
    secondaryButtonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontFamily: 'Cairo_500Medium',
    },
    backButton: {
        marginTop: 25,
        padding: 10,
    },
    backButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontFamily: 'Cairo_500Medium',
        textDecorationLine: 'underline',
        opacity: 0.8,
    },
});

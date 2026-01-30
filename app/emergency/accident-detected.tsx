import { Cairo_500Medium, useFonts } from '@expo-google-fonts/cairo';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import {
    Image,
    StyleSheet,
    Text,
    View
} from 'react-native';
import { AnimatedScreen } from '../../components/AnimatedScreen';
import { HapticButton } from '../../components/HapticButton';

export default function AccidentDetectedScreen() {
    const router = useRouter();
    const [fontsLoaded] = useFonts({
        Cairo_500Medium,
    });
    const [countdown, setCountdown] = useState(10);

    useEffect(() => {
        if (countdown > 0) {
            const timer = setTimeout(() => {
                setCountdown(countdown - 1);
            }, 1000);
            return () => clearTimeout(timer);
        } else {
            // Countdown reached 0, trigger emergency alert
            // TODO: Implement emergency alert logic
            console.log('Emergency alert triggered!');
        }
    }, [countdown]);

    if (!fontsLoaded) {
        return <View style={{ flex: 1, backgroundColor: '#1a1458' }} />;
    }

    const handleCancel = () => {
        // Reset countdown or navigate back
        router.back();
    };

    return (
        <View style={{ flex: 1 }}>
            {/* Bottom gradient: A9332F → 1A1458 */}
            <LinearGradient
                colors={['rgba(169, 51, 47, 0.59)', 'rgba(26, 20, 88, 1)']}
                locations={[0.3, 0.54]}
                style={StyleSheet.absoluteFill}
            />

            {/* Top gradient: 1A1458 → 054B8D */}
            <LinearGradient
                colors={['rgba(26, 20, 88, 0.75)', 'rgba(5, 75, 141, 0.75)']}
                locations={[0.47, 1]}
                style={StyleSheet.absoluteFill}
            />

            <AnimatedScreen>
                <StatusBar style="light" />

                <View style={styles.contentContainer}>
                    {/* Warning Icon */}
                    <View style={styles.iconContainer}>
                        <Image
                            source={require('../../assets/images/accident_detected.png')}
                            style={styles.warningIcon}
                            resizeMode="contain"
                        />
                    </View>

                    {/* Title */}
                    <Text style={styles.title}>ACCIDENT DETECTED</Text>

                    {/* Alert Text */}
                    <Text style={styles.alertText}>Sending alert in:</Text>

                    {/* Countdown Circle */}
                    <View style={styles.countdownCircle}>
                        <Text style={styles.countdownText}>{countdown}</Text>
                    </View>

                    {/* Warning Message */}
                    <Text style={styles.warningMessage}>
                        Emergencies will be alerted{'\n'}of your location if you don't cancel
                    </Text>

                    {/* Cancel Button */}
                    <HapticButton
                        style={styles.cancelButton}
                        onPress={handleCancel}
                    >
                        <Text style={styles.cancelButtonText}>CANCEL ALERT</Text>
                    </HapticButton>
                </View>
            </AnimatedScreen>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
    contentContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 30,
    },
    iconContainer: {
        marginBottom: 20,
    },
    warningIcon: {
        width: 96,
        height: 82,
    },
    title: {
        fontFamily: 'Cairo_500Medium',
        fontSize: 24,
        color: '#EE1111',
        textAlign: 'center',
        marginBottom: 30,
        lineHeight: 22,
    },
    alertText: {
        fontFamily: 'Cairo_500Medium',
        fontSize: 20,
        color: '#A99E9E',
        textAlign: 'center',
        marginBottom: 20,
        lineHeight: 22,
    },
    countdownCircle: {
        width: 212,
        height: 201,
        borderRadius: 106,
        backgroundColor: '#9E3737',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 30,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 12,
    },
    countdownText: {
        fontFamily: 'Cairo_500Medium',
        fontSize: 96,
        color: '#FFFFFF',
        fontWeight: '700',
    },
    warningMessage: {
        fontFamily: 'Cairo_500Medium',
        fontSize: 20,
        color: '#A99E9E',
        textAlign: 'center',
        lineHeight: 22,
        marginBottom: 40,
        width: 289,
    },
    cancelButton: {
        width: 356,
        height: 99,
        backgroundColor: '#F49715',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
        elevation: 8,
    },
    cancelButtonText: {
        fontFamily: 'Cairo_500Medium',
        fontSize: 32,
        color: '#000000',
        lineHeight: 22,
    },
});
import { Cairo_500Medium, useFonts } from '@expo-google-fonts/cairo';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function LandingScreen() {
    const router = useRouter();
    const [fontsLoaded] = useFonts({
        Cairo_500Medium,
    });

    if (!fontsLoaded) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#1a1a2e' }}>
                <ActivityIndicator size="large" color="#ffffff" />
            </View>
        );
    }

    const handleChoice = (role: string) => {
        // Here you could save the role if needed
        router.push('/(auth)/welcome');
    };

    return (
        <View style={styles.container}>
            <StatusBar style="light" />
            <LinearGradient
                colors={['#1A1458', '#054B8D']}
                locations={[0.68, 1]}
                style={styles.background}
            />

            <View style={styles.contentContainer}>
                {/* Header Section */}
                <View style={styles.header}>
                    <Text style={styles.title}>Gerayo</Text>
                    <Text style={styles.subtitle}>Gerayo Amahoro</Text>
                </View>

                {/* Car Image */}
                <View style={styles.imageContainer}>
                    <Image
                        source={require('../../assets/images/car-welcome.png')}
                        style={styles.carImage}
                        resizeMode="contain"
                    />
                </View>

                {/* Buttons Section */}
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={styles.primaryButton}
                        onPress={() => handleChoice('driver')}
                    >
                        <Text style={styles.primaryButtonText}>DRIVER</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.secondaryButton}
                        onPress={() => handleChoice('police')}
                    >
                        <Text style={styles.secondaryButtonText}>POLICE WORKER</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
    },
    contentContainer: {
        flex: 1,
        justifyContent: 'space-between',
        paddingTop: 80,
        paddingBottom: 2, // Buttons 2px from bottom
        paddingHorizontal: 20,
    },
    header: {
        alignItems: 'center',
        marginTop: 40,
    },
    title: {
        fontFamily: 'Cairo_500Medium',
        fontSize: 40,
        fontWeight: '500',
        color: '#FFFFFF',
        textAlign: 'center',
        width: 119,
        height: 22,
        lineHeight: 22,
        marginBottom: 8,
    },
    subtitle: {
        fontFamily: 'Cairo_500Medium',
        fontSize: 18,
        color: '#a0a0a0',
        marginTop: 5,
        textAlign: 'center',
    },
    imageContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    carImage: {
        width: 277.47,
        height: 152.46,
    },
    buttonContainer: {
        gap: 15,
        marginBottom: 20,
    },
    primaryButton: {
        backgroundColor: '#0056b3',
        paddingVertical: 18,
        borderRadius: 12,
        alignItems: 'center',
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
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
        letterSpacing: 1,
    },
    secondaryButton: {
        backgroundColor: '#e0e0e0',
        paddingVertical: 18,
        borderRadius: 12,
        alignItems: 'center',
    },
    secondaryButtonText: {
        color: '#0056b3',
        fontSize: 14,
        fontWeight: '600',
        letterSpacing: 0.5,
    },
});

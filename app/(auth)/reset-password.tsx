import { Cairo_500Medium, useFonts } from '@expo-google-fonts/cairo';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
    Dimensions,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { AnimatedScreen } from '../../components/AnimatedScreen';
import { HapticButton } from '../../components/HapticButton';

const { width } = Dimensions.get('window');

export default function ResetPasswordScreen() {
    const router = useRouter();
    const [fontsLoaded] = useFonts({
        Cairo_500Medium,
    });

    const [scrolled, setScrolled] = useState(false);
    const [email, setEmail] = useState('');
    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

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
        <LinearGradient
            colors={['#1A1458', '#054B8D']}
            locations={[0.68, 1]}
            style={styles.container}
        >
            <AnimatedScreen>
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
                >
                    <StatusBar style="light" />

                    {/* Header Section */}
                    <View style={styles.header}>
                        <Text style={styles.headerTitle}>Gerayo</Text>
                    </View>

                    {/* Form Section */}
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={styles.mainScroll}
                        onScroll={handleScroll}
                        scrollEventThrottle={16}
                    >
                        <View style={[
                            styles.formContainer,
                            {
                                borderTopLeftRadius: scrolled ? 0 : 31,
                                borderTopRightRadius: scrolled ? 0 : 31,
                            }
                        ]}>
                            <View style={styles.scrollContent}>
                                <Text style={styles.formTitle}>Reset Password</Text>

                                <Text style={styles.description}>
                                    Enter the email address associated with your account and we'll send you a link to reset your password.
                                </Text>

                                <View style={styles.inputGroup}>
                                    <View style={styles.inputWrapper}>
                                        <TextInput
                                            placeholder="Email"
                                            style={styles.input}
                                            placeholderTextColor="#666"
                                            keyboardType="email-address"
                                            autoCapitalize="none"
                                            value={email}
                                            onChangeText={setEmail}
                                            clearButtonMode="while-editing"
                                        />
                                        {isEmailValid && (
                                            <Ionicons name="checkmark-circle" size={20} color="#4CAF50" style={styles.inputIcon} />
                                        )}
                                    </View>
                                </View>

                                <HapticButton
                                    style={styles.primaryButton}
                                    onPress={() => router.push('/(auth)/verify-code')}
                                >
                                    <Text style={styles.primaryButtonText}>Continue</Text>
                                </HapticButton>

                                <TouchableOpacity onPress={() => router.push('/(auth)/login')}>
                                    <Text style={styles.returnLink}>Return to sing in</Text>
                                </TouchableOpacity>

                                <View style={styles.createAccountContainer}>
                                    <Text style={styles.createAccountText}>Create a </Text>
                                    <TouchableOpacity onPress={() => router.push('/(auth)/register')}>
                                        <Text style={styles.createAccountLink}>New account</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </AnimatedScreen>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center', // Center content vertically
        alignItems: 'center',     // Center content horizontally
    },
    header: {
        position: 'absolute',
        top: 30,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
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
    mainScroll: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    formContainer: {
        width: 389,
        height: 364,
        backgroundColor: '#D9D9D9',
        borderRadius: 31,
        borderTopRightRadius: 31,
        borderTopLeftRadius: 31,
        borderBottomRightRadius: 31,
        borderBottomLeftRadius: 31,
        overflow: 'hidden',
        // Card Shadow
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 5,
    },
    scrollContent: {
        paddingHorizontal: 24, // Reduced padding for smaller card
        paddingVertical: 20,
        alignItems: 'center',
        flexGrow: 1,
        justifyContent: 'center',
    },
    formTitle: {
        fontFamily: 'Cairo_500Medium',
        fontSize: 24,
        color: '#333',
        textAlign: 'center',
        marginBottom: 12, // Reduced spacing
    },
    description: {
        fontFamily: 'Cairo_500Medium',
        fontSize: 14,
        color: '#666',
        textAlign: 'center',
        marginBottom: 20, // Reduced spacing
        lineHeight: 18,
        paddingHorizontal: 10,
    },
    inputGroup: {
        width: '100%',
        marginBottom: 20,
        alignItems: 'center',
    },
    input: {
        backgroundColor: '#fff',
        borderRadius: 10,
        paddingHorizontal: 16,
        height: 44,
        fontSize: 16,
        fontFamily: 'Cairo_500Medium',
        color: '#333',
        width: 296, // Keep input width? Card is 389. 296 fits.
        alignSelf: 'center',
        outlineStyle: 'none',
    } as any,
    inputWrapper: {
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
        width: 296,
        height: 46, // Reduced height slightly to fit? Or keep 50.
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
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
    returnLink: {
        color: '#004080',
        fontSize: 16,
        fontFamily: 'Cairo_500Medium',
        marginBottom: 20,
    },
    createAccountContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    createAccountText: {
        color: '#666',
        fontSize: 14,
        fontFamily: 'Cairo_500Medium',
    },
    createAccountLink: {
        color: '#004080',
        fontSize: 14,
        fontFamily: 'Cairo_500Medium', // No bold in screenshot explicitly, usually link color is enough
    },
});

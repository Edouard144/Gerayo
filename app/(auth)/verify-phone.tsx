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

export default function VerifyPhoneScreen() {
    const router = useRouter();
    const [fontsLoaded] = useFonts({
        Cairo_500Medium,
    });

    const [scrolled, setScrolled] = useState(false);
    const [phone, setPhone] = useState('');
    const isPhoneValid = phone.length >= 10;

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
                                <Text style={styles.formTitle}>Verify Phone number</Text>

                                <Text style={styles.description}>
                                    We have sent you an SMS with a code to number
                                </Text>

                                <View style={styles.inputGroup}>
                                    <View style={styles.phoneWrapper}>
                                        <View style={styles.phoneContainer}>
                                            <TouchableOpacity style={styles.countryCode}>
                                                <Text style={styles.countryCodeText}>RW</Text>
                                                <Ionicons name="chevron-down" size={16} color="#fff" />
                                            </TouchableOpacity>
                                            <TextInput
                                                placeholder="Phone number"
                                                style={[styles.input, styles.phoneInput]}
                                                keyboardType="phone-pad"
                                                placeholderTextColor="#666"
                                                value={phone}
                                                onChangeText={setPhone}
                                                clearButtonMode="while-editing"
                                            />
                                        </View>
                                        {isPhoneValid && (
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
        justifyContent: 'center',
        alignItems: 'center',
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
        height: 292,
        backgroundColor: '#D9D9D9',
        borderRadius: 31,
        borderTopRightRadius: 31,
        borderTopLeftRadius: 31,
        borderBottomRightRadius: 31,
        borderBottomLeftRadius: 31,
        overflow: 'hidden',
        opacity: 1,
        // Card Shadow
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 5,
    },
    scrollContent: {
        paddingHorizontal: 24,
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
        marginBottom: 12,
    },
    description: {
        fontFamily: 'Cairo_500Medium',
        fontSize: 14,
        color: '#666',
        textAlign: 'center',
        marginBottom: 20, // More gap before input
        lineHeight: 18,
        paddingHorizontal: 20,
    },
    inputGroup: {
        width: '100%',
        marginBottom: 24,
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
        width: 296,
        alignSelf: 'center',
        outlineStyle: 'none',
    } as any,
    phoneWrapper: {
        width: 296,
        alignSelf: 'center',
        position: 'relative',
        justifyContent: 'center',
    },
    inputIcon: {
        position: 'absolute',
        right: 12,
    },
    phoneContainer: {
        flexDirection: 'row',
        gap: 0,
        width: 296,
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
    phoneInput: {
        flex: 1,
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
        width: undefined,
    },
    primaryButton: {
        backgroundColor: '#004080',
        borderRadius: 25,
        width: 296,
        height: 46,
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
});

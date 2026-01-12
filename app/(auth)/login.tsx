import { Cairo_500Medium, Cairo_700Bold, useFonts } from '@expo-google-fonts/cairo';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useRef, useState } from 'react';
import {
    Dimensions,
    Image,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';
import { AnimatedScreen } from '../../components/AnimatedScreen';
import { HapticButton } from '../../components/HapticButton';

const { width } = Dimensions.get('window');

export default function LoginScreen() {
    const router = useRouter();
    const [fontsLoaded] = useFonts({
        Cairo_500Medium,
        Cairo_700Bold,
    });

    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    // Form refs for auto-focus
    const phoneRef = useRef<TextInput>(null);
    const passwordRef = useRef<TextInput>(null);

    // Validation state for success checkmarks
    const [fullName, setFullName] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');

    const isFullNameValid = fullName.length > 2;
    const isPhoneValid = phone.length >= 10;
    const isPasswordValid = password.length >= 6;

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
                    style={{ flex: 1 }}
                >
                    <StatusBar style="light" />

                    {/* Header Section */}
                    <View style={styles.header}>
                        <Text style={styles.headerTitle}>Gerayo</Text>
                    </View>

                    {/* Form Section */}
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={[styles.mainScroll, { paddingTop: 120 }]}
                        onScroll={handleScroll}
                        scrollEventThrottle={16}
                    >
                        <View style={[
                            styles.formContainer,
                            {
                                borderTopLeftRadius: scrolled ? 0 : 56,
                                borderTopRightRadius: scrolled ? 0 : 56,
                            }
                        ]}>
                            <View style={styles.scrollContent}>
                                <Text style={styles.formTitle}>Welcome Back</Text>

                                <View style={styles.inputGroup}>
                                    <View style={styles.inputWrapper}>
                                        <TextInput
                                            placeholder="Full names"
                                            style={styles.input}
                                            placeholderTextColor="#666"
                                            value={fullName}
                                            onChangeText={setFullName}
                                            returnKeyType="next"
                                            onSubmitEditing={() => phoneRef.current?.focus()}
                                            clearButtonMode="while-editing"
                                        />
                                        {isFullNameValid && (
                                            <Ionicons name="checkmark-circle" size={20} color="#4CAF50" style={styles.inputIcon} />
                                        )}
                                    </View>

                                    <View style={styles.inputWrapper}>
                                        <TextInput
                                            ref={phoneRef}
                                            placeholder="Phone number"
                                            style={styles.input}
                                            keyboardType="phone-pad"
                                            placeholderTextColor="#666"
                                            value={phone}
                                            onChangeText={setPhone}
                                            returnKeyType="next"
                                            onSubmitEditing={() => passwordRef.current?.focus()}
                                            clearButtonMode="while-editing"
                                        />
                                        {isPhoneValid && (
                                            <Ionicons name="checkmark-circle" size={20} color="#4CAF50" style={styles.inputIcon} />
                                        )}
                                    </View>

                                    <View style={styles.passwordContainer}>
                                        <TextInput
                                            ref={passwordRef}
                                            placeholder="Password"
                                            style={styles.passwordInput}
                                            secureTextEntry={!showPassword}
                                            placeholderTextColor="#666"
                                            value={password}
                                            onChangeText={setPassword}
                                            returnKeyType="done"
                                            clearButtonMode="while-editing"
                                        />
                                        <View style={styles.passwordActions}>
                                            {isPasswordValid && (
                                                <Ionicons name="checkmark-circle" size={20} color="#4CAF50" style={{ marginRight: 8 }} />
                                            )}
                                            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                                                <Image
                                                    source={require('../../assets/images/Group 547.png')}
                                                    style={{ width: 15, height: 7.53, tintColor: '#7F7F7F' }}
                                                    resizeMode="contain"
                                                />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>

                                <View style={styles.optionsRow}>
                                    <TouchableOpacity
                                        style={styles.rememberMe}
                                        onPress={() => setRememberMe(!rememberMe)}
                                    >
                                        <View style={[styles.checkbox, rememberMe && styles.checkboxChecked]}>
                                            {rememberMe && <Ionicons name="checkmark" size={12} color="#fff" />}
                                        </View>
                                        <Text style={styles.optionText}>Remember Me</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity onPress={() => router.push('/(auth)/reset-password')}>
                                        <Text style={styles.forgotPassword}>Forgot Password</Text>
                                    </TouchableOpacity>
                                </View>

                                <HapticButton
                                    style={styles.primaryButton}
                                    onPress={() => router.replace('/(tabs)')}
                                >
                                    <Text style={styles.primaryButtonText}>Log In</Text>
                                </HapticButton>

                                <View style={styles.dividerContainer}>
                                    <Text style={styles.dividerText}>Continue with</Text>
                                </View>

                                <View style={styles.socialContainer}>
                                    <HapticButton style={styles.socialButton}>
                                        <Ionicons name="logo-google" size={24} color="#FFF" />
                                    </HapticButton>
                                    <HapticButton style={styles.socialButton}>
                                        <Ionicons name="logo-apple" size={24} color="#FFF" />
                                    </HapticButton>
                                </View>

                                <View style={styles.loginContainer}>
                                    <Text style={styles.loginText}>Don't have an account? </Text>
                                    <TouchableOpacity onPress={() => router.push('/(auth)/register')}>
                                        <Text style={styles.loginLink}>Sign Up.</Text>
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
        // backgroundColor: '#1a1a3a', // Handled by LinearGradient
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
    mainScroll: {
        flexGrow: 1,
    },
    formContainer: {
        marginTop: 72,
        backgroundColor: '#D9D9D9',
        borderTopLeftRadius: 56,
        borderTopRightRadius: 56,
        minHeight: Dimensions.get('window').height - 120 - 72,
        // Card Shadow
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 5,
    },
    scrollContent: {
        paddingHorizontal: 32, // Match register.tsx padding
        paddingVertical: 24,
    },
    formTitle: {
        fontFamily: 'Cairo_500Medium',
        fontSize: 24,
        color: '#333',
        textAlign: 'center',
        marginBottom: 24,
    },
    inputGroup: {
        gap: 16,
    },
    input: {
        backgroundColor: '#fff',
        borderRadius: 10,
        paddingHorizontal: 16,
        height: 44,
        fontSize: 16,
        fontFamily: 'Cairo_500Medium',
        color: '#333',
        outlineStyle: 'none',
    } as any,
    passwordContainer: {
        backgroundColor: '#fff',
        borderRadius: 10,
        paddingHorizontal: 16,
        height: 44,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        outlineStyle: 'none',
    } as any,
    passwordInput: {
        flex: 1,
        fontSize: 16,
        fontFamily: 'Cairo_500Medium',
        color: '#333',
        marginRight: 10,
        outlineStyle: 'none',
    } as any,
    inputWrapper: {
        position: 'relative',
        justifyContent: 'center',
    },
    inputIcon: {
        position: 'absolute',
        right: 12,
    },
    passwordActions: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    optionsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 16,
        marginBottom: 24,
    },
    rememberMe: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    checkbox: {
        width: 20,
        height: 20,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#0056b3',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    checkboxChecked: {
        backgroundColor: '#0056b3',
    },
    optionText: {
        color: '#666',
        fontSize: 14,
        fontFamily: 'Cairo_500Medium',
    },
    forgotPassword: {
        color: '#0056b3',
        fontSize: 14,
        fontFamily: 'Cairo_500Medium',
    },
    primaryButton: {
        backgroundColor: '#004080',
        borderRadius: 25,
        width: 138, // Match visual of smaller button (Create Account size)
        height: 46,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginBottom: 24,
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
    dividerContainer: {
        alignItems: 'center',
        marginBottom: 16,
    },
    dividerText: {
        color: '#666',
        fontSize: 20, // Match user preference
        fontFamily: 'Cairo_500Medium',
    },
    socialContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 20,
        marginBottom: 30,
    },
    socialButton: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#004080', // Match new color
        justifyContent: 'center',
        alignItems: 'center',
    },
    loginContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    loginText: {
        color: '#999',
        fontSize: 14,
        fontFamily: 'Cairo_500Medium',
    },
    loginLink: {
        color: '#004080',
        fontSize: 14,
        fontFamily: 'Cairo_700Bold',
    },
});

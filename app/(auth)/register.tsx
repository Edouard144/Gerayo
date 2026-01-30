import { Cairo_500Medium, Cairo_700Bold, useFonts } from '@expo-google-fonts/cairo';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useRef, useState } from 'react';
import {
    Image,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    useWindowDimensions,
    View
} from 'react-native';
import { AnimatedScreen } from '../../components/AnimatedScreen';
import { HapticButton } from '../../components/HapticButton';

export default function RegisterScreen() {
    const { height: screenHeight, width: screenWidth } = useWindowDimensions();
    const router = useRouter();
    const [fontsLoaded] = useFonts({
        Cairo_500Medium,
        Cairo_700Bold,
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    // Form refs for auto-focus
    const phoneRef = useRef<TextInput>(null);
    const emailRef = useRef<TextInput>(null);
    const passwordRef = useRef<TextInput>(null);
    const confirmPasswordRef = useRef<TextInput>(null);

    // Validation state for success checkmarks
    const [fullName, setFullName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const isFullNameValid = fullName.length > 2;
    const isPhoneValid = phone.length >= 10;
    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const isPasswordValid = password.length >= 6;
    const isConfirmPasswordValid = confirmPassword.length >= 6 && confirmPassword === password;

    // Responsive scaling helpers
    const h = (size: number) => (size / 812) * screenHeight; // Based on iPhone X/11/12/13/14 height
    const w = (size: number) => (size / 375) * screenWidth; // Based on iPhone X/11/12/13/14 width
    const moderateScale = (size: number, factor = 0.5) => size + (h(size) - size) * factor;

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

    const dynamicStyles = {
        formContainer: {
            borderTopLeftRadius: scrolled ? 0 : h(56),
            borderTopRightRadius: scrolled ? 0 : h(56),
            minHeight: screenHeight - h(100),
        },
        headerText: {
            fontSize: moderateScale(40),
            height: moderateScale(30),
            lineHeight: moderateScale(30),
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
                    <View style={[styles.header, { top: h(30) }]}>
                        <Text style={[styles.headerTitle, dynamicStyles.headerText]}>Gerayo</Text>
                    </View>

                    {/* Form Section */}
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={[styles.mainScroll, { paddingTop: h(100) }]}
                        onScroll={handleScroll}
                        scrollEventThrottle={16}
                        bounces={false}
                    >
                        <View style={[
                            styles.formContainer,
                            dynamicStyles.formContainer
                        ]}>
                            <View style={[styles.scrollContent, { paddingTop: h(24), paddingBottom: h(20) }]}>
                                <Text style={[styles.formTitle, { fontSize: moderateScale(24), marginBottom: h(20) }]}>Create Account</Text>

                                <View style={[styles.inputGroup, { gap: h(12) }]}>
                                    <View style={styles.inputWrapper}>
                                        <TextInput
                                            placeholder="Full names"
                                            style={[styles.input, { height: h(44), fontSize: moderateScale(16) }]}
                                            placeholderTextColor="#666"
                                            value={fullName}
                                            onChangeText={setFullName}
                                            returnKeyType="next"
                                            onSubmitEditing={() => phoneRef.current?.focus()}
                                            clearButtonMode="while-editing"
                                        />
                                        {isFullNameValid && (
                                            <Ionicons name="checkmark-circle" size={moderateScale(20)} color="#4CAF50" style={styles.inputIcon} />
                                        )}
                                    </View>

                                    <View style={[styles.phoneWrapper, { height: h(44) }]}>
                                        <View style={[styles.phoneContainer]}>
                                            <TouchableOpacity style={[styles.countryCode, { height: h(44), width: w(80) }]}>
                                                <Text style={[styles.countryCodeText, { fontSize: moderateScale(16) }]}>RW</Text>
                                                <Ionicons name="chevron-down" size={moderateScale(16)} color="#fff" />
                                            </TouchableOpacity>
                                            <TextInput
                                                ref={phoneRef}
                                                placeholder="Phone number"
                                                style={[styles.input, styles.phoneInput, { height: h(44), fontSize: moderateScale(16) }]}
                                                keyboardType="phone-pad"
                                                placeholderTextColor="#666"
                                                value={phone}
                                                onChangeText={setPhone}
                                                returnKeyType="next"
                                                onSubmitEditing={() => emailRef.current?.focus()}
                                                clearButtonMode="while-editing"
                                            />
                                        </View>
                                        {isPhoneValid && (
                                            <Ionicons name="checkmark-circle" size={moderateScale(20)} color="#4CAF50" style={styles.inputIcon} />
                                        )}
                                    </View>

                                    <View style={styles.inputWrapper}>
                                        <TextInput
                                            ref={emailRef}
                                            placeholder="Email"
                                            style={[styles.input, { height: h(44), fontSize: moderateScale(16) }]}
                                            keyboardType="email-address"
                                            placeholderTextColor="#666"
                                            autoCapitalize="none"
                                            value={email}
                                            onChangeText={setEmail}
                                            returnKeyType="next"
                                            onSubmitEditing={() => passwordRef.current?.focus()}
                                            clearButtonMode="while-editing"
                                        />
                                        {isEmailValid && (
                                            <Ionicons name="checkmark-circle" size={moderateScale(20)} color="#4CAF50" style={styles.inputIcon} />
                                        )}
                                    </View>

                                    <View style={[styles.passwordContainer, { height: h(44) }]}>
                                        <TextInput
                                            ref={passwordRef}
                                            placeholder="Password"
                                            style={[styles.passwordInput, { fontSize: moderateScale(16) }]}
                                            secureTextEntry={!showPassword}
                                            placeholderTextColor="#666"
                                            value={password}
                                            onChangeText={setPassword}
                                            returnKeyType="next"
                                            onSubmitEditing={() => confirmPasswordRef.current?.focus()}
                                            clearButtonMode="while-editing"
                                        />
                                        <View style={styles.passwordActions}>
                                            {isPasswordValid && (
                                                <Ionicons name="checkmark-circle" size={moderateScale(20)} color="#4CAF50" style={{ marginRight: 8 }} />
                                            )}
                                            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                                                <Image
                                                    source={require('../../assets/images/Group 547.png')}
                                                    style={{ width: w(15), height: h(7.5), tintColor: '#7F7F7F' }}
                                                    resizeMode="contain"
                                                />
                                            </TouchableOpacity>
                                        </View>
                                    </View>

                                    <View style={[styles.passwordContainer, { height: h(44) }]}>
                                        <TextInput
                                            ref={confirmPasswordRef}
                                            placeholder="Confirm Password"
                                            style={[styles.passwordInput, { fontSize: moderateScale(16) }]}
                                            secureTextEntry={!showConfirmPassword}
                                            placeholderTextColor="#666"
                                            value={confirmPassword}
                                            onChangeText={setConfirmPassword}
                                            returnKeyType="done"
                                            clearButtonMode="while-editing"
                                        />
                                        <View style={styles.passwordActions}>
                                            {isConfirmPasswordValid && (
                                                <Ionicons name="checkmark-circle" size={moderateScale(20)} color="#4CAF50" style={{ marginRight: 8 }} />
                                            )}
                                            <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                                                <Image
                                                    source={require('../../assets/images/Group 547.png')}
                                                    style={{ width: w(15), height: h(7.5), tintColor: '#7F7F7F' }}
                                                    resizeMode="contain"
                                                />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>

                                <View style={[styles.optionsRow, { marginTop: h(12), marginBottom: h(20) }]}>
                                    <TouchableOpacity
                                        style={styles.rememberMe}
                                        onPress={() => setRememberMe(!rememberMe)}
                                    >
                                        <View style={[styles.checkbox, { width: moderateScale(18), height: moderateScale(18) }, rememberMe && styles.checkboxChecked]}>
                                            {rememberMe && <Ionicons name="checkmark" size={moderateScale(12)} color="#fff" />}
                                        </View>
                                        <Text style={[styles.optionText, { fontSize: moderateScale(14) }]}>Remember Me</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity>
                                        <Text style={[styles.forgotPassword, { fontSize: moderateScale(14) }]}>Forgot Password</Text>
                                    </TouchableOpacity>
                                </View>

                                <HapticButton
                                    style={[styles.primaryButton, { height: h(46), width: w(138), marginBottom: h(20) }]}
                                    onPress={() => router.push('/(auth)/verify-phone')}
                                >
                                    <Text style={[styles.primaryButtonText, { fontSize: moderateScale(16) }]}>Create Account</Text>
                                </HapticButton>

                                <View style={[styles.dividerContainer, { marginBottom: h(12) }]}>
                                    <Text style={[styles.dividerText, { fontSize: moderateScale(20) }]}>Continue with</Text>
                                </View>

                                <View style={[styles.socialContainer, { gap: w(20), marginBottom: h(24) }]}>
                                    <HapticButton style={[styles.socialButton, { width: h(44), height: h(44), borderRadius: h(22) }]}>
                                        <Ionicons name="logo-google" size={moderateScale(20)} color="#FFF" />
                                    </HapticButton>
                                    <HapticButton style={[styles.socialButton, { width: h(44), height: h(44), borderRadius: h(22) }]}>
                                        <Ionicons name="logo-apple" size={moderateScale(20)} color="#FFF" />
                                    </HapticButton>
                                </View>

                                <View style={styles.loginContainer}>
                                    <Text style={[styles.loginText, { fontSize: moderateScale(14) }]}>Already have an account? </Text>
                                    <TouchableOpacity onPress={() => router.push('/(auth)/login')}>
                                        <Text style={[styles.loginLink, { fontSize: moderateScale(14) }]}>Login.</Text>
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
    },
    header: {
        position: 'absolute',
        left: 0,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 20,
    },
    headerTitle: {
        fontFamily: 'Cairo_500Medium',
        fontWeight: '500',
        color: '#FFFFFF',
        textAlign: 'center',
    },
    mainScroll: {
        flexGrow: 1,
    },
    formContainer: {
        backgroundColor: '#D9D9D9',
        flex: 1,
        borderWidth: 1,
        borderColor: '#000000',
        opacity: 1,
        // Card Shadow
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 5,
    },
    scrollContent: {
        paddingHorizontal: 32,
    },
    formTitle: {
        fontFamily: 'Cairo_500Medium',
        color: '#333',
        textAlign: 'center',
    },
    inputGroup: {
    },
    input: {
        backgroundColor: '#fff',
        borderRadius: 10,
        paddingHorizontal: 16,
        fontFamily: 'Cairo_500Medium',
        color: '#333',
        width: '100%',
        maxWidth: 296,
        alignSelf: 'center',
        outlineStyle: 'none',
    } as any,
    inputWrapper: {
        width: '100%',
        maxWidth: 296,
        alignSelf: 'center',
        position: 'relative',
        justifyContent: 'center',
    },
    phoneWrapper: {
        width: '100%',
        maxWidth: 296,
        alignSelf: 'center',
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
    phoneContainer: {
        flexDirection: 'row',
        width: '100%',
        maxWidth: 296,
        alignSelf: 'center',
    },
    countryCode: {
        backgroundColor: '#4285F4',
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 4,
    },
    countryCodeText: {
        color: '#fff',
        fontFamily: 'Cairo_500Medium',
    },
    phoneInput: {
        flex: 1,
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
    },
    passwordContainer: {
        backgroundColor: '#fff',
        borderRadius: 10,
        paddingHorizontal: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        maxWidth: 296,
        alignSelf: 'center',
        outlineStyle: 'none',
    } as any,
    passwordInput: {
        flex: 1,
        fontFamily: 'Cairo_500Medium',
        color: '#333',
        marginRight: 10,
        outlineStyle: 'none',
    } as any,
    optionsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        maxWidth: 296,
        alignSelf: 'center',
    },
    rememberMe: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    checkbox: {
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
        fontFamily: 'Cairo_500Medium',
    },
    forgotPassword: {
        color: '#0056b3',
        fontFamily: 'Cairo_500Medium',
    },
    primaryButton: {
        backgroundColor: '#004080',
        borderRadius: 25,
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
        fontFamily: 'Cairo_400Medium',
    },
    dividerContainer: {
        alignItems: 'center',
    },
    dividerText: {
        color: '#666',
        fontFamily: 'Cairo_500Medium',
    },
    socialContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    socialButton: {
        backgroundColor: '#004080',
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
        fontFamily: 'Cairo_500Medium',
    },
    loginLink: {
        color: '#004080',
        fontFamily: 'Cairo_700Bold',
    },
});

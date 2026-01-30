import { Cairo_500Medium, Cairo_700Bold, useFonts } from '@expo-google-fonts/cairo';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
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
import { AnimatedScreen } from '../../../components/AnimatedScreen';
import { HapticButton } from '../../../components/HapticButton';

export default function DriverSignUpScreen() {
    const router = useRouter();
    const { height: screenHeight, width: screenWidth } = useWindowDimensions();
    const [fontsLoaded] = useFonts({
        Cairo_500Medium,
        Cairo_700Bold,
    });

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [agreed, setAgreed] = useState(false);

    // Responsive helpers
    const h = (size: number) => (size / 812) * screenHeight;
    const w = (size: number) => (size / 375) * screenWidth;
    const moderateScale = (size: number, factor = 0.5) => size + (h(size) - size) * factor;

    if (!fontsLoaded) {
        return <View style={{ flex: 1, backgroundColor: '#fff' }} />;
    }

    return (
        <View style={styles.container}>
            <AnimatedScreen>
                <StatusBar style="dark" />
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={{ flex: 1 }}
                >
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={styles.scrollContent}
                    >
                        {/* Header */}
                        <View style={styles.header}>
                            <Text style={[styles.headerTitle, { fontSize: moderateScale(32) }]}>Sign Up</Text>
                        </View>

                        {/* Form */}
                        <View style={styles.formContainer}>
                            {/* First Name */}
                            <View style={styles.inputGroup}>
                                <Text style={styles.label}>First Name</Text>
                                <TextInput
                                    style={[styles.input, { height: h(50) }]}
                                    value={firstName}
                                    onChangeText={setFirstName}
                                    placeholder=""
                                    placeholderTextColor="#999"
                                />
                            </View>

                            {/* Last Name */}
                            <View style={styles.inputGroup}>
                                <Text style={styles.label}>Last Name</Text>
                                <TextInput
                                    style={[styles.input, { height: h(50) }]}
                                    value={lastName}
                                    onChangeText={setLastName}
                                    placeholder=""
                                    placeholderTextColor="#999"
                                />
                            </View>

                            {/* Email */}
                            <View style={styles.inputGroup}>
                                <Text style={styles.label}>Email</Text>
                                <TextInput
                                    style={[styles.input, { height: h(50) }]}
                                    value={email}
                                    onChangeText={setEmail}
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                    placeholder=""
                                    placeholderTextColor="#999"
                                />
                            </View>

                            {/* Password */}
                            <View style={styles.inputGroup}>
                                <Text style={styles.label}>Password</Text>
                                <TextInput
                                    style={[styles.input, { height: h(50) }]}
                                    value={password}
                                    onChangeText={setPassword}
                                    secureTextEntry
                                    placeholder=""
                                    placeholderTextColor="#999"
                                />
                            </View>

                            {/* Terms Checkbox */}
                            <TouchableOpacity
                                style={styles.checkboxContainer}
                                onPress={() => setAgreed(!agreed)}
                            >
                                <View style={[styles.checkbox, agreed && styles.checkboxChecked]}>
                                    {agreed && <Ionicons name="checkmark" size={16} color="#fff" />}
                                </View>
                                <Text style={styles.checkboxLabel}>I agree to the Term and conditions</Text>
                            </TouchableOpacity>

                            {/* Sign Up Button */}
                            <HapticButton
                                style={[styles.signUpButton, { height: h(50) }]}
                                onPress={() => router.push('/(auth)/verify-phone')}
                            >
                                <Text style={styles.signUpButtonText}>Sign Up</Text>
                            </HapticButton>

                            {/* Social Signup */}
                            <View style={styles.socialSection}>
                                <Text style={styles.socialLabel}>Sign Up with</Text>
                                <View style={styles.socialIcons}>
                                    <TouchableOpacity style={styles.socialIcon}>
                                        <Ionicons name="logo-apple" size={32} color="#000" />
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.socialIcon}>
                                        <Ionicons name="logo-instagram" size={32} color="#000" />
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.socialIcon}>
                                        {/* X Logo fallback or custom icon */}
                                        <Text style={{ fontSize: 28, fontWeight: 'bold' }}>X</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </AnimatedScreen>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    scrollContent: {
        flexGrow: 1,
        paddingHorizontal: 30,
        paddingTop: 60,
        paddingBottom: 40,
    },
    header: {
        alignItems: 'center',
        marginBottom: 40,
    },
    headerTitle: {
        fontFamily: 'Cairo_700Bold',
        color: '#004080', // Dark Blue
        textAlign: 'center',
    },
    formContainer: {
        width: '100%',
    },
    inputGroup: {
        marginBottom: 20,
    },
    label: {
        fontFamily: 'Cairo_500Medium',
        fontSize: 16,
        color: '#004080', // Blue label
        marginBottom: 8,
    },
    input: {
        backgroundColor: '#D9D9D9', // Gray background
        borderRadius: 10,
        paddingHorizontal: 16,
        fontSize: 16,
        fontFamily: 'Cairo_500Medium',
        color: '#000',
        width: '100%',
    } as any,
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 30,
        marginTop: 10,
    },
    checkbox: {
        width: 20,
        height: 20,
        backgroundColor: '#D9D9D9',
        borderRadius: 4,
        marginRight: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkboxChecked: {
        backgroundColor: '#004080',
    },
    checkboxLabel: {
        fontFamily: 'Cairo_500Medium',
        fontSize: 14,
        color: '#000',
    },
    signUpButton: {
        backgroundColor: '#002E66', // Deep Blue
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 40,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 6,
    },
    signUpButtonText: {
        color: '#fff',
        fontSize: 18,
        fontFamily: 'Cairo_500Medium',
    },
    socialSection: {
        alignItems: 'center',
    },
    socialLabel: {
        fontFamily: 'Cairo_500Medium',
        fontSize: 16,
        color: '#000',
        marginBottom: 20,
    },
    socialIcons: {
        flexDirection: 'row',
        gap: 40,
        alignItems: 'center',
    },
    socialIcon: {
        justifyContent: 'center',
        alignItems: 'center',
    },
});

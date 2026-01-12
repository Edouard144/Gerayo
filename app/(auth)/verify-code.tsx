import { Cairo_500Medium, Cairo_700Bold, useFonts } from '@expo-google-fonts/cairo';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
    Dimensions,
    ScrollView,
    StyleSheet,
    Text,
    View
} from 'react-native';
import { AnimatedScreen } from '../../components/AnimatedScreen';
import { HapticButton } from '../../components/HapticButton';

const { width } = Dimensions.get('window');

export default function VerifyCodeScreen() {
    const router = useRouter();
    const [fontsLoaded] = useFonts({
        Cairo_500Medium,
        Cairo_700Bold,
    });
    const [code, setCode] = useState(['', '', '', '']);
    const [scrolled, setScrolled] = useState(false);

    const handleKeyPress = (key: string) => {
        if (key === 'backspace') {
            setCode(prev => {
                const newCode = [...prev];
                // Find last filled index
                const lastIndex = newCode.map((val, i) => val !== '' ? i : -1).filter(i => i !== -1).pop();
                if (lastIndex !== undefined) {
                    newCode[lastIndex] = '';
                }
                return newCode;
            });
        } else {
            setCode(prev => {
                const newCode = [...prev];
                const firstEmptyIndex = newCode.indexOf('');
                if (firstEmptyIndex !== -1) {
                    newCode[firstEmptyIndex] = key;
                }
                return newCode;
            });
        }
    };

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

    const Key = ({ value, label }: { value: string, label?: React.ReactNode }) => (
        <HapticButton
            style={styles.key}
            onPress={() => handleKeyPress(value)}
        >
            <Text style={styles.keyText}>{label || value}</Text>
        </HapticButton>
    );

    return (
        <LinearGradient
            colors={['#1A1458', '#054B8D']}
            locations={[0.68, 1]}
            style={styles.container}
        >
            <AnimatedScreen>
                <StatusBar style="light" />

                {/* Header Section */}
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Gerayo</Text>
                </View>

                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.mainScroll}
                    onScroll={handleScroll}
                    scrollEventThrottle={16}
                >
                    <View style={styles.cardsWrapper}>
                        {/* Top Card - Rectangle 4 - Content */}
                        <View style={[
                            styles.topCard,
                            {
                                borderTopLeftRadius: scrolled ? 0 : 31,
                                borderTopRightRadius: scrolled ? 0 : 32,
                            }
                        ]}>
                            <Text style={styles.title}>Enter Verification Code</Text>
                            <Text style={styles.subtitle}>We have send a Code to : +100******00</Text>

                            {/* Code Display */}
                            <View style={styles.codeDisplayContainer}>
                                {code.map((digit, index) => (
                                    <View key={index} style={styles.digitContainer}>
                                        <Text style={styles.digitText}>{digit}</Text>
                                    </View>
                                ))}
                            </View>

                            <HapticButton
                                style={styles.continueButton}
                                onPress={() => router.push('/(auth)/vehicle-setup')}
                            >
                                <Text style={styles.continueButtonText}>Continue</Text>
                            </HapticButton>
                        </View>

                        {/* Keypad Card - Rectangle 13 - Keypad */}
                        <View style={styles.keypadCard}>
                            <View style={styles.keypadContainer}>
                                <View style={styles.keyRow}>
                                    <Key value="1" />
                                    <Key value="2" />
                                    <Key value="3" />
                                </View>
                                <View style={styles.keyRow}>
                                    <Key value="4" />
                                    <Key value="5" />
                                    <Key value="6" />
                                </View>
                                <View style={styles.keyRow}>
                                    <Key value="7" />
                                    <Key value="8" />
                                    <Key value="9" />
                                </View>
                                <View style={styles.keyRow}>
                                    <View style={{ width: width * 0.25 }} />
                                    <Key value="0" />
                                    <HapticButton
                                        style={styles.backspaceKey}
                                        onPress={() => handleKeyPress('backspace')}
                                    >
                                        <Ionicons name="backspace-outline" size={32} color="#1A1458" />
                                    </HapticButton>
                                </View>
                            </View>
                        </View>
                    </View>
                </ScrollView>

            </AnimatedScreen>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center', // Align cards wrapper to center?
        alignItems: 'center',
    },
    header: {
        position: 'absolute',
        top: 30,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
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
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    cardsWrapper: {
        paddingTop: 120, // Space for header
        alignItems: 'center',
        paddingBottom: 20,
    },
    // Rectangle 4
    topCard: {
        width: 389,
        height: 293,
        backgroundColor: '#D9D9D9',
        borderRadius: 31,
        borderTopRightRadius: 32,
        borderTopLeftRadius: 31,
        borderBottomRightRadius: 31,
        borderBottomLeftRadius: 31,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 0,
        zIndex: 10,
        // Card Shadow
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 5,
    },
    // Rectangle 13
    keypadCard: {
        width: 388,
        height: 319,
        backgroundColor: '#EDEDED',
        borderBottomRightRadius: 61,
        borderBottomLeftRadius: 59,
        marginTop: -32,
        zIndex: 20,
        justifyContent: 'center',
        paddingTop: 32,
        alignItems: 'center',
        // Card Shadow
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 5,
    },

    // Content Styling
    title: {
        fontFamily: 'Cairo_500Medium',
        fontSize: 24,
        color: '#000',
        marginBottom: 8,
    },
    subtitle: {
        fontFamily: 'Cairo_500Medium',
        fontSize: 14,
        color: '#666',
        marginBottom: 20,
    },
    codeDisplayContainer: {
        flexDirection: 'row',
        gap: 16,
        marginBottom: 24,
    },
    digitContainer: {
        width: 60,
        height: 60,
        backgroundColor: '#fff',
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5,
    },
    digitText: {
        fontFamily: 'Cairo_700Bold',
        fontSize: 24,
        color: '#000',
    },
    continueButton: {
        backgroundColor: '#004080',
        borderRadius: 25,
        width: 230,
        height: 50,
        justifyContent: 'center',
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
    continueButtonText: {
        color: '#fff',
        fontSize: 18,
        fontFamily: 'Cairo_500Medium',
    },

    // Keypad Styling
    keypadContainer: {
        width: '100%',
        paddingHorizontal: 30,
        gap: 12,
        // marginTop: 10,
    },
    keyRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    key: {
        width: width * 0.25,
        height: 60,
        backgroundColor: '#fff',
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        borderBottomLeftRadius: 60,
        borderBottomRightRadius: 60,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    keyText: {
        fontFamily: 'Cairo_700Bold',
        fontSize: 22,
        color: '#000',
    },
    backspaceKey: {
        width: width * 0.25,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

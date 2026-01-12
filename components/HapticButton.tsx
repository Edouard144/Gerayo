import * as Haptics from 'expo-haptics';
import React, { useRef } from 'react';
import {
    Animated,
    Platform,
    StyleSheet,
    TouchableOpacity,
    TouchableOpacityProps
} from 'react-native';

interface HapticButtonProps extends TouchableOpacityProps {
    children: React.ReactNode;
}

export const HapticButton: React.FC<HapticButtonProps> = ({
    children,
    style,
    onPress,
    disabled,
    ...props
}) => {
    const scaleAnim = useRef(new Animated.Value(1)).current;

    const handlePressIn = () => {
        Animated.spring(scaleAnim, {
            toValue: 0.98,
            useNativeDriver: true,
        }).start();
    };

    const handlePressOut = () => {
        Animated.spring(scaleAnim, {
            toValue: 1,
            useNativeDriver: true,
        }).start();
    };

    const handlePress = (event: any) => {
        if (Platform.OS !== 'web') {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        }
        if (onPress) {
            onPress(event);
        }
    };

    return (
        <TouchableOpacity
            activeOpacity={0.8}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            onPress={handlePress}
            disabled={disabled}
            style={[{ opacity: disabled ? 0.6 : 1 }]}
            {...props}
        >
            <Animated.View style={[
                styles.buttonBase,
                style,
                { transform: [{ scale: scaleAnim }] }
            ]}>
                {children}
            </Animated.View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    buttonBase: {
        minWidth: 44,
        minHeight: 44,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

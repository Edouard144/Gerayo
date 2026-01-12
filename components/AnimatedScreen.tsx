import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, ViewProps } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface AnimatedScreenProps extends ViewProps {
    children: React.ReactNode;
    duration?: number;
}

export const AnimatedScreen: React.FC<AnimatedScreenProps> = ({
    children,
    duration = 300,
    style,
    ...props
}) => {
    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: duration,
            useNativeDriver: true,
        }).start();
    }, [fadeAnim, duration]);

    return (
        <SafeAreaView style={[styles.container, style]} {...props}>
            <Animated.View style={{ flex: 1, opacity: fadeAnim }}>
                {children}
            </Animated.View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

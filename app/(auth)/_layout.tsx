import { Stack } from 'expo-router';

export default function AuthLayout() {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="welcome" />
            <Stack.Screen name="landing" />
            <Stack.Screen name="login" />
            <Stack.Screen name="register" />
            <Stack.Screen name="vehicle-setup" />
            <Stack.Screen name="reset-password" />
            <Stack.Screen name="verify-phone" />
            <Stack.Screen name="verify-code" />
        </Stack>
    );
}

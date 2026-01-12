import { useRouter } from 'expo-router';
import { Text, View } from 'react-native';
import { AnimatedScreen } from '../../../components/AnimatedScreen';
import { HapticButton } from '../../../components/HapticButton';

export default function ProfileScreen() {
    const router = useRouter();
    return (
        <AnimatedScreen>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>User Profile</Text>
                <HapticButton
                    style={{ marginTop: 20, backgroundColor: '#004080', padding: 12, borderRadius: 8 }}
                    onPress={() => router.push('/(tabs)/profile/settings')}
                >
                    <Text style={{ color: '#fff' }}>Settings</Text>
                </HapticButton>
            </View>
        </AnimatedScreen>
    );
}

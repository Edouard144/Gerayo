import { View, Text, Button } from 'react-native';
import { useRouter } from 'expo-router';

export default function AuthorityDashboardScreen() {
    const router = useRouter();
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Authority Dashboard</Text>
            <Button title="Lookup Vehicle" onPress={() => router.push('/authority/lookup')} />
        </View>
    );
}

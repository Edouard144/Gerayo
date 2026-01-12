import { View, Text, Button } from 'react-native';
import { useRouter } from 'expo-router';

export default function VehicleOverviewScreen() {
    const router = useRouter();
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Vehicle Overview</Text>
            <Button title="Edit Vehicle" onPress={() => router.push('/vehicle/edit')} />
        </View>
    );
}

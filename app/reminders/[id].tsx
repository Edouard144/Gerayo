import { View, Text } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

export default function ReminderDetailScreen() {
    const { id } = useLocalSearchParams();
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Reminder Detail for ID: {id}</Text>
        </View>
    );
}

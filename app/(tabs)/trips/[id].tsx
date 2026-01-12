import { useLocalSearchParams } from 'expo-router';
import { Text, View } from 'react-native';
import { AnimatedScreen } from '../../../components/AnimatedScreen';

export default function TripDetailsScreen() {
    const { id } = useLocalSearchParams();
    return (
        <AnimatedScreen>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Trip Details for ID: {id}</Text>
            </View>
        </AnimatedScreen>
    );
}

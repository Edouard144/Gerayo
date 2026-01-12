import { useLocalSearchParams } from 'expo-router';
import { Text, View } from 'react-native';
import { AnimatedScreen } from '../../../components/AnimatedScreen';

export default function AlertDetailsScreen() {
    const { id } = useLocalSearchParams();
    return (
        <AnimatedScreen>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Alert Details for ID: {id}</Text>
            </View>
        </AnimatedScreen>
    );
}

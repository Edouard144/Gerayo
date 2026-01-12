import { Text, View } from 'react-native';
import { AnimatedScreen } from '../../../components/AnimatedScreen';

export default function TripsScreen() {
    return (
        <AnimatedScreen>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Trips List</Text>
            </View>
        </AnimatedScreen>
    );
}

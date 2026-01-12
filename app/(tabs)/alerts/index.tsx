import { Text, View } from 'react-native';
import { AnimatedScreen } from '../../../components/AnimatedScreen';

export default function AlertsScreen() {
    return (
        <AnimatedScreen>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Alerts List</Text>
            </View>
        </AnimatedScreen>
    );
}

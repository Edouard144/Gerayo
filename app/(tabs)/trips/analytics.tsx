import { Text, View } from 'react-native';
import { AnimatedScreen } from '../../../components/AnimatedScreen';

export default function AnalyticsScreen() {
    return (
        <AnimatedScreen>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Safety Analytics</Text>
            </View>
        </AnimatedScreen>
    );
}

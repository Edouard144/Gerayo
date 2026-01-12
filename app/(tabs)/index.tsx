import { Text, View } from 'react-native';
import { AnimatedScreen } from '../../components/AnimatedScreen';

export default function HomeScreen() {
  return (
    <AnimatedScreen>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Home / Safety Dashboard</Text>
      </View>
    </AnimatedScreen>
  );
}

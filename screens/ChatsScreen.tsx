import { BottomNavbar } from '@/components/BottomNavbar';
import { Text } from '@/components/Utils/ThemedNativeElements';
import { View } from 'react-native';

export default function ChatsScreen() {
  return (
    <>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>ChatsScreen</Text>
      </View>

      <BottomNavbar />
    </>
  );
}

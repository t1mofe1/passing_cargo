import { BottomNavbar } from '@/components/BottomNavbar';
import useTheme from '@/hooks/useTheme';
import { Text, TouchableOpacity, View } from 'react-native';

export default function HomeScreen() {
  const { colors } = useTheme();

  return (
    <>
      <View
        style={{
          flex: 1,
          backgroundColor: '#aaa',

          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <TouchableOpacity
          style={{
            padding: 15,
            backgroundColor: colors.primary,
            borderRadius: 15,
          }}
        >
          <Text style={{ color: colors.text }}>Make cargo-order</Text>
        </TouchableOpacity>
      </View>

      <BottomNavbar />
    </>
  );
}

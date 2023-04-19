import useTheme from '@/hooks/useTheme';
import { MaterialIcons } from '@expo/vector-icons';
import { GestureResponderEvent, TouchableOpacity } from 'react-native';

type Props = {
  onPress?: (event: GestureResponderEvent) => void;
  hide?: boolean;
};
export default function MyLocationButton({ onPress, hide }: Props) {
  const {
    colors: { primary: primaryColor },
  } = useTheme();

  return (
    <TouchableOpacity
      style={{
        padding: 10,

        position: 'absolute',
        bottom: 30,
        right: 20,

        borderRadius: 7.5,

        backgroundColor: '#111',

        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        elevation: 10,

        opacity: hide ? 0 : 1,
      }}
      activeOpacity={0.65}
      onPress={onPress}
    >
      <MaterialIcons name='my-location' size={24} color={primaryColor} />
    </TouchableOpacity>
  );
}

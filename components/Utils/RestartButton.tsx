import useReload from '@/hooks/useReload';
import { FontAwesome5 } from '@expo/vector-icons';
import { Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function RestartButton() {
  const { reload } = useReload();

  const insets = useSafeAreaInsets();

  return (
    <Pressable
      onPress={reload}
      style={{
        position: 'absolute',
        top: insets.top + 5,
        right: 10,

        width: 45,
        aspectRatio: 1,

        backgroundColor: 'red',

        borderRadius: 50,

        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <FontAwesome5 name='redo' size={18} />
    </Pressable>
  );
}

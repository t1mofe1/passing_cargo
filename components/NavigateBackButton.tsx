import useScreens from '@/hooks/useScreens';
import useTheme from '@/hooks/useTheme';
import { FontAwesome5 } from '@expo/vector-icons';
import { Pressable, StyleProp, ViewStyle } from 'react-native';

type NavigateBackButtonProps = {
  style?: StyleProp<ViewStyle>;
};
export function NavigateBackButton({ style }: NavigateBackButtonProps) {
  const { navigation } = useScreens();
  const { colors } = useTheme();

  return (
    <Pressable
      onPress={() => navigation.goBack()}
      style={[
        {
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 100,
          aspectRatio: 1,
          width: 40,
          backgroundColor: colors.background,
        },
        style,
      ]}
    >
      <FontAwesome5 name={'arrow-left'} size={22} color={colors.gray} />
    </Pressable>
  );
}

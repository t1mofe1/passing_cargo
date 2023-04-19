import useTheme from '@/hooks/useTheme';
import { Text as TextDefault, TextProps } from 'react-native';

export function Text({ style, ...rest }: TextProps) {
  const {
    colors: { text: textColor },
  } = useTheme();

  return <TextDefault style={[{ color: textColor }, style]} {...rest} />;
}

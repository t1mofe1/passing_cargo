import useTheme from '@/hooks/useTheme';
import { Text as TextDefault, TextProps } from 'react-native';

export function Text({ style, ...rest }: TextProps) {
	const { theme } = useTheme();

	return (
		<TextDefault
			style={[
				{
					color: theme.colors.text,
				},
				style,
			]}
			{...rest}
		/>
	);
}

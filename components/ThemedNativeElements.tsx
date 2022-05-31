import { Text as TextDefault, TextProps } from 'react-native';
import useTheme from '../hooks/useTheme';

export function Text(props: TextProps) {
	const { theme } = useTheme();

	return (
		<TextDefault
			style={{
				color: theme.colors.text,
			}}
			{...props}
		/>
	);
}

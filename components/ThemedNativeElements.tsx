import { Text as TextDefault } from 'react-native';
import useTheme from '../hooks/useTheme';

export function Text() {
	const { theme } = useTheme();

	return (
		<TextDefault
			style={{
				color: theme.colors.text,
			}}
		/>
	);
}

import { useColorScheme } from 'react-native';
import { ColorSchemeName, Themes } from '../constants/Themes';

export default function useTheme() {
	const colorScheme = useColorScheme() as ColorSchemeName;

	const theme = Themes[colorScheme];

	return {
		colorScheme,
		theme,
	};
}

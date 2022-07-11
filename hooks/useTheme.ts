import { ColorSchemeName, Themes } from '@/constants/Themes';
import { useColorScheme } from 'react-native';

export default function useTheme() {
	const colorScheme = useColorScheme() as ColorSchemeName;

	const theme = Themes[colorScheme];

	return {
		colorScheme,
		theme,
	};
}

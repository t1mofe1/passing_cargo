import { ColorSchemeName, themes } from '@/constants/Themes';
import { useColorScheme } from 'react-native';

export default function useTheme() {
  const currentTheme: ColorSchemeName = useColorScheme() || 'light';

  const themeColors = themes[currentTheme];

  return {
    theme: currentTheme,
    colors: themeColors,
  };
}

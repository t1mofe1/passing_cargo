import { colors } from '@/constants/Colors';

const lightTheme = colors;
const darkTheme = {
  ...colors,
  text: colors.background,
  background: colors.text,
};

export type ColorSchemeName = 'light' | 'dark';

export const themes = {
  light: lightTheme,
  dark: darkTheme,
};

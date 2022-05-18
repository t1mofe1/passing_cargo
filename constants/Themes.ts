import { DarkTheme as DefaultDarkTheme, DefaultTheme, Theme as DefaultThemeType } from '@react-navigation/native';
import { ColorSchemeName as DefaultColorSchemeName } from 'react-native';
import { Colors } from './Colors';

export type ColorSchemeName = NonNullable<DefaultColorSchemeName>;
type ColorsType = DefaultThemeType['colors'] & typeof Colors['dark'] & typeof Colors['light'];

type Theme = DefaultThemeType & {
	colors: ColorsType;
};

export const LightTheme: Theme = {
	...DefaultTheme,
	colors: {
		...DefaultTheme.colors,
		...Colors.light,
	},
};
export const DarkTheme: Theme = {
	...DefaultDarkTheme,
	colors: {
		...DefaultDarkTheme.colors,
		...Colors.dark,
	},
};

export const Themes: { [key in ColorSchemeName]: Theme } = {
	light: LightTheme,
	dark: DarkTheme,
};

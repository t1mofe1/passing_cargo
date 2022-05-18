import { LinkingOptions } from '@react-navigation/native';
import { createURL } from 'expo-linking';
import { RootStackParamList } from './RootStackParamList';
import { Screen, screensArray, screensObject } from './Screens';

const screens = screensArray.reduce((obj, screen) => ({}), {});

export const linkingConfiguration: LinkingOptions<RootStackParamList> = {
	prefixes: [createURL('/'), 'https://app.pcargo.eu'],
	config: {
		screens: {},
		// screens: screensArray.reduce(
		// 	(obj, screen) => ({
		// 		...obj,
		// 		[screen.name!]: screen.path,
		// 	}),
		// 	{},
		// ),
	},
};

import { RootStackParamList } from '@/navigation/RootStackParamList';
import { screens } from '@/navigation/screens';
import { LinkingOptions, PathConfigMap } from '@react-navigation/native';
import { createURL } from 'expo-linking';

export const linkingConfiguration: LinkingOptions<RootStackParamList> = {
	prefixes: [createURL('/'), 'https://app.pcargo.eu'],
	config: {
		initialRouteName: screens[0].name,
		screens: screens.reduce(
			(obj, screen) => ({
				...obj,
				[screen.name]: screen.link,
			}),
			{},
		) as PathConfigMap<RootStackParamList>,
	},
};

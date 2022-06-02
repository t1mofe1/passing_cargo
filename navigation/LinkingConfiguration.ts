import { LinkingOptions, PathConfigMap } from '@react-navigation/native';
import { createURL } from 'expo-linking';
import { RootStackParamList } from './RootStackParamList';

export const linkingConfiguration = {
	prefixes: [createURL('/'), 'https://app.pcargo.eu'],
	config: {
		screens: {
			Main: {
				initialRouteName: 'Home',
				screens: {
					Home: 'home',
					Auth: 'auth',
					Chats: 'chat',
					Chat: 'chat/:chatId/:messageId?',
					Deliveries: 'deliveries',
					Delivery: 'deliveries/:deliveryId',
					Profile: 'profile/:userId?',
					Settings: 'settings/:tabId?',
					Support: 'support',
					Referral: 'referral',
				},
			},
			NotFound: '*',
		},
	},
};

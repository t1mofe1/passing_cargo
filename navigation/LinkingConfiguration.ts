import { LinkingOptions } from '@react-navigation/native';
import { createURL } from 'expo-linking';
import { RootStackParamList } from './RootStackParamList';

export const linkingConfiguration: LinkingOptions<RootStackParamList> = {
	prefixes: [createURL('/'), 'https://app.pcargo.eu'],
	config: {
		screens: {
			Chats: 'chat',
			Chat: 'chat/:chatId/:messageId?',
			Deliveries: 'deliveries',
			Delivery: 'deliveries/:deliveryId',
			Profile: 'profile/:userId?',
			Settings: 'settings/:tabId?',
			Support: 'support',
			Referral: 'referral',
			NotFound: '*',
		},
	},
};

import { RootStackParamList } from '@/navigation/RootStackParamList';
import {
	AuthScreen,
	ChatScreen,
	ChatsScreen,
	DeliveriesScreen,
	DeliveryScreen,
	HomeScreen,
	NotFoundScreen,
	ProfileScreen,
	ReferralScreen,
	SettingsScreen,
	StartScreen,
	SupportScreen,
} from '@/screens';

export type Screen = {
	name: keyof RootStackParamList;
	component: React.ComponentType<any>;
	link: string;
	secured: boolean;
};

export const screens: Screen[] = [
	{
		name: 'Home',
		component: HomeScreen,
		link: '/home',
		secured: true,
	},
	{
		name: 'Auth',
		component: AuthScreen,
		link: '/auth',
		secured: false,
	},
	{
		name: 'Start',
		component: StartScreen,
		link: '/start',
		secured: false,
	},
	{
		name: 'Chats',
		component: ChatsScreen,
		link: '/chat',
		secured: true,
	},
	{
		name: 'Chat',
		component: ChatScreen,
		link: '/chat/:chatId/:messageId?',
		secured: true,
	},
	{
		name: 'Deliveries',
		component: DeliveriesScreen,
		link: '/deliveries',
		secured: true,
	},
	{
		name: 'Delivery',
		component: DeliveryScreen,
		link: '/deliveries/:deliveryId',
		secured: true,
	},
	{
		name: 'Profile',
		component: ProfileScreen,
		link: '/profile/:userId?',
		secured: true,
	},
	{
		name: 'Settings',
		component: SettingsScreen,
		link: '/settings/:tabId?',
		secured: true,
	},
	{
		name: 'Support',
		component: SupportScreen,
		link: '/support',
		secured: false,
	},
	{
		name: 'Referral',
		component: ReferralScreen,
		link: '/referral',
		secured: true,
	},
	{
		name: 'NotFound',
		component: NotFoundScreen,
		link: '*',
		secured: false,
	},
];

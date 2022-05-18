import { AuthScreen, ChatScreen, ChatsScreen, DeliveriesScreen, DeliveryScreen, HomeScreen, NotFoundScreen, ProfileScreen, ReferralScreen, SettingsScreen, SupportScreen } from '../screens';
import { RootStackParamList } from './RootStackParamList';

/**
 * @param auth Does the user need to be authenticated?
 */
export type Screen = {
	name?: keyof RootStackParamList;
	path: string;
	component: React.ComponentType<any>;
	auth: boolean;
};

export const screensObject: { [key in keyof RootStackParamList]: Screen } = {
	Auth: { component: AuthScreen, path: 'auth', auth: false },
	Home: { component: HomeScreen, path: 'home', auth: true },
	Chats: { component: ChatsScreen, path: 'messages', auth: true },
	Chat: { component: ChatScreen, path: 'messages/:chatId/:messageId?', auth: true },
	Deliveries: { component: DeliveriesScreen, path: 'deliveries', auth: true },
	Delivery: { component: DeliveryScreen, path: 'deliveries/:deliveryId', auth: true },
	Profile: { component: ProfileScreen, path: 'profile/:userId?', auth: true },
	Settings: { component: SettingsScreen, path: 'settings/:tabId?', auth: true },
	Support: { component: SupportScreen, path: 'support', auth: true },
	Referral: { component: ReferralScreen, path: 'referral', auth: true },
	NotFound: { component: NotFoundScreen, path: '*', auth: false },
};

export const screensArray: Screen[] = Object.entries(screensObject).map(([name, screen]) => ({ name: name as keyof RootStackParamList, ...screen }));

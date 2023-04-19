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
  SupportScreen,
} from '@/screens';

export type Screen = {
  name: keyof RootStackParamList;
  component: React.ComponentType<any>;
  link: string;
  secured: boolean;
  closeOnBackOrGesture?: boolean;
};

export const screens: Screen[] = [
  {
    name: 'Home',
    component: HomeScreen,
    link: '/home',
    secured: true,
    closeOnBackOrGesture: false,
  },
  {
    name: 'Auth',
    component: AuthScreen,
    link: '/auth',
    secured: false,
    closeOnBackOrGesture: false,
  },
  {
    name: 'Chats',
    component: ChatsScreen,
    link: '/chat',
    secured: true,
    closeOnBackOrGesture: false,
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
    closeOnBackOrGesture: false,
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
    closeOnBackOrGesture: false,
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

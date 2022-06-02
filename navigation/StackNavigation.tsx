import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import useTheme from '../hooks/useTheme';
import { AuthScreen, ChatScreen, ChatsScreen, DeliveriesScreen, DeliveryScreen, HomeScreen, NotFoundScreen, ProfileScreen, ReferralScreen, SettingsScreen, SupportScreen } from '../screens';
import { linkingConfiguration } from './LinkingConfiguration';
import { RootStackParamList } from './RootStackParamList';

const Tabs = createNativeStackNavigator<RootStackParamList>();

export function Navigation() {
	const { theme } = useTheme();

	return (
		<NavigationContainer<RootStackParamList> theme={theme} onUnhandledAction={action => console.log({ action })} linking={linkingConfiguration}>
			<Tabs.Navigator
				initialRouteName='Home'
				screenListeners={({ navigation, route }) => ({
					focus: ({ type, data, target }) => {
						console.log('focus', {
							type,
							data,
							target,
						});
					},
				})}
				// screenOptions={{ headerShown: false }}
			>
				<Tabs.Group>
					<Tabs.Screen name='Auth' component={AuthScreen} />

					<Tabs.Group>
						<Tabs.Screen name='Home' component={HomeScreen} />

						<Tabs.Screen name='Chats' component={ChatsScreen} />
						<Tabs.Screen name='Chat' component={ChatScreen} />

						<Tabs.Screen name='Deliveries' component={DeliveriesScreen} />
						<Tabs.Screen name='Delivery' component={DeliveryScreen} />

						<Tabs.Screen name='Profile' component={ProfileScreen} />

						<Tabs.Screen name='Settings' component={SettingsScreen} />

						<Tabs.Screen name='Support' component={SupportScreen} />

						<Tabs.Screen name='Referral' component={ReferralScreen} />
					</Tabs.Group>
				</Tabs.Group>

				<Tabs.Screen name='NotFound' component={NotFoundScreen} />
			</Tabs.Navigator>
		</NavigationContainer>
	);
}

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
		<NavigationContainer theme={theme} linking={linkingConfiguration}>
			<Tabs.Navigator
				initialRouteName='Home'
				// screenOptions={{ headerShown: false }}
			>
				<Tabs.Screen name='Auth' component={AuthScreen} />

				<Tabs.Screen name='Home' component={HomeScreen} />

				<Tabs.Screen name='Chats' component={ChatsScreen} />
				<Tabs.Screen name='Chat' component={ChatScreen} />

				<Tabs.Screen name='Deliveries' component={DeliveriesScreen} />
				<Tabs.Screen name='Delivery' component={DeliveryScreen} />

				<Tabs.Screen name='Profile' component={ProfileScreen} />

				<Tabs.Screen name='Settings' component={SettingsScreen} />

				<Tabs.Screen name='Support' component={SupportScreen} />

				<Tabs.Screen name='Referral' component={ReferralScreen} />

				<Tabs.Screen name='NotFound' component={NotFoundScreen} />

				{/* options={({ navigation }) => ({
							title: 'Home',
							tabBarIcon: ({ color }) => <TabBarIcon name='code' color={color} />,
							headerRight: () => (
								<Pressable onPress={() => navigation.navigate('Modal')} style={({ pressed }) => ({ opacity: pressed ? 0.5 : 1 })}>
									<FontAwesome name='info-circle' size={25} color={colors.text} style={{ marginRight: 15 }} />
								</Pressable>
							),
						})} */}
			</Tabs.Navigator>
		</NavigationContainer>
	);
}

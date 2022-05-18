import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth } from '../hooks/useAuth';
import useTheme from '../hooks/useTheme';
import { linkingConfiguration } from './LinkingConfiguration';
import { RootStackParamList } from './RootStackParamList';
import { Screen, screensArray, screensObject } from './Screens';

const Tabs = createNativeStackNavigator<RootStackParamList>();

const screenFormatter = (screen: Screen, loggedIn: boolean) => {
	if (screen.auth && !loggedIn) return null; // if user is not authenticated, we don't want to show the screen

	return <Tabs.Screen name={screen.name!} component={screen.component} key={screen.name} />;
};

export function Navigation() {
	const { theme } = useTheme();

	const { loggedIn } = useAuth();

	return (
		<NavigationContainer theme={theme} linking={linkingConfiguration}>
			<Tabs.Navigator
				initialRouteName={loggedIn ? 'Home' : 'Auth'} // If user is not logged in, AuthScreen will be shown, otherwise HomeScreen will be shown
			>
				{/* {screensArray.map(screen => screenFormatter(screen, loggedIn))} */}
				{screensArray.map(screen => (
					<Tabs.Screen name={screen.name!} component={screen.component} key={screen.name} />
				))}

				{/* TODO: implement auth group. All screens inside this will be checked for auth before showing */}

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

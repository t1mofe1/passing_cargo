import useTheme from '@/hooks/useTheme';
import { linkingConfiguration } from '@/navigation/LinkingConfiguration';
import { RootStackParamList } from '@/navigation/RootStackParamList';
import { screens } from '@/navigation/screens';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Tabs = createNativeStackNavigator<RootStackParamList>();

export function Navigation() {
	const { theme } = useTheme();

	return (
		<NavigationContainer<RootStackParamList> theme={theme} onUnhandledAction={action => console.log({ type: 'unhandled navigation action', action })} linking={linkingConfiguration}>
			<Tabs.Navigator
				initialRouteName='Auth'
				screenListeners={({ navigation, route }) => ({
					focus: ({ target }) => {
						console.log(`FOCUS: ${target}`);
					},
				})}
				// screenOptions={{ headerShown: false }}
			>
				{screens.map(screen => (
					<Tabs.Screen name={screen.name} component={screen.component} key={screen.name} />
				))}
			</Tabs.Navigator>
		</NavigationContainer>
	);
}

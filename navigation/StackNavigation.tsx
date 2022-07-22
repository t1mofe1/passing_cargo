import { Text } from '@/components/ThemedNativeElements';
import useTheme from '@/hooks/useTheme';
import { linkingConfiguration } from '@/navigation/LinkingConfiguration';
import { RootStackParamList } from '@/navigation/RootStackParamList';
import { screens } from '@/navigation/screens';
import { useStore } from '@/Storage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useEffect, useMemo, useState } from 'react';

const Tabs = createNativeStackNavigator<RootStackParamList>();

export function Navigation() {
	const { theme } = useTheme();

	const [firstInit] = useStore.firstInit();

	return (
		<NavigationContainer<RootStackParamList> theme={theme} onUnhandledAction={action => console.log({ type: 'unhandled navigation action', action })} linking={linkingConfiguration}>
			<Tabs.Navigator
				initialRouteName={firstInit ? 'Start' : 'Auth'}
				screenListeners={({ navigation, route }) => ({
					focus: ({ target }) => {
						console.log(`FOCUS: ${target}`);
					},
				})}
				screenOptions={{ headerShown: false }}
			>
				{screens.map(screen => (
					<Tabs.Screen name={screen.name} component={screen.component} key={screen.name} />
				))}
			</Tabs.Navigator>
		</NavigationContainer>
	);
}

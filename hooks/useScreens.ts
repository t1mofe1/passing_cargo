import useAuth from '@/hooks/useAuth';
import { RootStackParamList } from '@/navigation/RootStackParamList';
import { screens } from '@/navigation/screens';
import { NavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native';

export default function useScreens<RouteName extends keyof RootStackParamList>() {
	const navigation = useNavigation<NavigationProp<RootStackParamList>>();
	const route = useRoute<RouteProp<RootStackParamList, RouteName>>();

	const { loggedIn } = useAuth();

	const navigate = <ScreenName extends keyof RootStackParamList>(
		...args: undefined extends RootStackParamList[ScreenName]
			? [screen: ScreenName] | [screen: ScreenName, params: RootStackParamList[ScreenName]]
			: [screen: ScreenName, params: RootStackParamList[ScreenName]]
	) => {
		// if screen is secured and user is not logged in, redirect to login
		if (screens.find(screen => screen.name === args[0])!.secured && !loggedIn) {
			navigation.navigate('Auth');
		} else {
			navigation.navigate(...args);
		}
	};

	const helpers = {
		navigation: {
			open: navigate,
			goBack: navigation.goBack,
			openAsNew: <RouteName extends keyof RootStackParamList>(routeName: RouteName, ...params: RootStackParamList[RouteName] extends undefined ? [undefined?] : [RootStackParamList[RouteName]]) =>
				// navigation.dispatch(StackActions.replace(routeName, params)),
				navigation.reset({
					routes: [{ name: routeName, params }],
				}),
			isFocused: navigation.isFocused,
		},
		route,
	};

	return helpers;
}

import { CommonActions, NavigationProp, RouteProp, StackActions, useNavigation, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../navigation';

export default function useScreens() {
	const navigation = useNavigation<NavigationProp<RootStackParamList>>();
	const route = useRoute<RouteProp<RootStackParamList>>();

	const helpers = {
		open: navigation.navigate,
		goBack: navigation.goBack,
		openAsStart: <RouteName extends keyof RootStackParamList>(routeName: RouteName, ...params: RootStackParamList[RouteName] extends undefined ? [undefined?] : [RootStackParamList[RouteName]]) =>
			navigation.dispatch(StackActions.replace(routeName, params)),
	};
}

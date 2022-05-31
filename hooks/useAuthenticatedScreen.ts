import { NavigationProp, RouteProp, useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import { useCallback } from 'react';
import { RootStackParamList } from '../navigation';
import useAuth from './useAuth';

export default function useAuthenticatedScreen() {
	const { loggedIn, user } = useAuth();

	const navigation = useNavigation<NavigationProp<RootStackParamList>>();
	const route = useRoute<RouteProp<RootStackParamList>>();

	useFocusEffect(
		useCallback(() => {
			if (!loggedIn) {
				navigation.navigate('Auth');
			}
		}, [loggedIn, navigation]),
	);
}

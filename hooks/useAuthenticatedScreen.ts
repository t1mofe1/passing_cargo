import useAuth from '@/hooks/useAuth';
import useScreens from '@/hooks/useScreens';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';

export default function useAuthenticatedScreen() {
	const { loggedIn } = useAuth();

	const { navigation } = useScreens();

	useFocusEffect(
		useCallback(() => {
			if (!loggedIn) navigation.openAsNew('Auth');
		}, [loggedIn, navigation]),
	);
}

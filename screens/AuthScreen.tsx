import useAuth from '@/hooks/useAuth';
import useScreens from '@/hooks/useScreens';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';
import { ActivityIndicator, Button, Text, View } from 'react-native';

export default function AuthScreen() {
	const { loggedIn, loggingIn, loginWithGoogle } = useAuth();

	const { navigation } = useScreens();

	// #region if user is logged in, redirect to home
	useFocusEffect(
		useCallback(() => {
			if (loggedIn) navigation.openAsNew('Home');
		}, [loggedIn, navigation]),
	);
	// #endregion if user is logged in, redirect to home

	return (
		<View
			style={{
				flex: 1,
				justifyContent: 'center',
				alignItems: 'center',
				width: '100%',
				height: '100%',
			}}
		>
			<Text>Auth Screen</Text>
			{loggingIn ? <ActivityIndicator size={'large'} /> : <Button title={`Login With Google`} onPress={loginWithGoogle} />}
		</View>
	);
}

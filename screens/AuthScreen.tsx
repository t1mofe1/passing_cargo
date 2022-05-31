import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import { useCallback } from 'react';
import { Button, Text, View } from 'react-native';
import { ScreenProps } from '../navigation';
import useAuth from './../hooks/useAuth';

export default function AuthScreen({ navigation }: ScreenProps<'Auth'>) {
	const { loggedIn, loginWithGoogle } = useAuth();

	// #region if user is logged in, redirect to home
	useFocusEffect(
		useCallback(() => {
			if (loggedIn) navigation.navigate('Home');
		}, [loggedIn, navigation]),
	);
	// #endregion if user is logged in, redirect to home

	return (
		<View
			style={{
				flex: 1,

				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			<Text>Auth Screen</Text>
			<Button title={`Login With Google`} onPress={loginWithGoogle} />
		</View>
	);
}

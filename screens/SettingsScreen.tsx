import React from 'react';
import { Text, View } from 'react-native';
import { ScreenProps } from '../navigation';
import useAuthenticatedScreen from './../hooks/useAuthenticatedScreen';

export default function SettingsScreen({ navigation }: ScreenProps<'Settings'>) {
	useAuthenticatedScreen();

	return (
		<View>
			<Text>SettingsScreen</Text>
		</View>
	);
}

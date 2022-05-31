import React from 'react';
import { Text, View } from 'react-native';
import { ScreenProps } from '../navigation';
import useAuthenticatedScreen from './../hooks/useAuthenticatedScreen';

export default function SupportScreen({ navigation }: ScreenProps<'Support'>) {
	useAuthenticatedScreen();

	return (
		<View>
			<Text>SupportScreen</Text>
		</View>
	);
}

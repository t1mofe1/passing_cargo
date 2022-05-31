import React from 'react';
import { Text, View } from 'react-native';
import { ScreenProps } from '../navigation';
import useAuthenticatedScreen from './../hooks/useAuthenticatedScreen';

export default function ChatScreen({ navigation }: ScreenProps<'Chat'>) {
	useAuthenticatedScreen();

	return (
		<View>
			<Text>ChatScreen</Text>
		</View>
	);
}

import React from 'react';
import { Text, View } from 'react-native';
import { ScreenProps } from '../navigation';
import useAuthenticatedScreen from './../hooks/useAuthenticatedScreen';

export default function ChatsScreen({ navigation }: ScreenProps<'Chats'>) {
	useAuthenticatedScreen();

	return (
		<View>
			<Text>ChatsScreen</Text>
		</View>
	);
}

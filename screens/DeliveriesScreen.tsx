import React from 'react';
import { Text, View } from 'react-native';
import { ScreenProps } from '../navigation';
import useAuthenticatedScreen from './../hooks/useAuthenticatedScreen';

export default function DeliveriesScreen({ navigation }: ScreenProps<'Deliveries'>) {
	useAuthenticatedScreen();

	return (
		<View>
			<Text>DeliveriesScreen</Text>
		</View>
	);
}

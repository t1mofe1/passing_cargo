import React from 'react';
import { Text, View } from 'react-native';
import { ScreenProps } from '../navigation';
import useAuthenticatedScreen from './../hooks/useAuthenticatedScreen';

export default function DeliveryScreen({ navigation }: ScreenProps<'Delivery'>) {
	useAuthenticatedScreen();

	return (
		<View>
			<Text>DeliveryScreen</Text>
		</View>
	);
}

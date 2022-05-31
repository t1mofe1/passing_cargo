import React from 'react';
import { Text, View } from 'react-native';
import { ScreenProps } from '../navigation';
import useAuthenticatedScreen from './../hooks/useAuthenticatedScreen';

export default function ReferralScreen({ navigation }: ScreenProps<'Referral'>) {
	useAuthenticatedScreen();

	return (
		<View>
			<Text>ReferralScreen</Text>
		</View>
	);
}

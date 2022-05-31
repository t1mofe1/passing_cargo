import { Text, View } from 'react-native';
import { ScreenProps } from '../navigation';
import useAuthenticatedScreen from './../hooks/useAuthenticatedScreen';

export default function ProfileScreen({ navigation }: ScreenProps<'Profile'>) {
	useAuthenticatedScreen();

	return (
		<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
			<Text>Profile!</Text>
		</View>
	);
}

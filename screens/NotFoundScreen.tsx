import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RootStackParamList } from '../navigation';
import { ScreenProps } from '../navigation/ScreenProps';

export default function NotFoundScreen() {
	const navigation = useNavigation();

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Oops! Seems like you've got in an unknown place.. Try going back maybe?</Text>
			<TouchableOpacity onPress={() => navigation.goBack()} style={styles.link}>
				<Text style={styles.linkText}>Go to home screen!</Text>
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		padding: 20,
	},
	title: {
		fontSize: 20,
		fontWeight: 'bold',
	},
	link: {
		marginTop: 15,
		paddingVertical: 15,
	},
	linkText: {
		fontSize: 14,
		color: '#2e78b7',
	},
});

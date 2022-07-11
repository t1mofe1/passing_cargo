import useScreens from '@/hooks/useScreens';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function NotFoundScreen() {
	const { navigation, route } = useScreens();

	console.log({ route });

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Oops! Seems like you've got in an unknown place.. Try going back maybe?</Text>
			<TouchableOpacity onPress={() => navigation.open('Home')} style={styles.link}>
				<Text style={styles.linkText}>Go to home screen!</Text>
			</TouchableOpacity>
			<Text>{JSON.stringify(route)}</Text>
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

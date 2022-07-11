import Layout from '@/components/Layout';
import { Text } from '@/components/ThemedNativeElements';
import { FontAwesome5 } from '@expo/vector-icons';
import { View } from 'react-native';

const icons = {
	Home: ['home'],
	Chats: ['comment-alt', 'comment-dots', 'comments', 'envelope', 'envelope-open', 'inbox'],
	AddDelivery: ['plus'],
	Deliveries: ['truck', 'truck-loading', 'truck-moving', 'archive', 'box', 'box-open', 'shipping-fast'],
	Profile: ['user'],
};

export default function HomeScreen() {
	return (
		<Layout>
			{Object.entries(icons).map(([type, icons]) => (
				<View
					style={{
						justifyContent: 'space-evenly',
						alignItems: 'center',
						flexDirection: 'row',
						flexWrap: 'wrap',
					}}
					key={type}
				>
					<Text>{type}</Text>
					{icons.map(icon => (
						<FontAwesome5 key={icon} style={{ margin: 20 }} name={icon} size={28} color={'#fff'} />
					))}
				</View>
			))}
		</Layout>
	);
}

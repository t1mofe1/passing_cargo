import { Text } from '@/components/ThemedNativeElements';
import useAuth from '@/hooks/useAuth';
import { Image, View } from 'react-native';

export default function ProfileScreen() {
	const { user } = useAuth();

	return (
		<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
			<Image source={{ uri: user?.picture }} style={{ width: 150, height: 150, borderRadius: 150 }} />
			<Text style={{ marginTop: 20 }}>{user?.id}</Text>
			<Text style={{ marginTop: 5 }}>
				{user?.name} | {user?.email}
			</Text>
		</View>
	);
}

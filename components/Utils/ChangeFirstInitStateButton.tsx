import { useStore } from '@/Storage';
import * as Updates from 'expo-updates';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Platform, Text, TouchableOpacity, View } from 'react-native';

export default function ChangeFirstInitStateButton() {
	const [changing, setChanging] = useState(false);

	const [, setFirstInit] = useStore.firstInit();

	useEffect(() => {
		if (changing) {
			setChanging(false);

			setFirstInit(v => !v);

			Platform.OS === 'web' ? window.location.reload() : Updates.reloadAsync();
		}
	}, [changing]);

	return (
		<>
			<TouchableOpacity
				onPress={() => setChanging(true)}
				style={{
					position: 'absolute',
					top: 20,
					left: 0,

					padding: 5,

					width: 60,
					height: 40,

					backgroundColor: 'red',

					borderRadius: 5,

					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				<Text>Change FirstInit</Text>
			</TouchableOpacity>

			{changing && (
				<View
					style={{
						position: 'absolute',
						top: 0,
						left: 0,
						right: 0,
						bottom: 0,

						backgroundColor: 'rgba(0, 0, 0, 0.5)',

						justifyContent: 'center',
						alignItems: 'center',

						zIndex: 999,
					}}
				>
					<ActivityIndicator size='large' color='lightpink' />
				</View>
			)}
		</>
	);
}

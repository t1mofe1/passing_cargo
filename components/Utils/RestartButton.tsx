import * as Updates from 'expo-updates';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Platform, Text, TouchableOpacity, View } from 'react-native';

export default function RestartButton() {
	const [reloading, setReloading] = useState(false);

	useEffect(() => {
		if (reloading) {
			setReloading(false);
			Platform.OS === 'web' ? window.location.reload() : Updates.reloadAsync();
		}
	});

	return (
		<>
			<TouchableOpacity
				onPress={() => setReloading(true)}
				style={{
					position: 'absolute',
					bottom: 0,
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
				<Text>Restart</Text>
			</TouchableOpacity>

			{reloading && (
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

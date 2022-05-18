import Device from 'expo-device';
import * as Location from 'expo-location';
import { useEffect, useState } from 'react';
import { Platform } from 'react-native';

export function useLocation() {
	const [location, setLocation] = useState<Location.LocationObject>();
	const [error, setError] = useState<string>();

	useEffect(() => {
		const getLocation = async () => {
			if (Platform.OS === 'android' && !Device.isDevice) {
				setError('Location is not available on Android emulator');
				return;
			}

			let { status } = await Location.requestForegroundPermissionsAsync();

			if (status !== 'granted') {
				setError('Location permission not granted');
				return;
			}

			let location = await Location.getCurrentPositionAsync();

			if (!location) {
				setError('Location not found');
				return;
			}

			setLocation(location);
		};

		getLocation();
	}, []);

	return { location, error };
}

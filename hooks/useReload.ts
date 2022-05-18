import * as Updates from 'expo-updates';
import { useCallback } from 'react';
import { Platform } from 'react-native';

export default function useReload() {
	const reload = useCallback(() => {
		if (Platform.OS === 'web') {
			location.reload();
		} else {
			Updates.reloadAsync();
		}
	}, []);

	return reload;
}

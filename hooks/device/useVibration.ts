import { Vibration } from 'react-native';

export function useVibration() {
	const patterns = {}; // TODO: add vibrarion patterns

	return {
		// patterns,
		vibrate: Vibration.vibrate,
		cancel: Vibration.cancel,
	};
}

import { requestPermissionsAsync as requestMediaLibraryPermissionsAsync } from 'expo-media-library/build/MediaLibrary';
import { addScreenshotListener } from 'expo-screen-capture';
import { useCallback } from 'react';
import { CaptureOptions, captureScreen } from 'react-native-view-shot';

export function useScreenshot() {
	const takeScreenshot = useCallback(async (options?: CaptureOptions) => await captureScreen(options), []);
	const listenToScreenshots = useCallback(async (listener: () => void) => {
		const { status } = await requestMediaLibraryPermissionsAsync();
		if (status !== 'granted') return;

		const sub = addScreenshotListener(listener);

		return sub;
	}, []);

	return {
		takeScreenshot,
		listenToScreenshots,
	};
}

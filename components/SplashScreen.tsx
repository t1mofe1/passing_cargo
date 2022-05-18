import { FontAwesome5 } from '@expo/vector-icons';
import Constants from 'expo-constants';
import * as Font from 'expo-font';
import * as ExpoSplashScreen from 'expo-splash-screen';
import { PropsWithChildren, useCallback, useEffect, useMemo, useState } from 'react';
import { Animated, StyleSheet, View } from 'react-native';

// Instruct ExpoSplashScreen not to hide yet, we want to do this manually
ExpoSplashScreen.preventAutoHideAsync().catch(() => {
	/* reloading the app might trigger some race conditions, ignore them */
});

export default function SplashScreen({
	children,
	image,
}: PropsWithChildren<{
	image: string;
}>) {
	const [ready, setReady] = useState(false);

	const animation = useMemo(() => new Animated.Value(1), []);
	const [isSplashAnimationFinished, setIsSplashAnimationFinished] = useState(false);

	useEffect(() => {
		if (ready) {
			Animated.timing(animation, {
				toValue: 0,
				duration: 200,
				useNativeDriver: true,
			}).start(() => setIsSplashAnimationFinished(true));
		}
	}, [ready]);

	const onImageLoaded = useCallback(async () => {
		try {
			// Keep the splash screen visible while we load the resources
			await ExpoSplashScreen.preventAutoHideAsync();

			// Pre-load the assets
			await Promise.all([
				Font.loadAsync({
					...FontAwesome5.font,
					'space-mono': require('../assets/fonts/SpaceMono-Regular.ttf'),
				}),
			]);

			// Delay for a bit to make sure the splash screen is visible
			await new Promise(resolve => setTimeout(resolve, 2000));
		} catch (e) {
			console.warn(e);
		} finally {
			// We're ready to show the app
			setReady(true);
		}
	}, []);

	return (
		<View style={{ flex: 1 }}>
			{ready && children}
			{!isSplashAnimationFinished && (
				<Animated.View
					pointerEvents='none'
					style={[
						StyleSheet.absoluteFill,
						{
							backgroundColor: Constants.manifest?.splash?.backgroundColor ?? '#fff',
							opacity: animation,
						},
					]}
				>
					<Animated.Image
						style={{
							width: '100%',
							height: '100%',
							resizeMode: Constants.manifest?.splash?.resizeMode ?? 'contain',
							transform: [
								{
									scale: animation,
								},
							],
						}}
						source={{ uri: image }}
						onLoadEnd={onImageLoaded}
						fadeDuration={0}
					/>
				</Animated.View>
			)}
		</View>
	);
}

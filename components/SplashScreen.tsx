import { FontAwesome5 } from '@expo/vector-icons';
import Constants from 'expo-constants';
import { loadAsync as loadFontsAsync } from 'expo-font';
import * as ExpoSplashScreen from 'expo-splash-screen';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import useAsset from './../hooks/useAsset';

// Instruct SplashScreen not to hide yet, we want to do this manually
ExpoSplashScreen.preventAutoHideAsync().catch(() => {
	/* reloading the app might trigger some race conditions, ignore them */
});

type SplashScreenProps = {
	image?: string;
	fadeOutDuration?: number;

	children: React.ReactNode;
};
export default function SplashScreen({ children, image, fadeOutDuration = 500 }: SplashScreenProps) {
	const imageAsset = useAsset(image);

	// console.log({ imageAsset });

	const [ready, setReady] = useState(false);

	const animation = useMemo(() => new Animated.Value(1), []);
	const [isSplashAnimationFinished, setIsSplashAnimationFinished] = useState(false);

	useEffect(() => {
		if (ready) {
			Animated.timing(animation, {
				toValue: 0,
				duration: fadeOutDuration,
				useNativeDriver: true,
			}).start(() => setIsSplashAnimationFinished(true));
		}
	}, [ready]);

	const onImageLoaded = useCallback(async () => {
		try {
			await ExpoSplashScreen.hideAsync();

			// Pre-load the assets
			await Promise.all([
				loadFontsAsync({
					...FontAwesome5.font,
					'space-mono': require('../assets/fonts/SpaceMono-Regular.ttf'),
				}),
			]);

			// Delay for a bit to make sure the splash screen is visible
			await new Promise(resolve => setTimeout(resolve, 2000));
		} catch (err) {
			console.warn({ err });
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
							backgroundColor: Constants.manifest?.splash?.backgroundColor ?? '#000',
							opacity: animation,
						},
						{
							flex: 1,
							justifyContent: 'center',
							alignItems: 'center',
						},
					]}
				>
					<Animated.Text
						style={{
							fontSize: 36,
							color: '#fff',
						}}
						onLayout={onImageLoaded}
					>
						Passing Cargo
					</Animated.Text>
					{/* <Animated.Image
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
						source={image ? { uri: image } : require('../assets/images/splash.png')}
						onLoadEnd={onImageLoaded}
						fadeDuration={0}
					/> */}
				</Animated.View>
			)}
		</View>
	);
}

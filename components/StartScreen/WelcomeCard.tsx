import { LinearGradient } from 'expo-linear-gradient';
import { useEffect } from 'react';
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { interpolate, runOnJS, useAnimatedReaction, useAnimatedStyle, useDerivedValue, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';

const { height } = Dimensions.get('screen');

type WelcomeCardProps = {
	onInteractionEnd: () => void;
};
export default function WelcomeCard({ onInteractionEnd }: WelcomeCardProps) {
	const y = useSharedValue(0);
	const ctx = useSharedValue(0);

	const gesture = Gesture.Pan()
		.onStart(e => {
			'worklet';

			ctx.value = y.value;
		})
		.onUpdate(e => {
			'worklet';

			let translationY = ctx.value - e.translationY;

			if (translationY <= 0) translationY = 0;

			y.value = translationY;
		})
		.onEnd(e => {
			'worklet';

			let translationY = ctx.value - e.translationY;

			if (translationY < height / 4) {
				y.value = withSpring(0, { mass: 0.8, velocity: e.velocityY });
			} else {
				y.value = withTiming(height * 2.5, { duration: 1000 });
			}
		});

	const textContainerStyle = useAnimatedStyle(() => ({
		transform: [{ translateY: -y.value }],
	}));

	const imageContainerStyle = useAnimatedStyle(() => ({
		transform: [{ translateY: -y.value / 3 }],
	}));

	// send feedback to parent component when the card is swiped
	useAnimatedReaction(
		() => {
			'worklet';

			return y.value >= height * 2.5;
		},
		res => {
			'worklet';

			if (res) runOnJS(onInteractionEnd)();
		},
		[y.value],
	);

	return (
		<GestureDetector gesture={gesture}>
			<View style={{ flex: 1 }}>
				<Animated.View style={[styles.startLogoContainer, imageContainerStyle]}>
					<Image source={require('@/assets/images/startScreen/1.jpg')} style={styles.startLogo} />
					<LinearGradient colors={['rgba(24,26,32,0)', 'rgba(24,26,32,0.9)', 'rgba(24,26,32,1)']} locations={[0, 0.7, 1]} style={styles.startLogoShadow} />
				</Animated.View>
				<Animated.View
					style={[
						{
							width: '100%',
							padding: 32,
							paddingBottom: '10%',

							position: 'absolute',
							bottom: 0,
						},
						textContainerStyle,
					]}
				>
					<Text style={[styles.defaultText, styles.welcomeText]}>Welcome to</Text>
					<Text style={[styles.defaultText, styles.logoTitle]}>Passing Cargo</Text>
					<Text style={[styles.defaultText]}>The best way to deliver your cargos across the country in a few clicks!</Text>
				</Animated.View>
			</View>
		</GestureDetector>
	);
}

const colors = {
	primary: '#01B763',
	background: '#181A20',
	text: '#FFFFFF',
	secondary: '#35383F',
	foreground: '#1F222A',
	border: '#31343C',
};

const styles = StyleSheet.create({
	startLogoContainer: {
		width: '100%',
		height: '65%',
		position: 'relative',
	},
	startLogo: {
		width: '100%',
		height: '100%',
	},
	startLogoShadow: {
		width: '100%',
		height: '50%',
		position: 'absolute',
		bottom: 0,
	},

	defaultText: {
		fontSize: 20,
		fontFamily: 'outfit',
		color: colors.text,
	},
	logoTitle: {
		fontSize: 72,
		color: colors.primary,
		marginBottom: '10%',
	},
	welcomeText: {
		fontSize: 48,
		marginBottom: '2.5%',
	},
});

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { Dimensions, Image, Pressable, Text, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { interpolate, runOnJS, useAnimatedProps, useAnimatedStyle, useDerivedValue, useSharedValue } from 'react-native-reanimated';

const { width: screenWidth } = Dimensions.get('window');

const slides = [
	{
		image: null,
		title: 'Felis tortor enim cursus ut ultricies cras pellentesque.',
	},
	{
		image: null,
		title: 'Tempus dignissim vitae sed faucibus posuere dignissim. ',
	},
	{
		image: null,
		title: 'In dapibus ultricies tincidunt ut. Quam sed quam.',
	},
];

const slideWidth = screenWidth - screenWidth * 0.05 * 2;

type IntroducingSliderProps = {
	onInteractionEnd: () => void;
};
export default function IntroducingSlider({ onInteractionEnd }: IntroducingSliderProps) {
	const translateX = useSharedValue(0);
	const ctx = useSharedValue(translateX.value);

	const currentSlide = useDerivedValue(
		() =>
			Math.round(
				interpolate(
					translateX.value,
					slides.map((_, i) => i * slideWidth),
					slides.map((_, i) => i).reverse(),
				),
			),
		[translateX.value],
	);

	const navigateToPreviousSlide = () => {
		'worklet';

		if (translateX.value > 0) translateX.value += slideWidth;
	};
	const navigateToNextSlide = () => {
		'worklet';

		if (currentSlide.value < slides.length - 1) translateX.value -= slideWidth;
	};

	const gesture = Gesture.Pan()
		.onStart(e => {
			'worklet';

			ctx.value = e.translationX;
		})
		.onUpdate(e => {
			'worklet';

			translateX.value = ctx.value + e.translationX;
		})
		.onEnd(e => {
			'worklet';

			// runOnJS(navigateToNextSlide)();

			console.log(`Current Slide: ${currentSlide.value}`);

			// const x = -(ctx.value + e.translationX);
			// const index = Math.round(x / screenWidth);
			// translateX.value = index * screenWidth;

			// console.log({ x, index, translateX: translateX.value });

			// console.log(`translateX: ${translateX.value} | ${x}`);
		});

	const sliderContainerStyle = useAnimatedStyle(() => ({
		transform: [{ translateX: translateX.value }],
	}));

	// const progressBarButtonStyle = useAnimatedStyle(() => ({
	// 	backgroundColor: currentSlide, // backgroundColor: index === currentSlide ? colors.primary : colors.secondary,
	// }));

	const buttonTextProp = useAnimatedProps(
		() => ({
			children: currentSlide.value !== slides.length - 1 ? 'Next' : 'Get Started',
		}),
		[currentSlide.value],
	);

	return (
		<GestureDetector gesture={gesture}>
			<View
				style={{
					flex: 1,
					alignItems: 'center',
					justifyContent: 'flex-end',

					paddingHorizontal: '5%',
				}}
			>
				<View
					style={{
						width: '100%',

						position: 'absolute',
						bottom: 0,

						paddingBottom: '10%',
					}}
				>
					<View
						style={[
							{
								flexDirection: 'row',
								overflow: 'scroll',
							},
						]}
					>
						<Animated.View
							style={[
								{
									flexDirection: 'row',
									width: screenWidth,
								},
								sliderContainerStyle,
							]}
						>
							{slides.map((slide, index) => (
								<View
									key={index}
									style={{
										width: slideWidth,
										alignItems: 'center',
										justifyContent: 'center',
									}}
								>
									<Image
										style={{
											height: 250,
											aspectRatio: 1,
										}}
										source={slide.image ?? require('@/assets/images/startScreen/slide_default.jpg')}
									/>
									<Text
										style={{
											fontFamily: 'outfit',
											fontSize: 40,
											color: colors.text,
											marginTop: '7.5%',
											textAlign: 'center',
										}}
									>
										{slide.title}
									</Text>
								</View>
							))}
						</Animated.View>
					</View>
					<View
						style={{
							width: '100%',
							marginTop: '10%',
						}}
					>
						<View
							style={{
								marginBottom: '7.5%',

								flexDirection: 'row',
								justifyContent: 'center',
							}}
						>
							{slides.map((slide, index) => (
								<Animated.View // or pressable ?
									key={index}
									style={[
										{
											borderRadius: 20,

											width: 10,
											aspectRatio: 1,

											marginRight: index !== slides.length - 1 ? 10 : 0,
										},
										// progressBarButtonStyle,
									]}
									// onPress={() => {
									// 	setCurrentSlide(index);
									// }}
								/>
							))}
						</View>
						<Pressable
							style={{
								backgroundColor: colors.primary,
								width: '100%',
								paddingVertical: 20,
								borderRadius: 30,

								justifyContent: 'center',
								alignItems: 'center',
							}}
							onPress={() => {
								if (currentSlide.value === slides.length - 1) return onInteractionEnd();

								navigateToNextSlide();
							}}
						>
							<Animated.Text
								style={{
									fontFamily: 'outfit',
									fontSize: 16,
									color: colors.text,
									textAlign: 'center',
								}}
								animatedProps={buttonTextProp}
							>
								Text
							</Animated.Text>
						</Pressable>
					</View>
				</View>
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

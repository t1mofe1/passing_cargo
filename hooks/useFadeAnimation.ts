import { useCallback, useEffect, useRef, useState } from 'react';
import Animated, { Easing, runOnJS, useSharedValue, withDelay, withTiming } from 'react-native-reanimated';

type FadeAnimProps = {
	type: 'fadeIn' | 'fadeOut';
	easing?: Animated.EasingFunction;

	onStart?: () => void;
	onEnd?: () => void;

	startImmediately?: boolean;

	duration?: number;
	delay?: number;
};
export default function useFadeAnimation({
	// callbacks
	onStart,
	onEnd,

	// Should the animation start immediately after mounting?
	startImmediately = false,

	duration = 300,
	delay = 0,

	type,
	easing = Easing.linear,
}: FadeAnimProps) {
	const fadeVal = useSharedValue(0);

	const running = useSharedValue(false);

	// #region fade animation
	const startFade = () => {
		'worklet';

		running.value = true;

		fadeVal.value = withDelay(
			delay,
			withTiming(1, {
				duration,
				easing,
			}),
		);

		onStart && runOnJS(onStart)();
	};
	// #endregion fade animation

	// #region stop animation
	const stopFade = () => {
		fadeVal.value = 0;
		running.value = false;
	};
	// #endregion stop animation

	// #region immediate start
	useEffect(() => {
		startImmediately && startFade();

		return () => stopFade();
	}, [startImmediately]);
	// #endregion immediate start

	// (fade | opacity) = (0 -> 1) | (1 -> 0)
	const fadeValue = type === 'fadeIn' ? fadeVal.value : 1 - fadeVal.value;

	return {
		start: startFade,
		stop: stopFade,

		state: running.value,

		value: fadeValue,
		animatedValue: fadeVal,
	};
}

import { useCallback, useEffect, useRef, useState } from 'react';
import { Animated, Easing, EasingFunction } from 'react-native';
import useAnimatedProgressListener from './useAnimatedProgressListener';

type FadeAnimProps = {
	type: 'fadeIn' | 'fadeOut';
	easing?: EasingFunction;

	onStart?: () => void;
	onEnd?: () => void;

	startImmediately?: boolean;

	duration?: number;
	delay?: number;
	nativeDriver?: boolean;
};
export default function useFadeAnimation({
	// callbacks
	onStart,
	onEnd,

	// Should the animation start immediately after mounting?
	startImmediately = false,

	duration = 300,
	delay = 0,

	nativeDriver = true,

	type,
	easing = Easing.linear,
}: FadeAnimProps) {
	const fadeVal = useRef(new Animated.Value(0)).current;

	const [running, setRunning] = useState(false);

	const { progress: currentProgress } = useAnimatedProgressListener({
		value: fadeVal,
	});

	// #region fade animation
	const startFade = useCallback(() => {
		setRunning(true);

		Animated.timing(fadeVal, {
			toValue: 1,
			duration,
			delay,
			useNativeDriver: nativeDriver,
			easing,
		}).start(() => {
			stopFade();
			onEnd?.();
		});
		onStart?.();
	}, [fadeVal, duration, delay, nativeDriver, easing, onStart, onEnd]);
	// #endregion fade animation

	// #region stop animation
	const stopFade = useCallback(() => {
		fadeVal.stopAnimation();
		setRunning(false);
	}, [fadeVal]);
	// #endregion stop animation

	// #region immediate start
	useEffect(() => {
		startImmediately && startFade();
		return () => stopFade();
	}, [startImmediately]);
	// #endregion immediate start

	// (fade | opacity) = (0 -> 1) | (1 -> 0)
	const fadeValue = type === 'fadeIn' ? currentProgress : 1 - currentProgress;

	return {
		start: startFade,
		stop: stopFade,

		state: running,
		progress: currentProgress,

		value: fadeValue,
		animatedValue: fadeVal,
	};
}

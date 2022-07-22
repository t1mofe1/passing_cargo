import { getPathLength } from '@/utils/svgProperties';
import React, { useMemo } from 'react';
import Animated, { Easing, useAnimatedProps } from 'react-native-reanimated';
import { Path } from 'react-native-svg';

const defaultColors = ['#FFC27A', '#7EDAB9', '#45A6E5', '#FE8777'];

const AnimatedPath = Animated.createAnimatedComponent(Path);

type AnimatedStrokeProps = {
	d: string;
	progress: Animated.SharedValue<number>;
	colors?: string[];
};
export default function AnimatedStroke({ d, progress, colors: _colors }: AnimatedStrokeProps) {
	const colors = _colors ?? defaultColors;
	const strokeColor = colors[Math.round(Math.random() * (colors.length - 1))];

	const length = useMemo(() => getPathLength(d), [d]);

	const animatedBGProps = useAnimatedProps(() => ({
		strokeDashoffset: length - length * Easing.bezierFn(0.61, 1, 0.88, 1)(progress.value),
		fillOpacity: progress.value,
	}));
	const animatedProps = useAnimatedProps(() => ({
		strokeDashoffset: length - length * Easing.bezierFn(0.37, 0, 0.63, 1)(progress.value),
	}));

	return (
		<>
			<AnimatedPath animatedProps={animatedBGProps} d={d} stroke={strokeColor} strokeWidth={2} fill='white' strokeDasharray={length} />
			<AnimatedPath animatedProps={animatedProps} d={d} stroke='black' strokeWidth={1} strokeDasharray={length} />
		</>
	);
}

import { getPathLength } from '@/utils/svgProperties';
import React, { useMemo } from 'react';
import Animated, { Easing, useAnimatedProps } from 'react-native-reanimated';
import { Path } from 'react-native-svg';

const AnimatedPath = Animated.createAnimatedComponent(Path);

const defaultColors = ['#FFC27A', '#7EDAB9', '#45A6E5', '#FE8777'];

type AnimatedStrokeProps = {
	d: string;
	progress: number;
	colors?: string[];
};
export default function AnimatedStroke({ d, progress, colors: _colors }: AnimatedStrokeProps) {
	const colors = _colors ?? defaultColors;
	const strokeColor = colors[Math.round(Math.random() * (colors.length - 1))];

	const length = useMemo(() => getPathLength(d), [d]);

	const animatedBGProps = useAnimatedProps(() => ({
		strokeDashoffset: length - length * Easing.bezierFn(0.61, 1, 0.88, 1)(progress),
		fillOpacity: progress,
	}));
	const animatedProps = useAnimatedProps(() => ({
		strokeDashoffset: length - length * Easing.bezierFn(0.37, 0, 0.63, 1)(progress),
	}));

	return (
		<>
			<AnimatedPath animatedProps={animatedBGProps} d={d} stroke={strokeColor} strokeWidth={10} fill='white' strokeDasharray={length} />
			<AnimatedPath animatedProps={animatedProps} d={d} stroke='black' strokeWidth={10} strokeDasharray={length} />
		</>
	);
}

import useTheme from '@/hooks/useTheme';
import { getPathLength } from '@/utils/svgProperties';
import { useMemo } from 'react';
import Animated, {
  Easing,
  interpolate,
  interpolateColor,
  useAnimatedProps,
  useDerivedValue,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import { Path } from 'react-native-svg';

const windowD =
  'M159 124L166.5 108H177.5C180.5 108 182.5 109 182.5 112V124H159Z';

const AnimatedPath = Animated.createAnimatedComponent(Path);

// TODO: Fix window fill animation

type AnimatedStrokeProps = {
  d: string;
  progress: Animated.SharedValue<number>;
  fillProgress: Animated.SharedValue<number>;
};
export default function AnimatedStroke({
  d,
  progress,
  fillProgress,
}: AnimatedStrokeProps) {
  const {
    colors: { primary: primaryColor, accent: accentColor, background: bgColor },
  } = useTheme();

  const length = useMemo(() => getPathLength(d), [d]);

  const isWindow = d === windowD;

  const animatedBGProps = useAnimatedProps(() => ({
    strokeDashoffset:
      length - length * Easing.bezierFn(0.61, 1, 0.88, 1)(progress.value),

    strokeOpacity: interpolate(fillProgress.value, [0, 1], [1, 0]),
  }));
  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset:
      length - length * Easing.bezierFn(0.37, 0, 0.63, 1)(progress.value),

    strokeOpacity: interpolate(
      fillProgress.value,
      [0, 1],
      [1, isWindow ? 0 : 0.5],
    ),

    fillOpacity: fillProgress.value,
  }));

  const windowFillProgress = useDerivedValue(() => {
    if (fillProgress.value < 1) return 0;

    return withDelay(
      150,
      withTiming(1, {
        duration: 150,
      }),
    );
  });

  const animatedWindowProps = useAnimatedProps(
    () => ({
      fill: interpolateColor(
        fillProgress.value,
        [0, 1],
        [primaryColor, bgColor],
      ),
      fillOpacity: windowFillProgress.value,
    }),
    [bgColor, primaryColor, windowFillProgress.value],
  );

  return (
    <>
      <AnimatedPath
        key={`bg-${d}`}
        animatedProps={animatedBGProps}
        d={d}
        stroke={accentColor}
        strokeWidth={1.5}
        strokeDasharray={length}
      />
      <AnimatedPath
        key={`main-${d}`}
        animatedProps={animatedProps}
        d={d}
        fill={primaryColor}
        stroke={primaryColor}
        strokeWidth={1}
        strokeOpacity={0.5}
        strokeDasharray={length}
      />

      {isWindow && (
        <AnimatedPath
          key={`window`}
          animatedProps={animatedWindowProps}
          d={windowD}
          fill={bgColor}
        />
      )}
    </>
  );
}

import useTheme from '@/hooks/useTheme';
import { FontAwesome5 } from '@expo/vector-icons';
import { Text } from 'react-native';
import Animated, {
  cancelAnimation,
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

type SwipeHintProps = {
  menuGestureState: Animated.SharedValue<boolean>;
  menuProgress: Animated.SharedValue<number>;
  menuExpanded: Animated.SharedValue<boolean>;
  menuExpandedFirstTime: Animated.SharedValue<boolean>;
};
export function SwipeHint({
  menuExpanded,
  menuExpandedFirstTime,
  menuGestureState,
  menuProgress,
}: SwipeHintProps) {
  const {
    colors: { primary: primaryColor },
  } = useTheme();

  const swipeHintAnimState = useSharedValue(true);
  const swipeHintJumpAnimation = useSharedValue(0);
  swipeHintJumpAnimation.value = withRepeat(
    withDelay(
      1000,
      withRepeat(
        withSequence(
          withSpring(1, { mass: 0.5 }),
          withSpring(0, { mass: 0.5 }),
        ),
        2,
      ),
    ),
    -1,
  );
  const swipeHintOpacityAnimation = useDerivedValue(() => {
    if (menuExpandedFirstTime.value) {
      cancelAnimation(swipeHintJumpAnimation);
      swipeHintAnimState.value = false;
      return 0;
    }

    if (menuGestureState.value || menuExpanded.value) {
      cancelAnimation(swipeHintJumpAnimation);
      swipeHintAnimState.value = false;
    } else if (!swipeHintAnimState.value) {
      swipeHintJumpAnimation.value = withRepeat(
        withDelay(
          1000,
          withSequence(withTiming(0), withSpring(1), withTiming(0)),
        ),
        -1,
      );
      swipeHintAnimState.value = true;
    }

    const opacity = interpolate(
      menuProgress.value,
      [0, 1],
      [1, 0],
      Extrapolate.CLAMP,
    );

    return opacity;
  }, [
    menuGestureState.value,
    menuExpandedFirstTime.value,
    menuExpanded.value,
    swipeHintAnimState.value,
  ]);

  return (
    <Animated.View
      style={[
        { alignItems: 'center' },
        useAnimatedStyle(
          () => ({
            transform: [
              {
                translateY: interpolate(
                  swipeHintJumpAnimation.value,
                  [0, 1],
                  [5, 0],
                  Extrapolate.CLAMP,
                ),
              },
            ],
          }),
          [swipeHintJumpAnimation.value],
        ),
        useAnimatedStyle(
          () => ({
            opacity: swipeHintOpacityAnimation.value,
            transform: [
              {
                scale: interpolate(
                  swipeHintOpacityAnimation.value,
                  [0, 1],
                  [0.8, 1],
                  Extrapolate.CLAMP,
                ),
              },
            ],
          }),
          [swipeHintOpacityAnimation.value],
        ),
      ]}
    >
      <FontAwesome5 name='angle-up' size={24} color={primaryColor} />
      <Text
        style={{
          fontSize: 18,
          fontWeight: 'bold',
          color: primaryColor,
        }}
      >
        Swipe up to see more
      </Text>
    </Animated.View>
  );
}

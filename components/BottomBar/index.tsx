import { Buttons } from '@/components/BottomBar/Buttons';
import useAuth from '@/hooks/useAuth';
import { FontAwesome5 } from '@expo/vector-icons';
import { Dimensions, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  Easing,
  Extrapolate,
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withDecay,
  withTiming,
} from 'react-native-reanimated';

// const AnimatedImage = Animated.createAnimatedComponent(Image);

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const formatSnapPoints = (
  snapPoint1: string | number = 0,
  snapPoint2: string | number = SCREEN_HEIGHT,
) => {
  'worklet';

  const snapPoints = [snapPoint1, snapPoint2];

  return snapPoints.map((snap) => {
    if (typeof snap === 'string' && snap.endsWith('%')) {
      return (SCREEN_HEIGHT / 100) * parseFloat(snap);
    }

    return parseFloat(snap as string);
  }) as [number, number];
};

const getClosestSnapPoint = (
  position: number,
  snapPoints: [number, number],
) => {
  'worklet';

  const minDelta = Math.min(
    ...snapPoints.map((point) => Math.abs(position - point)),
  );

  return snapPoints.find(
    (point) => Math.abs(position - point) === minDelta,
  ) as number;
};

type BottomBarProps = {
  menuProgress: Animated.SharedValue<number>;
};
export function BottomBar({ menuProgress }: BottomBarProps) {
  const { user } = useAuth();

  const bottomBarHeight = useSharedValue(0);

  let snapPoints = formatSnapPoints(
    // 60 buttons row + 15 margin + 60 buttons row + 15 margin + 100 slide hint
    // After slide hint is hidden, it will be 60 buttons row + 15 margin + 60 buttons row + 15 margin + 65 free space
    60 + 15 + 60 + 15 + 100,
    SCREEN_HEIGHT - 50,
  );

  const translateY = useSharedValue(snapPoints[0]);
  const ctx = useSharedValue(translateY.value);

  useDerivedValue(() => {
    'worklet';

    menuProgress.value = interpolate(
      translateY.value,
      [snapPoints[0], snapPoints[1]],
      [0, 1],
      Extrapolate.CLAMP,
    );
  });

  const menuExpanded = useSharedValue(false);
  const menuGestureState = useSharedValue(false);
  const menuExpandedFirstTime = useSharedValue(false);

  const gesture = Gesture.Pan()
    .onStart(() => {
      'worklet';

      menuGestureState.value = true;

      ctx.value = translateY.value;
    })
    .onUpdate((e) => {
      'worklet';

      const y = ctx.value - e.translationY;

      // console.log({
      //   cond1: !menuExpanded.value && y >= snapPoints[0] && y <= snapPoints[1],
      //   cond2: menuExpanded.value && y <= snapPoints[1],
      //   cond3:
      //     menuExpanded.value &&
      //     y <= bottomBarHeight.value &&
      //     y >= snapPoints[1],

      //   menuExpanded: menuExpanded.value,
      //   y,
      //   snapPoints,
      // });

      // TODO: Menu is not going to end to 0

      if (
        (!menuExpanded.value && y >= snapPoints[0] && y <= snapPoints[1]) ||
        (menuExpanded.value && y <= snapPoints[1]) ||
        (menuExpanded.value && y <= bottomBarHeight.value && y >= snapPoints[1])
      ) {
        menuExpanded.value = y >= snapPoints[1];
        translateY.value = y;
      }
    })
    .onEnd((e) => {
      'worklet';

      const translationY = ctx.value - e.translationY;
      let y = translationY;

      menuGestureState.value = false;

      // 1. if the menu is not expanded
      // 2. if the menu is expanded and the y is less than the second snap point
      if (!menuExpanded.value || translationY < snapPoints[1]) {
        const closestSnapPointWithVelocity = getClosestSnapPoint(
          translationY - e.velocityY * 0.5,
          snapPoints,
        );

        y = closestSnapPointWithVelocity;

        const isMenuExpanded = y >= snapPoints[1];
        menuExpanded.value = isMenuExpanded;
        if (isMenuExpanded && !menuExpandedFirstTime.value) {
          menuExpandedFirstTime.value = true;
        }

        translateY.value = withTiming(y, {
          duration: 200,
          easing: Easing.bezier(0.25, 0.1, 0.25, 1),
        });

        return;
      }

      translateY.value = withDecay(
        {
          velocity: -e.velocityY,
          velocityFactor: 0.75,
          clamp: [snapPoints[0], bottomBarHeight.value],
        },
        (isFinished) => {
          // If scroll transition finished between snap points
          if (isFinished && translateY.value < snapPoints[1]) {
            translateY.value = withTiming(
              getClosestSnapPoint(translateY.value, snapPoints),
              {
                duration: 200,
                easing: Easing.bezier(0.25, 0.1, 0.25, 1),
              },
            );
          }
        },
      );
    });

  const bottomBarBottomProgress = useDerivedValue(() => {
    const progress = interpolate(
      translateY.value,
      [snapPoints[1], bottomBarHeight.value],
      [0, 1],
    );

    return progress;
  }, [translateY.value, bottomBarHeight.value]);

  return (
    <GestureDetector gesture={gesture}>
      <View
        style={[
          {
            position: 'absolute',
            width: '100%',
            height: '100%',
          },
        ]}
        pointerEvents='box-none'
      >
        <Animated.View
          onLayout={({
            nativeEvent: {
              layout: { height },
            },
          }) => (bottomBarHeight.value = height)}
          style={[
            {
              width: '100%',

              alignItems: 'center',

              borderTopLeftRadius: 15,
              borderTopRightRadius: 15,

              backgroundColor: '#111',
            },
            useAnimatedStyle(() => ({
              transform: [{ translateY: SCREEN_HEIGHT - translateY.value }],
            })),
          ]}
        >
          <BottomBarIndicator />

          <Buttons
            menuExpanded={menuExpanded}
            menuExpandedFirstTime={menuExpandedFirstTime}
            menuProgress={menuProgress}
            menuGestureState={menuGestureState}
          />

          <Animated.View
            style={[
              { width: '100%' },
              useAnimatedStyle(
                () => ({
                  marginTop: interpolate(
                    menuProgress.value,
                    [0, 1],
                    [30, -50],
                    Extrapolate.CLAMP,
                  ),
                }),
                [menuProgress.value],
              ),
            ]}
          >
            <Animated.Text
              style={[
                {
                  color: '#fff',
                  fontSize: 20,
                  fontWeight: 'bold',
                  marginLeft: 20,
                  marginRight: 20,
                },
                useAnimatedStyle(
                  () => ({
                    opacity: interpolate(
                      menuProgress.value,
                      [0, 0.1, 0.75, 1],
                      [0, 0, 1, 1],
                      Extrapolate.CLAMP,
                    ),
                  }),
                  [menuProgress.value],
                ),
              ]}
            >
              TITLE 1
            </Animated.Text>
            <Animated.Text
              style={[
                {
                  color: '#fff',
                  fontSize: 16,
                  lineHeight: 20,
                  textAlign: 'justify',

                  marginLeft: 20,
                  marginRight: 20,
                  marginTop: 20,
                },
                useAnimatedStyle(
                  () => ({
                    opacity: interpolate(
                      menuProgress.value,
                      [0, 0.2, 0.95, 1],
                      [0, 0, 1, 1],
                      Extrapolate.CLAMP,
                    ),
                  }),
                  [menuProgress.value],
                ),
              ]}
            >
              Meet soap ago rice comfortable meat finally science natural any it
              winter morning pale lunch bottle factory struggle art bend coming
              history direct does as stick president remember common hung child
              wish possibly explain kitchen compare fought soft state anything
              coal moment mistake tightly small plastic turn current
            </Animated.Text>
          </Animated.View>
          <Animated.View
            style={[
              { width: '100%', marginTop: 35 },
              useAnimatedStyle(
                () => ({
                  opacity: interpolate(
                    menuProgress.value,
                    [0, 0.45, 1],
                    [0, 0, 1],
                    Extrapolate.CLAMP,
                  ),
                }),
                [menuProgress.value],
              ),
            ]}
          >
            <Animated.Text
              style={[
                {
                  color: '#fff',
                  fontSize: 20,
                  fontWeight: 'bold',
                  marginLeft: 20,
                  marginRight: 20,
                },
                useAnimatedStyle(
                  () => ({
                    transform: [
                      {
                        translateX: interpolate(
                          menuProgress.value,
                          [0, 0.35, 0.65, 1],
                          [-100, -100, 0, 0],
                          Extrapolate.CLAMP,
                        ),
                      },
                    ],
                  }),
                  [menuProgress.value],
                ),
              ]}
            >
              TITLE 2
            </Animated.Text>
            <Animated.Text
              style={[
                {
                  color: '#fff',
                  fontSize: 16,
                  lineHeight: 20,
                  textAlign: 'justify',

                  marginLeft: 20,
                  marginRight: 20,
                  marginTop: 20,
                },
                useAnimatedStyle(
                  () => ({
                    transform: [
                      {
                        translateX: interpolate(
                          menuProgress.value,
                          [0, 0.35, 0.65, 1],
                          [-150, -150, 0, 0],
                          Extrapolate.CLAMP,
                        ),
                      },
                    ],
                  }),
                  [menuProgress.value],
                ),
              ]}
            >
              Pupil log machinery tired arrange service snow melted wait go
              story drove piece said fruit slope refer fear ball anybody began
              dog recent audience nervous break strong regular sang poor rubbed
              article wide thee shout coming kids finally setting cutting needle
              feature better thrown song flight who former greatly organization
              cloth successful passage lovely gain dug voice faster tribe world
              silence serve street shadow swing shade raise chosen business
              contrast worker spend
            </Animated.Text>
          </Animated.View>
          <Animated.View
            style={[
              {
                width: '100%',
                marginTop: 35,
              },
              useAnimatedStyle(
                () => ({
                  opacity: interpolate(
                    bottomBarBottomProgress.value,
                    [-0.5, 0.5],
                    [0, 1],
                    Extrapolate.CLAMP,
                  ),
                }),
                [bottomBarBottomProgress.value],
              ),
            ]}
          >
            <Animated.Text
              style={[
                {
                  color: '#fff',
                  fontSize: 20,
                  fontWeight: 'bold',
                  marginLeft: 20,
                  marginRight: 20,
                },
                useAnimatedStyle(
                  () => ({
                    transform: [
                      {
                        translateX: interpolate(
                          bottomBarBottomProgress.value,
                          [-0.5, 0],
                          [500, 0],
                          Extrapolate.CLAMP,
                        ),
                      },
                    ],
                  }),
                  [bottomBarBottomProgress.value],
                ),
              ]}
            >
              TITLE 3
            </Animated.Text>
            <Animated.Text
              style={[
                {
                  color: '#fff',
                  fontSize: 16,
                  lineHeight: 20,
                  textAlign: 'justify',

                  marginLeft: 20,
                  marginRight: 20,
                  marginTop: 20,
                },
                useAnimatedStyle(
                  () => ({
                    transform: [
                      {
                        translateX: interpolate(
                          bottomBarBottomProgress.value,
                          [-0.75, 0],
                          [500, 0],
                          Extrapolate.CLAMP,
                        ),
                      },
                    ],
                  }),
                  [bottomBarBottomProgress.value],
                ),
              ]}
            >
              Audience sets below hope library organization underline fifty
              queen eat protection dangerous joined unit increase substance
              wrote silence discuss kids raise ride hold shout settle human
              those magnet end middle bus like drive happy herself earn sail
              canal finest captured therefore jet parallel ordinary himself
              after island giving
            </Animated.Text>
          </Animated.View>

          <View
            style={{
              width: '100%',
              height: 100,
            }}
          />

          {/* PROFILE CONTAINER */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',

              // backgroundColor: 'red',

              width: '100%',

              paddingHorizontal: 20,
              paddingVertical: 20,

              marginBottom: 50,
            }}
          >
            {/* SETTINGS BUTTON */}
            <Animated.View
              style={[
                {
                  width: 50,
                  aspectRatio: 1,

                  backgroundColor: 'rgba(255, 255, 255, 0.5)',

                  borderRadius: 10,

                  justifyContent: 'center',
                  alignItems: 'center',
                },
                useAnimatedStyle(() => ({
                  transform: [
                    {
                      translateX: interpolate(
                        bottomBarBottomProgress.value,
                        [0, 0.65, 0.95],
                        [-100, -100, 0],
                        Extrapolate.CLAMP,
                      ),
                    },
                  ],
                })),
              ]}
            >
              <FontAwesome5 name='cog' size={24} color='white' />
            </Animated.View>

            {/* PROFILE INFO */}
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',

                // backgroundColor: 'blue',
              }}
            >
              <View
                style={{
                  marginRight: 20,
                }}
              >
                <Animated.Text
                  style={[
                    {
                      color: 'white',
                      fontSize: 16,
                      fontWeight: 'bold',
                      textAlign: 'right',
                    },
                    useAnimatedStyle(() => ({
                      transform: [
                        {
                          translateX: interpolate(
                            bottomBarBottomProgress.value,
                            [0, 0.65, 0.95],
                            [350, 350, 0],
                            Extrapolate.CLAMP,
                          ),
                        },
                      ],
                    })),
                  ]}
                >
                  {user!.first_name} {user!.last_name}
                </Animated.Text>
                <Animated.Text
                  style={[
                    {
                      color: 'rgb(201, 201, 201)',
                      fontSize: 12,
                      textAlign: 'right',
                    },
                    useAnimatedStyle(() => ({
                      transform: [
                        {
                          translateX: interpolate(
                            bottomBarBottomProgress.value,
                            [0, 0.35, 1],
                            [350, 350, 0],
                            Extrapolate.CLAMP,
                          ),
                        },
                      ],
                    })),
                  ]}
                >
                  {user!.id}
                </Animated.Text>
              </View>

              <Animated.Image
                source={{ uri: user!.avatar }}
                style={[
                  {
                    borderRadius: 12, // 1/5 of width

                    width: 60,
                    aspectRatio: 1,
                  },
                  useAnimatedStyle(() => ({
                    transform: [
                      {
                        translateX: interpolate(
                          bottomBarBottomProgress.value,
                          [0, 0.65, 1],
                          [80, 80, 0],
                          Extrapolate.CLAMP,
                        ),
                      },
                    ],
                  })),
                ]}
              />
            </View>
          </View>

          {/* <View
            style={{
              width: '100%',
              height: 100,
              backgroundColor: 'green',
            }}
          /> */}

          {/* <Addresses /> */}
          {/* <FlatList
              data={[
                {
                  icon: 'home',
                  title: 'Home',
                  subtitle: 'Pihlaka 14, Tallinn',
                },
                {
                  icon: 'briefcase',
                  title: 'Work',
                  subtitle: 'Pärnu mnt 57, Tallinn 10135',
                },
                {
                  icon: 'clock',
                  title: 'Juurdeveo 25b',
                  subtitle: 'Tallinn 11313',
                },
                {
                  icon: 'clock',
                  title: 'Juurdeveo 25b',
                  subtitle: 'Tallinn 11313',
                },
                {
                  icon: 'clock',
                  title: 'Juurdeveo 25b',
                  subtitle: 'Tallinn 11313',
                },
                {
                  icon: 'clock',
                  title: 'Juurdeveo 25b',
                  subtitle: 'Tallinn 11313',
                },
                {
                  icon: 'clock',
                  title: 'Juurdeveo 25b',
                  subtitle: 'Tallinn 11313',
                },
              ]}
              renderItem={({ item }) => (
                <View
                  style={{
                    flexDirection: 'row',

                    width: '100%',
                    height: 60,

                    paddingHorizontal: 15,
                  }}
                ></View>
              )}
              keyExtractor={(item, i) => `${item.title} ${i}  ${item.subtitle}`}
              ItemSeparatorComponent={() => (
                <View
                  style={{
                    width: '100%',
                    height: 1,

                    backgroundColor: '#e9eaee',
                  }}
                />
              )}
              style={{
                width: '100%',

                paddingHorizontal: 15,
              }}
            /> */}
        </Animated.View>
      </View>
    </GestureDetector>
  );
}

function BottomBarIndicator() {
  return (
    <View
      style={{
        backgroundColor: '#e9eaee',
        width: 40,
        height: 5,
        borderRadius: 5,

        marginVertical: 10,
      }}
    />
  );
}

// type AddressBarProps = {
//   type: 'home' | 'work' | 'recent' | 'other';
//   title: string;
//   subtitle: string;
// };
// function Addresses({ type, title, subtitle }: AddressBarProps) {
//   const {
//     colors: { primary: primaryColor },
//   } = useTheme();

//   return (
//     <View
//       style={{
//         width: '100%',
//       }}
//     >
//       <Animated.View>
//         <View
//           style={{
//             flexDirection: 'row',
//             alignItems: 'center',
//             justifyContent: 'space-between',

//             width: '100%',
//             height: 60,

//             paddingHorizontal: 15,
//           }}
//         >
//           <View
//             style={{
//               flexDirection: 'row',
//               alignItems: 'center',
//             }}
//           >
//             <FontAwesome5 name={type} size={20} color={mainColor} />

//             <View
//               style={{
//                 marginLeft: 15,
//               }}
//             >
//               <Text
//                 style={{
//                   fontSize: 18,
//                   fontWeight: '500',

//                   color: '#2f313f',
//                 }}
//               >
//                 {title}
//               </Text>

//               <Text
//                 style={{
//                   fontSize: 14,
//                   fontWeight: '500',

//                   color: '#2f313f',
//                 }}
//               >
//                 {subtitle}
//               </Text>
//             </View>
//           </View>
//         </View>
//       </Animated.View>
//     </View>
//   );
// }

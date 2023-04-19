import { SwipeHint } from '@/components/BottomBar/SwipeHint';
import useScreens from '@/hooks/useScreens';
import useTheme from '@/hooks/useTheme';
import { FontAwesome5 } from '@expo/vector-icons';
import { PropsWithChildren } from 'react';
import { Alert, Text, TouchableHighlight, View } from 'react-native';
import Animated from 'react-native-reanimated';

type ButtonsProps = {
  menuExpanded: Animated.SharedValue<boolean>;
  menuExpandedFirstTime: Animated.SharedValue<boolean>;
  menuGestureState: Animated.SharedValue<boolean>;
  menuProgress: Animated.SharedValue<number>;
};
export function Buttons(props: ButtonsProps) {
  const {
    menuExpanded,
    menuExpandedFirstTime,
    menuGestureState,
    menuProgress,
  } = props;

  const {
    colors: { primary: primaryColor },
  } = useTheme();

  const screens = useScreens();

  return (
    <View style={{ marginBottom: 32.5 }}>
      <ButtonsRow>
        <Button
          bgColor={primaryColor}
          color='white'
          icon='truck-loading'
          title='Cargo Now'
          flex
          first
          iconSize={22}
          onClick={() => {
            // screens.navigation.open('
          }}
        />
      </ButtonsRow>

      <ButtonsRow>
        <Button
          icon='car'
          title='Cargo Drive'
          subTitle='Rent our Cargo-cars'
          flex
          first
        />

        <Button icon='calendar-alt' />
      </ButtonsRow>

      <SwipeHint
        {...{
          menuExpanded,
          menuExpandedFirstTime,
          menuGestureState,
          menuProgress,
        }}
      />
    </View>
  );
}

type ButtonProps = {
  bgColor?: string;
  color?: string;

  icon?: string;
  iconSize?: number;

  title?: string;
  subTitle?: string;

  flex?: boolean;

  first?: boolean;

  onClick?: () => void;
};
function Button(props: ButtonProps) {
  let {
    bgColor,
    color,
    icon,
    iconSize,
    title,
    subTitle,
    flex,
    first,
    onClick,
  } = props;

  const {
    colors: { primary: primaryColor },
  } = useTheme();

  onClick = onClick || (() => Alert.alert(`Click`));

  return (
    <TouchableHighlight
      style={[
        (flex && {
          flex: 1,
        }) || { aspectRatio: 1, justifyContent: 'center' },
        {
          height: '100%',

          backgroundColor: bgColor || '#f4f4f6',
          borderRadius: 5,

          padding: 15,

          marginLeft: first ? 0 : 15,

          flexDirection: 'row',
          alignItems: 'center',
        },
      ]}
      underlayColor={'#333'}
      onPress={onClick}
    >
      <>
        {icon && (
          <FontAwesome5
            name={icon}
            size={iconSize || 26}
            color={color || primaryColor}
            style={{
              width: 30,
              aspectRatio: 1,

              textAlign: 'center',

              lineHeight: 30,
            }}
          />
        )}

        {title && (
          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'center',

              marginLeft: icon ? 15 : 0,
            }}
          >
            <Text
              style={{
                fontSize: 18,
                fontWeight: '600',

                color: color || '#2f313f',
              }}
            >
              {title}
            </Text>
            {subTitle && (
              <>
                <View
                  style={{
                    height: 1,
                  }}
                />
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: '400',

                    color: '#666878',
                  }}
                >
                  {subTitle}
                </Text>
              </>
            )}
          </View>
        )}
      </>
    </TouchableHighlight>
  );
}

function ButtonsRow({ children }: PropsWithChildren) {
  return (
    <View
      style={{
        flexDirection: 'row',

        width: '100%',
        height: 60,

        paddingHorizontal: 15,

        marginBottom: 15,
      }}
    >
      {children}
    </View>
  );
}

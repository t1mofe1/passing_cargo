import useScreens from '@/hooks/useScreens';
import useTheme from '@/hooks/useTheme';
import { RootStackParamList } from '@/navigation/RootStackParamList';
import { FontAwesome5 } from '@expo/vector-icons';
import * as NavigationBar from 'expo-navigation-bar';
import {
  Button,
  Platform,
  Text,
  TouchableHighlight,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type BtnProps<Link extends keyof RootStackParamList> = {
  link: Link;
  icon: string;
  iconSize?: number;
  title?: string;
};

export function BottomNavbar() {
  const { colors } = useTheme();

  const {
    navigation,
    route: { name: currentScreen },
  } = useScreens();

  const { bottom: bottomSafeAreaInset } = useSafeAreaInsets();

  const btns: BtnProps<any>[] = [
    {
      link: 'Home',
      icon: 'home',
      title: 'Home',
    },
    {
      link: 'Chats',
      icon: 'comments',
      title: 'Chats',
    },
    {
      link: 'Deliveries',
      icon: 'truck',
      title: 'Deliveries',
    },
    {
      link: 'Profile',
      icon: 'user',
      title: 'Profile',
    },
  ];

  Platform.OS === 'android' &&
    NavigationBar.setBackgroundColorAsync(colors.background);

  return (
    <>
      <View
        style={{
          backgroundColor: colors.background,

          flexDirection: 'row',
          justifyContent: 'space-between',

          paddingBottom: bottomSafeAreaInset,
        }}
      >
        {btns.map((btn) => {
          return (
            <BottomNavbarButton
              key={btn.link}
              icon={btn.icon}
              iconSize={btn.iconSize}
              title={btn.title}
              active={currentScreen === btn.link}
              onPress={() => {
                if (currentScreen === btn.link) return;

                navigation.openAsNew(btn.link);
              }}
            />
          );
        })}
      </View>
    </>
  );
}

type BottomNavbarButtonProps = {
  icon: string;
  iconSize?: number;

  title?: string;

  onPress?: () => void;

  active?: boolean;
};
function BottomNavbarButton(props: BottomNavbarButtonProps) {
  const { icon, iconSize = 20, onPress, active = false, title } = props;

  const {
    colors: { primary: primaryColor, gray },
  } = useTheme();

  const color = active ? primaryColor : gray;

  return (
    <TouchableOpacity
      style={{
        alignItems: 'center',
        justifyContent: 'center',

        paddingVertical: 10,

        flex: 1,
      }}
      activeOpacity={0.5}
      onPress={onPress}
    >
      <>
        <FontAwesome5 name={icon} size={iconSize} color={color} />

        {title && (
          <Text
            style={{
              color: color,
              fontSize: 10,
              fontWeight: 'bold',
              marginTop: 5,
            }}
          >
            {title}
          </Text>
        )}
      </>
    </TouchableOpacity>
  );
}

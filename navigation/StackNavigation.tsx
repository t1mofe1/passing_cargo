import { linkingConfiguration } from '@/navigation/LinkingConfiguration';
import { RootStackParamList } from '@/navigation/RootStackParamList';
import { screens } from '@/navigation/screens';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Tabs = createNativeStackNavigator<RootStackParamList>();

export function Navigation() {
  return (
    <NavigationContainer<RootStackParamList>
      onUnhandledAction={(action) =>
        console.log({ type: 'unhandled navigation action', action })
      }
      linking={linkingConfiguration}
    >
      <Tabs.Navigator
        initialRouteName={'Auth'}
        screenListeners={({ route }) => ({
          focus: ({ data }) => {
            console.log(
              `[NAVIGATION]: Changed screen to ${JSON.stringify(route.name)}${
                data ? ' | ' + JSON.stringify(route.params) : ''
              }`,
            );
          },
        })}
        screenOptions={{
          headerShown: false,
          animation: 'fade',
          animationDuration: 50,
        }}
      >
        {screens.map((screen) => (
          <Tabs.Screen
            name={screen.name}
            component={screen.component}
            key={screen.name}
            options={{
              gestureEnabled: screen.closeOnBackOrGesture,
            }}
          />
        ))}
      </Tabs.Navigator>
    </NavigationContainer>
  );
}

import SplashScreen from '@/components/SplashScreen';
import RestartButton from '@/components/Utils/RestartButton';
import { AuthContextProvider } from '@/context/AuthContext';
import { Navigation } from '@/navigation/StackNavigation';
import { StatusBar } from 'expo-status-bar';
import 'intl';
import 'intl/locale-data/complete';
import { LogBox, UIManager } from 'react-native';
import 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

UIManager.setLayoutAnimationEnabledExperimental?.(true);

LogBox.ignoreLogs([`Require cycle: `]);

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <AuthContextProvider>
          <StatusBar animated />

          <SplashScreen skipAnimation>
            <Navigation />
          </SplashScreen>

          {/* <RestartButton /> */}
        </AuthContextProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

import SplashScreen from '@/components/SplashScreen';
import { AuthContextProvider } from '@/context/AuthContext';
import { Navigation } from '@/navigation/StackNavigation';
import { StatusBar } from 'expo-status-bar';
import * as WebBrowser from 'expo-web-browser';
import {
	// StrictMode,
	useEffect,
} from 'react';
import { UIManager } from 'react-native';
import 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

UIManager.setLayoutAnimationEnabledExperimental?.(true);

WebBrowser.maybeCompleteAuthSession();

export default function App() {
	useEffect(() => {
		WebBrowser.warmUpAsync();

		return () => {
			WebBrowser.coolDownAsync();
		};
	}, []);

	return (
		// <StrictMode>
		<SafeAreaProvider>
			<AuthContextProvider>
				<StatusBar />
				<SplashScreen>
					<Navigation />
				</SplashScreen>
			</AuthContextProvider>
		</SafeAreaProvider>
		// </StrictMode>
	);
}

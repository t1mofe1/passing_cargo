import SplashScreen from '@/components/SplashScreen';
import StartScreen from '@/components/StartScreen';
import ChangeFirstInitStateButton from '@/components/Utils/ChangeFirstInitStateButton';
import RestartButton from '@/components/Utils/RestartButton';
import { AuthContextProvider } from '@/context/AuthContext';
import { StatusBar } from 'expo-status-bar';
import * as WebBrowser from 'expo-web-browser';
import { StrictMode, useEffect, useState } from 'react';
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

	const [appLoading, setAppLoading] = useState(true);

	return (
		// <StrictMode>
		<SafeAreaProvider>
			<AuthContextProvider>
				<StatusBar />

				<SplashScreen onCompleted={() => setAppLoading(false)}>{!appLoading && <StartScreen />}</SplashScreen>

				<ChangeFirstInitStateButton />
				<RestartButton />
			</AuthContextProvider>
		</SafeAreaProvider>
		// </StrictMode>
	);
}

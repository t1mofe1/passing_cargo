import { StatusBar } from 'expo-status-bar';
// import { StrictMode } from 'react';
import SplashScreen from '@/components/SplashScreen';
import { AuthContextProvider } from '@/context/AuthContext';
import { Navigation } from '@/navigation/StackNavigation';
import { UIManager } from 'react-native';
import 'react-native-gesture-handler';
import { useMMKVListener } from 'react-native-mmkv';
import { SafeAreaProvider } from 'react-native-safe-area-context';

UIManager.setLayoutAnimationEnabledExperimental(true);

export default function App() {
	useMMKVListener(key => {
		console.log(`MMKV: "${key}" changed!`);
	});

	return (
		// <StrictMode>
		<SafeAreaProvider>
			<AuthContextProvider>
				<SplashScreen>
					<Navigation />
					{/* TODO: check what is statusbar */}
					<StatusBar />
				</SplashScreen>
			</AuthContextProvider>
		</SafeAreaProvider>
		// </StrictMode>
	);
}

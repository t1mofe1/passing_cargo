import Constants from 'expo-constants';
import { StatusBar } from 'expo-status-bar';
import { StrictMode } from 'react';
import 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import SplashScreen from './components/SplashScreen';
import { AuthContextProvider } from './context/AuthContext';
import { Navigation } from './navigation';

export default function App() {
	return (
		<StrictMode>
			<SafeAreaProvider>
				<AuthContextProvider>
					<SplashScreen image={Constants.manifest!.splash!.image}>
						<Navigation />
						{/* TODO: check what is statusbar */}
						<StatusBar />
					</SplashScreen>
				</AuthContextProvider>
			</SafeAreaProvider>
		</StrictMode>
	);
}

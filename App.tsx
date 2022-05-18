import Constants from 'expo-constants';
import { StatusBar } from 'expo-status-bar';
import { StrictMode } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import SplashScreen from './components/SplashScreen';
import { Navigation } from './navigation';

export default function App() {
	return (
		<StrictMode>
			<SafeAreaProvider>
				<SplashScreen image={Constants.manifest?.splash?.image}>
					<Navigation />
					{/* TODO: check what is statusbar */}
					<StatusBar />
				</SplashScreen>
			</SafeAreaProvider>
		</StrictMode>
	);
}

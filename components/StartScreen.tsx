import FirstInitScreen from '@/components/FirstInitScreen/FirstInitScreen';
import { Navigation } from '@/navigation/StackNavigation';
import { useStore } from '@/Storage';

export default function StartScreen() {
	const [userIsInitializingAppFirstTime] = useStore.firstInit();

	console.log(`[StartScreen]: firstInit: ${userIsInitializingAppFirstTime}`);

	if (userIsInitializingAppFirstTime === true) {
		return <FirstInitScreen />;
	} else {
		return <Navigation />;
	}
}

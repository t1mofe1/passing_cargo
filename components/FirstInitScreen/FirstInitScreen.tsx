import IntroducingSlider from '@/components/FirstInitScreen/IntroducingSlider';
import WelcomeCard from '@/components/FirstInitScreen/WelcomeCard';
import { useStore } from '@/Storage';
import { useState } from 'react';
import { View } from 'react-native';

const states = [WelcomeCard, IntroducingSlider];

export default function FirstInitScreen() {
	const [currentState, setCurrentState] = useState(0);

	console.log(`Hello from FirstInitScreen`);

	const [firstInit] = useStore.firstInit();

	console.log(`FirstInitScreen: firstInit: ${firstInit}`);

	const onInteractionEnd = () => {
		console.log(`[Start Screen]: Next state -> ${currentState + 1}`);
		setCurrentState(state => state + 1);
	};

	const Component = states[currentState];

	return (
		<View
			style={{
				flex: 1,
				backgroundColor: colors.background,
			}}
		>
			{<Component onInteractionEnd={onInteractionEnd} />}
		</View>
	);
}

const colors = {
	primary: '#01B763',
	background: '#181A20',
	text: '#FFFFFF',
	secondary: '#35383F',
	foreground: '#1F222A',
	border: '#31343C',
};

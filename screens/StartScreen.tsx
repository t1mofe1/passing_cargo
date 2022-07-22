import IntroducingSlider from '@/components/StartScreen/IntroducingSlider';
import WelcomeCard from '@/components/StartScreen/WelcomeCard';
import { useState } from 'react';
import { View } from 'react-native';

const states = [WelcomeCard, IntroducingSlider];

export default function StartScreen() {
	const [currentState, setCurrentState] = useState(0);

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

import { useEffect, useRef, useState } from 'react';
import { Animated } from 'react-native';

type ListenerProps = {
	value: Animated.Value;
	autoListen?: boolean;
	onProgress?: (progress: number) => void;
};
export default function useAnimatedProgressListener({ value, autoListen = true, onProgress }: ListenerProps) {
	const [currentProgress, setCurrentProgress] = useState(0);
	const listener = useRef<string>();

	const listen = () => {
		if (!listener.current) {
			listener.current = value.addListener(({ value: progressValue }) => {
				setCurrentProgress(progressValue);
				onProgress?.(progressValue);
			});
		}
	};
	const stopListening = () => {
		listener.current && value.removeListener(listener.current);
	};

	useEffect(() => {
		autoListen && listen();

		return () => stopListening();
	}, []);

	return {
		progress: currentProgress,

		listen,
		stopListening,

		listening: !!listener.current,
	};
}

import { getAvailableVoicesAsync, isSpeakingAsync, pause, resume, speak, stop } from 'expo-speech';
import { useCallback } from 'react';

export function useSpeech() {
	return {
		speak,
		stop,
		pause,
		resume,
		getAvailableVoices: getAvailableVoicesAsync,
		isSpeaking: isSpeakingAsync,
	};
}

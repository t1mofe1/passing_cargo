import { openAuthSessionAsync, openBrowserAsync } from 'expo-web-browser';

export default function useWebBrowser() {
	return {
		open: openBrowserAsync,
		openAuth: openAuthSessionAsync,
	};
}

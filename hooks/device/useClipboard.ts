import { addClipboardListener, getStringAsync, setString } from 'expo-clipboard';
import { useCallback, useEffect, useState } from 'react';

export function useClipboard() {
	const [currentClipboard, setCurrentClipboard] = useState<string>();

	const getClipboard = useCallback(async () => {
		const clipboard = await getStringAsync();
		setCurrentClipboard(clipboard);
		return clipboard;
	}, []);
	const setClipboard = useCallback(async (value: string) => {
		await setString(value);
		setCurrentClipboard(value);
	}, []);

	useEffect(() => {
		getClipboard();
	}, []);

	useEffect(() => {
		const clipboardSub = addClipboardListener(({ content }) => setClipboard(content));
		return () => clipboardSub.remove();
	}, []);

	return {
		setClipboard,
		getClipboard,
		clipboard: currentClipboard,
	};
}

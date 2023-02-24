import { findDifferencesInObjects } from '@/utils/objectCompare';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';
import createStore from 'teaful';

export async function _getStorageData() {
	let keys: readonly string[];
	Platform.OS !== 'web' && (keys = await AsyncStorage.getAllKeys());

	const dataArray = Platform.OS === 'web' ? Object.entries<string>(window.localStorage) : await AsyncStorage.multiGet(keys!);

	const dataObject: Partial<typeof initialStorage> = dataArray.reduce<object>((acc, [key, value]) => Object.assign(acc, { [key]: value }), {});

	console.log('Storage data:', dataObject);

	return dataObject;
}

const initialStorage = {
	firstInit: true,
};
export const { useStore, getStore, setStore, withStore } = createStore(initialStorage, async ({ store, prevStore }) => {
	Object.entries(store).forEach(async ([key, value]) => {
		await AsyncStorage.setItem(key, typeof value === 'object' ? JSON.stringify(value) : String(value), err => err && console.log(`Error saving ${key}`, err));
	});

	const changes = findDifferencesInObjects(prevStore, store);

	if (Object.keys(changes).length > 0) console.log(`[Storage] Store changed: ${JSON.stringify(changes, null, 2)}`);
});

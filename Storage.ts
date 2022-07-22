import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';
import createStore from 'teaful';

export async function _getStorageData() {
	let keys: readonly string[];
	Platform.OS !== 'web' && (keys = await AsyncStorage.getAllKeys());

	const dataArray = Platform.OS === 'web' ? Object.entries<string>(window.localStorage) : await AsyncStorage.multiGet(keys!);

	const dataObject: Partial<typeof initialStorage> = dataArray.reduce<object>((acc, [key, value]) => Object.assign(acc, { [key]: value }), {});

	return dataObject;
}

const initialStorage = {
	firstInit: true,
};
export const { useStore, getStore, setStore, withStore } = createStore(initialStorage, ({ store, prevStore }) => {
	console.log(`[Storage] Store changed: ${JSON.stringify(prevStore)} -> ${JSON.stringify(store)}`);
});

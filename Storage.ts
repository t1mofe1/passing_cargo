import { MMKV } from 'react-native-mmkv';

const storage = new MMKV({
	id: 'pg.storage',
});

export default storage;

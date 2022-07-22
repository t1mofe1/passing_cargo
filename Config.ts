import Constants, { AppOwnership } from 'expo-constants';
import { Platform } from 'react-native';

export type OAuthProviderName = 'google';
// | 'apple' | 'facebook';

export type OAuthProvider = {
	clientId?: string;
	redirectUri?: string;
	scopes?: string[];
};

const defaultOAuth = {
	redirectUri: `auth/<Provider>`,
};

type ConfigI = {
	oauth: {
		[key in keyof typeof defaultOAuth]: typeof defaultOAuth[key];
	} & {
		[prov in OAuthProviderName]: OAuthProvider;
	};
};
export const Config: ConfigI = {
	oauth: {
		...defaultOAuth,
		google: {
			...defaultOAuth,
			clientId:
				Constants.appOwnership === AppOwnership.Expo || Platform.OS === 'web'
					? `1067996307578-75hf2uvilevokgdajtqvqi23q690vq1e.apps.googleusercontent.com`
					: `1067996307578-53k86tlcg5b9v4hkpg7f4i5sf1d1m3mu.apps.googleusercontent.com`,
		},
		// facebook: {
		// 	...defaultOAuth,
		// },
	},
};

export default Config;

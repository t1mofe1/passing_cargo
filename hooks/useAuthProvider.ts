import Config, { OAuthProviderName } from '@/Config';
import { makeRedirectUri } from 'expo-auth-session';
import * as FacebookAuth from 'expo-auth-session/providers/facebook';
import * as GoogleAuth from 'expo-auth-session/providers/google';
import Constants, { AppOwnership } from 'expo-constants';
import * as WebBrowser from 'expo-web-browser';
import { useEffect } from 'react';
import { Platform } from 'react-native';

export type GoogleUserInfo = {
	id: string;
	name: string;
	given_name: string;
	family_name: string;
	picture: string;
	email: string;
	verified_email: boolean;
	locale: string;
};

Platform.OS === 'web' && WebBrowser.maybeCompleteAuthSession();

export default function useAuthProvider(provider: OAuthProviderName) {
	// #region warm up browser on android
	useEffect(() => {
		Platform.OS === 'android' && WebBrowser.warmUpAsync();

		return () => {
			Platform.OS === 'android' && WebBrowser.coolDownAsync();
		};
	});
	// #endregion warm up browser on android

	const OAuth = provider === 'google' ? GoogleAuth : FacebookAuth;
	// const OAuth = GoogleAuth;

	const providerInfo = Config.oauth[provider];

	const redirectUri = makeRedirectUri({
		path: (providerInfo.redirectUri ?? Config.oauth.redirectUri)
			// test replaceAll
			.replace(/<Provider>/g, provider),

		// TODO: should we use everything below?
		preferLocalhost: true,
		useProxy: Constants.appOwnership === AppOwnership.Expo,
	});

	// combine google and facebook config together
	const authRequestConfig: Partial<GoogleAuth.GoogleAuthRequestConfig & FacebookAuth.FacebookAuthRequestConfig> = {
		clientId: providerInfo.clientId,
		redirectUri,
	};

	const [request, response, promptAsync] = OAuth.useAuthRequest(authRequestConfig);

	const login = async () => {
		const result = await promptAsync();

		const authentication = result.type === 'success' ? result.authentication : null;

		if (!authentication) {
			if (result.type === 'error') console.warn(`Error while logging in with ${provider}: ${result.error}`);
			else console.warn(`${provider} login failed: ${result.type}`);
		}

		console.log({
			request,
			response,
			authentication,
			result,
		});

		return {
			request,
			response,
			authentication,
			result,
		};
	};

	return { login, provider, redirectUri, OAuth };
}

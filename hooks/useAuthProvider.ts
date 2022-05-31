import { makeRedirectUri } from 'expo-auth-session';
import * as FacebookAuth from 'expo-auth-session/providers/facebook';
import * as GoogleAuth from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import { useEffect } from 'react';
import { Platform } from 'react-native';
import Config, { OAuthProviderName } from '../Config';

export type GoogleUserInfo = {
	email: string;
	family_name: string;
	given_name: string;
	id: string;
	locale: string;
	name: string;
	picture: string;
	verified_email: boolean;
};

Platform.OS === 'web' && WebBrowser.maybeCompleteAuthSession();

export default function useAuthProvider(provider: OAuthProviderName) {
	useEffect(() => {
		Platform.OS === 'android' && WebBrowser.warmUpAsync();

		return () => {
			Platform.OS === 'android' && WebBrowser.coolDownAsync();
		};
	});

	const OAuth = provider === 'google' ? GoogleAuth : FacebookAuth;

	const providerInfo = Config.oauth[provider];

	const redirectUri = makeRedirectUri({
		path: (providerInfo.redirectUri ?? Config.oauth.redirectUri).replaceAll('<Provider>', provider),
		useProxy: true,
	});

	const [request, response, promptAsync] = OAuth.useAuthRequest({
		clientId: providerInfo.clientId,
		redirectUri,
	});

	const login = async () => {
		const result = await promptAsync();

		const authentication = result.type === 'success' ? result.authentication : null;

		if (!authentication) {
			if (result.type === 'error') console.warn(`Error while logging in with ${provider}: ${result.error}`);
			else console.warn(`${provider} login failed: ${result.type}`);
		}

		return {
			request,
			response,
			authentication,
			result,
		};
	};

	return { login, provider, redirectUri, OAuth };
}

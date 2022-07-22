import useAuthProvider, { GoogleUserInfo } from '@/hooks/useAuthProvider';
import * as AuthSession from 'expo-auth-session';
import * as GoogleAuth from 'expo-auth-session/providers/google';
import { createContext, useCallback, useState } from 'react';

type LoginProps = {
	username: string;
	password: string;
};

type AuthContextProps = {
	loggedIn: boolean;
	user: GoogleUserInfo | undefined;

	loggingIn: boolean;

	// login: (username: string, password: string) => Promise<void>;
	loginWithGoogle: () => Promise<GoogleUserInfo | undefined>;
};

export const AuthContext = createContext<AuthContextProps>({
	loggedIn: false,
	user: undefined,

	loggingIn: false,

	// login: async (username: string, password: string) => {},
	loginWithGoogle: async () => ({} as GoogleUserInfo),
});

export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
	const [loggedIn, setLoggedIn] = useState(false);
	const [loggingIn, setLoggingIn] = useState(false);

	const [user, setUser] = useState<GoogleUserInfo>();

	// #region google auth
	const googleAuth = useAuthProvider('google');
	const loginWithGoogle = useCallback(async () => {
		setLoggingIn(true);

		const { authentication } = await googleAuth.login();

		if (!authentication) {
			setLoggingIn(false);
			setLoggedIn(false);
			setUser(undefined);
			return undefined;
		}

		const userInfo = (await AuthSession.fetchUserInfoAsync(
			{
				accessToken: authentication.accessToken,
			},
			{
				...GoogleAuth.discovery,
				userInfoEndpoint: 'https://www.googleapis.com/oauth2/v2/userinfo',
			},
		)) as GoogleUserInfo;

		if (!userInfo) {
			console.warn('Failed to get user info');

			setLoggingIn(false);
			setLoggedIn(false);
			setUser(undefined);
			return undefined;
		}

		console.log({ userInfo });

		setLoggingIn(false);
		setLoggedIn(true);
		setUser(userInfo);
		return userInfo;
	}, [googleAuth]);
	// #endregion google auth

	return (
		<AuthContext.Provider
			value={{
				loggedIn,
				user,

				loggingIn,

				loginWithGoogle,
			}}
		>
			{children}
		</AuthContext.Provider>
	);

	// #region old code

	// const { clientPublicKey } = useEncryption();

	// const gateway = useGateway();

	// const login = useCallback(
	// ({ username, password }: LoginProps) => {
	// if (loggedIn) return console.log('Already logged in');
	// if (!clientPublicKey) return console.log('No client public key');

	// gateway.emit(GatewayEndpoints.AUTHENTICATE, { username, password, publicKey: clientPublicKey }, ({ user }, error) => {
	// 	if (error) return console.error(error);

	// 	setLoggedIn(true);
	// 	setUser(user);
	// });
	// },
	// [clientPublicKey, gateway],
	// );
	// TODO: login with fb, google, etc

	// const logout = useCallback(() => {
	// 	if (!loggedIn) return console.log('Not logged in');

	// 	gateway.emit(GatewayEndpoints.DEAUTHENTICATE);

	// 	setLoggedIn(false);
	// 	setUser(undefined);
	// }, [gateway]);

	// TODO: add user update listener

	// return {
	// 	loggedIn,
	// 	user,
	// 	// login,
	// 	// logout
	// };
	// #endregion
};

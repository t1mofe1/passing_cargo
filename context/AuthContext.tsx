import axios from 'axios';
import { createContext, useCallback, useState } from 'react';
import useAuthProvider, { GoogleUserInfo } from '../hooks/useAuthProvider';

type LoginProps = {
	username: string;
	password: string;
};

type AuthContextProps = {
	loggedIn: boolean;
	user: GoogleUserInfo | undefined;

	// login: (username: string, password: string) => Promise<void>;
	loginWithGoogle: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextProps>({
	loggedIn: false,
	user: undefined,

	// login: async (username: string, password: string) => {},
	loginWithGoogle: async () => {},
});

export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
	const [loggedIn, setLoggedIn] = useState(false);
	// const [user, setUser] = useState<User>();
	const [user, setUser] = useState<GoogleUserInfo>();

	// #region default login
	// const login = useCallback((
	// 	({ username, password }: LoginProps) => {

	// 	}), []);
	// #endregion default login

	// #region google auth
	const googleAuth = useAuthProvider('google');
	const loginWithGoogle = useCallback(async () => {
		const { authentication } = await googleAuth.login();

		console.log({ authentication });

		if (!authentication) return;

		// https://www.googleapis.com/oauth2/v2/userinfo
		const userInfo: GoogleUserInfo = await axios({
			method: 'GET',
			url: 'https://www.googleapis.com/oauth2/v2/userinfo',
			headers: {
				Authorization: `Bearer ${authentication.accessToken}`,
			},
		}).then(({ data }) => data);

		if (!userInfo) return console.warn('Failed to get user info');

		console.log({ userInfo });

		setLoggedIn(true);
		setUser(userInfo);
	}, [googleAuth]);
	// #endregion google auth

	return (
		<AuthContext.Provider
			value={{
				loggedIn,
				user,

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

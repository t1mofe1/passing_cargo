import { useCallback, useEffect, useState } from 'react';
import { GatewayEndpoints, User } from '../types';
import { useEncryption } from './useEncryption';
import { useGateway } from './useGateway';

type LoginProps = {
	username: string;
	password: string;
};

export function useAuth() {
	const [loggedIn, setLoggedIn] = useState(false);
	const [user, setUser] = useState<User>();

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

	return {
		loggedIn,
		user,
		// login,
		// logout
	};
}

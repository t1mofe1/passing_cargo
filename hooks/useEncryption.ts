import * as Crypto from 'expo-crypto';
import { getRandomBytes } from 'expo-random';
import { useCallback, useEffect, useState } from 'react';
// import { encodeFromByteArray as byteArrayToBase64 } from 'react-native-base64';
import { useQuery } from '@/hooks/useQuery';
import { Encrypted, HTTPEndpoints } from '@/types';

export function useEncryption() {
	const [clientSecretKey, setClientSecretKey] = useState<string>();
	const [clientPublicKey, setClientPublicKey] = useState<string>();
	const [clientPrivateKey, setClientPrivateKey] = useState<string>();

	const [serverPublicKey, setServerPublicKey] = useState<string>();

	// useEffect(() => {
	// 	const secret = byteArrayToBase64(getRandomBytes(32));

	// 	const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
	// 		modulusLength: 4096,
	// 		publicKeyEncoding: {
	// 			type: 'spki',
	// 			format: 'pem',
	// 		},
	// 		privateKeyEncoding: {
	// 			type: 'pkcs8',
	// 			format: 'pem',
	// 			passphrase: secret,
	// 		},
	// 	});

	// 	setClientSecretKey(secret);
	// 	setClientPublicKey(publicKey);
	// 	setClientPrivateKey(privateKey);
	// }, []);

	// const getRSA = useCallback(() => {
	// 	const { terminate } = useQuery(HTTPEndpoints.GET_RSA, {
	// 		onSuccess: ({ publicKey }) => {
	// 			setServerPublicKey(publicKey);
	// 		},
	// 		onError: error => {
	// 			console.log({ endpoint: 'getRSA', error });
	// 		},
	// 	});

	// 	return terminate;
	// }, []);

	// useEffect(() => {
	// 	getRSA();
	// }, []);

	// const encrypt = useCallback(async (data: any): Promise<Encrypted> => {
	// 	if (!serverPublicKey) await getRSA();
	// 	if (!serverPublicKey) throw new Error('No RSA key found');

	// 	if (typeof data === 'object') data = JSON.stringify(data);

	// 	return crypto.publicEncrypt({ key: serverPublicKey }, Buffer.from(data)).toString('base64');
	// }, []);

	// const decrypt = useCallback(async <T>(encrypted: Encrypted): Promise<T> => {
	// 	if (!clientPrivateKey) throw new Error('No RSA key found');

	// 	const decrypted = crypto.privateDecrypt({ key: clientPrivateKey, passphrase: clientSecretKey }, Buffer.from(encrypted, 'base64')).toString('utf8');

	// 	let parsedData;
	// 	try {
	// 		parsedData = JSON.parse(decrypted);
	// 	} catch (err) {
	// 		parsedData = decrypted;
	// 	}

	// 	return parsedData;
	// }, []);

	// return {
	// 	serverPublicKey,
	// 	// clientPrivateKey,
	// 	clientPublicKey,

	// 	encrypt,
	// 	decrypt,
	// };
}

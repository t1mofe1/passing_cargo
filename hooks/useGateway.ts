import { useEncryption } from '@/hooks/useEncryption';
import { Callback, Encrypted, EndpointCallback, EndpointData, GatewayEndpoints, ListenCallback } from '@/types';
import io, { ManagerOptions, SocketOptions } from 'socket.io-client';

export function useGateway(options?: Partial<ManagerOptions & SocketOptions>) {
	const socket = io({
		timeout: 6000,
		rememberUpgrade: true,

		...options,
	});

	// const { encrypt, decrypt } = useEncryption();

	// const emit = <T extends GatewayEndpoints>(endpoint: T, data?: EndpointData[T], callback?: Callback<EndpointCallback[T]>) => {
	// 	const encryptedData = encrypt(data);

	// 	socket.emit(endpoint, encryptedData, callback);
	// };

	// const listen = <T extends GatewayEndpoints>(endpoint: T, callback: ListenCallback<EndpointCallback[T]>, once: boolean = false) => {
	// 	const listener = async (data: Encrypted) => {
	// 		const decryptedData = await decrypt<EndpointCallback[T]>(data);

	// 		callback(decryptedData);
	// 	};

	// 	socket[once ? 'once' : 'on']<any>(endpoint, listener);

	// 	return () => socket.off<any>(endpoint, listener);
	// };

	// return { emit, listen, status: socket.connected };
}

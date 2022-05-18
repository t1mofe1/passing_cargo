import { authenticateAsync, getEnrolledLevelAsync, hasHardwareAsync, isEnrolledAsync, supportedAuthenticationTypesAsync } from 'expo-local-authentication';
import { useCallback } from 'react';

export function useLocalAuth() {
	const authenticate = useCallback(async () => await authenticateAsync(), []);
	const getCurrentAuthLevel = useCallback(async () => await getEnrolledLevelAsync(), []);
	const supportedAuthTypes = useCallback(async () => await supportedAuthenticationTypesAsync(), []);
	const isEnabledBiometric = useCallback(async () => await isEnrolledAsync(), []);

	return {
		authenticate,
		getCurrentAuthLevel,
		supportedAuthTypes,
		isEnabledBiometric,
	};
}

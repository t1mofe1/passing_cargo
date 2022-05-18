import { getIpAddressAsync, getNetworkStateAsync, isAirplaneModeEnabledAsync, NetworkState } from 'expo-network';
import { useCallback, useEffect, useState } from 'react';

export function useNetwork() {
	const [ipAddress, setIpAddress] = useState<string>();
	const [networkState, setNetworkState] = useState<NetworkState>();
	const [airplaneMode, setAirplaneMode] = useState<boolean>();

	const getIpAddress = useCallback(async () => setIpAddress(await getIpAddressAsync()), []);
	const getNetworkState = useCallback(async () => setNetworkState(await getNetworkStateAsync()), []);
	const getAirplaneMode = useCallback(async () => setAirplaneMode(await isAirplaneModeEnabledAsync()), []);

	useEffect(() => {
		getIpAddress();
		getNetworkState();
		getAirplaneMode();
	}, []);

	return { ipAddress, networkState, airplaneMode };
}

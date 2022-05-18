import { addBatteryLevelListener, addBatteryStateListener, addLowPowerModeListener, BatteryState } from 'expo-battery';
import { useEffect, useState } from 'react';

export function useBattery() {
	const [batteryLevel, setBatteryLevel] = useState<number>();
	const [batteryState, setBatteryState] = useState<BatteryState>();
	const [batteryLowMode, setBatteryLowMode] = useState<boolean>();

	useEffect(() => {
		const BLevelSub = addBatteryLevelListener(({ batteryLevel }) => {
			setBatteryLevel(batteryLevel);
		});
		const BStateSub = addBatteryStateListener(({ batteryState }) => {
			setBatteryState(batteryState);
		});
		const BLowModeSub = addLowPowerModeListener(({ lowPowerMode }) => {
			setBatteryLowMode(lowPowerMode);
		});

		return () => {
			BLevelSub.remove();
			BStateSub.remove();
			BLowModeSub.remove();
		};
	}, []);

	return {
		batteryLevel,
		batteryState,
		batteryLowMode,
	};
}

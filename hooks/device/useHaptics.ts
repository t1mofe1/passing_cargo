import { impactAsync, ImpactFeedbackStyle, notificationAsync, NotificationFeedbackType as NotificationFeedbackStyle, selectionAsync } from 'expo-haptics';
import { useCallback } from 'react';

type ImpactFeedbackStyleType = keyof typeof ImpactFeedbackStyle;
type NotificationFeedbackStyleType = keyof typeof NotificationFeedbackStyle;

export function useHaptics() {
	const impact = useCallback(async (style: ImpactFeedbackStyleType) => await impactAsync(style as ImpactFeedbackStyle), []);
	const notification = useCallback(async (type: NotificationFeedbackStyleType) => await notificationAsync(type as NotificationFeedbackStyle), []);
	const selection = useCallback(async () => await selectionAsync(), []);

	return {
		impact,
		notification,
		selection,
	};
}

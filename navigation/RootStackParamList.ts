export type RootStackParamList = {
	Auth: undefined;
	Home: undefined;
	Chats: undefined;
	Chat: { chatId: string; messageId?: string };
	Deliveries: undefined;
	Delivery: { deliveryId: string };
	Profile: { userId: string } | undefined;
	Settings: { tabId: string } | undefined;
	Support: undefined;
	Referral: undefined;
	NotFound: undefined;
	Start: undefined;
};

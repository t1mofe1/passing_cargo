export type Snowflake = string;

export type Callback<T = any> = (data: T, error?: Error) => any;
export type ListenCallback<T = any> = (data: T) => any;
export type ErrorCallback = (error: Error) => any;

export type Encrypted = string;

export enum HTTPEndpoints {
	GET_CURRENT_USER = 'users/@me',
	GET_USER = 'users/:id',
	GET_RSA = 'auth/rsa',
}
export enum GatewayEndpoints {
	AUTHENTICATE = 'authenticate',
	DEAUTHENTICATE = 'deauthenticate',
}

export enum HTTPMethod {
	GET = 'GET',
	POST = 'POST',
	PUT = 'PUT',
	DELETE = 'DELETE',
}

export type EndpointMethod = {
	[HTTPEndpoints.GET_RSA]: HTTPMethod.GET;
	[HTTPEndpoints.GET_CURRENT_USER]: HTTPMethod.GET;
	[HTTPEndpoints.GET_USER]: HTTPMethod.GET;
};
export type EndpointParams = {
	[HTTPEndpoints.GET_RSA]: undefined;
	[HTTPEndpoints.GET_CURRENT_USER]: undefined;
	[HTTPEndpoints.GET_USER]: { id: Snowflake };
};
export type EndpointData = {
	[GatewayEndpoints.AUTHENTICATE]: {
		username: string;
		password: string;

		// server will encrypt data with this key and client will decrypt with private key
		publicKey: string;
	};
	[GatewayEndpoints.DEAUTHENTICATE]: undefined;

	[HTTPEndpoints.GET_RSA]: undefined;
	[HTTPEndpoints.GET_CURRENT_USER]: undefined;
	[HTTPEndpoints.GET_USER]: undefined;
};

export type EndpointCallback = {
	[GatewayEndpoints.AUTHENTICATE]: { user: User };
	[GatewayEndpoints.DEAUTHENTICATE]: undefined;

	[HTTPEndpoints.GET_RSA]: { publicKey: string };
	[HTTPEndpoints.GET_CURRENT_USER]: { user: PrivateUser };
	[HTTPEndpoints.GET_USER]: { user: PublicUser };
};

export type PrivateUser = Omit<User, 'password' | 'providers'>;
export type PublicUser = Pick<User, 'id' | 'firstName' | 'lastName' | 'createdAt' | 'languages' | 'avatar'>;
export type User = {
	id: Snowflake;

	firstName: string;
	lastName: string;

	// exclude from serialization
	password: string;

	phoneNumber: string;
	phoneNumberVerified: boolean;

	email: string;
	emailVerified: boolean;

	passportVerified: boolean; // TODO: add passport verification

	createdAt: string;

	avatar: string;

	birthday: string;

	countryCode: Country;
	languages: UserLanguage[];
	currency: string;

	providers?: Providers;

	balance: number;

	// TODO: think about premium plan and its features
	// premium: boolean;

	deliveries: Delivery[];

	deliverer?: DelivererData;
};

export type UserLanguage = {
	language: Language;
	level: LanguageLevel;
	default: boolean;
};

export enum LanguageLevel {
	Basic,
	Conversational,
	Fluent,
	Native,
}

export type DelivererData = {
	user: User;
	since: string;
	rating: number;
	reviews: DeliveryReview[];
	deliveries: Delivery[];

	// earnings: {};
	// stats: {
	// 	deliveredOnTime: number;
	// };
};

export type DeliveryReview = {
	id: Snowflake;
	rating: number;
	comment: string;
	createdAt: string;
	delivery: Delivery;
	user: User;
};

export type Delivery = {
	id: Snowflake;
	status: DeliveryStatus;

	deliveryLocations: {
		from: Location;
		to: Location;
	};
};

export enum DeliveryStatus {
	PENDING = 'PENDING',
	DELIVERING = 'DELIVERING',
	CANCELLED = 'CANCELLED',
	COMPLETED = 'COMPLETED',
}

export type Location = {
	lat: number;
	lng: number;
	address: string;
};

export type Provider = 'google' | 'facebook'; // "apple"
export type Providers = {
	[key in Provider]?: string;
};

export type Chat = {
	id: Snowflake;
	type: ChatType;
	createdAt: string;
	updatedAt: string;
	messages: ChatMessage[];
};

export type ChatMessage = {
	id: Snowflake;

	chat: Chat;

	type: ChatMessageType;

	reference: ChatMessage;

	author: User;

	content: string;
	attachments: ChatMessageAttachment[];

	createdAt: string;
	editedAt: string;
};

export enum ChatMessageType {
	DEFAULT,

	REPLY,

	// CALL,

	DELIVERY,

	SYSTEM,
}

export type ChatMessageAttachment = {
	id: Snowflake;
	filename: string;
	description?: string;
	contentType?: string;
	size: number;
	url: string;
};

export type ChatType = 'DELIVERY' | 'USER';

export type TypingStart = {
	user: User;
	chat: Chat;
	timestamp: string;
};

export enum GatewayError {
	UNKNOWN_ERROR = 4000,
	NOT_AUTHENTICATED = 4001,
	AUTHENTICATION_FAILED = 4002,
	// RATE_LIMIT = 4003,
	INVALID_API_VERSION = 4004,
}

export enum APIError {
	GENERAL_ERROR = 0,

	UNKNOWN_CHAT = 10001,
	UNKNOWN_USER = 10002,
	UNKNOWN_DELIVERY = 10003,
	UNKNOWN_MESSAGE = 10004,

	LACK_OF_PERMISSIONS = 20001,
	RATE_LIMIT = 20002,
	PREMIUM_LEVEL_TOO_LOW = 20003,

	INVALID_TOKEN = 30001,
	UNVERIFIED_USER = 30002,
	TOO_LARGE_ENTITY = 30003,
	FEATURE_DISABLED = 30004,

	INVALID_ACCOUNT_TYPE = 40001,

	CANNOT_SEND_EMPTY_MESSAGE = 50001,
	CANNOT_SEND_MESSAGE_TO_THIS_USER = 50002,
	CANNOT_EXECUTE_ACTION_ON_SYSTEM_MESSAGE = 50003,
	CANNOT_EXECUTE_ACTION_ON_THIS_CHAT = 50004,

	INVALID_API_VERSION = 60001,
	FILE_EXCEEDS_MAX_SIZE = 60002,
	INVALID_FILE = 60003,
	INVALID_REQUEST_BODY = 60004,

	TWO_FACTOR_AUTH_REQUIRED = 70001,

	API_OVERLOADED = 130000,
}
export enum Country {
	ESTONIA = 'EE',
	LATVIA = 'LV',
	LITHUANIA = 'LT',
	RUSSIA = 'RU',
}
export enum Language {
	ENGLISH = 'en',
	RUSSIAN = 'ru',
	ESTONIAN = 'et',
	LATVIAN = 'lv',
	LITHUANIAN = 'lt',
}

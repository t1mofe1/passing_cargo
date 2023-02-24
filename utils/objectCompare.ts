export function compareObjects(obj1: object, obj2: object) {
	return JSON.stringify(obj1) === JSON.stringify(obj2);
}

export function findDifferencesInObjects<T extends Record<string, any>, U extends Record<string, any>, J extends boolean>(obj1: T, obj2: U, excludeAdditionalProperties?: J) {
	const merged: { [key: string]: any } = { ...obj1, ...obj2 };

	const differences = Object.keys(excludeAdditionalProperties ? obj1 : merged).reduce((acc, key) => {
		if (typeof obj1[key] === 'object' && typeof obj2[key] === 'object') acc[key] = findDifferencesInObjects(obj1[key], obj2[key], excludeAdditionalProperties);
		else if (obj2[key] !== obj1[key]) acc[key] = obj2[key];

		return acc;
	}, {} as typeof merged);

	return differences as typeof excludeAdditionalProperties extends true ? Partial<T> : Partial<T & U>;
}

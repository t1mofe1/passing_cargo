export type Params = {
	[key: string]: Param;
};
export type Param = string | number | boolean;

export const paramFormat = (param: Param) => String(typeof param === 'boolean' ? Number(param) : param);

export const formatURLParams = (url: string, params: Params) => url.replaceAll(/:([a-zA-Z0-9_]+)/g, (match, key) => paramFormat(params[key]) || match);

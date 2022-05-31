import axios from 'axios';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { EndpointCallback, EndpointData, EndpointMethod, EndpointParams, HTTPEndpoints, ListenCallback } from '../types';
import { formatURLParams, Param } from '../utils/formatURLParams';

type RequestOptions<T extends HTTPEndpoints> = {
	method?: EndpointMethod[T];
	params: EndpointParams[T];
	body: EndpointData[T];
	query?: { [key: string]: Param };
	headers?: { [key: string]: string };
};

type Options<T extends HTTPEndpoints> = {
	request?: RequestOptions<T>;

	timeout?: number;
	baseURL?: string;
	autoStart?: boolean;

	terminateSignal?: AbortSignal;

	onSuccess?: ListenCallback<EndpointCallback[T]>;
	onError?: ErrorCallback;
};

type UseQueryReturn<T extends HTTPEndpoints> = {
	loading: boolean;
	error?: Error;
	result?: EndpointCallback[T];
	promise?: Promise<EndpointCallback[T]>;

	run: () => void;
	terminate: () => void;

	successListener: ListenCallback<EndpointCallback[T]> | undefined;
	errorListener: ErrorCallback | undefined;
	setSuccessListener: React.Dispatch<React.SetStateAction<ListenCallback<EndpointCallback[T]> | undefined>>;
	setErrorListener: React.Dispatch<React.SetStateAction<ErrorCallback | undefined>>;
};

export const generateRequest = <T extends HTTPEndpoints>(endpoint: T, opts: Options<T>) => {
	const {
		method = 'GET',
		params = {},
		body = {},
		query = {},
		headers = {
			'Content-Type': 'application/json',
			Accept: 'application/json',
		},
	} = opts.request || {};
	const { timeout = 6000, baseURL = 'https://api.passingcargo.ee', terminateSignal } = opts;

	const formattedEndpoint = formatURLParams(endpoint, params);

	const request = axios.create({
		method,

		data: body,
		params: query,
		headers,

		timeout,

		url: formattedEndpoint,
		baseURL,

		signal: terminateSignal,
	});

	return request;
};

export function useQuery<T extends HTTPEndpoints>(
	endpoint: T,
	opts: Options<T> = {
		autoStart: true,
	},
): UseQueryReturn<T> {
	const [result, setResult] = useState<EndpointCallback[T]>();
	const [error, setError] = useState<Error>();
	const [loading, setLoading] = useState<boolean>(!!opts.autoStart);

	// request listeners
	const [successListener, setSuccessListener] = useState<ListenCallback<EndpointCallback[T]> | undefined>(opts.onSuccess);
	const [errorListener, setErrorListener] = useState<ErrorCallback | undefined>(opts.onError);

	// create a request
	const request = useMemo(() => generateRequest(endpoint, opts), [opts]);

	// request promise
	const [promise, setPromise] = useState<Promise<EndpointCallback[T]>>();

	// create an abort controller to cancel the request
	const abortController = useMemo(() => new AbortController(), [request]);

	const fetchData = useCallback(async () => {
		// reset the states
		setError(undefined);
		setResult(undefined);
		setLoading(true);

		// send the request
		const requestPromise = request({
			signal: abortController.signal,
		})
			.then<EndpointCallback[T]>(response => {
				setLoading(false);
				setError(undefined);
				setResult({
					...response.data,
				});
				successListener?.(response.data);

				return response.data;
			})
			.catch(err => {
				setLoading(false);
				setResult(undefined);
				setError(err);
				errorListener?.(err);
			}) as Promise<EndpointCallback[T]>;

		setPromise(requestPromise);
	}, []);

	useEffect(() => {
		opts.autoStart && fetchData();
	}, [request, fetchData]);

	return {
		loading,
		error,
		result,
		promise,

		run: () => fetchData(),
		terminate: () => abortController.abort(),

		successListener,
		errorListener,
		setSuccessListener,
		setErrorListener,
	};
}

import { Asset } from 'expo-asset';
import { useEffect, useState } from 'react';

type UseAssetOptions = {
	autoDownload?: boolean;
	uri: string;
};
export default function useAsset(uriOrOptions: string | UseAssetOptions) {
	const { uri, autoDownload = true } = typeof uriOrOptions === 'string' ? { uri: uriOrOptions } : uriOrOptions;

	const [asset, setAsset] = useState(Asset.fromURI(`../${uri}`));

	console.log({ asset, uri });

	// #region auto download
	useEffect(() => {
		if (autoDownload) {
			const loadAsset = async () => {
				const downloadedAsset = await asset.downloadAsync().catch(err => {
					console.log({ err });
				});

				console.log({ downloadedAsset });
				// setAsset(downloadedAsset);
			};

			loadAsset();
		}
	}, [autoDownload]);
	// #endregion

	return asset;
}

module.exports = function (api) {
	api.cache(true);

	return {
		env: {
			production: {
				plugins: ['transform-remove-console'], // remove all console.* from prod
			},
		},
		presets: ['babel-preset-expo'],
	};
};

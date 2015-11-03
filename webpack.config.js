'use strict';

module.exports = {
	entry: "./dev/a.main.js",
	resolve: {
		modulesDirectories: [
			'node_modules',
			'lib'
		],
		alias: {
			moment: "moment/min/moment-with-locales.min.js"
		}
	},
	output: {
		path: __dirname + "/dest",
		filename: "a.main.js"
	}
};

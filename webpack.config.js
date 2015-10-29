/**
 * learning-gulp - webpack.config.js
 * Created by mengdesen on 15/4/14.
 */

'use strict';

module.exports = {
	entry: "./dev/a.main.js",
	resolve: {
		modulesDirectories: [
			'node_modules',
			'lib'
		]
	},
	output: {
		path: __dirname + "/dest",
		filename: "a.main.js"
	}
};

define(function (require) {

	'use strict';

	require('../app').factory('globalData', [
		function () {
			return {
				title: 'ng-demo'
			}
		}
	]);

});
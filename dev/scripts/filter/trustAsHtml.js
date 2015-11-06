'use strict';

require('../app')
	.filter('trustAsHtml', [
		'$sce',
		function ($sce) {
			return function (res) {
				return $sce.trustAsHtml(res);
			};
		}
	]);
	
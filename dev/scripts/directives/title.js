'use strict';

require('../app').directive('title', ['$rootScope', '$timeout',
	function($rootScope, $timeout) {
		return {
			link: function() {

				var listener = function(event, toState) {

					$timeout(function() {
						$rootScope.title = (toState.data && toState.data.pageTitle) 
						? toState.data.pageTitle 
						: 'Default title';
					});
				};

				$rootScope.$on('$stateChangeSuccess', listener);
			}
		};
	}
]);

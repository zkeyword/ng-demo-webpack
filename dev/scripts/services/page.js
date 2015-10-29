define(function (require) {

	'use strict';

	require('../app').factory('page', [
			"$document", 
			"$compile", 
			"$rootScope", 
			"$controller", 
			"$timeout",
			
			function (
				$document, 
				$compile, 
				$rootScope, 
				$controller, 
				$timeout
			) {
				var defaults = {
					id : null,
					template : null
				};
				
				var body = $document.find('body');

				return function Page() {
					console.log(arguments)
				};
			}
		]);

});
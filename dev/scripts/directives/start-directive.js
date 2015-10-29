	
'use strict';

require('../app').directive('myDirective', function () {
	return { 
		restrict: 'E', 
		template: '<a href="#/second">cccc</a>' 
	};
});
	

'use strict';

require('app');

app.directive('myDirective', function () {
	return { 
		restrict: 'E', 
		template: '<a href="#/second">cccc</a>' 
	};
});


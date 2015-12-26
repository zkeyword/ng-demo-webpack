'use strict';

//http://www.cnblogs.com/woshinidezhu/p/Form-validation-with-AngularJS.html

require('../app').directive('validator', ['$http', function($http) {
	return {
		require: 'ngModel',
		link: function(scope, ele, attrs, c) {
			console.log(1, attrs, c)
			ele.bind('blur', function(e){
				
				c.$setValidity('unique', false);
				
				/*$http({
					method: 'POST',
					url: '/api/check/' + attrs.ensureUnique,
					data: {'field': attrs.ensureUnique}
				}).success(function(data, status, headers, cfg) {
					c.$setValidity('unique', data.isUnique);
				}).error(function(data, status, headers, cfg) {
					c.$setValidity('unique', false);
				});*/
			});
			return;
			/*scope.$watch(attrs.ngModel, function() {
				$http({
					method: 'POST',
					url: '/api/check/' + attrs.ensureUnique,
					data: {'field': attrs.ensureUnique}
				}).success(function(data, status, headers, cfg) {
					c.$setValidity('unique', data.isUnique);
				}).error(function(data, status, headers, cfg) {
					c.$setValidity('unique', false);
				});
			});*/
		}
	}
}]);
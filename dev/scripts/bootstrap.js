'use strict';
require('angular.min');
require('angular-ui-router.min');
require('angular-animate.min');
require('template');
require('./routes');

angular.element().ready(function() {
	angular.bootstrap(document, ['app']);
});
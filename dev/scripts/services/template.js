define(function (require) {

	'use strict';
	
	var template = require('template');

	require('../app').factory('template', [
		function () {
			var defaults = {
				id : null,
				data : {}
			};

			return function Template(id, data) {
				if( !id ) id = defaults.id;
				if( !data ) data = defaults.data;
				return template(id, data);
			};
		}
	]);

});
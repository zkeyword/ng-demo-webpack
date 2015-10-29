define(function(require) {
	
	'use strict';
	
	require('../app').factory('dateService', function() {
		var tempDate;
		return {
			setNow: function() {
				tempDate = new Date();
			},
			getNow: function() {
				return tempDate;
			},
			getTimeFromNow: function(x) {
				return new Date(tempDate.getTime() + x);
			},
			minutes: function(min) {
				return min * 60 * 1000;
			},
			hours: function(hour) {
				return hour * this.minutes(60);
			}
		};
	}); 
	
});

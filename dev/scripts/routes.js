'use strict';

var app = require('./app');

require('./common/base');

app.config([
	'$stateProvider', 
	'$urlRouterProvider',
	'$httpProvider',
	function(
		$stateProvider,
		$urlRouterProvider,
		$httpProvider
	) {
		
		$stateProvider
			.state('home', {
				url: '/',
				views: {
					'': {
						templateUrl: './dest/views/layout.html',
						controller: 'homeViewController'
					},
					'header@home': {
						templateUrl: './dest/views/common/header.html'
					},
					'footer@home': {
						templateUrl: './dest/views/common/footer.html'
					},
					'left@home': {
						templateUrl: './dest/views/common/menu.html'
					},
					'right@home': {
						templateUrl: './dest/views/index.html'
					}
				},
				data:{
					pageTitle: 'home'
				}
			})
			.state('home.user', {
				url: 'user',
				views: {
					'right@home': {
						templateUrl: './dest/views/user/index.html',
						controller: 'userViewController'
					}
				},
				data:{
					pageTitle: 'user'
				}
			})
			.state('home.user.add', {
				url: '/add',
				views: {
					'right@home': {
						templateUrl: './dest/views/user/add.html',
						controller: 'userViewController'
					}
				}
			})
			.state('home.user.detail', {
				url: '/detail/:id',
				params: {
					id: '1',
				},
				views: {
					'right@home': {
						templateUrl: './dest/views/user/detail.html',
						controller: 'userViewController'
					}
				}
			})
			.state('home.form', {
				url: 'form',
				views: {
					'right@home': {
						templateUrl: './dest/views/form/index.html',
						controller: 'formViewController'
					}
				}
			}).state('home.grid', {
				url: 'grid',
				views: {
					'right@home': {
						templateUrl: './dest/views/grid/index.html',
						controller: 'gridViewController'
					}
				}
			});
			
		
		$urlRouterProvider.otherwise('/');
		
		
				
		$httpProvider.defaults.headers.put['Content-Type'] = 'application/x-www-form-urlencoded';
		$httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
		$httpProvider.defaults.transformRequest = [function (data) {
			var param = function (obj) {
				var query = '',
				name,
				value,
				fullSubName,
				subName,
				subValue,
				innerObj,
				i;
				
				for (name in obj) {
					value = obj[name];
					if (value instanceof Array) {
						for (i = 0; i < value.length; ++i) {
							subValue = value[i];
							fullSubName = name + '[' + i + ']';
							innerObj = {};
							innerObj[fullSubName] = subValue;
							query += param(innerObj) + '&';
						}
					} else if (value instanceof Object) {
						for (subName in value) {
							subValue = value[subName];
							if (subValue != null) {
								fullSubName = name + '.' + subName;
								innerObj = {};
								innerObj[fullSubName] = subValue;
								query += param(innerObj) + '&';
							}
						}
					} else if (value !== undefined) {
						query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
					}
				}
				return query.length ? query.substr(0, query.length - 1) : query;
			};
			return angular.isObject(data) && String(data) !== '[object File]' ? param(data) : data;
		}];
		
		$httpProvider.defaults.useXDomain = true; 
		
	}
]);
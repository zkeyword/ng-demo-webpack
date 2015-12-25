'use strict';

var app = require('./app');

require('./common/base');

app.config([
	'$stateProvider', 
	'$urlRouterProvider',
	function(
		$stateProvider,
		$urlRouterProvider
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
			});
			
		
		$urlRouterProvider.otherwise('/');
		
	}
]);
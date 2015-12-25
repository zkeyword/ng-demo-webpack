define(function(require){
	'use strict';
	
	require('../app').controller('formViewController', [
        '$scope',
		'$http',
		'createDialog',
		'template',
		'dateService',
		
        function(
			$scope,
			$http,
			createDialog,
			template,
			dateService
		){

			$scope.save = function(){
				var url         = 'data/data.php',
					requestData = $scope.user,
					transform   = function(data){
									var args = [];
									for(var i in data){
										args.push(i + '=' + data[i])
									}
									return args.join('&');
								};

				$http
					.post(url, requestData, {
						headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
						transformRequest: transform
					})
					.success(function(responseData) {
						
						createDialog({
							id: 'simpleDialog',
							template: template('popHtml', responseData),
							title: 'A Inline Modal Dialog',
							backdrop: true,
							success: {label: 'Success', fn: function() {
								$scope.user.textarea = '1111111111111111111'
							}}
						}); 
						
					});
			};
			
			$scope.pageClass = 'page-form'
			
        }
    ]);
	
});
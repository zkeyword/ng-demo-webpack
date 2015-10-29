define(function(require){
	
	require('../app').controller('userViewController', [
	    '$rootScope',
        '$scope',
		'$http',
		'$stateParams',
		'dateService',
		'template',
		'createDialog',
		'page',
		
        function(
        	$rootScope,
			$scope,
			$http,
			$stateParams,
			dateService,
			template,
			createDialog,
			page
		){
			
			$scope.id = $stateParams.id;
			
			var url  = "data/data.json",
				url2 = "data/data2.json";
						
			$http.get(url).success(function(response) {
				$scope.list = response;
			});
			
			$scope.search = function(){
				
				console.log( $scope.formData )
				$http.get(url2).success(function(response) {
					$scope.list = response;
				});
			};
			
			$scope.even = function(index){
				var cls = '';
				if( index === 0 ){
					cls = 'first';
				}
				return cls;
			};
			
			$scope.del = function(id, item){
				createDialog({
					id: 'simpleDialog',
					template: template('popHtml', item),
					title: '系统提示',
					backdrop: true,
					success: {label: '确定', fn: function() {
						console.log(item)
					}}
				});
			};
			
			page({
				url: 'data/data.json',
				callback: function(){
					console.log(11)
				}
			});
			
			$scope.pageClass = 'page-user';
        }
    ]);
});
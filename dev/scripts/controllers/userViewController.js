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
			
			
			var url  = "data/data.json",
				url2 = "data/data2.json";

			$http.get(url).success(function(response) {
				$scope.list = response;
			});
			
			$scope.id = $stateParams.id;
			
			$scope.test = 1111111;
			
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
			
			
			// 在变更分布的时候，重新获取数据条目
			var reGetProducts = function(){
				// 发送给后台的请求数据
				var postData = {
					currentPage: $scope.paginationConf.currentPage,
					itemsPerPage: $scope.paginationConf.itemsPerPage
				};

				$http.post('http://demo.miaoyueyue.com/php/demo/1/getProducts.php', postData).success(function(data){
					// 变更分页的总数
					$scope.paginationConf.totalItems = data.total;
					// 变更产品条目
					$scope.products = data.items;
				});
			};
			
			 $scope.paginationConf = {
				currentPage: 1,
				totalItems: 8000,
				itemsPerPage: 15,
				pagesLength: 15,
				perPageOptions: [10, 20, 30, 40, 50],
				rememberPerPage: 'perPageItems',
				onChange: function(){
					
				}
			};
			
			$scope.pageClass = 'page-user';
        }
    ]);
});
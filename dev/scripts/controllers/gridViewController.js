define(function(require){
	
	require('../app').controller('gridViewController', [
        '$scope',
		'$http',
		
        function(
			$scope,
			$http
		){
			

			// 在变更分布的时候，重新获取数据条目
			var reGetProducts = function(){
				// 发送给后台的请求数据
				var postData = {
					pageIndex: $scope.paginationConf.currentPage,
					pageSize: $scope.paginationConf.itemsPerPage
				};

				$http.post('data/grid.php', postData).success(function(data){
					// 变更分页的总数
					$scope.paginationConf.totalItems = data.total;
					// 变更产品条目
					$scope.products = data.rows;
				});
			};
			
			
			$scope.paginationConf = {
				currentPage: 1,
				totalItems: 8000,
				itemsPerPage: 10,
				pagesLength: 0,
				perPageOptions: [10, 20, 30, 40, 50],
				rememberPerPage: 'perPageItems',
				onChange: function(){
					
				}
			};
			
			 $scope.$watch('paginationConf.currentPage + paginationConf.itemsPerPage', reGetProducts);

        }
    ]);
});
define(function (require) {

	require('../app').controller('gridViewController', [
			'$scope',
			'$http',

			function (
				$scope,
				$http
			) {

				// 在变更分布的时候，重新获取数据条目
				var reGetProducts = function () {
					// 发送给后台的请求数据
					var postData = {
						pageIndex : $scope.paginationConf.currentPage,
						pageSize : $scope.paginationConf.itemsPerPage
					};

					$http.post('/grid', postData).success(function (data) {
						// 变更分页的总数
						$scope.paginationConf.totalItems = data.total;
						// 变更产品条目
						$scope.products = data.rows;
					});
				};

				$scope.paginationConf = {
					currentPage : 1,
					totalItems : 8000,
					itemsPerPage : 10,
					pagesLength : 0,
					perPageOptions : [10, 20, 30, 40, 50],
					rememberPerPage : 'perPageItems',
					onChange : function () {}
				};

				$scope.$watch('paginationConf.currentPage + paginationConf.itemsPerPage', reGetProducts);

				//全选
				var filterNullArr = function (data) {
					var arr = [],
						ids = []

					for (var i = 0, len = data.length; i < len; i++) {
						if (data[i]) {
							arr.push(data[i])
							if( data[i]['id'] ){
								ids.push(data[i].id);
							}
						}
					}

					return {
						data : arr,
						ids : ids.join(',')
					}
				};

				$scope.selected = null;
				$scope.selectedTmp = [];
				$scope.allFn = function (isChecked, data) {
					angular.forEach(data, function (item) {
						item.selected = $scope.selectedAll;
						if (isChecked) {
							$scope.selectedTmp = angular.copy(data);
						} else {
							$scope.selectedTmp = null;
						}
					});
				}

				$scope.itemFn = function (isChecked, item, i, data) {
					var tmpData = null;
					
					if (isChecked) {
						$scope.selectedTmp[i] = angular.copy(item);
					} else {
						$scope.selectedTmp[i] = null;
					}

					tmpData = filterNullArr($scope.selectedTmp);

					if (tmpData.data.length === data.length) {
						$scope.selectedAll = true;
					} else {
						$scope.selectedAll = false;
					}
				}

				$scope.getSelected = function () {
					console.log(filterNullArr($scope.selectedTmp));
				}
				
				$scope.search = function(){
					var input = $scope.input,
						tmp   = [];

					angular.forEach($scope.products, function(item){
						console.log(item.name.indexOf(input))
						if(item.name.indexOf(input) !== -1){
							tmp.push(item);
						}
					});
					$scope.products = tmp;
				}

			}
		]);
});
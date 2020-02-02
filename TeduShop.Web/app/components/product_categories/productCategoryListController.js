(function (app) {
    app.controller('productCategoryListController', productCategoryListController);

    productCategoryListController.$inject = ['$scope', 'apiService', 'notificationService', '$ngBootbox'];

    function productCategoryListController($scope, apiService, notificationService, $ngBootbox) {
        $scope.productCategory = [];

        $scope.page = 0;
        $scope.pagesCount = 0;

        $scope.getListProductCategories = getProductCategories;
        
        $scope.keyword = '';

        $scope.search = search;
        $scope.deleteProductCategory = deleteProductCategory;

        function deleteProductCategory(id) {
            $ngBootbox.confirm('Bạn có đồng ý xóa???').then(function () {
                var config = {
                    params: {
                        id: id
                    }
                };
                apiService.del('api/ProductCategory/Delete', config, function () {
                    notificationService.displaySuccess('Xóa thành công');
                    search();
                }, function () {
                    notificationService.displayError('Xóa không thành công');
                });
            });
        }

        function search() {
            getProductCategories();
        }


        function getProductCategories(page) {
            page = page || 0;

            var config = {
                params: {
                    keyword: $scope.keyword,
                    page: page,
                    pageSize: 2
                }
            }

            apiService.get('/api/ProductCategory/GetAll', config, function(result) {
                if (result.data.TotalCount == 0) {
                    notificationService.displayWarning('Không tìm thấy bản ghi nào');
                }
                $scope.productCategory = result.data.Items;
                $scope.page = result.data.Page;
                $scope.pagesCount = result.data.TotalPages;
                $scope.totalCount = result.data.TotalCount;
            }, function () {
                    console.log('Load failed');
            });
        }

        $scope.getListProductCategories();
    }
})(angular.module('tedushop.product_categories'));
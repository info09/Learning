(function (app) {
    app.controller('productCategoryListController', productCategoryListController);

    productCategoryListController.$inject = ['$scope', 'apiService'];

    function productCategoryListController($scope, apiService) {
        $scope.productCategory = [];

        $scope.page = 0;
        $scope.pagesCount = 0;

        $scope.getListProductCategories = getProductCategories;

        function getProductCategories(page) {
            page = page || 0;

            var config = {
                params: {
                    page: page,
                    pageSize: 2
                }
            }

            apiService.get('/api/ProductCategory/GetAll', config, function (result) {
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
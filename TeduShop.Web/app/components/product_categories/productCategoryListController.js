(function (app) {
    app.controller('productCategoryListController', productCategoryListController);

    productCategoryListController.$inject = ['$scope', 'apiService'];

    function productCategoryListController($scope, apiService) {
        $scope.productCategory = [];

        $scope.getListProductCategories = getProductCategories;

        function getProductCategories() {
            apiService.get('/api/ProductCategory/GetAll', null, function (result) {
                $scope.productCategory = result.data;
            }, function () {
                    console.log('Load failed');
            });
        }

        $scope.getListProductCategories();
    }
})(angular.module('tedushop.product_categories'));
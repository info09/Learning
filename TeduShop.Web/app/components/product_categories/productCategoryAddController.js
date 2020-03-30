(function (app) {
    app.controller('productCategoryAddController', productCategoryAddController);

    productCategoryAddController.$inject = ['$scope', 'apiService', 'notificationService', '$state'];

    function productCategoryAddController($scope, apiService, notificationService, $state) {
        $scope.productCategory = {
            CreatedDate: new Date(),
            Status: true
        }

        $scope.AddProductCategory = AddProductCategory;

        function AddProductCategory() {
            apiService.post('api/ProductCategory/Create', $scope.productCategory, function (result) {
                notificationService.displaySuccess(result.data.Name + ' đã được thêm mới');
                $state.go('product_category');
            }, function (err) {
                    notificationService.displayError('Không thêm mới được');
            });
        }

        function loadParentCategory() {
            apiService.get('api/ProductCategory/GetAllParents', null, function (result) {
                $scope.parentCategory = result.data;
            }, function () {
                    console.log('Không tìm thấy');
            });
        }

        loadParentCategory();
    }
})(angular.module('tedushop.product_categories'));
(function (app) {
    app.controller('productAddController', productAddController);

    productAddController.$inject = ['$scope', 'apiService', 'notificationService', '$state'];

    function productAddController($scope, apiService, notificationService, $state) {
        $scope.product = {
            CreatedDate: new Date(),
            Status: true
        };
        $scope.ckeditorOptions = {
            language: 'vi',
            height: '200px'
        }

        $scope.AddProduct = AddProduct;

        function AddProduct() {
            apiService.post('api/Product/Create', $scope.product, function (result) {
                notificationService.displaySuccess(result.data.Name + ' đã được thêm mới');
                $state.go('product_category');
            }, function (err) {
                notificationService.displayError('Không thêm mới được');
            });
        }

        function loadProductCategory() {
            apiService.get('api/ProductCategory/GetAllParents', null, function (result) {
                $scope.productCategory = result.data;
            }, function () {
                console.log('Không tìm thấy');
            });
        }

        loadProductCategory();
    }
})(angular.module('tedushop.products'));
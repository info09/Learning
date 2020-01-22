(function (app) {
    app.controller('productCategoryEditController', productCategoryEditController);

    productCategoryEditController.$inject = ['$scope', 'notificationService', 'apiService', '$state', '$stateParams', 'commonService'];

    function productCategoryEditController($scope, notificationService, apiService, $state, $stateParams, commonService) {
        $scope.productCategory = {
            CreateDate: new Date(),
            Status: true
        }

        $scope.UpdateProductCategory = UpdateProductCategory;
        $scope.GetSeoTitle = GetSeoTitle;

        function GetSeoTitle() {
            $scope.productCategory.Alias = commonService.getSeoTitle($scope.productCategory.Name);
        }

        function loadProductCategoryDetail() {
            apiService.get('api/ProductCategory/GetById/' + $stateParams.id,null, function (result) {
                $scope.productCategory = result.data;
            }, function (err) {
                    notificationService.displayError(err.data);
            });
        }

        function UpdateProductCategory() {
            apiService.put('api/ProductCategory/Update', $scope.productCategory, function (result) {
                notificationService.displaySuccess(result.data.Name + ' đã được cập nhật');
                $state.go('product_category');
            }, function () {
                    notificationService.displayError('Cập nhật thất bại');
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
        loadProductCategoryDetail();
    }
})(angular.module('tedushop.product_categories'));
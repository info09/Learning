(function () {
    angular.module('tedushop.product_categories', ['tedushop.common']).config(config);

    config.$inject = ['$stateProvider', '$urlRouterProvider'];

    function config($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('product_category', {
                url: "/product_category",
                templateUrl: "/app/components/product_categories/productCategoryListView.html",
                controller: "productCategoryListController"
            });
            //.state('product_add', {
            //    url: "/product_add",
            //    templateUrl: "/app/components/products/productAddView.html",
            //    controller: "productAddController"
            //})
            //.state('product_edit', {
            //    url: "/product_edit",
            //    templateUrl: "/app/components/products/productEditView.html",
            //    controller: "productEditController"
            //});
    }
})();
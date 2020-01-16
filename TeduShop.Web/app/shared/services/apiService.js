/// <reference path="../../../Assets/admin/libs/angular/angular.js" />

(function (app) {
    app.factory('apiService', apiService);

    apiService.$inject = ['$http'];

    function apiService($http) {
        return {
            get: get
        }

        function get(url, param, success, failed) {
            $http.get(url, param).then(function (result) {
                success(result);
            }, function (error) {
                failed(error);
            });
        }
    }
})(angular.module('tedushop.common'));
﻿/// <reference path="../../../Assets/admin/libs/angular/angular.js" />

(function (app) {
    app.factory('apiService', apiService);

    apiService.$inject = ['$http', 'notificationService'];

    function apiService($http, notificationService) {
        return {
            get: get,
            post: post,
            put: put,
            del: del
        }

        function get(url, param, success, failed) {
            $http.get(url, param).then(function (result) {
                success(result);
            }, function (error) {
                failed(error);
            });
        }

        function post(url, data, success, failed) {
            $http.post(url, data).then(function (result) {

                success(result);
            }, function (err) {
                    if (error.status === 401) {
                        notificationService.displayError('Authenticate is required.');
                    }
                    else if (failed != null) {
                        failed(err);
                    }
            });
        }

        function put(url, data, success, failed) {
            $http.put(url, data).then(function (result) {

                success(result);
            }, function (err) {
                if (error.status === 401) {
                    notificationService.displayError('Authenticate is required.');
                }
                else if (failed != null) {
                    failed(err);
                }
            });
        }

        function del(url, data, success, failure) {
            $http.delete(url, data).then(function (result) {
                success(result);
            }, function (error) {
                console.log(error.status)
                if (error.status === 401) {
                    notificationService.displayError('Authenticate is required.');
                }
                else if (failure != null) {
                    failure(error);
                }

            });
        }
    }
})(angular.module('tedushop.common'));
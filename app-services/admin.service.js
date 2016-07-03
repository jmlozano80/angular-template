/**
 * Created by jose on 16/05/16.
 */
(function () {
    'use strict';

    angular
        .module('app')
        .factory('AdminService', AdminService);

    AdminService.$inject = ['$http'];
    function AdminService($http) {
        var service = {};
        var backendUrl = "http://localhost:8080/";

        service.GetAdmin1 = GetAdmin1;
        service.GetAdmin2 = GetAdmin2;
        service.GetAdmin3 = GetAdmin3;

        return service;



        function GetAdmin1() {
            return $http.get(backendUrl+'admin/admin1').then(handleSuccess, handleError);
        }

        function GetAdmin2() {
            return $http.get(backendUrl+'admin/admin2').then(handleSuccess, handleError);
        }

        function GetAdmin3() {
            return $http.get(backendUrl+'admin/admin3').then(handleSuccess, handleError);
        }


        // private functions

        function handleSuccess(res) {

            return res;
        }

        function handleError(res) {

            return res;

        }




    }

})();
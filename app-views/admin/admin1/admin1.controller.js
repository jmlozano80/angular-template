/**
 * Created by jose on 16/05/16.
 */
(function () {
    'use strict';

    angular
        .module('app')
        .controller('Admin1Controller', Admin1Controller);

    Admin1Controller.$inject = ['$scope','UserService', '$rootScope','AuthenticationService','$location'];
    function Admin1Controller($scope,UserService, $rootScope,AuthenticationService,$location) {
        var vm = this;

        vm.user = null;


        initController();

        function initController() {


        }

        $scope.admin1Test="Admin1";




    }

})();

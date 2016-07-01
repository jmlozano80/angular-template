/**
 * Created by jose on 16/05/16.
 */
(function () {
    'use strict';

    angular
        .module('app')
        .controller('Admin2Controller', Admin2Controller);

    Admin2Controller.$inject = ['$scope','UserService', '$rootScope','AuthenticationService','$location'];
    function Admin2Controller($scope,UserService, $rootScope,AuthenticationService,$location) {
        var vm = this;

        vm.user = null;


        initController();

        function initController() {


        }

        $scope.admin2Test="Admin2";




    }

})();

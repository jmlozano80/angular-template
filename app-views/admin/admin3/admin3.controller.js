/**
 * Created by jose on 16/05/16.
 */
(function () {
    'use strict';

    angular
        .module('app')
        .controller('Admin3Controller', Admin3Controller);

    Admin3Controller.$inject = ['$scope','UserService', '$rootScope','AuthenticationService','$location'];
    function Admin3Controller($scope,UserService, $rootScope,AuthenticationService,$location) {
        var vm = this;

        vm.user = null;


        initController();

        function initController() {


        }

        $scope.admin3Test="Admin3";




    }

})();

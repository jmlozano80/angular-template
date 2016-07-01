/**
 * Created by jose on 16/05/16.
 */
(function () {
    'use strict';

    angular
        .module('app')
        .controller('Page1_1Controller', Page1_1Controller);

    Page1_1Controller.$inject = ['$scope','UserService', '$rootScope','AuthenticationService','$location'];
    function Page1_1Controller($scope,UserService, $rootScope,AuthenticationService,$location) {
        var vm = this;

        vm.user = null;


        initController();

        function initController() {


        }

        $scope.page1_1Test="Page1.1";




    }

})();

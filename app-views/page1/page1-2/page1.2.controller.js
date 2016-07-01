/**
 * Created by jose on 16/05/16.
 */
(function () {
    'use strict';

    angular
        .module('app')
        .controller('Page1_2Controller', Page1_2Controller);

    Page1_2Controller.$inject = ['$scope','UserService', '$rootScope','AuthenticationService','$location'];
    function Page1_2Controller($scope,UserService, $rootScope,AuthenticationService,$location) {
        var vm = this;

        vm.user = null;


        initController();

        function initController() {


        }

        $scope.page1_2Test="Page1.2";




    }

})();

/**
 * Created by jose on 16/05/16.
 */
(function () {
    'use strict';

    angular
        .module('app')
        .controller('Page3Controller', Page3Controller);

    Page3Controller.$inject = ['$scope','UserService', '$rootScope','AuthenticationService','$location'];
    function Page3Controller($scope,UserService, $rootScope,AuthenticationService,$location) {
        var vm = this;

        vm.user = null;


        initController();

        function initController() {


        }

        $scope.page3Test="Page3";




    }

})();

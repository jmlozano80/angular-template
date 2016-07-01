/**
 * Created by jose on 16/05/16.
 */
(function () {
    'use strict';

    angular
        .module('app')
        .controller('HomeContainerController', HomeContainerController);

    HomeContainerController.$inject = ['$scope','UserService', '$rootScope','AuthenticationService','$location'];
    function HomeContainerController($scope,UserService, $rootScope,AuthenticationService,$location) {
        var vm = this;

        vm.user = null;


        initController();

        function initController() {


        }

        $scope.homeContainerTest="Home";




    }

})();

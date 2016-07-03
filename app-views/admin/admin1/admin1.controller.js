/**
 * Created by jose on 16/05/16.
 */
(function () {
    'use strict';

    angular
        .module('app')
        .controller('Admin1Controller', Admin1Controller);

    Admin1Controller.$inject = ['$scope','AdminService','UserService', '$rootScope','AuthenticationService','$location'];
    function Admin1Controller($scope,AdminService,UserService, $rootScope,AuthenticationService,$location) {
        var vm = this;

        vm.user = null;


        initController();

        function initController() {
            getAdmin1();

        }

        function getAdmin1(){

            AdminService.GetAdmin1().
                then(function(response){
                    $scope.admin1Test=response.data.admin1;
                })

        }

    }

})();

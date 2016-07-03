/**
 * Created by jose on 16/05/16.
 */
(function () {
    'use strict';

    angular
        .module('app')
        .controller('Admin2Controller', Admin2Controller);

    Admin2Controller.$inject = ['$scope','AdminService','UserService', '$rootScope','AuthenticationService','$location'];
    function Admin2Controller($scope,AdminService,UserService, $rootScope,AuthenticationService,$location) {
        var vm = this;

        vm.user = null;


        initController();

        function initController() {
            getAdmin2();

        }

        function getAdmin2(){

            AdminService.GetAdmin2().
                then(function(response){
                    $scope.admin2Test=response.data.admin2;
                })

        }

    }

})();

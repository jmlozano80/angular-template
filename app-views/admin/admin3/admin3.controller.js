/**
 * Created by jose on 16/05/16.
 */
(function () {
    'use strict';

    angular
        .module('app')
        .controller('Admin3Controller', Admin3Controller);

    Admin3Controller.$inject = ['$scope','AdminService','UserService', '$rootScope','AuthenticationService','$location'];
    function Admin3Controller($scope,AdminService,UserService, $rootScope,AuthenticationService,$location) {
        var vm = this;

        vm.user = null;


        initController();

        function initController() {
            getAdmin3();

        }

        function getAdmin3(){

            AdminService.GetAdmin3().
                then(function(response){
                     $scope.admin3Test=response.data.admin3;
                })

        }

    }

})();

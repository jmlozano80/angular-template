/**
 * Created by jose on 16/05/16.
 */
(function () {
    'use strict';

    angular
        .module('app')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['$scope','$state','UserService', '$rootScope','AuthenticationService','$location'];
    function HomeController($scope,$state,UserService, $rootScope,AuthenticationService,$location) {

        $rootScope.isAdmin = false;
        var vm = this;

        vm.user = null;


        initController();

        function initController() {
            getCurrentUserName();
            isUserAdmin();

        }

        $scope.logout=function () {
            AuthenticationService.ClearCredentials();
            $location.path('/');
        }

        function isUserAdmin() {

            UserService.IsUserAdmin()
                .then(function (response) {
                    alert(JSON.stringify(response));
                    if(response.data.isAdmin==true){
                        $rootScope.isAdmin = true;
                    }
                });
        }

        function getCurrentUserName(){

            UserService.GetUsernameByEmail().
                then(function(response){

                    $rootScope.userName =response.data.userName;
                    alert($rootScope.userName)
                });
        }

        $scope.home="Home";
    }




})();
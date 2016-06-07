/**
 * Created by jose on 16/05/16.
 */
(function () {
    'use strict';

    angular
        .module('app')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$scope','$rootScope','UserService','$uibModal','$route','$location', 'AuthenticationService', 'FlashService'];
    function LoginController($scope,$rootScope,UserService,$uibModal,$route,$location, AuthenticationService, FlashService) {
        var vm = this;
        $scope.requestReset=false;
        $scope.booleanTest=true;



        $scope.email;
        $scope.emailJson={
            email:$scope.email
        };
        $scope.password;
        $scope.username;
        //vm.login = login;
        console.info("LoginController loaded");
        (function initController() {
            // reset login status
            AuthenticationService.ClearCredentials();
        })();

        $scope.login=function() {
            console.info("login "+ $scope.email +' '+$scope.password );
            vm.dataLoading = true;
            AuthenticationService.Login($scope.email, $scope.password, function (response) {
                alert("login callback");
                if (response.success) {
                    alert("LoginController calling setcredentials with params: "+$scope.username+" "+$scope.password);
                    AuthenticationService.SetCredentials(response.email, $scope.password);
                    $location.path('/home');
                } else {
                    alert(JSON.stringify(response));
                    alert("error "+ response);
                    FlashService.Error("password or email are wrong");
                    vm.dataLoading = false;
                }
            });
        };

        $scope.$on('modal.closing', function(event, reason, closed) {
            delete $rootScope.flash;
        })

        $scope.close=function(){
            $scope.modalInstance.dismiss();//$scope.modalInstance.close() also works I think
            delete $rootScope.flash;
            $location.path('/');
        };



        $scope.forgotPassword=function(){
            $scope.requestReset=true;

        };

        $scope.requestResetPassword = function () {
            $scope.requestingPassword=true;
            alert($scope.email);
            var requestResetPasswordForm = { email: $scope.email}
            UserService.RequestResetPassword(requestResetPasswordForm)
                .then(function (response) {

                    alert('RequestResetPassword '+ JSON.stringify(response));
                    if (response.data.success) {
                        $scope.requestingPassword=false;
                        $scope.responseResquestPasswordSuccess=true;
                        FlashService.Success(response.data.message, true);
                      
                    } else {
                        $scope.requestingPassword=false
                        FlashService.Error(response.data.message);

                    }
                });


        }

        $scope.resendActivationMail=function() {
            console.info("resendActivationMail $scope.emailJson"+$scope.emailJson.email);
            $scope.dataLoading = true;
            UserService.ResendActivationMail($scope.emailJson)
                .then(function (response) {

                    alert('resendActivationMail '+ response);
                    if (response.success) {
                        FlashService.Success(response.message, true);
                        $scope.dataLoading = false;
                        $location.path('/');
                    } else {

                        FlashService.Error(response.message);
                        $scope.dataLoading = false;
                    }
                });
        }

    };


})();
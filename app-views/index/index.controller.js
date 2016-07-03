/**
 * Created by jose on 16/05/16.
 */
(function () {
    'use strict';/*AuthenticationTokenController*/

    angular
        .module('app')
        .controller('IndexController', IndexController)
        .controller('AuthenticationTokenController', AuthenticationTokenController)
        .controller('ResetPasswordController', ResetPasswordController)
        .controller('RegisterController', RegisterController)
        .controller('LoginController', LoginController);


    IndexController.$inject = ['$scope','$uibModal','AuthenticationService','UserService', '$rootScope','$http','$location','$cookieStore'];
    function IndexController($scope,$uibModal,AuthenticationService,UserService, $rootScope,$http,$location,$cookieStore) {
        var vm = this;

        $scope.emailJson={
            email:$scope.email
        };
        $scope.password;
        $scope.username;



        (function initController() {

        })();

        $scope.openModal=function(modalId){
            $rootScope.modalInstance=$uibModal.open({
                templateUrl: modalId,
                scope:$scope
            });
        }


        $scope.close=function(){
            $scope.modalInstance.dismiss();//$scope.modalInstance.close() also works I think
            $location.path('/');
        };


        $scope.resendActivationMail=function() {

            $scope.dataLoading = true;
            UserService.ResendActivationMail($scope.emailJson)
                .then(function (response) {

                    if (response.email) {
                        FlashService.Success(response.message, true);
                        $scope.dataLoading = false;
                        $location.path('/');
                    } else {

                        FlashService.Error(response.message);
                        $scope.dataLoading = false;
                    }
                });
        }
;

        $scope.setCookie=function(){
            $rootScope.globals = $cookieStore.get('globals') || {};
            if ($rootScope.globals.currentUser) {
                $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
                $location.path('/home/');


            }
        }
        $scope.setCookie();


    };

    ResetPasswordController.$inject = ['$scope','$state','FlashService','UserService', '$uibModal', '$rootScope','$location'];
    function ResetPasswordController($scope,$state,FlashService,UserService,$uibModal,$rootScope,$location) {
        var vm = this;

        $scope.close=function(){

            $scope.modalInstance.dismiss();//$scope.modalInstance.close() also works I think
            delete $rootScope.flash;
            $location.path('/');
        };

        $scope.openSendResetPasswordModal=function(){
            $scope.modalInstance=$uibModal.open({
                templateUrl: 'sendresetpasswordModal.tmpl.html',
                scope:$scope,
                backdrop:false
            });
        };



        $scope.token = $state.params.token;
        $scope.email = $state.params.email;

        $scope.GetByResetPassword = function () {
            UserService.GetByResetPassword($scope.token,$scope.email)
                .then(function (response) {

                    if(response.status == 200){
                        
                        $scope.openSendResetPasswordModal();
                    }

                });
        };

        $scope.passwordReseted=false;
        $scope.resetPasswordForm={}
        $scope.resetPasswordSubmit=false;

        $scope.resetPassword = function (password,confirmPassword) {
            $scope.resetPasswordSubmit=true;
            $scope.resetPasswordForm.token = $scope.token;
            $scope.resetPasswordForm.password = password;
            $scope.resetPasswordForm.confirmPassword = confirmPassword;

            UserService.ResetPassword($scope.resetPasswordForm)
                .then(function (response) {

                    if(response.status == 200){
                        FlashService.Success(response.data.message, true);
                        $scope.passwordReseted=true;
                    }
                    else{

                        FlashService.Error(response.data.message, true);
                    }

                });
        };
        
        $scope.GetByResetPassword();



    };

    AuthenticationTokenController.$inject = ['$scope','$state','FlashService','$uibModal','UserService', '$rootScope'];
    function AuthenticationTokenController($scope,$state,FlashService,$uibModal,UserService, $rootScope) {

       $scope.authenticationToken =$state.params.authenticationToken;

        $scope.close=function(){
            $scope.modalInstance.dismiss();//$scope.modalInstance.close() also works I think
        };

        $scope.openModal=function(modalId){
            $rootScope.modalInstance=$uibModal.open({
                templateUrl: modalId,
                scope:$scope
            });
        }



        $scope.token={token:$scope.authenticationToken};
        $scope.registrationConfirm=function() {
            UserService.RegistrationConfirm($scope.token)
                .then(function (response) {

                    if(response.data === null){

                        FlashService.Error("Unexpected error occur. Please try a bit later", true);
                        $scope.resendActivationMailSuccess=true
                        $scope.openModal("activationAccountError.tmpl.html")
                    }
                    else{

                        if (response.data.tokenMessage == 0) {
                            FlashService.Error(response.data.tokenError, true);
                            $scope.openModal("loginAfterEmailConfirmationModalTokenExpired.tmpl.html");


                        }
                        else if (response.data.tokenMessage ==1){
                            FlashService.Success(response.data.message, true);
                            $scope.openModal("loginModal.tmpl.html");
                        }
                        else  if(response.data.tokenMessage == 2){

                            FlashService.Error(response.data.tokenError, true);
                            $scope.openModal("activationAccountError.tmpl.html");


                        }
                        else if(response.data.tokenMessage == 3){


                            FlashService.Error("Unexpected error occur. Please try a bit later", true);
                            $scope.resendActivationMailSuccess=true
                            $scope.openModal("activationAccountError.tmpl.html");


                        }else {

                            FlashService.Success(response.data.message, true);
                            $scope.openModal("loginModal.tmpl.html");

                        }
                    }

                });
        }

        $scope.registrationConfirm();


    }


    RegisterController.$inject = ['$scope','UserService', '$location', '$rootScope', 'FlashService'];
    function RegisterController($scope,UserService, $location, $rootScope, FlashService) {
        var vm = this;

        //vm.register = register;
        $scope.user={};
        $scope.registrationSuccess=false;
        $scope.register=function() {

            $scope.dataLoading = true;
            UserService.Create($scope.user)
                .then(function (response) {

                    if (response.data.success) {
                        $scope.registrationSuccess=true;
                        FlashService.Success(response.data.message, true);
                        $scope.dataLoading = false;
                        $location.path('/');
                    } else {

                        FlashService.Error(response.data.message);
                        $scope.dataLoading = false;
                    }
                });
        }

        $scope.close=function(){
            $scope.modalInstance.dismiss();//$scope.modalInstance.close() also works I think
            delete $rootScope.flash;
            $location.path('/');
        };

        $scope.$on('modal.closing', function(event, reason, closed) {
            delete $rootScope.flash;
        })
    }


    LoginController.$inject = ['$scope','$rootScope','$state','UserService','AuthenticationService', 'FlashService'];
    function LoginController($scope,$rootScope,$state,UserService,AuthenticationService, FlashService) {
        var vm = this;
        $scope.requestReset=false;
        $scope.booleanTest=true;
        $scope.email;
        $scope.emailJson={
            email:$scope.email
        };
        $scope.password;
        $scope.username;

        (function initController() {
            // reset login status
            AuthenticationService.ClearCredentials();
        })();

        $rootScope.islogged=false;
        $scope.login=function() {

            vm.dataLoading = true;
            AuthenticationService.Login($scope.email, $scope.password, function (response,headers) {

                if (response.success) {
                    AuthenticationService.SetCredentials(response.email, $scope.password);
                    $rootScope.islogged=true;
                    $state.go('home.home');

                } else {

                    FlashService.Error(headers('error'));
                    vm.dataLoading = false;
                }
            });
        };

        $scope.$on('modal.closing', function(event, reason, closed) {
            delete $rootScope.flash;
            if(!$rootScope.islogged){
                $state.go('index');
            }

        })

        $scope.close=function(){
            $scope.modalInstance.dismiss();//$scope.modalInstance.close() also works I think
            delete $rootScope.flash;
            $state.go('index');
        };



        $scope.forgotPassword=function(){
            $scope.requestReset=true;

        };

        $scope.requestResetPassword = function () {
            $scope.requestingPassword=true;
            var requestResetPasswordForm = { email: $scope.email}
            UserService.RequestResetPassword(requestResetPasswordForm)
                .then(function (response) {
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

        $scope.resendActivationMailSuccess=false;
        $scope.resendActivationMail=function() {
            $scope.dataLoading = true;
            UserService.ResendActivationMail($scope.emailJson)
                .then(function (response) {

                    if (response.status=200) {
                        $scope.resendActivationMailSuccess=true;
                        FlashService.Success(response.data.message, true);
                        $scope.dataLoading = false;

                    } else {

                        FlashService.Error(response.data.message);
                        $scope.dataLoading = false;
                    }
                });
        }

    };




})();
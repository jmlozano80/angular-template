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

        alert("indexctrl");
        $scope.emailJson={
            email:$scope.email
        };



        $scope.password;
        $scope.username;


        (function initController() {
            // reset login status
           // AuthenticationService.ClearCredentials();
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
            console.info("resendActivationMail $scope.emailJson"+$scope.emailJson.email);
            $scope.dataLoading = true;
            UserService.ResendActivationMail($scope.emailJson)
                .then(function (response) {

                    alert('resendActivationMail '+ response);
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


        /*end login functions*/



        $scope.close=function(){
            $scope.modalInstance.dismiss();//$scope.modalInstance.close() also works I think
        };

        $scope.setCookie=function(){
            $rootScope.globals = $cookieStore.get('globals') || {};
            if ($rootScope.globals.currentUser) {
                $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
                $location.path('/home/');
            }
        }
        $scope.setCookie();




        function initController() {


            if($rootScope.globals.hasOwnProperty('currentUser') ){
                console.log("hasOwnProperty('currentUser')");
                AuthenticationService.ClearCredentials();
            }
            else {
                console.log("username null "+JSON.stringify($rootScope.globals));
            }

        }


    };

    ResetPasswordController.$inject = ['$scope','$state','FlashService','AuthenticationService','UserService', '$uibModal', '$rootScope','$http','$location','$cookieStore'];
    function ResetPasswordController($scope,$state,FlashService,$AuthenticationService,UserService,$uibModal,$rootScope,$http,$location,$cookieStore, $routeParams) {
        var vm = this;


        $scope.close=function(){

            $scope.modalInstance.dismiss();//$scope.modalInstance.close() also works I think
            delete $rootScope.flash;
            $location.path('/');
        };


        $scope.$on('modal.closing', function(event, reason, closed) {
            console.log('modal.closing: ' + (closed ? 'close' : 'dismiss') + '(' + reason + ')');
            var message = "You are about to leave the edit view. Uncaught reason. Are you sure?";
            switch (reason){
                // clicked outside
                case "backdrop click":
                    message = "Any changes will be lost, are you sure?";
                    break;

                // cancel button
                case "cancel":
                    message = "Any changes will be lost, are you sure?";
                    break;

                // escape key
                case "escape key press":
                    message = "Any changes will be lost, are you sure?";
                    break;
            }
            if (!confirm(message)) {
                event.preventDefault();
            }
        });
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
                    alert(JSON.stringify(response));
                    alert(JSON.stringify(response.status));
                    
                    if(response.status == 200){
                        
                        $scope.openSendResetPasswordModal();
                    }

                });
        };
        $scope.passwordReseted=false;
        $scope.resetPasswordForm={}
        $scope.resetPasswordSubmit=false;

        $scope.resetPassword = function (password,confirmPassword) {
            // $scope.resetPasswordForm.password = $scope.password;
            // $scope.resetPasswordForm.confirmPassword = $scope.confirmPassword;
            $scope.resetPasswordSubmit=true;
            $scope.resetPasswordForm.token = $scope.token;
            $scope.resetPasswordForm.password = password;
            $scope.resetPasswordForm.confirmPassword = confirmPassword;


           alert('resetPasswordForm1 ');

            UserService.ResetPassword($scope.resetPasswordForm)
                .then(function (response) {

                   /* alert(JSON.stringify(response));
                    alert(JSON.stringify(response.status));
*/
                    if(response.status == 200){

                        alert("Success");
                        FlashService.Success(response.data.message, true);
                        $scope.passwordReseted=true;
                    }
                    else{

                        alert("Error");
                        FlashService.Error(response.data.message, true);
                    }

                });
        };
        
        $scope.GetByResetPassword();



    };

    AuthenticationTokenController.$inject = ['$scope','$state','FlashService','$uibModal','UserService', '$rootScope','$http','$location','$cookieStore'];
    function AuthenticationTokenController($scope,$state,FlashService,$uibModal,UserService, $rootScope,$http,$location,$cookieStore) {



       $scope.authenticationToken =$state.params.authenticationToken;

        alert($scope.authenticationToken);
        
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
            console.info("Register $scope.user"+JSON.stringify($scope.user));
            $scope.dataLoading = true;
            UserService.Create($scope.user)
                .then(function (response) {
                    alert("Register then "+ JSON.stringify(response));
                    alert("Register then "+ JSON.stringify(response.data));
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
            alert("Closing modal from register controller");
            $scope.modalInstance.dismiss();//$scope.modalInstance.close() also works I think
            delete $rootScope.flash;
            $location.path('/');
        };

        $scope.$on('modal.closing', function(event, reason, closed) {
            alert("Closing modal from register controller");
            delete $rootScope.flash;
        })
    }


    LoginController.$inject = ['$scope','$rootScope','$state','UserService','$uibModal','$location', 'AuthenticationService', 'FlashService'];
    function LoginController($scope,$rootScope,$state,UserService,$uibModal,$location, AuthenticationService, FlashService) {
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

        $rootScope.islogged=false;
        $scope.login=function() {

            vm.dataLoading = true;
            AuthenticationService.Login($scope.email, $scope.password, function (response,headers) {
                alert("login callback");
                if (response.success) {
                    AuthenticationService.SetCredentials(response.email, $scope.password);
                    alert("before $state.go('home,home')")
                    $rootScope.islogged=true;
                    $state.go('home.home');
                } else {
                    alert(JSON.stringify(response));
                    alert("error "+ response);
                    FlashService.Error(headers('error'));
                    vm.dataLoading = false;
                }
            });
        };

        $scope.$on('modal.closing', function(event, reason, closed) {
            alert("closing modal ");
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

        $scope.resendActivationMailSuccess=false;
        $scope.resendActivationMail=function() {
            console.info("resendActivationMail $scope.emailJson"+$scope.emailJson.email);
            $scope.dataLoading = true;
            UserService.ResendActivationMail($scope.emailJson)
                .then(function (response) {

                    alert('resendActivationMail '+ response);
                    if (response.status=200) {
                        $scope.resendActivationMailSuccess=true;
                        FlashService.Success(response.data.message, true);
                        $scope.dataLoading = false;
                        //$location.path('/');
                    } else {

                        FlashService.Error(response.data.message);
                        $scope.dataLoading = false;
                    }
                });
        }

    };




})();
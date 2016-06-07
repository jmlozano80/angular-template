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
        .controller('SendResetPasswordController', SendResetPasswordController);

   // AuthenticationTokenController.$inject = ['$scope','$route', '$uibModal','UserService', '$rootScope','$http','$location','$cookieStore'];
    ResetPasswordController.$inject = ['$scope','$route','AuthenticationService','UserService', '$routeParams','$uibModal', '$rootScope','$http','$location','$cookieStore'];
    IndexController.$inject = ['$scope','$uibModal','AuthenticationService','UserService', '$rootScope','$http','$location','$cookieStore'];
    AuthenticationTokenController.$inject = ['$scope','$route','$uibModal','UserService', '$rootScope','$http','$location','$cookieStore'];
    function IndexController($scope,$uibModal,AuthenticationService,UserService, $rootScope,$http,$location,$cookieStore) {
        var vm = this;
        /*login functions*/
        //$scope.email="";
        $scope.emailJson={
            email:$scope.email
        };

        /*$scope.testing= function (string) {
            alert("testing1 "+string+ $scope.email)
        }*/

        $scope.password;
        $scope.username;
        //vm.login = login;

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

       /* $scope.login=function() {
            alert("Login");
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
        };*/



        $scope.close=function(){
            $scope.modalInstance.dismiss();//$scope.modalInstance.close() also works I think
            $location.path('/');
        };



        /*$scope.forgotPassword=function(){
            $rootScope.modalInstance.dismiss();
            $scope.openModal("forgotPasswordModal.tmpl.html");
        };*/

       /* $scope.requestResetPassword = function () {
            alert("asdasdasda");
            alert($scope.email);
            var requestResetPasswordForm = { email: $scope.email}
            UserService.RequestResetPassword(requestResetPasswordForm)
                .then(function (response) {

                    alert('RequestResetPassword '+ JSON.stringify(response));
                    if (response.success) {
                        FlashService.Success(response.message, true);
                        //$scope.dataLoading = false;
                        // $location.path('/');
                    } else {

                        FlashService.Error(response.message);
                        $scope.dataLoading = false;
                    }
                });


        }*/

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
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        console.info("IndexController loaded");

        $scope.log12=function () {
            console.info("btn pressed index");
        }

        $scope.openLoginModal=function(){
            $rootScope.modalInstance=$uibModal.open({
                templateUrl: 'loginModal.tmpl.html',
                scope:$scope
             });
        }

        /*$scope.testing= function () {
            alert("testing")
        }*/


        $scope.openRegistrationModal=function(){
            $rootScope.modalInstance=$uibModal.open({
                templateUrl: 'registrationModal.tmpl.html',
                scope:$scope
            });
        }

        $scope.close=function(){
            $scope.modalInstance.dismiss();//$scope.modalInstance.close() also works I think
        };

        $scope.doSomething=function(){
            $rootScope.globals = $cookieStore.get('globals') || {};
            if ($rootScope.globals.currentUser) {
                $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
                $location.path('/home');
            }
        }
        $scope.doSomething();

        //initController();


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
    ResetPasswordController.$inject = ['$scope','$route','FlashService','AuthenticationService','UserService', '$uibModal', '$rootScope','$http','$location','$cookieStore'];
    function ResetPasswordController($scope,$route,FlashService,$AuthenticationService,UserService,$uibModal,$rootScope,$http,$location,$cookieStore, $routeParams) {
        var vm = this;

        $scope.openSendResetPasswordModal=function(){
            $scope.modalInstance=$uibModal.open({
                templateUrl: 'sendresetpasswordModal.tmpl.html',
                scope:$scope
            });
        };
        
       console.log("reset password controller");
        alert('ResetPasswordController');

        $scope.token = $route.current.params.token;
        $scope.email = $route.current.params.email;

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

        $scope.resetPasswordForm={}
        $scope.resetPasswordSubmit=false;
        $scope.resetPassword = function (password,confirmPassword) {
            // $scope.resetPasswordForm.password = $scope.password;
            // $scope.resetPasswordForm.confirmPassword = $scope.confirmPassword;
            $scope.resetPasswordSubmit=true;
            $scope.resetPasswordForm.token = $scope.token;
            $scope.resetPasswordForm.password = password;
            $scope.resetPasswordForm.confirmPassword = confirmPassword;


           alert('resetPasswordForm ');

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

    SendResetPasswordController.$inject = ['$scope','$route','AuthenticationService','UserService', '$uibModal', '$rootScope','$http','$location','$cookieStore','$routeParams'];

    function SendResetPasswordController($scope,$route,$AuthenticationService,UserService,$uibModal,$rootScope,$http,$location,$cookieStore, $routeParams) {
        
alert('SendResetPasswordController');


    }
    function AuthenticationTokenController($scope,$route,$uibModal,UserService, $rootScope,$http,$location,$cookieStore) {


       $scope.authenticationToken =$route.current.params.authenticationToken;
        //alert("uiModal"+JSON.stringify($uibModal.toString()));


        $scope.openLoginAfterEmailConfirmationModal=function(){

            $rootScope.modalInstance=$uibModal.open({
                templateUrl: 'loginAfterEmailConfirmationModal.tmpl.html',
                scope:$scope
            });
        }

        
        $scope.close=function(){
            $scope.modalInstance.dismiss();//$scope.modalInstance.close() also works I think
        };

        $scope.openLoginModalAfterConfirmEmailSuccess=function(){
            $rootScope.modalInstance=$uibModal.open({
                templateUrl: 'loginAfterEmailConfirmationModalSuccess.tmpl.html',
                scope:$scope
            });
        };

        $scope.openLoginModalAfterConfirmEmailAccountAlreadyisEnabled=function(){
            $rootScope.modalInstance=$uibModal.open({
                templateUrl: 'loginAfterEmailConfirmationModalAccountAlreadyExist.tmpl.html',
                scope:$scope
            });
        };

        $scope.openLoginModalAfterConfirmEmailTokenExpired=function(){
            $scope.modalInstance=$uibModal.open({
                templateUrl: 'loginAfterEmailConfirmationModalTokenExpired.tmpl.html',
                scope:$scope
            });
        };

        $scope.openLoginModalAfterConfirmEmailErrorOccur=function(){
            $rootScope.modalInstance=$uibModal.open({
                templateUrl: 'loginAfterEmailConfirmationModalErrorOccur.tmpl.html',
                scope:$scope
            });
        };
        $scope.openLoginModalAfterConfirmEmailNoSuchToken=function(){
            $rootScope.modalInstance=$uibModal.open({
                templateUrl: 'loginAfterEmailConfirmationModalNoSuchModal.tmpl.html',
                scope:$scope
            });
        };


        $scope.token={token:$scope.authenticationToken};
        $scope.registrationConfirm=function() {
            UserService.RegistrationConfirm($scope.token)
                .then(function (response) {
                        alert(JSON.stringify(response));
                    alert(JSON.stringify("REsponse.data"+response.data.tokenMessage));
                    if (response.data.tokenMessage == 0) {
                        $scope.openLoginModalAfterConfirmEmailTokenExpired();

                    }
                    else if (response.data.tokenMessage ==1){
                        $scope.openLoginModalAfterConfirmEmailAccountAlreadyisEnabled();
                    }
                    else  if(response.data.tokenMessage == 2){
                        $scope.openLoginModalAfterConfirmEmailNoSuchToken();


                    }
                    else if(response.data.tokenMessage == 3){

                        $scope.openLoginModalAfterConfirmEmailErrorOccur();

                    }else {
                        $scope.openLoginModalAfterConfirmEmailSuccess()

                    }
                });
        }

        $scope.registrationConfirm();
        //
        //alert("uiModal"+JSON.stringify($uibModal).toSource());
       // setTimeout(function(){ alert("uiModal"+JSON.stringify($uibModal)); }, 3000);

        


    }

})();
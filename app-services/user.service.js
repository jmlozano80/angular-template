/**
 * Created by jose on 16/05/16.
 */
(function () {
    'use strict';

    angular
        .module('app')
        .factory('UserService', UserService);

    UserService.$inject = ['$http'];
    function UserService($http) {
        var service = {};
        var backendUrl = "http://localhost:8080/";


        service.GetUsernameByEmail = GetUsernameByEmail;
        service.Create = Create;
        service.RegistrationConfirm = RegistrationConfirm;
        service.ResendActivationMail = ResendActivationMail;
        service.RequestResetPassword = RequestResetPassword;
        service.GetByResetPassword = GetByResetPassword;
        service.ResetPassword = ResetPassword;
        service.IsUserAdmin = IsUserAdmin;
        return service;



        function IsUserAdmin() {
            return $http.get(backendUrl+'api/isadmin').then(handleSuccess, handleError);
        }


        function GetUsernameByEmail() {
           return $http.get(backendUrl+'api/username').then(handleSuccess, handleError);
        }

        function ResendActivationMail(email) {

            return $http.post(backendUrl+'resendConfirmationEmail', email).then(handleSuccess, handleError);
        }

        function RequestResetPassword(email) {

            return $http.post(backendUrl+'requestResetPassword', email).then(handleSuccess, handleError);
        }
        function GetByResetPassword(token,email) {
            return $http.get(backendUrl+'resetPassword/?token='+token+'&email='+email).then(handleSuccess, handleError);
        }

        function ResetPassword(resetPasswordForm) {

            return $http.post(backendUrl+'resetPassword', resetPasswordForm).then(handleSuccess, handleError);
        }

        function Create(user) {

            return $http.post(backendUrl+'register', user).then(handleSuccess, handleError);
        }
        
        
        function RegistrationConfirm(token) {

            return $http.get(backendUrl+'registrationConfirm?token=' + token.token,null).then(handleSuccess, handleError);
        }

        // private functions

        function handleSuccess(res) {

            return res;
        }

        function handleError(res) {

            return res;

        }

    }

})();
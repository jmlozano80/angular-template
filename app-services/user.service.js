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

        service.GetAll = GetAll;
        service.GetById = GetById;
        service.GetByUsername = GetByUsername;
        service.Create = Create;
        service.RegistrationConfirm = RegistrationConfirm;
        service.ResendActivationMail = ResendActivationMail;
        service.RequestResetPassword = RequestResetPassword;
        service.GetByResetPassword = GetByResetPassword;
        service.ResetPassword = ResetPassword;
        service.Update = Update;
        service.Delete = Delete;

        return service;

        function GetAll() {
            return $http.get('/api/users').then(handleSuccess, handleError('Error getting all users'));
        }

        function GetById(id) {
            return $http.get('/api/users/' + id).then(handleSuccess, handleError('Error getting user by id'));
        }

        function GetByUsername(username) {
            alert('GetByUsername '+ username);
            return $http.get('/api/users/' + username).then(handleSuccess, handleError('Error getting user by username'));
        }

        function ResendActivationMail(email) {

            return $http.post('http://localhost:8080/resendConfirmationEmail', email).then(handleSuccess, handleError);
        }

        function RequestResetPassword(email) {

            return $http.post('http://localhost:8080/requestResetPassword', email).then(handleSuccess, handleError);
        }
        function GetByResetPassword(token,email) {
            //alert('GetByResetPassword '+ token+' '+ email);
            return $http.get('http://localhost:8080/resetPassword/?token='+token+'&email='+email).then(handleSuccess, handleErrorGetResetPassword);
        }

        function ResetPassword(resetPasswordForm) {
            
            alert("service "+ JSON.stringify(resetPasswordForm));
            return $http.post('http://localhost:8080/resetPassword', resetPasswordForm).then(handleSuccess, handleErrorGetResetPassword);
        }

        function Create(user) {

            return $http.post('http://localhost:8080/register', user).then(handleSuccess, handleError);
        }
        
        
        function RegistrationConfirm(token) {

            return $http.get('http://localhost:8080/registrationConfirm?token=' + token.token,null).then(handleSuccessConfirmEmail, handleErrorConfirmEmail);
        }

        function Update(user) {
            return $http.put('/api/users/' + user.id, user).then(handleSuccess, handleError('Error updating user'));
        }

        function Delete(id) {
            return $http.delete('/api/users/' + id).then(handleSuccess, handleError('Error deleting user'));
        }

        // private functions

        function handleSuccess(res) {

            alert('Handle Success '+JSON.stringify(res));
            return res;
        }

        function handleError(res) {


            alert("handleError "+res)
            return res;

        }


        function handleErrorGetResetPassword(res) {
            

                    alert("handleErrorGetResetPassword"+res)
                return res;
            
        }
        function handleSuccessConfirmEmail(res) {
            return res;
        }

        function handleErrorConfirmEmail(res) {

       
            return res

        }
    }

})();
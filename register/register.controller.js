/**
 * Created by jose on 16/05/16.
 */
(function () {
    'use strict';

    var compareTo = function() {
        return {
            require: "ngModel",
            scope: {
                otherModelValue: "=compareTo"
            },
            link: function(scope, element, attributes, ngModel) {

                ngModel.$validators.compareTo = function(modelValue) {
                    console.log(modelValue + ":" + scope.otherModelValue);
                    console.log(modelValue == scope.otherModelValue);
                    return modelValue == scope.otherModelValue;
                };

                scope.$watch("otherModelValue", function() {
                    ngModel.$validate();
                });
            }
        };
    }



    angular
        .module('app')
        .controller('RegisterController', RegisterController)
        .directive("compareTo", compareTo);

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
            delete $rootScope.flash;
        })
    }

})();
/**
 * Created by jose on 16/05/16.
 */
(function () {
    'use strict';

    angular
        .module('app')
        .controller('Page1_3Controller', Page1_3Controller);

    Page1_3Controller.$inject = ['$scope','UserService', '$rootScope','AuthenticationService','$location'];
    function Page1_3Controller($scope,UserService, $rootScope,AuthenticationService,$location) {
        var vm = this;

        vm.user = null;


        initController();

        function initController() {


        }

        $scope.page1_3Test="Page1.3";




    }

})();
/**
 * Created by jose on 30/06/16.
 */

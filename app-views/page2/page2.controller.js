/**
 * Created by jose on 16/05/16.
 */
(function () {
    'use strict';

    angular
        .module('app')
        .controller('Page2Controller', Page2Controller);

    Page2Controller.$inject = ['$scope','UserService', '$rootScope','AuthenticationService','$location'];
    function Page2Controller($scope,UserService, $rootScope,AuthenticationService,$location) {
        var vm = this;

        vm.user = null;


        initController();

        function initController() {


        }

        $scope.page2Test="Page2";




    }

})();
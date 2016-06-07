/**
 * Created by jose on 16/05/16.
 */
(function () {
    'use strict';

    angular
        .module('app', ['ngRoute', 'ngCookies','ui.bootstrap','ngMessages','angular-click-outside'])
        .config(config)
        .run(run);

    config.$inject = ['$routeProvider', '$locationProvider','$httpProvider'];
    function config($routeProvider, $locationProvider,$httpProvider) {
        $httpProvider.defaults.withCredentials = true;
        $httpProvider.defaults.useXDomain = true;
        $routeProvider
            .when('/', {
                controller: 'IndexController',
                templateUrl: 'index/index.view.html',
                controllerAs: 'vm'
            })
            .when('/resetpassword/:token/:email', {
                controller: 'ResetPasswordController',
                templateUrl: 'index/index.view.html',
                controllerAs: 'vm'
            })
            .when('/test/:authenticationToken', {
                controller: 'AuthenticationTokenController',
                templateUrl: 'index/index.view.html',
                controllerAs: 'vm'
            })
            .when('/home', {
                controller: 'HomeController',
                templateUrl: 'home/home.view.html',
                controllerAs: 'vm'
            })

            .when('/login', {
                controller: 'LoginController',
                templateUrl: 'login/login.view.html',
                controllerAs: 'vm'
            })

            .when('/register', {
                controller: 'RegisterController',
                templateUrl: 'register/register.view.html',
                controllerAs: 'vm'
            })

            .otherwise(

                { redirectTo: function(params, currentPath) {
                    alert('otherwise3');
                    return '/';
                } }
            );
    }

    run.$inject = ['$rootScope', '$location', '$cookieStore', '$http'];
    function run($rootScope, $location, $cookieStore, $http) {
        // keep user logged in after page refresh
        $rootScope.globals = $cookieStore.get('globals') || {};
        if ($rootScope.globals.currentUser) {
            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
        }

        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            // redirect to login page if not logged in and trying to access a restricted page

            var restrictedPage = $.inArray($location.path(), ['/','/test/:authenticated','/login', '/register','/resetpassword/:resetPassword/:email']) === -1;

            // If restrictedPage (String) startsWith('/test/')
            var n = $location.path().startsWith("/test");
            var x = $location.path().startsWith("/resetpassword");

            var loggedIn = $rootScope.globals.currentUser;
            console.log(restrictedPage && !n && !x && !loggedIn);
            if (restrictedPage && !n && !x && !loggedIn) {
                alert("sccession to restricted page "+ restrictedPage)
                $location.path('/');
            }
        });
    }

})();
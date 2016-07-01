/**
 * Created by jose on 16/05/16.
 */
(function () {
    'use strict';

    angular
        .module('app', ['ui.router','ngCookies','ui.bootstrap','ngMessages','angular-click-outside'])
        .config(config)
        .run(run);

    config.$inject = ['$stateProvider','$urlRouterProvider','$httpProvider'];
    function config($stateProvider,$urlRouterProvider,$httpProvider) {
        $httpProvider.defaults.withCredentials = true;
        $httpProvider.defaults.useXDomain = true;

        // For any unmatched url, redirect to /state1
        $urlRouterProvider.otherwise("/");
        
        $stateProvider
            .state('index', {
                url: "/",
                views: {
                    'main': { templateUrl: 'app-views/index/index.view.html',
                              controller:'IndexController'  }
                }
            })
            .state('authentication', {
                url: "/test/{authenticationToken}",
                views: {
                    'main': {   templateUrl: 'app-views/index/index.view.html',
                                controller:'AuthenticationTokenController'  }
            }
            })
            .state('resetpassword', {
                url: "/resetpassword/{token}/{email}",
                views: {
                    'main': {   templateUrl: 'app-views/index/index.view.html',
                        controller:'ResetPasswordController'  }
                }
            })
            .state('home', {
                url: "/home",
                views: {
                    'main': { templateUrl: 'app-views/home/home.view.html',
                        controller:'HomeController'  }


                }
            })
            .state('home.home', {
                url: "/",
                views: {

                    'homeContainer': { templateUrl: 'app-views/home-container/home.container.view.html',
                    controller:'HomeContainerController'}


                }
            })
            .state('home.page1_1', {
                url: "/page1/1",
                views: {
                    'homeContainer': { templateUrl: 'app-views/page1/page1-1/page1.1.view.html',
                        controller:'Page1_1Controller'  }
                }
            })
            .state('home.page1_2', {
                url: "/page1/2",
                views: {
                    'homeContainer': { templateUrl: 'app-views/page1/page1-2/page1.2.view.html',
                        controller:'Page1_2Controller'  }
                }
            })
            .state('home.page1_3', {
                url: "/page1/3",
                views: {
                    'homeContainer': { templateUrl: 'app-views/page1/page1-3/page1.3.view.html',
                        controller:'Page1_3Controller'  }
                }
            })
            .state('home.page2', {
                url: "/page2",
                views: {
                    'homeContainer': { templateUrl: 'app-views/page2/page2.view.html',
                        controller:'Page2Controller'  }
                }
            })
            .state('home.page3', {
                url: "/page3",
                views: {
                    'homeContainer': { templateUrl: 'app-views/page3/page3.view.html',
                        controller:'Page3Controller'  }
                }
            })
            .state('home.admin1', {
                url: "/admin1",
                views: {
                    'homeContainer': { templateUrl: 'app-views/admin/admin1/admin1.view.html',
                        controller:'Admin1Controller'  }
                }
            })
            .state('home.admin2', {
                url: "/admin2",
                views: {
                    'homeContainer': { templateUrl: 'app-views/admin/admin2/admin2.view.html',
                        controller:'Admin2Controller'  }
                }
            })
            .state('home.admin3', {
                url: "/admin3",
                views: {
                    'homeContainer': { templateUrl: 'app-views/admin/admin3/admin3.view.html',
                        controller:'Admin3Controller'  }
                }
            })

    }
   /* angular
        .module('app', ['ngRoute', 'ngCookies','ui.bootstrap','ngMessages','angular-click-outside'])
        .config(config)
        .run(run);

    config.$inject = ['$routeProvider', '$locationProvider','$httpProvider'];*/
    /*function config($routeProvider, $locationProvider,$httpProvider) {
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
    }*/

    run.$inject = ['$rootScope', '$location', '$cookieStore', '$http','$state','$window'];
    function run($rootScope, $location, $cookieStore, $http,$state,$window) {
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

                $state.go('index');
            }
        });

    }

})();
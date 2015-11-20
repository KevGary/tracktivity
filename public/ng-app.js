angular.module('app', ['ngAnimate', 'ngRoute'])
    .controller('GlobalController', ['$scope', function ($scope) {

    }])
    .controller('LandingController', ['$scope', function ($scope) {

    }])
    .controller('RegisterController', ['$scope', function ($scope) {
      $scope.authenticate = function (user) {
        console.log(user)
      } 
    }])
    .controller('TrackerController', ['$scope', function ($scope) {

    }])
    .config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
                templateUrl: '/partials/landing.html',
                controller: 'LandingController'
            })
            .when('/register', {
                templateUrl: '/partials/register.html',
                controller: 'RegisterController'
            })
            .when('/tracker', {
              templateUrl: '/partials/tracker.html',
              controller: 'TrackerController'
            })
            .when('/activities', {
                templateUrl: '/partials/activities.html',
                controller: 'ActivitiesController'
            })
            .when('/page-not-found', {
                templateUrl: '/partials/error.html'
            })
            .otherwise({
                redirectTo: '/page-not-found'
            });
        $locationProvider.html5Mode(true);
    }]);

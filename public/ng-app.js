var app = angular.module('app', ['ngAnimate', 'ngRoute'], function config($httpProvider) {
    $httpProvider.interceptors.push('AuthInterceptor');
});

app.constant('API_URL', 'http://localhost:3000');

app.controller('GlobalController', function ($scope) {
  $scope.money = 'dope';
})
app.controller('LandingController', function ($scope) {

})
app.controller('LoginController', function ($scope, $http, UserFactory, RandomUserFactory) {
  $scope.getUser = function() {
    RandomUserFactory.getUser().then(function success(response) {
      $scope.randomUser = response.data;
    }, handleError);
  }
  $scope.login = function(user) {
    UserFactory.login(user).then(function success(response) {
      $scope.currentUser = response.data;
    }, handleError);
  }
  // $scope.logout = function() {
  //   UserFactory.logout();
  //   $scope.currentUser = null;
  // }

  function handleError(response) {
    alert('Error: ' + response.data);
  }
})
app.controller('RegisterController', function ($scope, $http) {
  $scope.register = function(user) {
    $http.post('http://avid-api.cfapps.io/guardians',
      {
        "data": {
          "type": "guardian",
          "attributes": {
            "name": user.name,
            "email": user.email,
            "password": user.password
          }
        }
      }
    ).then(function(response){
      localStorage.setItem('id', response.data.rows[0].id);
      console.log(response.data.rows[0].id);
    });
  }
  // $http.get('http://avid-api.cfapps.io/guardians').then(function(response){
  //     console.log(response.data);
  // })
})

app.controller('TrackerController', function ($scope) {

})
app.controller('DashboardController', function($scope, $http) {
  $scope.kids = [];
  var guardianId = localStorage.getItem('id');
  console.log(guardianId)
  $http.get('http://avid-api.cfapps.io/relationships/' + guardianId).then(function(response) {
      // console.log(response)
      for (var x in response.data.rows) {
          $http.get('http://avid-api.cfapps.io/kids/'+response.data.rows[x].kid_id).then(function(response){
              console.log(response.data.rows)
              $scope.kids.push(response.data.rows[0])
              console.log($scope.kids);
          })
      }
  })
  $scope.addKid = function(kid) {
    $http.post('http://avid-api.cfapps.io/kids',
        {
          "data": {
            "type": "kid",
            "attributes": {
                "name": kid.name,
                "gender": kid.gender,
                "age": kid.age
            }
          }
        }
        ).then(function(response) {
          var kidId = response.data.rows[0].id;
          $http.post('http://avid-api.cfapps.io/relationships',
          {
            "data": {
              "type": "relationship",
              "attributes": {
                "guardian_id": guardianId,
                "kid_id": kidId
              }
            }
          }
          ).then(function(response) {
              console.log(response.data);
          })
        });
      $scope.kids.push($scope.kid);
      $scope.kid = {};
      $scope.showForm = false;
  }    
})
app.factory('RandomUserFactory', function RandomUserFactory($http, API_URL) {
  'use strict';
  return {
    getUser: getUser
  };

  function getUser() {
    return $http.get(API_URL + '/random-user');
  }
});
app.factory('UserFactory', function UserFactory($http, API_URL, AuthTokenFactory) {
  'use strict';
  return {
    login: login,
    logout: logout
  };

  function login(user){
    return $http.post(API_URL + '/login',
    {
      "user": user
    })
    .then(function success(response) {
      AuthTokenFactory.setToken(response.data.token);
      return response;
    });
  }

  function logout() {
    AuthTokenFactory.setToken();
    return null;
  }
})
app.factory('AuthTokenFactory', function AuthTokenFactory($window) {
  'use strict';
  var store = $window.localStorage;
  var key = 'auth-token';
  return {
    getToken: getToken,
    setToken: setToken
  };

  function getToken() {
    return store.getItem(key);
  }

  function setToken(token){
    if (token) {
      store.setItem(key, token);
    } else {
      store.removeItem(key);
    }
  }
})
app.factory('AuthInterceptor', function AuthInterceptor(AuthTokenFactory) {
  return {
    request: addToken
  };

  function addToken(config) {
    var token = AuthTokenFactory.getToken();
    if(token) {
      config.headers = config.headers || {};
      config.headers.Authorization = 'Bearer ' + token;
    }
    return config;
  }
})
app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
          templateUrl: '/partials/landing.html',
          controller: 'LandingController'
      })
      .when('/login', {
          templateUrl: '/partials/login.html',
          controller: 'LoginController'
      })
      .when('/register', {
          templateUrl: '/partials/register.html',
          controller: 'RegisterController'
      })
      // .when('/tracker', {
      //   templateUrl: '/partials/tracker.html',
      //   controller: 'TrackerController'
      // })
      .when('/tracker', {
          templateUrl: '/partials/tracker.html',
          controller: 'TrackerController'
      })
      .when('/dashboard', {
          templateUrl: '/partials/dashboard.html',
          controller: 'DashboardController'
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

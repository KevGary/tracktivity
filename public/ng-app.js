var app = angular.module('app', ['ngAnimate', 'ngRoute'], function config($httpProvider) {
    $httpProvider.interceptors.push('AuthInterceptor');
});

app.constant('API_URL', 'http://avid-api.cfapps.io');

app.controller('GlobalController', function ($scope, $http, $q, UserFactory, RandomUserFactory) {
  // $scope.push = function() {
  //   UserFactory.getUser().then(function (response) {
  //   console.log(response)
  //   $scope.data = response
  //   })
  // }
  $scope.login = function(user) {
    UserFactory.login(user).then(function success(response) {
      console.log(response)
      // $scope.currentUserID = response.data.user;
      // $scope.currentUserEmail = response.data.email;
      localStorage.setItem('id', response.data.user);
      localStorage.setItem('email', response.data.email);
      console.log('successful log in');

    }, handleError);
  }
  $scope.logout = function() {
    UserFactory.logout();
    localStorage.removeItem('id');
    localStorage.removeItem('email');
  }
  function handleError(response) {
    alert('Error: ' + response.data);
  }
})
app.controller('LandingController', function ($scope) {

})
app.controller('LoginController', function ($scope, $http, $q, UserFactory, RandomUserFactory) {
  $scope.showData = function() {
    $http.get('http://avid-api.cfapps.io/guardians').then(function(response){
      console.log(response.data);
      $scope.data = response.data;
    })
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
  $scope.kidObjects = [];
  $http.get('http://avid-api.cfapps.io/relationships/' + localStorage.id).then(function(response) {
    for(var i = 0; i < response.data.rows.length; i++) {
      $scope.kids.push(response.data.rows[i].kid_id);
    }
  })
    .then(function(response){
      for(var j = 0; j < $scope.kids.length; j++) {
        $http.get('http://avid-api.cfapps.io/kids/' + String($scope.kids[j]))
          .then(function (response) {
            console.log(response.data.rows[0])
            $scope.kidObjects.push(response.data.rows[0])
          })
      }
    })
    // .then(function(response) {
    //   for(var j = 0; j < response.data.rows.length; j++) {
    //   $http.get('http://avid-api.cfapps.io/kids/' + response.data.rows[i].kid_id)
    //     .then(function(response){
    //       $scope.kidObjects.push(response.data)
    //     })
    // })
  var guardianId = localStorage.getItem('user');
  // $http.get('http://avid-api.cfapps.io/relationships/' + guardianId).then(function(response) {
  //     // console.log(response)
  //     for (var x in response.data.rows) {
  //         $http.get('http://avid-api.cfapps.io/kids/'+response.data.rows[x].kid_id).then(function(response){
  //             console.log(response.data.rows)
  //             $scope.kids.push(response.data.rows[0])
  //             console.log($scope.kids);
  //         })
  //     }
  // })
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
          var guardianId = localStorage.id;
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
          )
        })
        //   var kidId = response.data.rows[0].id;

        //   $http.post('http://avid-api.cfapps.io/relationships',
        //   {
        //     "data": {
        //       "type": "relationship",
        //       "attributes": {
        //         "guardian_id": guardianId,
        //         "kid_id": kidId
        //       }
        //     }
        //   }
        //   ).then(function(response) {
        //     console.log(response.data);
        //   })
        // });
      // $scope.kids.push($scope.kid);
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
app.factory('UserFactory', function UserFactory($http, $q, API_URL, AuthTokenFactory) {
  'use strict';
  return {
    login: login,
    logout: logout,
    getUser: getUser
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

  function getUser() {
    if(AuthTokenFactory.getToken()) {
      return $http.get('API_URL' + '/me')
    } else {
      return $q.reject({ data: 'client has no authorization '})
    }
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

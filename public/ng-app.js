var app = angular.module('app', ['ngAnimate', 'ngRoute', 'chart.js'], function config($httpProvider) {
    $httpProvider.interceptors.push('AuthInterceptor');
});

app.constant('API_URL', 'http://avid-api.cfapps.io');

app.controller('GlobalController', function ($scope, $http, $q, UserFactory, RandomUserFactory, $location) {
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
      $location.url('/dashboard');
      $location.path('/dashboard');
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
app.controller("MondayPie", ['$scope',function ($scope) {
        $scope.labels = ["Download Sales", "In-Store Sales", "Mail-Order Sales"];
        $scope.data = [300, 500, 100];
        $scope.options = {
            //Boolean - Whether we should show a stroke on each segment
            segmentShowStroke : true,
            //String - The colour of each segment stroke
            segmentStrokeColor : "#272822",
            //Number - The width of each segment stroke
            segmentStrokeWidth : 2,
            //Number - The percentage of the chart that we cut out of the middle
            percentageInnerCutout : 0, // This is 0 for Pie charts
            //Number - Amount of animation steps
            animationSteps : 100,
            //String - Animation easing effect
            animationEasing : "easeInOutBounce",
            //Boolean - Whether we animate the rotation of the Doughnut
            animateRotate : true,
            //Boolean - Whether we animate scaling the Doughnut from the centre
            animateScale : true,
            //String - A legend template
            legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<data.length; i++){%><li><span style=\"background-color:<%=data[i].fillColor%>\"></span><%if(data[i].label){%><%=data[i].label%><%}%></li><%}%></ul>"
        }
    }])
app.controller("TuesdayPie", ['$scope',function ($scope) {
        $scope.labels = ["Download Sales", "In-Store Sales", "Mail-Order Sales"];
        $scope.data = [40, 10, 10];
        $scope.options = {
            //Boolean - Whether we should show a stroke on each segment
            segmentShowStroke : true,
            //String - The colour of each segment stroke
            segmentStrokeColor : "#272822",
            //Number - The width of each segment stroke
            segmentStrokeWidth : 2,
            //Number - The percentage of the chart that we cut out of the middle
            percentageInnerCutout : 0, // This is 0 for Pie charts
            //Number - Amount of animation steps
            animationSteps : 110,
            //String - Animation easing effect
            animationEasing : "easeInOutBounce",
            //Boolean - Whether we animate the rotation of the Doughnut
            animateRotate : true,
            //Boolean - Whether we animate scaling the Doughnut from the centre
            animateScale : true,
            //String - A legend template
            legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<data.length; i++){%><li><span style=\"background-color:<%=data[i].fillColor%>\"></span><%if(data[i].label){%><%=data[i].label%><%}%></li><%}%></ul>"
        }
    }])
    app.controller("WednesdayPie", ['$scope',function ($scope) {
        $scope.labels = ["Download Sales", "In-Store Sales", "Mail-Order Sales"];
        $scope.data = [30, 20, 10];
        $scope.options = {
            //Boolean - Whether we should show a stroke on each segment
            segmentShowStroke : true,
            //String - The colour of each segment stroke
            segmentStrokeColor : "#272822",
            //Number - The width of each segment stroke
            segmentStrokeWidth : 2,
            //Number - The percentage of the chart that we cut out of the middle
            percentageInnerCutout : 0, // This is 0 for Pie charts
            //Number - Amount of animation steps
            animationSteps : 130,
            //String - Animation easing effect
            animationEasing : "easeInOutBounce",
            //Boolean - Whether we animate the rotation of the Doughnut
            animateRotate : true,
            //Boolean - Whether we animate scaling the Doughnut from the centre
            animateScale : true,
            //String - A legend template
            legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<data.length; i++){%><li><span style=\"background-color:<%=data[i].fillColor%>\"></span><%if(data[i].label){%><%=data[i].label%><%}%></li><%}%></ul>"
        }
    }])
    app.controller("ThursdayPie", ['$scope',function ($scope) {
        $scope.labels = ["Download Sales", "In-Store Sales", "Mail-Order Sales"];
        $scope.data = [30, 20, 10];
        $scope.options = {
            //Boolean - Whether we should show a stroke on each segment
            segmentShowStroke : true,
            //String - The colour of each segment stroke
            segmentStrokeColor : "#272822",
            //Number - The width of each segment stroke
            segmentStrokeWidth : 2,
            //Number - The percentage of the chart that we cut out of the middle
            percentageInnerCutout : 0, // This is 0 for Pie charts
            //Number - Amount of animation steps
            animationSteps : 140,
            //String - Animation easing effect
            animationEasing : "easeInOutBounce",
            //Boolean - Whether we animate the rotation of the Doughnut
            animateRotate : true,
            //Boolean - Whether we animate scaling the Doughnut from the centre
            animateScale : true,
            //String - A legend template
            legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<data.length; i++){%><li><span style=\"background-color:<%=data[i].fillColor%>\"></span><%if(data[i].label){%><%=data[i].label%><%}%></li><%}%></ul>"
        }
    }])
    app.controller("FridayPie", ['$scope',function ($scope) {
        $scope.labels = ["Download Sales", "In-Store Sales", "Mail-Order Sales"];
        $scope.data = [10, 10, 10];
        $scope.options = {
            //Boolean - Whether we should show a stroke on each segment
            segmentShowStroke : true,
            //String - The colour of each segment stroke
            segmentStrokeColor : "#272822",
            //Number - The width of each segment stroke
            segmentStrokeWidth : 2,
            //Number - The percentage of the chart that we cut out of the middle
            percentageInnerCutout : 0, // This is 0 for Pie charts
            //Number - Amount of animation steps
            animationSteps : 150,
            //String - Animation easing effect
            animationEasing : "easeInOutBounce",
            //Boolean - Whether we animate the rotation of the Doughnut
            animateRotate : true,
            //Boolean - Whether we animate scaling the Doughnut from the centre
            animateScale : true,
            //String - A legend template
            legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<data.length; i++){%><li><span style=\"background-color:<%=data[i].fillColor%>\"></span><%if(data[i].label){%><%=data[i].label%><%}%></li><%}%></ul>"
        }
    }])
    app.controller("SaturdayPie", ['$scope',function ($scope) {
        $scope.labels = ["Download Sales", "In-Store Sales", "Mail-Order Sales"];
        $scope.data = [10, 20, 10];
        $scope.options = {
            //Boolean - Whether we should show a stroke on each segment
            segmentShowStroke : true,
            //String - The colour of each segment stroke
            segmentStrokeColor : "#272822",
            //Number - The width of each segment stroke
            segmentStrokeWidth : 2,
            //Number - The percentage of the chart that we cut out of the middle
            percentageInnerCutout : 0, // This is 0 for Pie charts
            //Number - Amount of animation steps
            animationSteps : 160,
            //String - Animation easing effect
            animationEasing : "easeInOutBounce",
            //Boolean - Whether we animate the rotation of the Doughnut
            animateRotate : true,
            //Boolean - Whether we animate scaling the Doughnut from the centre
            animateScale : true,
            //String - A legend template
            legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<data.length; i++){%><li><span style=\"background-color:<%=data[i].fillColor%>\"></span><%if(data[i].label){%><%=data[i].label%><%}%></li><%}%></ul>"
        }
    }])
    app.controller("SundayPie", ['$scope',function ($scope) {
        $scope.labels = ["Download Sales", "In-Store Sales", "Mail-Order Sales"];
        $scope.data = [110, 20, 10];
        $scope.options = {
            //Boolean - Whether we should show a stroke on each segment
            segmentShowStroke : true,
            //String - The colour of each segment stroke
            segmentStrokeColor : "#272822",
            //Number - The width of each segment stroke
            segmentStrokeWidth : 2,
            //Number - The percentage of the chart that we cut out of the middle
            percentageInnerCutout : 0, // This is 0 for Pie charts
            //Number - Amount of animation steps
            animationSteps : 170,
            //String - Animation easing effect
            animationEasing : "easeInOutBounce",
            //Boolean - Whether we animate the rotation of the Doughnut
            animateRotate : true,
            //Boolean - Whether we animate scaling the Doughnut from the centre
            animateScale : true,
            //String - A legend template
            legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<data.length; i++){%><li><span style=\"background-color:<%=data[i].fillColor%>\"></span><%if(data[i].label){%><%=data[i].label%><%}%></li><%}%></ul>"
        }
    }])
app.controller('LandingController', function ($scope) {

})
app.controller('LoginController', function ($scope, $http, $q, UserFactory, RandomUserFactory) {
  $scope.showData = function() {
    $http.get('http://avid-api.cfapps.io/guardians').then(function(response){
      $scope.data = response.data;
    })
  }
})
app.controller('RegisterController', function ($scope, $http, $location) {
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
      // $location.url('/dashboard');
      // $location.path('/dashboard');
    });

  }
})

app.controller('TrackerController', function ($scope) {

})
app.controller('DashboardController', function($scope, $http) {
  $scope.kids = [];
  $scope.kidObjects = [];
  $http.get('http://avid-api.cfapps.io/relationships/'+localStorage.id).then(function(response) {
    for(var i = 0; i < response.data.rows.length; i++) {
      $scope.kids.push(response.data.rows[i].kid_id);
    }
  })
    .then(function(response){
      for(var j = 0; j < $scope.kids.length; j++) {
        $http.get('http://avid-api.cfapps.io/kids/' + String($scope.kids[j]))
          .then(function (response) {
            // console.log(response.data.rows[0])
            $scope.kidObjects.push(response.data.rows[0])
            console.log($scope.kidObjects)
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

(function() {
  var app = angular.module('routes', ['ngRoute']);

  app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/stories/new', {
        templateUrl: 'javascripts/partials/stories/new.html',
        controller: 'NewStoryController'
      }).
      when('/login', {
        templateUrl: 'javascripts/partials/login.html',
        controller: 'LoginController'
      }).
      otherwise({
        redirectTo: '/login'
      });
  }])
})();
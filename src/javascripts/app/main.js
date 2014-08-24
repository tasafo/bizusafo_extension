var bizusafoApp = angular.module('bizusafoApp', ['ngRoute']);

bizusafoApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/phones', {
        templateUrl: 'javascripts/partials/test.html',
        controller: 'TestCtrl'
      }).
      when('/eng', {
        templateUrl: 'javascripts/partials/eng.html',
        controller: 'EngCtrl'
      }).
      otherwise({
        redirectTo: '/phones'
      });
  }]);

bizusafoApp.controller('TestCtrl', ['$scope', '$http',
  function () {
  }]);


bizusafoApp.controller('EngCtrl', ['$scope', '$http',
  function () {
  }]);


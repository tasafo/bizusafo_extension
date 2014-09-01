(function() {
  var app = angular.module('login-directives', []);

  app.controller('LoginController', ['$scope', '$http', '$location',
    function ($scope, $http, $location) {
      this.submitLogin = function() {
        $http.post("http://localhost:3000/api/v1/token", { user: $scope.user })
        .success(function(data) {
          $scope.user.token = data.token;
          chrome.storage.local.set({ user: { email: $scope.user.email, token: data.token } }, function() {} )
          $location.url("/stories/new");
        }).error(function() {
          chrome.storage.local.set({ user: { email: $scope.user.email } })
        });
      }
  }]);
})();
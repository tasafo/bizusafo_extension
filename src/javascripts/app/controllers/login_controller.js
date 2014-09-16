(function() {
  angular.module('bizusafoApp.controllers').controller('LoginController',
    ['$scope', '$http', '$location', 'BackendUrl',
    function ($scope, $http, $location, BackendUrl) {
      this.submitLogin = function() {
        $http.post(BackendUrl + "/api/v1/token", { user: $scope.user })
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

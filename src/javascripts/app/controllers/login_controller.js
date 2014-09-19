(function() {
  angular.module('bizusafoApp.controllers').controller('LoginController',
    ['$scope', '$http', '$location', 'BackendUrl',
    function ($scope, $http, $location, BackendUrl) {
      $scope.alert = {};

      this.submitLogin = function() {
        $scope.loggingIn = true;
        $scope.buttonDisabled = true;
        $http.post(BackendUrl + "/api/v1/token", { user: $scope.user })
        .success(function(data) {
          $scope.user.token = data.token;
          chrome.storage.local.set({ user: { email: $scope.user.email, token: data.token } });

          $scope.loggingIn = false;
          $scope.buttonDisabled = false;
          $location.url("/stories/new");
        }).error(function(response, status) {
          chrome.storage.local.set({ user: { email: $scope.user.email } });

          $scope.loggingIn = false;
          $scope.buttonDisabled = false;

          $scope.alert.error = status === 401 ? "Usuário ou senha incorretos" : "Erro desconhecido. :("
        });
      }
    }]);
})();

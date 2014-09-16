(function() {
  angular.module('bizusafoApp.controllers').controller('LogoutController',
    ['$scope', '$location', function ($scope, $location) {
        $scope.logout = function(callback) {
          $scope.user.token = "";
          chrome.storage.local.set({ user: { email: $scope.user.email } });
          $location.url("/login");
        };
      }
    ]);
})();

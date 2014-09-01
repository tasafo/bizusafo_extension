(function() {
  var app = angular.module('bizusafoApp', ['routes', 'login-directives', 'story-directives']);

  app.config(['$httpProvider', function ($httpProvider) {
    $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
  }]);

  app.run(['$rootScope', '$location', function($rootScope, $location) {
    chrome.storage.local.get("user", function(data) {
      $rootScope.user = { };

      if (data && data.user && data.user.email) {
        $rootScope.user.email = data.user.email;
      }

      if (data && data.user && data.user.token) {
        $rootScope.user.token = data.user.token;
        $location.url("/stories/new");
      }
    })
  }]);
})();
(function() {
  var app = angular.module('story-directives', []);

  app.controller('NewStoryController', ['$scope', '$http', 'BackendUrl',
    function ($scope, $http, BackendUrl) {
      this.submit = function() {
        $http.post(BackendUrl + "/api/v1/stories", { story: $scope.story }, { headers: { 'Authorization': "Token token=" + $scope.user.token } })
        .success(function() {
          $scope.story = { description: "", url: "", tag_list: "" };
          $scope.alert = $scope.alert || {};
          $scope.alert.success = "Obrigado por compartilhar este Bizu!";
        });
      };

      this.reset = function() {
        $scope.story = { description: "", url: "", tag_list: "" };
      };

      this.reset();

      chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        if (tabs.length > 0) {
          $scope.$apply(function() {
            $scope.story.url = tabs[0].url;
          });
        }
      });
    }]
  );
})();

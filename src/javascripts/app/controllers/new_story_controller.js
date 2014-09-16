(function() {
  angular.module('bizusafoApp.controllers').controller('NewStoryController',
    ['$scope', '$http', 'BackendUrl',
    function ($scope, $http, BackendUrl) {
      $scope.submit = function() {
        $http.post(BackendUrl + "/api/v1/stories", { story: $scope.story }, { headers: { 'Authorization': "Token token=" + $scope.user.token } })
        .success(function() {
          $scope.reset();
          $scope.alert = $scope.alert || {};
          $scope.alert.success = "Obrigado por compartilhar este Bizu!";
        });
      };

      $scope.reset = function() {
        $scope.story = { description: "", url: "", comment_text: "", tags: "" };
        if ($scope.storyForm) { $scope.storyForm.$setPristine() };
      };

      $scope.reset();

      chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        if (tabs.length > 0) {
          $scope.$apply(function() {
            $scope.story = $scope.story || { };
            $scope.story.url = tabs[0].url;
          });
        }
      });
    }]
  );
})();

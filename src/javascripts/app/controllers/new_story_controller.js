(function() {
  var app = angular.module('story-directives', []);

  app.controller('NewStoryController', ['$scope',
    function ($scope) {
      $scope.story = { description: "", url: "" };

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

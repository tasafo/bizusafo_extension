describe("NewStoryController", function(){
  var scope, ctrl;

  beforeEach(angular.mock.module("bizusafoApp"));

  beforeEach(inject(function(_$rootScope_, _$controller_) {
    $controller   = _$controller_;
    scope = _$rootScope_;

    chrome.tabs.custom.removeAll();
    scope.user = { email: "oldpal@email.com", token: "my_token" };
  }));

  describe("on load", function() {
    beforeEach(function() {
      chrome.tabs.create({ id: 1, url: "http://google.com", active: true, currentWindow: true });
      ctrl = $controller('NewStoryController', {$scope: scope});
    });

    it("resets description", function() {
      expect(scope.story.description).toBe("");
    });

    it("sets url as current tab url", function() {
      expect(scope.story.url).toBe("http://google.com");
    });
  });
});

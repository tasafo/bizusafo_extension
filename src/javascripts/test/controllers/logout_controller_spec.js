describe("LogoutController", function(){
  var scope, ctrl, location;

  beforeEach(angular.mock.module("bizusafoApp"));

  beforeEach(inject(function(_$controller_, _$location_) {
    $controller   = _$controller_
    $location     = _$location_;

    $location.url("/stories/new");
    scope = { };
    $controller('LogoutController', {$scope: scope, $location: $location});
  }));

  afterEach(function() {
    chrome.storage.local.remove("user");
  });

  describe("on logout", function() {
    beforeEach(function() {
      chrome.storage.local.set({ user: { token: "my_token", email: "oldpal@mail.com" }});
      scope.user = { token: "my_token", email: "oldpal@mail.com" };
      scope.logout();
    });

    it("deletes user token", function() {
      expect(scope.user.token).toBe("");
      chrome.storage.local.get("user", function(data) {
        expect(data.user.token).toBe(undefined);
      });
    });

    it("keeps user email", function() {
      expect(scope.user.email).toBe("oldpal@mail.com");
      chrome.storage.local.get("user", function(data) {
        expect(data.user.email).toBe("oldpal@mail.com");
      });
    });

    it("redirects to login", function() {
      expect($location.url()).toBe("/login")
    });
  });
});

describe("Main", function(){
  var $location,
      scope,
      app = angular.module("bizusafoApp"),
      runBlock = app._runBlocks[0][app._runBlocks[0].length - 1]; // it's like app._runBlocks[0].last

  beforeEach(inject(function(_$location_) {
    scope = {};
    $location = _$location_;
  }));

  describe("on load", function() {
    describe("when user token is not persisted", function() {
      beforeEach(function() {
        runBlock(scope, $location);
      });

      it("resets user params", inject(function($controller) {
        expect(scope.user.email).toBe(undefined);
        expect(scope.user.password).toBe(undefined);
        expect(scope.user.token).toBe(undefined);
      }));
    });

    describe("when user email is persisted", function() {
      beforeEach(function() {
        window.chrome.storage.local.set({ user: { email: "oldpal@mail.com" }});
        runBlock(scope, $location);
      });

      it("sets user email", function() {
        expect(scope.user.email).toBe("oldpal@mail.com");
      });
    });

    describe("when user token is persisted", function() {
      beforeEach(function() {
        window.chrome.storage.local.set({ user: { token: "my_token" }});
        runBlock(scope, $location);
      });

      it("redirects to new story path", function() {
        expect($location.url()).toBe("/stories/new");
      });

      it("sets user token", function() {
        expect(scope.user.token).toBe("my_token");
      });
    });
  });

});
describe("LoginController", function(){
  var scope, ctrl, $httpBackend, location, BackendUrl;

  beforeEach(angular.mock.module("bizusafoApp"));

  beforeEach(inject(function(_$httpBackend_, _$controller_, _$location_, _BackendUrl_) {
    $httpBackend  = _$httpBackend_;
    $controller   = _$controller_
    $location     = _$location_;
    BackendUrl    = _BackendUrl_;

    $location.url("/login")
    scope = { }
    ctrl = $controller('LoginController', {$scope: scope, $location: $location});
  }));

  afterEach(function() {
    chrome.storage.local.remove("user");
  });

  describe("on submitLogin", function() {
    beforeEach(function() {
      scope["user"] = { email: "oldpal@mail.com", password: "any password" };
    });

    describe("on success", function() {
      beforeEach(function() {
        $httpBackend.expectPOST(BackendUrl + '/api/v1/token', { user: scope.user }).respond({token: "my_token"});
        ctrl.submitLogin();
        $httpBackend.flush();
      });

      it("gets token", function() {
        expect(scope.user.token).toBe("my_token");
      });

      it("redirects to new story path", function() {
        expect($location.url()).toBe("/stories/new");
      });

      it("stores token", function() {
        window.chrome.storage.local.get("user", function(data) {
          expect(data.user.token).toBe("my_token");
        });
      });

      it("stores email", function() {
        window.chrome.storage.local.get("user", function(data) {
          expect(data.user.email).toBe("oldpal@mail.com");
        });
      });

      it("does not store password", function() {
        window.chrome.storage.local.get("user", function(data) {
          expect(data.user.password).toBe(undefined);
        });
      });
    });

    describe("on error", function() {
      beforeEach(function() {
        $httpBackend.expectPOST(BackendUrl + '/api/v1/token', { user: scope.user }).respond(401, '');
        ctrl.submitLogin();
        $httpBackend.flush();
      });

      it("does not set token", function() {
        expect(scope.user.token).toBe(undefined);
      });

      it("stay on login path", function() {
        expect($location.url()).toBe("/login");
      });

      it("does not store token", function() {
        window.chrome.storage.local.get("user", function(data) {
          expect(data.user.token).toBe(undefined);
        });
      });

      it("stores email", function() {
        window.chrome.storage.local.get("user", function(data) {
          expect(data.user.email).toBe("oldpal@mail.com");
        });
      });

      it("does not store password", function() {
        window.chrome.storage.local.get("user", function(data) {
          expect(data.user.password).toBe(undefined);
        });
      });
    });
  });
});

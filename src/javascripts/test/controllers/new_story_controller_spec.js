describe("NewStoryController", function(){
  var scope, ctrl, BackendUrl;

  beforeEach(angular.mock.module("bizusafoApp"));

  beforeEach(inject(function(_$rootScope_, _$controller_, _$httpBackend_, _BackendUrl_) {
    $controller   = _$controller_;
    scope = _$rootScope_;
    $httpBackend  = _$httpBackend_;
    BackendUrl    = _BackendUrl_;

    chrome.tabs.custom.removeAll();
  }));

  describe("on load", function() {
    beforeEach(function() {
      chrome.tabs.create({ id: 1, url: "http://google.com", active: true, currentWindow: true });
      ctrl = $controller('NewStoryController', {$scope: scope});
    });

    it("resets description", function() {
      expect(scope.story.description).toBe("");
    });

    it("resets description", function() {
      expect(scope.story.tag_list).toBe("");
    });

    it("sets url as current tab url", function() {
      expect(scope.story.url).toBe("http://google.com");
    });
  });

  describe("on submit", function() {
    beforeEach(function() {
      ctrl = $controller('NewStoryController', {$scope: scope});
    });

    describe("on success", function() {
      beforeEach(function() {
        scope.story = { url: "http://google.com", description: "Search on Google!", tags: "search, google" }
        scope.user  = { email: "oldpal@email.com", token: "my_token" };

        $httpBackend.expectPOST(BackendUrl + '/api/v1/stories', { story: scope.story }).respond(201);
        ctrl.submit();
        $httpBackend.flush();
      });

      it("renders success message", function() {
        expect(scope.alert.success).toBe("Obrigado por compartilhar este Bizu!")
      });

      it("resets story form", function() {
        expect(scope.story.url).toBe("");
        expect(scope.story.description).toBe("");
        expect(scope.story.tag_list).toBe("");
      });
    });

    describe("on error", function() {
      it("renders form error messages");
    });
  });

  describe("reset", function() {
    var pristineSpy, form;

    beforeEach(function() {
      scope.story = { url: "http://google.com", description: "Search on Google!", tags: "search, google" }
      ctrl = $controller('NewStoryController', {$scope: scope});

      form = { $setPristine: function() {} };
      pristineSpy = sinon.spy(form, "$setPristine");
      ctrl.reset(form);
    });

    it("resets form", function() {
      expect(scope.story.description).toBe("");
      expect(scope.story.tag_list).toBe("");
      expect(scope.story.url).toBe("");
    });

    it("sets form to pristine", function() {
      expect(pristineSpy.called).toBe(true);
    });
  });
});

describe("NewStoryController", function(){
  var scope, BackendUrl, pristineSpy;

  beforeEach(angular.mock.module("bizusafoApp"));

  beforeEach(inject(function(_$controller_, _$httpBackend_, _$rootScope_, _BackendUrl_) {
    $controller   = _$controller_;
    $httpBackend  = _$httpBackend_;
    scope =         _$rootScope_;
    BackendUrl    = _BackendUrl_;

    scope.storyForm = { $setPristine: function() {} };
    pristineSpy = sinon.spy(scope.storyForm, "$setPristine");

    chrome.tabs.custom.removeAll();
  }));

  describe("on load", function() {
    beforeEach(function() {
      chrome.tabs.create({ id: 1, url: "http://google.com", active: true, currentWindow: true });

      $controller('NewStoryController', {$scope: scope});
    });

    it("resets story form", function() {
      expect(scope.story.description).toBe("");
      expect(scope.story.tags).toBe("");
      expect(scope.story.comment_text).toBe("");
      expect(pristineSpy.called).toBe(true);
    });

    it("sets url as current tab url", function() {
      expect(scope.story.url).toBe("http://google.com");
    });
  });

  describe("on submit", function() {
    beforeEach(function() {
      $controller('NewStoryController', {$scope: scope});
    });

    describe("on click", function() {
      beforeEach(function() {
        scope.submit();
      });

      it("shows spinner", function() {
        expect(scope.submitting).toBe(true);
      });
    });

    describe("on success", function() {
      beforeEach(function() {
        scope.story   = { url: "http://google.com", description: "Search on Google!",
                          tags: "search, google", comment_text: "New comment" };;
        scope.user    = { email: "oldpal@email.com", token: "my_token" };

        $httpBackend.expectPOST(BackendUrl + '/api/v1/stories', { story: scope.story }).respond(201);

        scope.submit();
        $httpBackend.flush();
      });

      it("renders success message", function() {
        expect(scope.alert.success).toBe("Obrigado por compartilhar este Bizu!")
      });

      it("resets story form", function() {
        expect(scope.story.description).toBe("");
        expect(scope.story.tags).toBe("");
        expect(scope.story.comment_text).toBe("");
        expect(scope.story.url).toBe("");
        expect(pristineSpy.called).toBe(true);
      });

      it("hides spinner", function() {
        expect(scope.submitting).toBe(false);
      });
    });

    describe("on error", function() {
      describe("of any code", function() {
        beforeEach(function() {
          $httpBackend.expectPOST(BackendUrl + '/api/v1/stories', { story: scope.story }).respond(500, "");
          scope.submit();
          $httpBackend.flush();
        });

        it("displays alert error", function() {
          expect(scope.alert.error).toBe("Erro desconhecido. Por favor mantenha contato :(");
        });

        it("hides spinner", function() {
          expect(scope.submitting).toBe(false);
        });
      });

      describe("unprocessed entity 422", function() {
        beforeEach(function() {
          $httpBackend.expectPOST(BackendUrl + '/api/v1/stories', { story: scope.story }).respond(422, "");
          scope.submit();
          $httpBackend.flush();
        });

        it("displays alert error", function() {
          expect(scope.alert.error).toBe("Bizu incompleto ou inválido");
        });
      });
    });
  });

  describe("reset", function() {
    beforeEach(function() {
      $controller('NewStoryController', {$scope: scope});
      scope.reset();
    });

    it("resets form", function() {
      expect(scope.story.description).toBe("");
      expect(scope.story.tags).toBe("");
      expect(scope.story.comment_text).toBe("");
      expect(scope.story.url).toBe("");
      expect(pristineSpy.called).toBe(true);
    });
  });
});

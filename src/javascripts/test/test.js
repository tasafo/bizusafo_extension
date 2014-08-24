describe('TestCtrl', function(){

  beforeEach(angular.mock.module('bizusafoApp'));

  it('runs', inject(function($controller) {
    var scope = {},
        ctrl = $controller('TestCtrl', {$scope:scope});

    expect(1).toBe(1);
  }));

});
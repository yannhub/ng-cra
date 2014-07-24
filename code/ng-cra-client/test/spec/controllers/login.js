'use strict';

describe('Controller: LoginCtrl', function () {

  // load the controller's module
  beforeEach(module('ngCraClientApp'));

  var LoginCtrl,
    scope,
    $httpBackend,
    $location;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, Users, _$httpBackend_) {
    scope = $rootScope.$new();

    $httpBackend = _$httpBackend_;
    $location = {
      path: jasmine.createSpy('path')
    };

    scope.user = new Users();

    LoginCtrl = $controller('LoginCtrl', {
      $scope: scope,
      $location: $location
    });
  }));

  it('should try to auth user', function () {
    spyOn(scope.user, '$login').andCallThrough();
    scope.username = 'foo';
    scope.password = 'bar';
    $httpBackend.expectPOST('/api/auth/login')
      .respond({uid: 1, username: 'hadrien'});

    scope.submit();

    expect(scope.user.$login).toHaveBeenCalledWith('foo', 'bar');

    $httpBackend.flush();

    expect($location.path).toHaveBeenCalledWith('/');
  });
});

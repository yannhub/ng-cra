'use strict';

describe('Controller: LogoutCtrl', function () {

  // load the controller's module
  beforeEach(module('ngCraClientApp'));

  var LogoutCtrl,
    scope,
    $httpBackend,
    $location;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, Users, _$httpBackend_) {
    scope = $rootScope.$new();
    $httpBackend = _$httpBackend_;
    scope.user = new Users({
      uid: 1
    });
    spyOn(scope.user, '$logout').andCallThrough();
    $location = {
      path: jasmine.createSpy('path')
    };
    LogoutCtrl = $controller('LogoutCtrl', {
      $scope: scope,
      $location: $location
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    $httpBackend.expectGET('/api/auth/logout')
      .respond(false);
    expect(scope.user.$logout).toHaveBeenCalled();
    $httpBackend.flush();
    expect($location.path).toHaveBeenCalledWith('/login');
  });
});

'use strict';

describe('Directive: appHeader', function () {

  // load the directive's module
  beforeEach(module('ngCraClientApp'));
  beforeEach(module('views/app-header.html'));

  var element,
    scope,
    Users;

  beforeEach(inject(function ($rootScope, _Users_) {
    scope = $rootScope.$new();
    Users = _Users_;
  }));

  it('should tell hello to connected user', inject(function ($compile) {
    element = angular.element('<app-header></app-header>');
    element = $compile(element)(scope);
    
    scope.user = new Users();
    scope.$digest();

    expect(element.text()).not.toContain('FooBar');
    expect(element[0].querySelector('a[href="/logout"]')).toBeDefined();

    scope.user.uid = 1;
    scope.user.firstname = 'FooBar';
    scope.$digest();

    expect(element.text()).toContain('FooBar');
    expect(element[0].querySelector('a[href="/logout"]')).toBeDefined();
  }));
});

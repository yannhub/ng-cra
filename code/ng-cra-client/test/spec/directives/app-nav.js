'use strict';

describe('Directive: AppNavDirectiveCtrl', function () {

  // load the directive's module
  beforeEach(module('ngCraClientApp'));

  var AppNavDirectiveCtrl,
    scope,
    $location;

  beforeEach(inject(function ($controller, $rootScope, _$location_) {
    scope = $rootScope.$new();
    $location = _$location_;
    AppNavDirectiveCtrl = $controller('AppNavDirectiveCtrl', {
      $scope: scope,
      $location: $location
    });
  }));

  it('should switch tabs', function () {

    spyOn($location, 'url').andCallThrough();

    $location.path('/');
    scope.$broadcast('$routeChangeSuccess');
    scope.$apply();

    expect($location.url).toHaveBeenCalled();
    expect(scope.selected).toBe(0);

    $location.path('/calendar');
    scope.$broadcast('$routeChangeSuccess');
    scope.$apply();

    expect($location.url).toHaveBeenCalled();
    expect(scope.selected).toBe(1);

    $location.path('/settings');
    scope.$broadcast('$routeChangeSuccess');
    scope.$apply();

    expect($location.url).toHaveBeenCalled();
    expect(scope.selected).toBe(2);

    $location.path('/login');
    scope.$broadcast('$routeChangeSuccess');
    scope.$apply();

    expect($location.url).toHaveBeenCalled();
    expect(scope.selected).toBe(null);
  });
});

describe('Directive: appNav', function () {

  // load the directive's module
  beforeEach(module('ngCraClientApp'));
  beforeEach(module('views/app-nav.html'));

  var element,
    scope,
    $location;

  beforeEach(inject(function ($rootScope, _$location_) {
    scope = $rootScope.$new();
    $location = _$location_;
  }));

  it('should be hidden to non authed users', inject(function($compile) {
    element = angular.element('<app-nav></app-nav>');
    element = $compile(element)(scope);
    scope.$digest();

    expect(element.find('nav').length).toBe(0);
  }));

  it('should switch tabs', inject(function ($compile) {
    element = angular.element('<app-nav></app-nav>');
    element = $compile(element)(scope);

    scope.user = {uid: 1};

    scope.selected = null;
    scope.$digest();
    expect(element.find('li')[0].className).not.toContain('active');
    expect(element.find('li')[1].className).not.toContain('active');
    expect(element.find('li')[2].className).not.toContain('active');

    scope.selected = 0;
    scope.$digest();
    expect(element.find('li')[0].className).toContain('active');
    expect(element.find('li')[1].className).not.toContain('active');
    expect(element.find('li')[2].className).not.toContain('active');

    scope.selected = 1;
    scope.$digest();
    expect(element.find('li')[0].className).not.toContain('active');
    expect(element.find('li')[1].className).toContain('active');
    expect(element.find('li')[2].className).not.toContain('active');

    scope.selected = 2;
    scope.$digest();
    expect(element.find('li')[0].className).not.toContain('active');
    expect(element.find('li')[1].className).not.toContain('active');
    expect(element.find('li')[2].className).toContain('active');
  }));
});

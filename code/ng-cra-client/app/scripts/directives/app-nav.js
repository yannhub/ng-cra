'use strict';

angular.module('ngCraClientApp')
  .controller('AppNavDirectiveCtrl', function($scope, $location) {
    $scope.$on('$routeChangeSuccess', function() {
      var current = $location.url();
      if ('/' === current) {
        $scope.selected = 0;
      } else
      if ('/calendar' === current) {
        $scope.selected = 1;
      } else
      if ('/settings' === current) {
        $scope.selected = 2;
      } else {
        $scope.selected = null;
      }
    });
  })
  .directive('appNav', function () {
    return {
      templateUrl: 'views/app-nav.html',
      restrict: 'E',
      controller: 'AppNavDirectiveCtrl'
    };
  });

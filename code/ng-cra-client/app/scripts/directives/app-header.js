'use strict';

angular.module('ngCraClientApp')
  .directive('appHeader', function () {
    return {
      templateUrl: 'views/app-header.html',
      restrict: 'E'
    };
  });

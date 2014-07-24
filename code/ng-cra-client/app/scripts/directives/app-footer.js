'use strict';

angular.module('ngCraClientApp')
  .directive('appFooter', function () {
    return {
      template: '<div></div>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        element.text('this is the appFooter directive');
      }
    };
  });

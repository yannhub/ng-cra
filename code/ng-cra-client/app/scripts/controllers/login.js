'use strict';

angular.module('ngCraClientApp')
  .controller('LoginCtrl', function ($scope, $location) {

    $scope.submit = function() {
      $scope.user.$login(
          $scope.username,
          $scope.password
        )
        .$promise
        .then(function() {
          $location.path('/');
        });
    };
  });

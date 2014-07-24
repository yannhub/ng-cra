'use strict';

angular.module('ngCraClientApp')
  .controller('LogoutCtrl', function ($scope, $location) {
    $scope.user.$logout()
      .$promise
      .then(function() {
        $location.path('/login');
      });
  });

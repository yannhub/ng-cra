'use strict';

angular.module('ngCraClientApp')
  .controller('MainCtrl', function ($scope, Users) {
    $scope.user = Users.get();
  });

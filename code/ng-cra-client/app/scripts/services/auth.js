'use strict';

angular.module('ngCraClientApp')
  .factory('Auth', function Auth($q, $location) {
    return {
      // optional method
      responseError: function(rejection) {

        var status = rejection.status;

        if (status === 401) {
          $location.path('/login');
        }
        return $q.reject(rejection);
      }
    };
  })
  .config(function ($httpProvider) {
    $httpProvider.interceptors.push('Auth');
  });

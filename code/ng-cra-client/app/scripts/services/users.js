'use strict';

angular.module('ngCraClientApp')
  .factory('Users', function Users($http, $q) {
    function Users(config) {
      this.uid = null;
      this.username = '';
      this.firstname = '';
      this.lastname = '';
      _.extend(this, config);
    }

    Users.get = function() {
      var deferred = $q.defer(),
        ret = new Users();

      $http({
        method: 'get',
        url: '/api/auth/test'
      })
      .success(function(data) {
        _.extend(ret, data);
      })
      .error(function(err) {
        console.error(err);
      });

      ret.$promise = deferred.promise;

      return ret;
    };

    Users.prototype.$login = function(username, password) {
      var deferred = $q.defer(),
        self = this;

      $http({
        method: 'post',
        url: '/api/auth/login',
        data: {
          username: username,
          password: password
        }
      })
      .success(function(data) {
        deferred.resolve(_.extend(self, data));
      })
      .error(function(err) {
        deferred.reject(err);
      });

      this.$promise = deferred.promise;

      return this;
    };

    Users.prototype.$logout = function() {
      var deferred = $q.defer(),
        self = this;

      $http({
        method: 'get',
        url: '/api/auth/logout'
      })
      .success(function() {
        _.extend(self, new Users());
        deferred.resolve(self);
      })
      .error(function(err) {
        deferred.reject(err);
      });

      this.$promise = deferred.promise;

      return this;
    };

    return Users;
  });

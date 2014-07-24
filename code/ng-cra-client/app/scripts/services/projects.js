'use strict';

angular.module('ngCraClientApp')
  .provider('Projects', function ProjectsProvider() {
    this.$get = function($http, $q) {
      function Projects(config) {
        this.pid = null;
        this.cid = null;
        this.name = '';
        this.client = {};
        Object.defineProperties(this, {
          displayname: {
            get: function () {
              return this.name + '/' + this.client.name;
            }
          }
        });
        this.$populate(config);
      }
      Projects.prototype.$populate = function(config) {
        var self = this;
        _.each(config, function(v, k) {
          self[k] = v;
        });
      };

      Projects.get = function() {
        var deferred = $q.defer(),
          ret = [];
        ret.$promise = deferred.promise;

        $http({
            method: 'get',
            url: '/api/projects'
          })
          .success(function(data) {
            _.each(data, function(d) {
              ret.push(new Projects(d));
            });

            deferred.resolve(ret);
          })
          .catch(function(err) {
            deferred.reject(err);
          });

        return ret;
      };

      return Projects;
    };

    this.loadProjects = function(Projects) {
      return Projects.get().$promise;
    };
  });

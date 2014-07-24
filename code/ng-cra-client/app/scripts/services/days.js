'use strict';

angular.module('ngCraClientApp')
  .provider('Days', function() {

    this.$get = function($http, $q, dateFilter) {
      function Days(config) {
        var $date;

        this.morning = null;
        this.afternoon = null;
        
        Object.defineProperties(this, {
          date: {
            enumerable: true,
            get: function() {
              return $date;
            },
            set: function(v) {
              if (!(v instanceof Date)) {
                if (v.match(/^[0-9]+$/)) {
                  v = +v;
                }
                v = new Date(v);
              }
              $date = v;
            }
          }
        });
        this.$populate(config);
      }
      Days.prototype.$populate = function(config) {
        var self = this;
        _.each(config, function(v, k) {
          self[k] = v;
        });
      };
      Days.prototype.$save = function() {
        var deferred = $q.defer(),
          self = this;

        $http({
            method: 'post',
            url: '/api/days/'+dateFilter(this.date, 'yyyy-MM-dd'),
            data: this
          })
          .success(function() {
            deferred.resolve(self);
          })
          .catch(function(err) {
            deferred.reject(err);
          });

        self.$promise = deferred.promise;

        return self;
      };

      Days.get = function(config) {
        var deferred = $q.defer(),
          ret = [],
          url = '/api/days';

        config = config || {};

        if (config.month) {
          url += '/'+config.month.getFullYear()+'-'+config.month.getMonth();
        }
        
        $http({
            method: 'get',
            url: url
          })
          .success(function(data) {
            _.each(data, function(v) {
              ret.push(new Days(v));
            });
            deferred.resolve(ret);
          })
          .catch(function(err) {
            deferred.reject(err);
          });

        ret.$promise = deferred.promise;

        return ret;
      };
      return Days;
    };

    this.loadCurrentMonth = ['$q', 'Days', function($q, Days) {
      return Days.get().$promise;
    }];
  });

'use strict';

angular.module('ngCraClientApp')
  .value('now', new Date())
  .controller('TodayCtrl', function ($scope, Days, now, days, projects) {
    var A_DAY = 1000 * 60 * 60 * 24;

    $scope.projects = projects;

    $scope.getDay = function(date) {
      var day = _.find(days, function(d) {
        return  d.date.getFullYear() === date.getFullYear() &&
                d.date.getMonth() === date.getMonth() &&
                d.date.getDate() === date.getDate();
      });
      if (!day) {
        day = new Days({
          date: new Date(date)
        });
      }

      return day;
    };

    $scope.getLastProject = function() {
      var project;
      
      _.some(angular.copy(days).reverse(), function(d) {
        if (d.afternoon) {
          project = d.afternoon;
          return true;
        }
        if (d.morning) {
          project = d.morning;
          return true;
        }
      });

      return _.findWhere($scope.projects, {pid: project});
    };

    $scope.setDay = function(date) {
      $scope.day = $scope.getDay(date);
      $scope.morning = _.findWhere($scope.projects, {pid: $scope.day.morning});
      $scope.afternoon = _.findWhere($scope.projects, {pid: $scope.day.afternoon});

      if ($scope.day.morning && $scope.day.afternoon) {
        $scope.step = 7;
      } else
      if ($scope.getLastProject()) {
        $scope.step = 1;
      } else {
        $scope.step = 2;
      }
    };

    $scope.setDay(now);

    $scope.step1 = function() {
      if ($scope.morning) {
        $scope.day.morning = $scope.morning.pid;
        $scope.afternoon = $scope.morning;
        $scope.day.afternoon = $scope.afternoon.pid;
        $scope.step = 3;
      }
    };

    $scope.step2 = function(v) {
      if (v) {
        $scope.morning = $scope.getLastProject();
        $scope.afternoon = $scope.morning;
        $scope.day.morning = $scope.morning.pid;
        $scope.day.afternoon = $scope.day.morning;
        $scope.step = 3;
      } else {
        $scope.step = 2;
      }
    };

    $scope.step3 = function(v) {
      if (v) {
        $scope.afternoon = $scope.morning;
        $scope.step4();
      } else {
        $scope.step = 4;
      }
    };

    $scope.step4 = function() {

      if ($scope.morning && $scope.afternoon) {

        $scope.day.morning = $scope.morning.pid;
        $scope.day.afternoon = $scope.afternoon.pid;

        // Save day
        $scope.day
          .$save()
          .$promise
          .then(function() {
            // Look for a previous day to complete
            $scope.previousday = $scope.getDay(
              new Date(+$scope.day.date - A_DAY)
            );
            if ($scope.previousday.date.getMonth() !==
                  $scope.day.date.getMonth()) {
              $scope.step = 6;
              return;
            }

            if ($scope.previousday.morning &&
                $scope.previousday.afternoon) {
              $scope.step = 6;
              return;
            }

            $scope.step = 5;
          })
          .catch(function(err) {
            // TODO : display err
          });
      }
    };
    $scope.step5 = function(v) {
      if (v) {
        $scope.setDay($scope.previousday.date);
        delete $scope.previousday;
      } else {
        $scope.step = 6;
      }
    };
    
  });

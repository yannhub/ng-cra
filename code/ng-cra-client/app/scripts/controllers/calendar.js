'use strict';

angular.module('ngCraClientApp')
  .controller('CalendarCtrl', function ($scope, projects, days) {
    $scope.uiConfig = {
      calendar: {
        header: {
          left: '',
          center: 'prev, title, next',
          right: ''
        },
        dayClick: function (date, allday, jsEvent, view) {
//          debugger;
        }
      }
    };

    $scope.activities = [];

    _.each(days, function(day) {
      var d = day.date.getDate();
      var m = day.date.getMonth();
      var y = day.date.getFullYear();

      var morningProject = _.findWhere(projects, {pid: day.morning});
      if (!morningProject) {
        return;
      }

      if(day.morning === day.afternoon) {
        $scope.activities.push({
          title: morningProject.displayname,
          start: new Date(y, m, d)
        });
      } else {
        $scope.activities.push({
          title: morningProject.displayname,
          start: new Date(y, m, d),
          end: new Date(y, m, d, 12, 0),
          allDay: false
        });
        var afternoonProject = _.findWhere(projects, {pid: day.afternoon});
        if (afternoonProject) {
          $scope.activities.push({
            title: afternoonProject.displayname,
            start: new Date(y, m, d, 12, 0),
            end: new Date(y, m, d, 24, 0),
            allDay: false
          });
        }
      }
    });

    $scope.eventSources = [$scope.activities];
  });

'use strict';

angular.module('ngCraClientApp')
  .value('now', new Date())
  .filter('relativeDate', function(now, dateFilter) {
      return function(date) {
        var calculateDelta, day, delta, hour, minute, month, week, year;
        if (!(date instanceof Date)) {
          date = new Date(date);
        }
        delta = null;
        minute = 60;
        hour = minute * 60;
        day = hour * 24;
        week = day * 7;
        month = day * 30;
        year = day * 365;
        calculateDelta = function() {
          delta = Math.round((now - date) / 1000);
          return delta;
        };
        calculateDelta();
        if (delta > day && delta < week) {
          date = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0);
          calculateDelta();
        }
        switch (true) {
          case (delta < day):
            return 'aujourd\'hui';
          case (delta < day * 2):
            return 'hier';
          case (delta < day * 3):
            return 'avant-hier';
          case (delta < week):
            return 'il y a ' + (Math.floor(delta / day)) + ' jours';
          default:
            return dateFilter(date, 'le dd/MM/yyyy');
        }
      };
    }
  );
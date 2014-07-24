'use strict';

describe('Controller: TodayCtrl', function () {

  var now = new Date('2014-05-07');

  // load the controller's module
  beforeEach(module('ngCraClientApp'));
  beforeEach(module(function($provide) {
    $provide.value('now', now);
  }));

  var TodayCtrl,
    scope,
    days,
    projects;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, Days, Projects) {
    scope = $rootScope.$new();

    days = [new Days({
      date: new Date('2014-05-01'),
      morning: '1',
      afternoon: '2'
    }), new Days({
      date: new Date('2014-05-02'),
      morning: '1',
      afternoon: '2'
    }), new Days({
      date: new Date('2014-05-03'),
      morning: '1',
      afternoon: '1'
    }), new Days({
      date: new Date('2014-05-04'),
      morning: '2',
      afternoon: '2'
    }), new Days({
      date: new Date('2014-05-05'),
      morning: '1',
      afternoon: '2'
    })];

    projects = [new Projects({
      'cid': '1',
      'client': {
        'name': 'DocDoku'
      },
      'name': 'plm',
      'pid': '1'
    }),
    new Projects({
      'cid': '1',
      'client': {
        'name': 'DocDoku'
      },
      'name': 'ng-cra',
      'pid': '2'
    }),
    new Projects({
      'cid': '2',
      'client': {
        'name': 'Orange'
      },
      'name': 'Prout',
      'pid': '6'
    })];


    TodayCtrl = $controller('TodayCtrl', {
      $scope: scope,
      days: days,
      projects: projects
    });
  }));

  it('should get a day', function () {
    var day = scope.getDay(new Date('2014-05-01'));
    expect(day.date).toEqual(new Date('2014-05-01'));
    expect(day.morning).toBe('1');
    expect(day.afternoon).toBe('2');

    day = scope.getDay(new Date('2014-05-03'));
    expect(day.date).toEqual(new Date('2014-05-03'));
    expect(day.morning).toBe('1');
    expect(day.afternoon).toBe('1');

    day = scope.getDay(new Date('2014-05-20'));
    expect(day.date).toEqual(new Date('2014-05-20'));
    expect(day.morning).toBe(null);
    expect(day.afternoon).toBe(null);
  });

  it('should get last project', function() {
    expect(scope.getLastProject().name).toBe('ng-cra');
  });

  it('should follow steps 1', function() {
    expect(scope.step).toBe(1);
    scope.morning = projects[0];
    scope.step1();
    expect(scope.day.morning).toBe('1');
    expect(scope.day.afternoon).toBe('1');
    expect(scope.step).toBe(3);
  });
});

'use strict';

xdescribe('Service: Days', function () {

  // load the service's module
  beforeEach(module('ngCraClientApp'));

  // instantiate service
  var Days,
    $httpBackend;

  beforeEach(inject(function (_Days_, _$httpBackend_) {
    Days = _Days_;
    $httpBackend = _$httpBackend_;
  }));

  it('should cast to date', function () {
    var day = new Days({
      date: '2014-01-02'
    });
    expect(day.date).toEqual(new Date('2014-01-02'));

    day.date = '1388620800000';

    expect(day.date).toEqual(new Date('2014-01-02'));
  });

  it('should load a range of days', function() {
    $httpBackend.expectGET('/api/days')
      .respond([{
        date: '2014-01-01',
        morning: 'ng-cra',
        afternoot: 'ng-cra'
      }, {
        date: '2014-01-02',
        morning: 'ng-cra',
        afternoot: 'ng-cra'
      }, {
        date: '2014-01-03',
        morning: 'plm',
        afternoot: 'plm'
      }, {
        date: '2014-01-04',
        morning: 'plm',
        afternoot: 'ng-cra'
      }, {
        date: '2014-01-05',
        morning: 'ng-cra',
        afternoot: 'ng-cra'
      }]);

    var days = Days.get({
      from: '2014-01-01',
      to: '2014-01-05'
    });

    $httpBackend.flush();

    expect(days.length).toBe(5);
  });
});

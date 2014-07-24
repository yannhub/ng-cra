'use strict';

describe('Filter: relativeDate', function () {

  // load the filter's module
  beforeEach(module('ngCraClientApp'));

  beforeEach(module(function($provide) {
    $provide.value('now', new Date('2014-05-01'));
  }));

  // initialize a new instance of the filter before each test
  var relativeDate;
  beforeEach(inject(function ($filter) {
    relativeDate = $filter('relativeDate');
  }));

  it('should return a relative date"', function () {
    var date = new Date('2014-05-01');
    expect(relativeDate(date)).toBe('aujourd\'hui');

    date = new Date('2014-04-30');
    expect(relativeDate(date)).toBe('hier');

    date = new Date('2014-04-29');
    expect(relativeDate(date)).toBe('avant-hier');

    date = new Date('2014-04-28');
    expect(relativeDate(date)).toBe('il y a 3 jours');

    date = new Date('2014-04-27');
    expect(relativeDate(date)).toBe('il y a 4 jours');

    date = new Date('2014-04-20');
    expect(relativeDate(date)).toBe('le 20/04/2014');
  });

});

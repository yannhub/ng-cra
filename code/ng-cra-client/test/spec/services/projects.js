'use strict';

describe('Service: Projects', function () {

  // load the service's module
  beforeEach(module('ngCraClientApp'));

  // instantiate service
  var Projects,
    $httpBackend;

  beforeEach(inject(function (_Projects_, _$httpBackend_) {
    Projects = _Projects_;
    $httpBackend = _$httpBackend_;
  }));

  it('should load projects', function () {
    $httpBackend.expectGET('/api/projects')
      .respond([{
        'cid': '1',
        'client': {
          'name': 'DocDoku'
        },
        'name': 'RTT',
        'pid': '1'
      },
      {
        'cid': '1',
        'client': {
          'name': 'DocDoku'
        },
        'name': 'Cong\u00e9 sans solde',
        'pid': '2'
      },
      {
        'cid': '1',
        'client': {
          'name': 'DocDoku'
        },
        'name': 'Cong\u00e9 conventionn\u00e9',
        'pid': '3'
      }]);

    var projects = Projects.get();

    $httpBackend.flush();

    expect(projects.length).toBe(3);
  });

});

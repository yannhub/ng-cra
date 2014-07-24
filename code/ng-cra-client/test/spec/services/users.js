'use strict';

describe('Service: Users', function () {

  // load the service's module
  beforeEach(module('ngCraClientApp'));

  // instantiate service
  var Users,
    $httpBackend;

  beforeEach(inject(function (_Users_, _$httpBackend_) {
    Users = _Users_;
    $httpBackend = _$httpBackend_;
  }));

  it('should get currently authentied user', function () {
    $httpBackend.expectGET('/api/auth/test')
      .respond({uid: 1, username: 'hadrien'});

    var user = Users.get();

    $httpBackend.flush();

    expect(user.uid).toBe(1);
    expect(user.username).toBe('hadrien');
  });

  it('should login', function () {
    $httpBackend.expectPOST('/api/auth/login')
      .respond({uid: 1, username: 'hadrien'});

    var user = new Users();

    user.$login('hadrien', '123456');

    $httpBackend.flush();

    expect(user.uid).toBe(1);
    expect(user.username).toBe('hadrien');
  });

  it('should logout', function () {
    $httpBackend.expectGET('/api/auth/logout')
      .respond(false);

    var user = new Users({
      uid: 1,
      username: 'hadrien'
    });

    user.$logout();

    $httpBackend.flush();

    expect(user.uid).toBe(null);
    expect(user.username).toBe('');
  });

});

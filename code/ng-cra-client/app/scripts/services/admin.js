'use strict';

angular.module('ngCraClientApp')
  .run(function ($http) {
    window.ngCraAdmin = {
      addUser: function(username, password, firstname, lastname) {
        var errormsg = 'admin.addUser(\'maurice\', \'123456\', \'Maurice\', \'Moss\')';
        if (!username) {
          return console.error('username is mandatory : ' + errormsg);
        }
        if (!password) {
          return console.error('password is mandatory : ' + errormsg);
        }

        $http({
          method: 'post',
          url: '/api/users',
          data: {
            username: username,
            password: password,
            firstname: firstname,
            lastname: lastname
          }
        })
        .success(function(data) {
          console.log('New user '+data.username+' created!');
        })
        .error(function(err) {
          console.error(err);
        });

        return 'Wait for it…';
      },
      addProject: function(name, client) {
        var errormsg = 'admin.addProject(\''+name+'\', \''+client+'\')';
        if (!name) {
          return console.error('name is mandatory : ' + errormsg);
        }
        if (!client) {
          return console.error('client is mandatory : ' + errormsg);
        }

        $http({
          method: 'post',
          url: '/api/projects',
          data: {
            name: name,
            client: client
          }
        })
        .success(function(data) {
          console.log(data);
          console.log('New project '+data.name+' created!');
        })
        .error(function(err) {
          console.error(err);
        });

        return 'Wait for it…';
      }
    };
  });

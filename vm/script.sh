#!/bin/bash

# Install packages
apt-get install -y python-software-properties python g++ make
add-apt-repository -y ppa:chris-lea/node.js
apt-get update
apt-get install -y git tig git-gui nodejs redis-server nginx screen phantomjs

# Install node package
npm config set registry http://registry.npmjs.org/
npm install -g redis-commander jasmine-node express yo generator-angular

# Set nginx config
cp /vagrant/resources/nginx-ng-cra /etc/nginx/sites-enabled/ng-cra
service nginx reload

# Set screenrc
cp /vagrant/resources/screenrc /home/vagrant/.screenrc
chown vagrant /home/vagrant/.screenrc

'use strict';

goog.require('cgAdmin.HomeController');

/**
 * @ngInject
 */
var configFunc = function ($routeProvider) {
  $routeProvider.when('/',
    {
      templateUrl: 'views/home.html',
      controller: 'HomeController'
    });
  $routeProvider.otherwise({redirectTo: '/'});
};

angular.module('copygrinderHome', ['ngResource', 'ngRoute'])
  .controller('HomeController', cgAdmin.HomeController)
  .config(configFunc);
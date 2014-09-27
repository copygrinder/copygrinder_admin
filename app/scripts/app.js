'use strict';

goog.provide('cgAdmin.homeModule');

/**
 * @param {!angular.$routeProvider} $routeProvider
 * @ngInject
 */
var configFunc = function ($routeProvider) {
  $routeProvider.when('/',
    {
      templateUrl: 'views/home.html',
      controller: 'HomeController as controller'
    });
  $routeProvider.otherwise({redirectTo: '/'});
};

/**
 * @param {!angular.$provide} $provide
 * @ngInject
 */
var errorConfig = function ($provide) {
  $provide.decorator('$exceptionHandler', ['$delegate', function ($delegate) {
    return function (exception, cause) {
      throw exception;
    };
  }]);
};

cgAdmin.homeModule = angular.module('copygrinderHome', ['ngResource', 'ngRoute'])
  .config(configFunc)
  .config(errorConfig);
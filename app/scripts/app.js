'use strict';

goog.provide('cgAdmin.homeModule');

/**
 * @param {!angular.$locationProvider} $locationProvider
 * @ngInject
 */
var locationFunc = function ($locationProvider) {
  $locationProvider.html5Mode(true);
};

/**
 * @param {!angular.$routeProvider} $routeProvider
 * @ngInject
 */
var routeFunc = function ($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/home'});
};

/**
 * This error handler throws errors to the browsers native to ensure sourcemapping gets applied to stacktraces.
 *
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
  .config(locationFunc)
  .config(routeFunc)
  .config(errorConfig);
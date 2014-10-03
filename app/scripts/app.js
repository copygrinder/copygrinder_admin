'use strict';

goog.provide('cgAdmin.homeModule');

/**
 * @param {!angular.$routeProvider} $routeProvider
 * @ngInject
 */
var configFunc = function ($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/'});
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
  .config(configFunc)
  .config(errorConfig);
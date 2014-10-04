'use strict';

goog.provide('cgAdmin.homeModule');

cgAdmin.homeModule = angular.module('copygrinderHome', [
  'ngResource',
  'ngRoute',
  'mm.foundation.accordion',
  'template/accordion/accordion-group.html',
  'template/accordion/accordion.html'
]);

/**
 * @param {!angular.$locationProvider} $locationProvider
 * @ngInject
 */
cgAdmin.homeModule.locationFunc = function ($locationProvider) {
  $locationProvider.html5Mode(true);
};

/**
 * @param {!angular.$routeProvider} $routeProvider
 * @ngInject
 */
cgAdmin.homeModule.routeFunc = function ($routeProvider) {
  $routeProvider.otherwise({templateUrl: 'views/404.html'});
};

/**
 * This error handler throws errors to the browsers native to ensure sourcemapping gets applied to stacktraces.
 *
 * @param {!angular.$provide} $provide
 * @ngInject
 */
cgAdmin.homeModule.errorConfig = function ($provide) {
  $provide.decorator('$exceptionHandler', ['$delegate', function ($delegate) {
    return function (exception, cause) {
      throw exception;
    };
  }]);
};


cgAdmin.homeModule
  .config(cgAdmin.homeModule.locationFunc)
  .config(cgAdmin.homeModule.routeFunc)
  .config(cgAdmin.homeModule.errorConfig);
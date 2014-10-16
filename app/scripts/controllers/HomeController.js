'use strict';

goog.require('cgAdmin.homeModule');

goog.provide('cgAdmin.HomeController');

/**
 * @constructor
 * @export
 */
cgAdmin.HomeController = function () {
};

/**
 * @export
 */
cgAdmin.HomeController.prototype.singletons = [
  'About Page', 'FAQ Page', 'Home Page'
];

/**
 * @export
 */
cgAdmin.HomeController.prototype.types = [{'name':'Blog Posts', 'content': ['Version Nightmares']}];

/**
 * @param {!angular.$routeProvider} $routeProvider
 * @ngInject
 */
cgAdmin.HomeController.route = function ($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: 'views/home.html',
    controller: cgAdmin.HomeController,
    controllerAs: 'ctrl'
  });
};

cgAdmin.homeModule.config(cgAdmin.HomeController.route);

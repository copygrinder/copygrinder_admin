'use strict';

goog.provide('cgAdmin.homeModule');

goog.require('cgAdmin.CommunicationException');

goog.require('cgAdmin.NotFoundException');


cgAdmin.homeModule = angular.module('copygrinderHome', [
  'angular-data.DSCacheFactory',
  'ngResource',
  'ui.router',
  'angularFileUpload',
  'mm.foundation.accordion',
  'mm.foundation.dropdownToggle',
  'template/accordion/accordion-group.html',
  'template/accordion/accordion.html'
]);

/**
 * @param {!angular.$locationProvider} $locationProvider
 * @ngInject
 */
cgAdmin.homeModule.locationFunc = function($locationProvider) {
  $locationProvider.html5Mode(true);
};

cgAdmin.homeModule.config(cgAdmin.homeModule.locationFunc);

/**
 * @ngInject
 */
cgAdmin.homeModule.go = function($rootScope) {
  $rootScope.rootUrl = 'http://127.0.0.1:19836/integrationtest';
};

cgAdmin.homeModule.run(cgAdmin.homeModule.go);

/**
 * @expose
 */
cgAdmin.homeModule.prototype.$rootScope.rootUrl;

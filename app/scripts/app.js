'use strict';

goog.provide('cgAdmin.homeModule');

goog.require('cgAdmin.CommunicationException');

goog.require('cgAdmin.NotFoundException');


cgAdmin.homeModule = angular.module('copygrinderHome', [
  'angular-data.DSCacheFactory',
  'ngResource',
  'ui.router',
  'angularFileUpload',
  'ngCkeditor',
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
  $rootScope.rootUrl = document.getElementById('baseMetaTag').getAttribute('data-copygrinder-url');
};

cgAdmin.homeModule.run(cgAdmin.homeModule.go);

/**
 * @expose
 */
cgAdmin.homeModule.$rootScope;

/**
 * @expose
 */
cgAdmin.homeModule.$rootScope.rootUrl;

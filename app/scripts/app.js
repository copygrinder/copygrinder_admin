'use strict';

goog.provide('cgAdmin.homeModule');

goog.require('cgAdmin.CommunicationException');

goog.require('cgAdmin.NotFoundException');


cgAdmin.homeModule = angular.module('copygrinderHome', [
  'ngResource',
  'ui.router',
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

cgAdmin.homeModule.config(cgAdmin.homeModule.locationFunc);

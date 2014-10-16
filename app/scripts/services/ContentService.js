'use strict';

goog.require('cgAdmin.homeModule');

goog.provide('cgAdmin.ContentService');

/**
 * @param {!angular.$http} $http The Angular http service.
 * @constructor
 * @ngInject
 */
cgAdmin.ContentService = function ($http) {

  this.http_ = $http;

};

/**
 * @param {*} content
 */
cgAdmin.ContentService.prototype.saveContent = function (content) {
  this.http_.post('http://127.0.0.1:19836/copybeans/', content);
};

cgAdmin.homeModule.service('contentService', cgAdmin.ContentService);
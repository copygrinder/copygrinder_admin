'use strict';

goog.require('cgAdmin.homeModule');

goog.provide('cgAdmin.ContentService');

/**
 * @param {!angular.$http} $http The Angular http service.
 * @constructor
 * @ngInject
 */
cgAdmin.ContentService = function ($http) {

  this.getTypes = function(params, success) {
    $http.get('http://127.0.0.1:19836/integrationtest/copybeans/types?' + params).success(success);
  };

  this.getBeans = function(params, success) {
    $http.get('http://127.0.0.1:19836/integrationtest/copybeans?' + params).success(success);
  };

  this.getBean = function(id, success) {
    $http.get('http://127.0.0.1:19836/integrationtest/copybeans/' + id).success(success);
  };

  this.editBean = function(id, beanJson, success) {
  };

};

cgAdmin.homeModule.service('contentService', cgAdmin.ContentService);
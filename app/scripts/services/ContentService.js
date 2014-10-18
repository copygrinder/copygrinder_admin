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

};

cgAdmin.homeModule.service('contentService', cgAdmin.ContentService);
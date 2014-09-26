'use strict';

goog.provide('cgAdmin.ContentService');

/**
 * @ngInject
 */
cgAdmin.ContentService = function ($http) {
  return {
    saveContent: function (content) {
      $http.post('http://127.0.0.1:19836/copybeans/', content);
    }
  };
};
'use strict';

goog.require('cgAdmin.ContentService');

goog.provide('cgAdmin.HomeController');

/**
 * @ngInject
 */
cgAdmin.HomeController = function ($scope) {

  /**
   * @expose
   */
  $scope.saveContent = function () {
    var content = JSON.parse($scope.content);
    cgAdmin.ContentService.saveContent(content);
  };

};
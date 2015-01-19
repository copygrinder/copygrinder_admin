'use strict';

goog.provide('cgAdmin.NavController');

/**
 * @constructor
 * @param {!cgAdmin.ContentService} contentService
 * @param {!angular.Scope} $scope
 * @return {cgAdmin.NavController}
 */
cgAdmin.NavController = function (contentService, $scope) {
  contentService.getMetaBean(function (beans) {
    $scope.siloName = beans[0].content.siloName;
  });
};

/**
 * @expose
 */
cgAdmin.NavController.prototype.$scope.siloName;

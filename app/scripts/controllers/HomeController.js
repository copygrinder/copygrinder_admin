'use strict';

goog.require('cgAdmin.homeModule');

goog.provide('cgAdmin.HomeController');

/**
 * @constructor
 * @export
 * @ngInject
 * @param {!cgAdmin.ContentService} contentService
 * @param {!angular.Scope} $scope
 * @return {cgAdmin.HomeController}
 */
cgAdmin.HomeController = function (contentService, $scope) {
  this.$scope = $scope;

  contentService.getBeans('enforcedTypeIds=copygrinderAdminMetatype&fields=content', function (beans) {
    $scope.siloName = beans[0].content.siloName;
  });
  contentService.getTypes('fields=id,displayName,cardinality', function (typeData) {
    $scope.typeObjs = typeData;
  });
};

/**
 * @expose
 */
cgAdmin.HomeController.prototype.$scope.typeObjs;

/**
 * @expose
 */
cgAdmin.HomeController.prototype.$scope.siloName;

/**
 * @ngInject
 */
cgAdmin.HomeController.route = function ($stateProvider) {
  $stateProvider.state('home', {
    url: '/',
    templateUrl: 'views/home.html',
    controller: cgAdmin.HomeController
  });
};

cgAdmin.homeModule.config(cgAdmin.HomeController.route);

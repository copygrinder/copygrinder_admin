'use strict';

goog.require('cgAdmin.homeModule');

goog.provide('cgAdmin.TypeController');

goog.inherits(cgAdmin.TypeController, cgAdmin.NavController);

/**
 * @constructor
 * @extends {cgAdmin.NavController}
 * @export
 * @ngInject
 * @param {!cgAdmin.ContentService} contentService
 * @param {!angular.Scope} $scope
 * @param {!angular.$location} $location
 * @param {!angular.$q} $q
 * @return {cgAdmin.TypeController}
 */
cgAdmin.TypeController = function (contentService, $scope, $stateParams, $location, $q) {
  this.$scope = $scope;
  this.$stateParams = $stateParams;
  this.contentService = contentService;
  var typeId = $stateParams['typeId'];

  cgAdmin.NavController.call(this, contentService, $scope);

  contentService.getType(typeId, function (typeData) {
    $scope.type = typeData;
    contentService.getBeansByType(typeId, function (beans) {
      $scope.beans = beans;
      if (beans && beans.length === 1 && typeData['cardinality'] === 'One') {
        $location.path('/bean/' + beans[0].id).replace();
      }
      $scope['showPage'] = true;
    });
  });

};

/**
 * @expose
 */
cgAdmin.HomeController.prototype.$scope.type;

/**
 * @expose
 */
cgAdmin.HomeController.prototype.$scope.beans;

/**
 * @ngInject
 */
cgAdmin.TypeController.route = function ($stateProvider) {
  $stateProvider.state('type', {
    url: '/type/:typeId',
    templateUrl: 'views/type-beans.html',
    controller: cgAdmin.TypeController,
    controllerAs: 'ctrl'
  });
};

cgAdmin.homeModule.config(cgAdmin.TypeController.route);

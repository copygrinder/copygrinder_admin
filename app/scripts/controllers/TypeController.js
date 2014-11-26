'use strict';

goog.require('cgAdmin.homeModule');

goog.provide('cgAdmin.TypeController');

/**
 * @constructor
 * @export
 * @ngInject
 * @param {!cgAdmin.ContentService} contentService
 * @param {!angular.Scope} $scope
 * @param {!angular.$routeParams} $routeParams
 * @param {!angular.$location} $location
 * @return {cgAdmin.TypeController}
 */
cgAdmin.TypeController = function (contentService, $scope, $routeParams, $location) {
  this.$scope = $scope;
  this.$routeParams = $routeParams;
  this.contentService = contentService;
  var typeId = $routeParams['typeId'];
  contentService.getType(typeId, function (typeData) {
    $scope.type = typeData;
    contentService.getBeans('enforcedTypeIds=' + typeId, function (beans) {
      if (beans.length === 1 && typeData['cardinality'] === 'One') {
        $location.path('/bean/' + beans[0].id).replace();
      } else {
        $scope.beans = beans;
      }
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
 * @param {!angular.$routeProvider} $routeProvider
 */
cgAdmin.TypeController.route = function ($routeProvider) {
  $routeProvider.when('/type/:typeId', {
    templateUrl: 'views/type-beans.html',
    controller: cgAdmin.TypeController,
    controllerAs: 'ctrl'
  });
};

cgAdmin.homeModule.config(cgAdmin.TypeController.route);

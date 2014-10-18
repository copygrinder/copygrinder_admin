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
  contentService.getTypes('cardinality=One', function (data) {
    $scope.singleTypes = data;
  });
  contentService.getTypes('cardinality=Many', function (typeData) {
    $scope.manyTypes = typeData;
    angular.forEach(typeData, function (type) {
      contentService.getBeans('enforcedTypeIds=' + type.id, function (beans) {
        type.beans = beans;
      });

    });
  });
};

/**
 * @expose
 */
cgAdmin.HomeController.prototype.$scope.singleTypes;

/**
 * @expose
 */
cgAdmin.HomeController.prototype.$scope.manyTypes;

/**
 * @expose
 */
cgAdmin.HomeController.prototype.$scope.manyTypes.beans;

/**
 * @param {!angular.$routeProvider} $routeProvider
 * @ngInject
 */
cgAdmin.HomeController.route = function ($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: 'views/home.html',
    controller: cgAdmin.HomeController,
    controllerAs: 'ctrl'
  });
};

cgAdmin.homeModule.config(cgAdmin.HomeController.route);

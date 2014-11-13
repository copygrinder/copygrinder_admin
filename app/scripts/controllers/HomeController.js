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
  contentService.getBeans('enforcedTypeIds=copygrinderAdminMetatype', function (beans) {
    $scope.siloName = beans[0].contains.siloName;
  });
  contentService.getTypes('cardinality=Many', function (typeData) {
    $scope.manyTypes = typeData;
    angular.forEach(typeData, function (type) {
      contentService.getBeans('enforcedTypeIds=' + type.id, function (beans) {
        angular.forEach(beans, function (bean) {
          bean.name = bean.names[Object.keys(bean.names)[0]];
        });
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
 * @expose
 */
cgAdmin.HomeController.prototype.$scope.manyTypes.beans.name;

/**
 * @expose
 */
cgAdmin.HomeController.prototype.$scope.siloName;

/**
 * @param {!angular.$routeProvider} $routeProvider
 * @ngInject
 */
cgAdmin.HomeController.route = function ($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: 'views/home.html',
    controller: cgAdmin.HomeController
  });
};

cgAdmin.homeModule.config(cgAdmin.HomeController.route);

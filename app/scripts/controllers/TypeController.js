'use strict';

goog.require('cgAdmin.homeModule');

goog.provide('cgAdmin.TypeController');

/**
 * @constructor
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

  function promise(deferredFunc) {
    var deferred = $q.defer();
    try {
      deferredFunc(deferred);
    } catch (exception) {
      deferred.reject(exception);
    }

    return deferred.promise;
  }

  var getTypePromise = promise(function (deferred) {
    contentService.getType(typeId, function (typeData) {
      $scope.type = typeData;
      deferred.resolve(typeData);
    });
  });

  var getBeansPromise = promise(function (deferred) {
    contentService.getBeans('enforcedTypeIds=' + typeId, function (beans) {
      $scope.beans = beans;
      deferred.resolve(beans);
    });
  });

  $q.all([getTypePromise, getBeansPromise]).then(function (result) {
    var typeData = result[0];
    var beans = result[1];

    if (beans.length === 1 && typeData['cardinality'] === 'One') {
      $location.path('/bean/' + beans[0].id).replace();
    }
  }, function (reason) {
    console.log(reason);
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

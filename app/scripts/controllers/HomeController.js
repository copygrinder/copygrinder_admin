'use strict';

goog.require('cgAdmin.homeModule');

goog.provide('cgAdmin.HomeController');

goog.inherits(cgAdmin.HomeController, cgAdmin.NavController);

/**
 * @constructor
 * @extends {cgAdmin.NavController}
 * @export
 * @ngInject
 * @param {!cgAdmin.ContentService} contentService
 * @param {!angular.Scope} $scope
 * @return {cgAdmin.HomeController}
 */
cgAdmin.HomeController = function (contentService, $scope) {
  this.$scope = $scope;

  cgAdmin.NavController.call(this, contentService, $scope);

  contentService.getTypesSummary(function (typeData) {
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

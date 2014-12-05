'use strict';

goog.require('cgAdmin.homeModule');

goog.provide('cgAdmin.TypeEditorController');

/**
 * @constructor
 * @export
 * @ngInject
 * @param {!cgAdmin.ContentService} contentService
 * @param {!angular.Scope} $scope
 * @param {!angular.$location} $location
 * @return {cgAdmin.TypeEditorController}
 */
cgAdmin.TypeEditorController = function(contentService, $scope, $stateParams, $location, $timeout) {
  this.$scope = $scope;
  this.$stateParams = $stateParams;
  this.$location = $location;
  this.contentService = contentService;
  this.$timeout = $timeout;

  this.fetchType();
};

cgAdmin.TypeEditorController.prototype.fetchType = function() {
  var _this = this;
  var typeId = this.$stateParams['typeId'];
  this.contentService.getType(typeId, function(type) {
    _this.$scope.type = type;
  });
};

/**
 * @expose
 */
cgAdmin.TypeEditorController.prototype.saveType = function() {
  var _this = this;
  this.contentService.saveType(this.$scope.type, function() {
    _this.$location.path('/');
  });
};

/**
 * @ngInject
 */
cgAdmin.TypeEditorController.route = function($stateProvider) {
  $stateProvider.state('typeEditor', {
    url: '/type/:typeId/edit',
    templateUrl: 'views/type-editor.html',
    controller: cgAdmin.TypeEditorController,
    controllerAs: 'ctrl'
  });
};

cgAdmin.homeModule.config(cgAdmin.TypeEditorController.route);

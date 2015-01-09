'use strict';

goog.require('cgAdmin.homeModule');

goog.provide('cgAdmin.TypeEditorController');

goog.inherits(cgAdmin.TypeEditorController, cgAdmin.TypeControllerSupport);

/**
 * @extends {cgAdmin.TypeControllerSupport}
 * @constructor
 * @export
 * @ngInject
 * @param {!cgAdmin.ContentService} contentService
 * @param {!angular.Scope} $scope
 * @param {!angular.$location} $location
 * @return {cgAdmin.TypeEditorController}
 */
cgAdmin.TypeEditorController = function(contentService, $scope, $stateParams, $location, $timeout) {

  cgAdmin.TypeControllerSupport.call(this, contentService, $scope, $stateParams, $location, $timeout);

  $scope['showDeleteButton'] = true;

  $scope['expandedFields'] = {};

  this.fetchType();
  this.fetchValidators();
};

cgAdmin.TypeEditorController.prototype.fetchType = function() {
  var _this = this;
  var typeId = this.$stateParams['typeId'];
  this.contentService.getType(typeId, function(type) {
    _this.$scope.type = type;
  });
};

cgAdmin.TypeEditorController.prototype.fetchValidators = function() {
  var _this = this;
  this.contentService.getAllValidators(function(validators) {
    _this.$scope.validators = validators;
  });
};

/**
 * @expose
 */
cgAdmin.TypeEditorController.prototype.saveType = function() {
  var _this = this;

  var type = angular.copy(this.$scope.type);
  angular.forEach(type.fields, function(field) {
    delete field.expanded;
  });

  this.contentService.editType(type, function() {
    _this.$location.path('/');
  });
};

/**
 * @expose
 */
cgAdmin.TypeEditorController.prototype.deleteType = function() {
  var _this = this;
  this.contentService.deleteType(this.$scope.type, function() {
    _this.$location.path('/');
  });
};

/**
 * @expose
 */
cgAdmin.TypeEditorController.prototype.expandField = function(field) {
  field.expanded = true;
  setTimeout(function () {
    document.getElementById('id-field-' + field.id).focus();
  }, 50);
};

/**
 * @expose
 */
cgAdmin.TypeEditorController.prototype.collapseField = function(field) {
  field.expanded = false;
  setTimeout(function () {
    document.getElementById('expand-' + field.id).focus();
  }, 50);
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

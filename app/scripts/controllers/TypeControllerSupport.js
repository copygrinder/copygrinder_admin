'use strict';

goog.provide('cgAdmin.TypeControllerSupport');

/**
 * @constructor
 * @export
 * @param {!cgAdmin.ContentService} contentService
 * @param {!angular.Scope} $scope
 * @param {!angular.$location} $location
 * @return {cgAdmin.TypeEditorController}
 */
cgAdmin.TypeControllerSupport = function(contentService, $scope, $stateParams, $location, $timeout) {
  this.$scope = $scope;
  this.$stateParams = $stateParams;
  this.$location = $location;
  this.contentService = contentService;
  this.$timeout = $timeout;
};

/**
 * @expose
 */
cgAdmin.TypeControllerSupport.prototype.addField = function() {
  if (!this.$scope.type.fields) {
    this.$scope.type.fields = [];
  }
  this.$scope.type.fields.push({});
};

/**
 * @expose
 */
cgAdmin.TypeControllerSupport.prototype.deleteField = function(index) {
  this.$scope.type.fields.splice(index, 1);
};

/**
 * @expose
 */
cgAdmin.TypeControllerSupport.prototype.$scope.type.fields;

/**
 * @expose
 */
cgAdmin.TypeControllerSupport.prototype.$scope.type.fields.expanded;

/**
 * @expose
 */
cgAdmin.TypeControllerSupport.prototype.$scope.validators;
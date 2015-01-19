'use strict';

goog.provide('cgAdmin.TypeControllerSupport');

goog.inherits(cgAdmin.TypeControllerSupport, cgAdmin.NavController);

/**
 * @constructor
 * @extends {cgAdmin.NavController}
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

  cgAdmin.NavController.call(this, contentService, $scope);

  this.fetchValidators();
  this.fetchRefTypes();
};

cgAdmin.TypeControllerSupport.prototype.fetchValidators = function() {
  var _this = this;
  this.contentService.getAllValidators(function(validators) {
    var validatorMap = {};
    angular.forEach(validators, function(validator) {
      var namespacedValId = validator.id;
      var valId = namespacedValId.replace('validator.', '');
      validatorMap[valId] = validator;
    });
    _this.$scope.validatorMap = validatorMap;
  });
};

cgAdmin.TypeControllerSupport.prototype.fetchRefTypes = function() {
  var _this = this;
  this.contentService.getReferenceTypes(function(refTypes) {
    _this.$scope.refTypes = refTypes;
  });
};

/**
 * @expose
 */
cgAdmin.TypeControllerSupport.prototype.addField = function() {
  if (!this.$scope.type.fields) {
    this.$scope.type.fields = [];
  }
  this.$scope.type.fields.push({'expanded': true});
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
cgAdmin.TypeControllerSupport.prototype.expandField = function(field) {
  field.expanded = true;
  setTimeout(function() {
    document.getElementById('id-field-' + field.id).focus();
  }, 50);
};

/**
 * @expose
 */
cgAdmin.TypeControllerSupport.prototype.collapseField = function(field) {
  field.expanded = false;
  setTimeout(function() {
    document.getElementById('expand-' + field.id).focus();
  }, 50);
};

/**
 * @expose
 */
cgAdmin.TypeControllerSupport.prototype.addValidator = function(validator, field) {
  var namespacedValId = validator.id;
  var valId = namespacedValId.replace('validator.', '');

  if (!field.validators) {
    field.validators = [];
  }

  field.validators.push({'type': valId});
};

/**
 * @expose
 */
cgAdmin.TypeControllerSupport.prototype.removeValidator = function(validator, field) {
  var index = field.validators.indexOf(validator);
  field.validators.splice(index, 1);
};

/**
 * @expose
 */
cgAdmin.TypeControllerSupport.prototype.getAvailableValidators = function(validatorMap, field) {
  var output = [];
  angular.forEach(validatorMap, function(validator) {
    var found = false;
    angular.forEach(field.validators, function(fieldValidator) {
      if ('validator.' + fieldValidator.type === validator.id) {
        found = true;
      }
    });
    if (!found) {
      output.push(validator);
    }
  });
  field.noValidators = output.length === 0;
  return output;
};

/**
 * @expose
 */
cgAdmin.TypeControllerSupport.prototype.fieldTypeChange = function(field) {
  if (field.type === 'Reference') {
    if (!field.attributes) {
      field.attributes = {};
    }

    if (!field.attributes['refs']) {
      field.attributes['refs'] = [
        {'refValidationTypes': [], 'refDisplayType': ''}
      ];
    }
  }
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
cgAdmin.TypeControllerSupport.prototype.$scope.type.fields.noValidators;

/**
 * @expose
 */
cgAdmin.TypeControllerSupport.prototype.$scope.type.validators;

/**
 * @expose
 */
cgAdmin.TypeControllerSupport.prototype.$scope.type.validators.args;

/**
 * @expose
 */
cgAdmin.TypeControllerSupport.prototype.$scope.validatorMap;

/**
 * @expose
 */
cgAdmin.TypeControllerSupport.prototype.$scope.refTypes;

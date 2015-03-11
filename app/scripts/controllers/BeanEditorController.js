'use strict';

goog.require('cgAdmin.homeModule');

goog.provide('cgAdmin.BeanEditorController');

goog.inherits(cgAdmin.BeanEditorController, cgAdmin.BeanControllerSupport);

/**
 * @extends {cgAdmin.BeanControllerSupport}
 * @constructor
 * @export
 * @ngInject
 * @param {!cgAdmin.ContentService} contentService
 * @param {!angular.Scope} $scope
 * @param {!angular.$location} $location
 * @return {cgAdmin.BeanEditorController}
 */
cgAdmin.BeanEditorController = function(contentService, $scope, $stateParams, $location, $timeout, $rootScope) {

  cgAdmin.BeanControllerSupport.call(this, contentService, $scope, $stateParams, $location, $timeout, $rootScope);

  $scope['showDeleteButton'] = true;

  this.fetchBean();
};

cgAdmin.BeanEditorController.prototype.fetchBean = function() {
  var beanId = this.$stateParams.beanid;
  var _this = this;
  this.contentService.getBean(beanId, function(bean) {
    _this.$scope.bean = bean;
    _this.contentService.getTypesByIds(bean.enforcedTypeIds, function(types) {
      _this.$scope.types = types;
      _this.fetchRefs(types);
      var typeDefinedFields = [];
      angular.forEach(types, function(type) {
        angular.forEach(type['fields'], function(field) {
          typeDefinedFields.push(field['id']);
        });
      });
      if (!typeDefinedFields || typeDefinedFields.length < 1) {
        _this.$scope['hasFields'] = false;
      }
      var untypedFields = Object.keys(bean['content']).filter(function(field) {
        return typeDefinedFields.indexOf(field) === -1;
      });
      untypedFields = untypedFields.map(function(field) {
        return {'id': field};
      });
      _this.$scope.untypedFields = untypedFields;
    });
    this.watchLabelFields(bean, _this.$scope);
  });
};

/**
 * @expose
 */
cgAdmin.BeanEditorController.prototype.saveBean = function() {
  var _this = this;
  this.contentService.editBean(this.$scope.bean, function() {
    _this.$location.path('/');
  });
};

/**
 * @expose
 */
cgAdmin.BeanEditorController.prototype.deleteBean = function() {
  var _this = this;
  this.contentService.deleteBean(this.$scope.bean, function() {
    _this.$location.path('/');
  });
};

cgAdmin.homeModule.config(cgAdmin.BeanEditorController.route);

/**
 * @ngInject
 */
cgAdmin.BeanEditorController.route = function($stateProvider) {
  $stateProvider.state('beanEditor', {
    url: '/bean/:beanid',
    templateUrl: 'views/bean-editor.html',
    controller: cgAdmin.BeanEditorController,
    controllerAs: 'ctrl'
  });
};

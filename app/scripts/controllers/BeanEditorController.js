'use strict';

goog.require('cgAdmin.homeModule');

goog.provide('cgAdmin.BeanEditorController');

/**
 * @constructor
 * @export
 * @ngInject
 * @param {!cgAdmin.ContentService} contentService
 * @param {!angular.Scope} $scope
 * @param {!angular.$location} $location
 * @return {cgAdmin.BeanEditorController}
 */
cgAdmin.BeanEditorController = function (contentService, $scope, $stateParams, $location) {
  this.$scope = $scope;
  this.$stateParams = $stateParams;
  this.$location = $location;
  this.contentService = contentService;
  var beanId = $stateParams.beanid;
  contentService.getBean(beanId, function (bean) {
    $scope.bean = bean;
    var decoratedTypeIds = bean.enforcedTypeIds.map(function (typeId) {
      return 'id=' + typeId;
    });
    var params = decoratedTypeIds.join('&or&');
    contentService.getTypes(params, function (types) {
      $scope.types = types;
      var typeDefinedFields = [];
      angular.forEach(types, function (type) {
        angular.forEach(type['fields'], function (field) {
          typeDefinedFields.push(field['id']);
        });
      });
      var anonFields = Object.keys(bean['content']).filter(function(field) {
        return typeDefinedFields.indexOf(field) === -1;
      });
      $scope.anonymousFields = anonFields;
    });
  });
};

/**
 * @expose
 */
cgAdmin.BeanEditorController.prototype.saveBean = function () {
  var _this = this;
  this.contentService.editBean(this.$scope.bean, function () {
    _this.$location.path('/');
  });
};

/**
 * @expose
 */
cgAdmin.BeanEditorController.prototype.$scope.bean;

/**
 * @expose
 */
cgAdmin.BeanEditorController.prototype.$scope.bean.enforcedTypeIds;

/**
 * @expose
 */
cgAdmin.BeanEditorController.prototype.$scope.beanid;

/**
 * @expose
 */
cgAdmin.BeanEditorController.prototype.$scope.types;

/**
 * @expose
 */
cgAdmin.BeanEditorController.prototype.$scope.anonymousFields;

cgAdmin.homeModule.config(cgAdmin.BeanEditorController.route);

/**
 * @ngInject
 */
cgAdmin.BeanEditorController.route = function ($stateProvider) {
  $stateProvider.state('beanEditor', {
    url: '/bean/:beanid',
    templateUrl: 'views/bean-editor.html',
    controller: cgAdmin.BeanEditorController,
    controllerAs: 'ctrl'
  });
};

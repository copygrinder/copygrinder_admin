'use strict';

goog.require('cgAdmin.homeModule');

goog.provide('cgAdmin.BeanEditorController');

/**
 * @constructor
 * @export
 * @ngInject
 * @param {!cgAdmin.ContentService} contentService
 * @param {!angular.Scope} $scope
 * @param {!angular.$routeParams} $routeParams
 * @param {!angular.$location} $location
 * @return {cgAdmin.BeanEditorController}
 */
cgAdmin.BeanEditorController = function (contentService, $scope, $routeParams, $location) {
  this.$scope = $scope;
  this.$routeParams = $routeParams;
  this.$location = $location;
  this.contentService = contentService;
  var beanId = $routeParams.beanid;
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
 * @ngInject
 * @param {!angular.$routeProvider} $routeProvider
 */
cgAdmin.BeanEditorController.route = function ($routeProvider) {
  $routeProvider.when('/bean/:beanid', {
    templateUrl: 'views/bean-editor.html',
    controller: cgAdmin.BeanEditorController,
    controllerAs: 'ctrl'
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

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
 * @return {cgAdmin.BeanEditorController}
 */
cgAdmin.BeanEditorController = function (contentService, $scope, $routeParams) {
  this.$scope = $scope;
  this.$routeParams = $routeParams;
  var beanId = $routeParams.beanid;
  contentService.getBean(beanId, function (bean) {
    $scope.bean = bean;
    var decoratedTypeIds = bean.enforcedTypeIds.map(function(typeId) {
      return 'id=' + typeId;
    });
    var params = decoratedTypeIds.join('&or&');
    contentService.getTypes(params, function (types) {
      $scope.types = types;
    });
  });
};

/**
 * @ngInject
 * @param {!angular.$routeProvider} $routeProvider
 */
cgAdmin.BeanEditorController.route = function ($routeProvider) {
  $routeProvider.when('/bean/:beanid', {
    templateUrl: 'views/bean-editor.html',
    controller: cgAdmin.BeanEditorController
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

cgAdmin.homeModule.config(cgAdmin.BeanEditorController.route);

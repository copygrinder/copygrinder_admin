'use strict';

goog.require('cgAdmin.homeModule');

goog.provide('cgAdmin.NewBeanController');

goog.inherits(cgAdmin.NewBeanController, cgAdmin.BeanControllerSupport);

/**
 * @extends {cgAdmin.BeanControllerSupport}
 * @constructor
 * @export
 * @ngInject
 * @param {!cgAdmin.ContentService} contentService
 * @param {!angular.Scope} $scope
 * @param {!angular.$location} $location
 * @return {cgAdmin.NewBeanController}
 */
cgAdmin.NewBeanController = function(contentService, $scope, $stateParams, $location, $timeout) {

  cgAdmin.BeanControllerSupport.call(this, contentService, $scope, $stateParams, $location, $timeout);

  var typeId = $stateParams['typeId'];

  this.fetchType(typeId);

  this.buildBean(typeId);

};

cgAdmin.NewBeanController.prototype.fetchType = function(typeId) {
  var _this = this;
  this.contentService.getType(typeId, function(beanType) {
    _this.$scope.types = [beanType];
  });
};

cgAdmin.NewBeanController.prototype.buildBean = function(typeId) {
  this.$scope.untypedFields = [];
  var bean = {'enforcedTypeIds': [typeId], content: {}};
  this.$scope.bean = bean;
};

/**
 * @expose
 */
cgAdmin.NewBeanController.prototype.saveBean = function() {
  var _this = this;
  this.contentService.saveBean(this.$scope.bean, function() {
    _this.$location.path('/');
  });
};


/**
 * @ngInject
 */
cgAdmin.NewBeanController.route = function($stateProvider) {
  $stateProvider.state('newBean', {
    url: '/type/:typeId/new',
    templateUrl: 'views/bean-editor.html',
    controller: cgAdmin.NewBeanController,
    controllerAs: 'ctrl'
  });
};

cgAdmin.homeModule.config(cgAdmin.NewBeanController.route);




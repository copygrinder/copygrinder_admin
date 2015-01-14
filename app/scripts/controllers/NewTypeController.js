'use strict';

goog.require('cgAdmin.homeModule');

goog.provide('cgAdmin.NewTypeController');

goog.inherits(cgAdmin.NewTypeController, cgAdmin.TypeControllerSupport);

/**
 * @extends {cgAdmin.TypeControllerSupport}
 * @constructor
 * @export
 * @ngInject
 * @param {!cgAdmin.ContentService} contentService
 * @param {!angular.Scope} $scope
 * @param {!angular.$location} $location
 * @return {cgAdmin.NewTypeController}
 */
cgAdmin.NewTypeController = function(contentService, $scope, $stateParams, $location, $timeout) {

  cgAdmin.TypeControllerSupport.call(this, contentService, $scope, $stateParams, $location, $timeout);

  $scope.type = {};
};

/**
 * @expose
 */
cgAdmin.NewTypeController.prototype.saveType = function() {
  var _this = this;
  var type = angular.copy(this.$scope.type);
  angular.forEach(type.fields, function(field) {
    delete field.expanded;
    delete field.noValidators;
  });
  this.contentService.saveType(type, function() {
    _this.$location.path('/');
  });
};

/**
 * @ngInject
 */
cgAdmin.NewTypeController.route = function($stateProvider) {
  $stateProvider.state('newType', {
    url: '/type/new',
    templateUrl: 'views/type-editor.html',
    controller: cgAdmin.NewTypeController,
    controllerAs: 'ctrl'
  });
};

cgAdmin.homeModule.config(cgAdmin.NewTypeController.route);

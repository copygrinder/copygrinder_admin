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
cgAdmin.BeanEditorController = function(contentService, $scope, $stateParams, $location, $timeout) {
  this.$scope = $scope;
  this.$stateParams = $stateParams;
  this.$location = $location;
  this.contentService = contentService;
  this.$timeout = $timeout;
  this.fetchBean();
};

cgAdmin.BeanEditorController.prototype.fetchBean = function() {
  var beanId = this.$stateParams.beanid;
  var _this = this;
  this.contentService.getBean(beanId, function(bean) {
    _this.$scope.bean = bean;
    _this.contentService.getTypesByIds(bean.enforcedTypeIds, function(types) {
      _this.$scope.types = types;
      var typeDefinedFields = [];
      angular.forEach(types, function(type) {
        angular.forEach(type['fields'], function(field) {
          typeDefinedFields.push(field['id']);
        });
      });
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

cgAdmin.BeanEditorController.prototype.watchLabelFields = function(bean, $scope) {
  $scope.$watch('untypedFields', function(newVal, oldVal) {
    if (oldVal !== undefined && newVal !== undefined && oldVal.length === newVal.length) {
      for (var i = 0; i < newVal.length; i++) {
        var changeOldVal = oldVal[i]['id'];
        var changeNewVal = newVal[i]['id'];
        if (changeOldVal !== changeNewVal) {
          var value = bean.content[changeOldVal];

          if (value === undefined) {
            value = '';
          }

          delete bean.content[changeOldVal];
          bean.content[changeNewVal] = value;
          return;
        }
      }
    }
  }, true);
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
cgAdmin.BeanEditorController.prototype.deleteRow = function(index) {
  var field = this.$scope.untypedFields[index].id;
  delete this.$scope.bean.content[field];
  this.$scope.untypedFields.splice(index, 1);
};

/**
 * @expose
 */
cgAdmin.BeanEditorController.prototype.addRow = function() {
  var fields = this.$scope.untypedFields;
  var blankExists = false;

  angular.forEach(fields, function(field) {
    if (field.id === '') {
      blankExists = true;
    }
  });

  if (!blankExists) {
    fields.push({'id': ''});
    this.$timeout(function() {
      document.getElementById('label-field-').focus();
    });
  }
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
cgAdmin.BeanEditorController.prototype.$scope.untypedFields;

/**
 * @expose
 */
cgAdmin.BeanEditorController.prototype.$scope.calcType;

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

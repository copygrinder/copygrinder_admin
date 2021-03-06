'use strict';

goog.provide('cgAdmin.BeanControllerSupport');

goog.inherits(cgAdmin.BeanControllerSupport, cgAdmin.NavController);

/**
 * @constructor
 * @extends {cgAdmin.NavController}
 * @export
 * @param {!cgAdmin.ContentService} contentService
 * @param {!angular.Scope} $scope
 * @param {!angular.$location} $location
 * @return {cgAdmin.BeanControllerSupport}
 */
cgAdmin.BeanControllerSupport = function (contentService, $scope, $stateParams, $location, $timeout, $rootScope) {
  this.$scope = $scope;
  this.$stateParams = $stateParams;
  this.$location = $location;
  this.contentService = contentService;
  this.$timeout = $timeout;
  this.$rootScope = $rootScope;

  cgAdmin.NavController.call(this, contentService, $scope);

  $scope['hasFields'] = true;
};


cgAdmin.BeanControllerSupport.prototype.watchLabelFields = function (bean, $scope) {
  $scope.$watch('untypedFields', function (newVal, oldVal) {
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

cgAdmin.BeanControllerSupport.prototype.fetchRefs = function (types) {
  var refFieldsNested = types.map(function (type) {
    if (type.fields) {
      return type.fields.filter(function (field) {
        var isReferenceList = field.type === 'List' && field.attributes['listType'] === 'Reference';
        return field.type === 'Reference' || isReferenceList;
      });
    }
  });
  var refFields = this.flatten(refFieldsNested);
  if (refFields) {
    var displayTypes = refFields.map(function (refField) {
      if (refField.attributes) {
        return refField.attributes['refs'].map(function (ref) {
          return ref['refDisplayType'];
        });
      }
    });

    displayTypes = this.flatten(displayTypes);
    displayTypes = this.removeDuplicates(displayTypes);

    var _this = this;
    this.contentService.getBeansByTypes(displayTypes, function (beans) {
      if (!_this.$scope.refbeans) {
        _this.$scope.refbeans = {};
      }
      angular.forEach(beans, function (bean) {
        angular.forEach(bean['enforcedTypeIds'], function (typeId) {
          if (!_this.$scope.refbeans[typeId]) {
            _this.$scope.refbeans[typeId] = [];
          }
          _this.$scope.refbeans[typeId].push(bean);
        });
      });
    });
  }
};


cgAdmin.BeanControllerSupport.prototype.removeDuplicates = function (arr) {
  return arr.reduce(function (p, c) {
    if (p.indexOf(c) < 0) {
      p.push(c);
    }
    return p;
  }, []);
};

cgAdmin.BeanControllerSupport.prototype.flatten = function (arr) {
  var merged = [];
  merged = merged.concat.apply(merged, arr);
  if (merged) {
    merged = merged.filter(function (field) {
      if (field !== undefined) {
        return true;
      } else {
        return false;
      }
    });
  }
  return merged;
};

/**
 * @expose
 */
cgAdmin.BeanControllerSupport.prototype.deleteRow = function (index) {
  var field = this.$scope.untypedFields[index].id;
  delete this.$scope.bean.content[field];
  this.$scope.untypedFields.splice(index, 1);
};

/**
 * @expose
 */
cgAdmin.BeanControllerSupport.prototype.addRow = function () {
  var fields = this.$scope.untypedFields;
  var blankExists = false;

  angular.forEach(fields, function (field) {
    if (field.id === '') {
      blankExists = true;
    }
  });

  if (!blankExists) {
    fields.push({'id': ''});
    this.$timeout(function () {
      document.getElementById('label-field-').focus();
    });
  }
};

/**
 * @expose
 */
cgAdmin.BeanControllerSupport.prototype.$scope.bean;

/**
 * @expose
 */
cgAdmin.BeanControllerSupport.prototype.$scope.bean.enforcedTypeIds;

/**
 * @expose
 */
cgAdmin.BeanControllerSupport.prototype.$scope.beanid;

/**
 * @expose
 */
cgAdmin.BeanControllerSupport.prototype.$scope.types;

/**
 * @expose
 */
cgAdmin.BeanControllerSupport.prototype.$scope.untypedFields;

/**
 * @expose
 */
cgAdmin.BeanControllerSupport.prototype.$scope.calcType;

/**
 * @expose
 */
cgAdmin.BeanControllerSupport.prototype.$scope.refbeans;

/**
 * @expose
 */
cgAdmin.BeanControllerSupport.prototype.$scope.editorOptions;

'use strict';

goog.require('cgAdmin.homeModule');

goog.require('cgAdmin.CommunicationException');

goog.require('cgAdmin.NotFoundException');

goog.provide('cgAdmin.ContentService');

/**
 * @constructor
 * @ngInject
 */
cgAdmin.ContentService = function($http, $resource) {

  var root = 'http://127.0.0.1:19836/integrationtest';

  var CopybeanResource = $resource(root + '/copybeans/:id', null, {
    'update': {method: 'PUT'}
  });

  var CopybeanTypeResource = $resource(root + '/copybeans/types/:id', null, {
    'update': {method: 'PUT'}
  });

  var defaultErrorCallback = function(errorResponse) {
    console.log(errorResponse);
    if (!errorResponse.data && !errorResponse.status) {
      throw new cgAdmin.CommunicationException(errorResponse);
    }
    if (errorResponse.status === 404) {
      throw new cgAdmin.NotFoundException(errorResponse);
    }
    throw errorResponse.data;
  };

  function defaultErrorHandler(errorCallback) {
    if (errorCallback) {
      return errorCallback;
    } else {
      return defaultErrorCallback;
    }
  }

  this.getTypesSummary = function(successFunc, errorFunc) {
    CopybeanTypeResource.query({'fields': 'id,displayName,cardinality'}, successFunc, defaultErrorHandler(errorFunc));
  };

  this.getTypesByIds = function(ids, successFunc, errorFunc) {
    CopybeanTypeResource.query({'id~': ids}, successFunc, defaultErrorHandler(errorFunc));
  };

  this.getType = function(id, successFunc, errorFunc) {
    CopybeanTypeResource.get({'id': id}, successFunc, defaultErrorHandler(errorFunc));
  };

  this.getBeansByType = function(typeId, successFunc, errorFunc) {
    CopybeanResource.query({'enforcedTypeIds': typeId}, successFunc, defaultErrorHandler(errorFunc));
  };

  this.getMetaBean = function(successFunc, errorFunc) {
    CopybeanResource.query({
      'enforcedTypeIds': 'copygrinderAdminMetatype',
      'fields': 'content'
    }, successFunc, defaultErrorHandler(errorFunc));
  };

  this.getBean = function(id, successFunc, errorFunc) {
    CopybeanResource.get({'id': id}, successFunc, defaultErrorHandler(errorFunc));
  };

  this.editBean = function(bean, successFunc, errorFunc) {
    var newBean = angular.copy(bean);
    delete newBean.id;
    delete newBean.names;
    CopybeanResource.update({'id': bean.id}, newBean, successFunc, defaultErrorHandler(errorFunc));
  };

  this.saveBean = function(bean, successFunc, errorFunc) {
    CopybeanResource.save(bean, successFunc, defaultErrorHandler(errorFunc));
  };

  this.saveType = function(type, successFunc, errorFunc) {
    CopybeanTypeResource.update({'id': type.id}, type, successFunc, defaultErrorHandler(errorFunc));
  };

};

cgAdmin.homeModule.service('contentService', cgAdmin.ContentService);

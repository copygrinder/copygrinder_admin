'use strict';

goog.require('cgAdmin.homeModule');

goog.require('cgAdmin.CommunicationException');

goog.require('cgAdmin.CacheService');

goog.require('cgAdmin.NotFoundException');

goog.provide('cgAdmin.ContentService');

/**
 * @constructor
 * @ngInject
 */
cgAdmin.ContentService = function($http, $resource, $rootScope) {

  var root = $rootScope.rootUrl;

  var CopybeanResource = $resource(root + '/copybeans/:id', null, {
    'get': {method: 'GET', cache: true},
    'update': {method: 'PUT'},
    'query': {method: 'GET', cache: true, isArray: true}
  });

  var CopybeanTypeResource = $resource(root + '/copybeans/types/:id', null, {
    'get': {method: 'GET', cache: true},
    'query': {method: 'GET', cache: true, isArray: true},
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
    CopybeanTypeResource.query({
      'fields': 'id,displayName,cardinality',
      'tags!': 'PREDEFINED'
    }, successFunc, defaultErrorHandler(errorFunc));
  };

  this.getTypesByIds = function(ids, successFunc, errorFunc) {
    CopybeanTypeResource.query({'id~': ids}, successFunc, defaultErrorHandler(errorFunc));
  };

  this.getType = function(id, successFunc, errorFunc) {
    CopybeanTypeResource.get({'id': id}, successFunc);
  };

  this.getBeansByType = function(typeId, successFunc, errorFunc) {
    CopybeanResource.query({'enforcedTypeIds': typeId}, successFunc, defaultErrorHandler(errorFunc));
  };

  /**
   * @param {function()=} errorFunc
   */
  this.getBeansByTypes = function(typeIds, successFunc, errorFunc) {
    CopybeanResource.query({'enforcedTypeIds~': typeIds}, successFunc, defaultErrorHandler(errorFunc));
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

  this.editType = function(type, successFunc, errorFunc) {
    CopybeanTypeResource.update({'id': type.id}, type, successFunc, defaultErrorHandler(errorFunc));
  };

  this.saveType = function(type, successFunc, errorFunc) {
    CopybeanTypeResource.save(type, successFunc, defaultErrorHandler(errorFunc));
  };

  this.deleteBean = function(bean, successFunc, errorFunc) {
    CopybeanResource.remove({'id': bean.id}, successFunc, defaultErrorHandler(errorFunc));
  };

  this.deleteType = function(type, successFunc, errorFunc) {
    CopybeanTypeResource.remove({'id': type.id}, successFunc, defaultErrorHandler(errorFunc));
  };

  this.getAllValidators = function(successFunc, errorFunc) {
    CopybeanResource.query({'enforcedTypeIds': 'classBackedFieldValidator'}, successFunc, defaultErrorHandler(errorFunc));
  };

  this.getReferenceTypes = function(successFunc, errorFunc) {
    CopybeanTypeResource.query({
      'fields': 'id,displayName',
      'tags!': 'PREDEFINED'
    }, successFunc, defaultErrorHandler(errorFunc));
  };

};

cgAdmin.homeModule.service('contentService', cgAdmin.ContentService);

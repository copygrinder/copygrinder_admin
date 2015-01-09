'use strict';

goog.require('cgAdmin.homeModule');

goog.provide('cgAdmin.CacheService');


/**
 * @ngInject
 */
cgAdmin.CacheService.go = function($http, DSCacheFactory) {

  var cacheFactory = DSCacheFactory;
  var cache = cacheFactory('httpCache', {
    'capacity': 100,
    'maxAge': 10,
    'deleteOnExpire': 'passive'
  });

  $http.defaults.cache = cache;
  cgAdmin.CacheService.cache = cache;
};

/**
 * @expose
 */
cgAdmin.CacheService.cache;

/**
 * @expose
 */
cgAdmin.CacheService.cache.info;

cgAdmin.homeModule.run(
  cgAdmin.CacheService.go
);

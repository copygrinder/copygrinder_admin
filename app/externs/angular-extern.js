'use strict';

/**
 * @typedef {{
   *   query: function(string, Function, Function):!angular.$http.HttpPromise
   * }}
 */
angular.$resource;

/**
 * @expose
 * @param {!string} url
 * @param {!Function} successFunc
 * @param {!Function} errorFunc
 * @return {!angular.$http.HttpPromise}
 */
angular.$resource.query = function(url, successFunc, errorFunc) {
};

/**
 * @expose
 * @param {!Object} obj
 * @param {!Function} successFunc
 * @param {!Function} errorFunc
 * @return {!angular.$http.HttpPromise}
 */
angular.$resource.get = function(obj, successFunc, errorFunc) {
};

/**
 * @expose
 * @param {!Object} obj
 * @param {!Function} successFunc
 * @param {!Function} errorFunc
 * @return {!angular.$http.HttpPromise}
 */
angular.$resource.save = function(obj, successFunc, errorFunc) {
};
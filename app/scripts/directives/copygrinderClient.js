'use strict';

goog.require('cgAdmin.homeModule');

goog.provide('cgAdmin.ClientDirective');

/**
 * @constructor
 */
cgAdmin.ClientDirective = function ($http) {

  this._http = $http;

  this.link = this.link.bind(this);

};

/**
 * @param {angular.$http} $http The Angular http service.
 * @ngInject
 */
cgAdmin.ClientDirective.factory = function ($http) {
  var dir = new cgAdmin.ClientDirective($http);
  return {
    restrict: 'A',
    scope: false,
    link: dir.link
  };
};

/**
 * @param {!angular.Scope} scope
 * @param {!angular.JQLite} elem
 * @param {!angular.Attributes} attrs
 */
cgAdmin.ClientDirective.prototype.link = function (scope, elem, attrs) {
  this.scope = scope;
  this.elem = elem;
  this.attrs = attrs;

  this.fetch();
};

cgAdmin.ClientDirective.prototype.fetch = function () {

  var input = this.attrs['cgTypes'];

  var asIndex = input.lastIndexOf(' as ');
  var scopeVar = input.substring(asIndex + 4, input.length);

  var queryParams = input.substring(0, asIndex);

  var _this = this;

  this._http.get('http://127.0.0.1:19836/integrationtest/copybeans/types?' + queryParams).success(function (data) {
    console.log(data);
    _this.scope[scopeVar] = data;
  });

};

cgAdmin.homeModule.directive('cgTypes', cgAdmin.ClientDirective.factory);
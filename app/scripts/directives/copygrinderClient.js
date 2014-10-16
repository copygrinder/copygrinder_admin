'use strict';

goog.require('cgAdmin.homeModule');

goog.provide('cgAdmin.ClientDirective');

/**
 * @constructor
 */
cgAdmin.ClientDirective = function() {
  //this.link = this.link.bind(this);
};

cgAdmin.ClientDirective.factory = function() {
  var dir = new cgAdmin.ClientDirective();
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
cgAdmin.ClientDirective.prototype.link = function(scope, elem, attrs) {
  this.scope = scope;
  this.elem = elem;
  this.attrs = attrs;
  this.fetch();
};

cgAdmin.ClientDirective.prototype.fetch = function() {

  var input = this.attrs['cgTypes'];

  var asIndex = input.lastIndexOf(' as ');
  var scopeVar = input.substring(asIndex + 4, input.length);

  this.scope[scopeVar] = 'hi';
};

cgAdmin.homeModule.directive('cgTypes', cgAdmin.ClientDirective.factory);
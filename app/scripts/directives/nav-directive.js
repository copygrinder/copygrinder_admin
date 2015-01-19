'use strict';

goog.require('cgAdmin.homeModule');

goog.provide('cgAdmin.directives.nav');

cgAdmin.directives.nav = function() {
  return {
    restrict: 'A',
    templateUrl: 'views/directives/nav.html'
  };
};

cgAdmin.homeModule.directive('nav', cgAdmin.directives.nav);

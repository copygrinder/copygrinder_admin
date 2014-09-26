'use strict';

goog.provide('cgAdmin.NavigationController');

/**
 * @ngInject
 */
cgAdmin.NavigationController = function ($scope, $location) {

  /**
   * @expose
   */
  $scope.isActive = function (viewLocation) {
    return viewLocation === $location.path();
  };

};

'use strict';

goog.require('cgAdmin.homeModule');

/**
 * @ngInject
 */
cgAdmin.homeModule.routeFunc = function ($urlRouterProvider, $stateProvider) {

  $stateProvider.state('404', {templateUrl: 'views/error/404.html'});

  $stateProvider.state('error', {
    templateUrl: 'views/error/error.html'
  });

  $stateProvider.state('communicationError', {
    templateUrl: 'views/error/communication.html'
  });

  $urlRouterProvider.otherwise(function ($injector, $location) {
    var state = $injector.get('$state');
    state.go('404');
    return $location.path();
  });

};

/**
 * This error handler throws errors to the browsers native to ensure sourcemapping gets applied to stacktraces.
 *
 * @param {!angular.$provide} $provide
 * @ngInject
 */
cgAdmin.homeModule.errorConfig = function ($provide) {
  $provide.decorator('$exceptionHandler', ['$delegate', '$injector', function ($delegate, $injector) {
    var $state;
    return function (exception, cause) {
      $state = $state || $injector.get('$state');
      if (exception instanceof cgAdmin.CommunicationException) {
        $state.go('communicationError');
      } else if (exception instanceof cgAdmin.NotFoundException) {
        $state.go('404');
      } else {
        $state.go('error');
        setTimeout(function () {
          throw exception;
        }, 100);
      }
    };
  }]);
};


cgAdmin.homeModule
  .config(cgAdmin.homeModule.routeFunc)
  .config(cgAdmin.homeModule.errorConfig);

'use strict';

/* jshint -W079 */
var copygrinderHome = angular.module('copygrinderHome', ['ngResource', 'ngRoute']);

copygrinderHome.config(function ($routeProvider) {
    $routeProvider.when('/',
        {
            templateUrl: 'views/home.html',
            controller: 'HomeController'
        });
    $routeProvider.otherwise({redirectTo: '/'});
});
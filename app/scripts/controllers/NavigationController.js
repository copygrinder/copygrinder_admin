'use strict';

copygrinderHome.controller('NavigationController',
    function HomeController($scope, $location) {
        $scope.isActive = function (viewLocation) {
            return viewLocation === $location.path();
        };
    }
);

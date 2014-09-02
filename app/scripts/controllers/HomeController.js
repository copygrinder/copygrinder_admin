'use strict';

copygrinderHome.controller('HomeController',
    function HomeController($scope, ContentService) {
        $scope.saveContent = function() {
            var content = JSON.parse($scope.content);
            ContentService.saveContent(content);
        };
    }
);
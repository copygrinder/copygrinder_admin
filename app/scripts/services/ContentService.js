'use strict';

copygrinderHome.factory('ContentService', function($http) {
    return {
        saveContent: function(content) {
            $http.post('http://127.0.0.1:19836/copybeans/', content);
        }
    };
});
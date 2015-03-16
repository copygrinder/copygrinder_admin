'use strict';

goog.require('cgAdmin.editorConfig');

goog.require('cgAdmin.homeModule');

goog.provide('cgAdmin.directives.beanfield');

/**
 * @ngInject
 */
cgAdmin.directives.beanfield = function (RecursionHelper, $upload, $rootScope, $timeout, $window) {
  return {
    restrict: 'A',
    templateUrl: 'views/directives/beanfield.html',
    scope: {
      'fieldtype': '=',
      'content': '=',
      'id': '=',
      'attributes': '=',
      'refbeans': '='
    },
    compile: function (element) {
      return RecursionHelper.compile(element, function (scope, iElement, iAttrs, controller, transcludeFn) {

        scope['showDelete'] = {};

        scope['addListRow'] = function (content, id) {
          if (!content[id]) {
            content[id] = [];
          }
          content[id].push('');
        };

        scope['deleteListRow'] = function (array, $index) {
          array.splice($index, 1);
        };

        scope['editorOptions'] = cgAdmin.editorConfig;

        scope['fileSelected'] = function (file, bean, fieldId) {

          $upload.upload({
            url: $rootScope.rootUrl + '/files',
            method: 'POST',
            file: file
          }).success(function (data, status, headers, config) {
            var filename = config.file[0].name;
            var hash = data[0].content.hash;
            scope['content'][scope['id']] = {'filename': filename, 'hash': hash};
          });

        };

        scope['enableDelete'] = function (id) {
          if (scope['showDelete'][id]) {
            scope['showDelete'][id] = false;
          } else {
            scope['showDelete'][id] = true;
          }
        };

        $timeout(function () {

          var w = angular.element($window);
          w.bind('resize', function () {

            angular.forEach(window['CKEDITOR']['instances'], function (instance) {
              instance.resize();
            });

          });


        });

      });
    }
  };
};

cgAdmin.homeModule.directive('beanfield', cgAdmin.directives.beanfield);

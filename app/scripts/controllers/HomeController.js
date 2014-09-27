'use strict';

goog.require('cgAdmin.homeModule');

goog.provide('cgAdmin.HomeController');

/**
 * @param {cgAdmin.ContentService} contentService
 * @constructor
 * @export
 * @expose
 * @ngInject
 */
cgAdmin.HomeController = function (contentService) {

  /**
   * @type {string}
   * @expose
   */
  this.content = 'hello';

  this.contentService_ = contentService;

};

/**
 * @expose
 */
cgAdmin.HomeController.prototype.saveContent = function () {
  var content = JSON.parse(this.content);
  this.contentService_.saveContent(content);
};

cgAdmin.homeModule.controller('HomeController', cgAdmin.HomeController);
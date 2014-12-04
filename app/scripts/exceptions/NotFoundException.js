'use strict';

goog.provide('cgAdmin.NotFoundException');

/**
 * @constructor
 * @return {cgAdmin.NotFoundException}
 */
cgAdmin.NotFoundException = function (message) {
  this.message = message;
};

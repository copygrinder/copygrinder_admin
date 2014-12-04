'use strict';

goog.provide('cgAdmin.CommunicationException');

/**
 * @constructor
 * @return {cgAdmin.CommunicationException}
 */
cgAdmin.CommunicationException = function (message) {
  this.message = message;
};

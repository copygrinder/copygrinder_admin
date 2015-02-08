/**
 * @const
 **/
var CKEDITOR = {};

/**
 * @const
 **/
CKEDITOR.plugins = {};

/**
 * @typedef {{
 *   placeholder: (undefined)
 * }} */
var Editor;

Editor.ui = {};

/**
 * @typedef {{
 *   label: (string),
 *   command: (string),
 *   toolbar: (string)
 * }} */
var Button;

/**
 * @param {string} name
 * @param {Button} def
 */
Editor.ui.addButton = function(name, def) {
};

/**
 * @param {string} html
 */
Editor.insertHtml = function(html) {
};

/**
 * @typedef {{
 *   placeholder: (undefined)
 * }} */
var Command;

/**
 * @param {string} name
 * @param {Command} command
 */
Editor.addCommand = function(name, command) {
};

/**
 * @typedef {{
 *   icons: (string|undefined),
 *   init: (function(Editor)|undefined)
 * }} */
var PluginDefinition;

/**
 * @param {string} name
 * @param {PluginDefinition} definition
 */
CKEDITOR.plugins.add = function(name, definition) {
};

Editor.stylesSet = {};

/**
 * @param {string} name
 * @param {Array.<Object>} def
 */
Editor.stylesSet.add = function(name, def) {
};
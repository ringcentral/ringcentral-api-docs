/**
 * @fileOverview Rules used by Visual Studio Code.
 * 
 * Enabled: all built-in rules AND custom rules.
 * 
 * To disable some rule by appending it to the end. 
 * 
 * For example, to disable `MD045` by appending:
 * 
 * "MD045": false,
 * 
 * Or to customize some rule by:
 * 
 * "MD004": {
 *   "style": "asterisk"
 * }
 */

module.exports = {
  "default": true,
  "MD013": false,
  "MD033": false,
};
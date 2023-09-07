/**
 * @fileOverview Rules used by CI (Jenkins or Github Actions)
 * 
 * Disabled: all built-in rules.
 * Enabled:  custom rules - DPW001, DPW002, DPW003, DPW004.
 * 
 * Rules enabled in this file are considered as "Strict" rules.
 * "Strict" means if any rule was not pass, it will block CI workflow.
 */

module.exports = {
  "default": false,
  "DPW001": true,
  "DPW002": true,
  "DPW003": true,
  "DPW004": true,
  "DPW005": true,
};
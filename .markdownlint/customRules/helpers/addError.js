/**
 * Adds a generic error object via the onError callback.
 *
 * @param {Object} onError RuleOnError instance.
 * @param {number} lineNumber Line number.
 * @param {string} [detail] Error details.
 * @param {string} [context] Error context.
 * @param {number[]} [range] Column and length of error.
 * @param {Object} [fixInfo] RuleOnErrorFixInfo instance.
 * @returns {void}
 */
const addError = (onError, lineNumber, detail, context, range, fixInfo) => {
  onError({
    lineNumber,
    detail,
    context,
    range,
    fixInfo,
  });
};

module.exports = addError;
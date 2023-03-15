/**
 * Calls the provided function for each matching token.
 *
 * @param {Object} params RuleParams instance.
 * @param {string} type Token type identifier.
 * @param {Function} handler Callback function.
 * @returns {void}
 */
const filterTokens = (params, type, handler) => {
  for (const token of params.tokens) {
    if (token.type === type) {
      handler(token)
    }
  }
}

module.exports = filterTokens;
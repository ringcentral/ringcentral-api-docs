module.exports = {
  config: require('./.markdownlint/rules/index.cjs'),
  customRules: [
    './.markdownlint/customRules/rules/html-images',
    './.markdownlint/customRules/rules/md-images',
    './.markdownlint/customRules/rules/html-links',
    './.markdownlint/customRules/rules/md-links',
    './.markdownlint/customRules/rules/code-samples', 
  ]
};
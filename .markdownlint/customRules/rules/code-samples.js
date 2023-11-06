/**
 * @fileOverview Custom rule for code sample validation.
 * 
 * This rule expects MD files in the `docs` dir, and code samples files
 * present as sibling directory of `docs` dir. The struct is is:
 * -- project
 *   -- docs
 *   -- code-samples
 *   -- mdx_includes
 * 
 * The pattern is `/{!>\s*(.+?)\s*(\[.+])?\s*!}/g` which matches:
 *  - {!>code-samples/messaging/code-snippets/send-a2p-sms.rb!}
 *  - {!>    code-samples/messaging/code-snippets/send-a2p-sms.rb    !} 
 *  - {!> code-samples/messaging/code-snippets/send-a2p-sms.py !}
 *  - {!> code-samples/messaging/code-snippets/send-a2p-sms.php [ln:2-]!}
 *  - {!> mdx_includes/rcv-sdk-quick-start-js.md !} 
 */
const { pathToFileURL } = require("url");
const fs = require("fs");
const path = require("path");
const { addError } = require("../helpers");

module.exports = {
  names: ["DPW005"],
  description: "Code samples validation",
  tags: ["custom"],
  function: function rule(params, onError) {
    const pattern = /{!>\s*(.+?)\s*(\[.+])?\s*!}/g;
    const rootPath = params.name.split("/docs/")[0];

    params.tokens
      .filter((token) => {
        return (
          token.type === "inline" ||
          token.type === "fence" ||
          token.type === "code_block"
        );
      })
      .forEach((token) => {
        let match;

        while ((match = pattern.exec(token.content)) !== null) {
          const fileName = match[1];

          if (!fileName) {
            addError(onError, token.lineNumber, `Code sample is empty`);
          } else {
            const filePath = path.join(rootPath, fileName);
            const fileUrl = pathToFileURL(filePath);

            if (!fs.existsSync(fileUrl)) {
              const detail = `Not Exist: "${fileName}"`;
              addError(onError, token.lineNumber, detail);
            }
          }
        }
      });
  },
};

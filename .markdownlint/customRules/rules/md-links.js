const { pathToFileURL } = require('url');
const fs = require('fs');
const path = require('path');
const { filterTokens, addError } = require('../helpers');

module.exports = {
  "names": ["DPW004"],
  "description": "Internal links",
  "tags": ['links'],
  "function": function rule(params, onError) {
    const docURL = pathToFileURL(params.name);

    filterTokens(params, 'inline', token => {
      let href = null;

      token.children.forEach(child => {
        const { lineNumber, type, attrs } = child;

        if (type === 'link_open') {
          attrs.forEach(attr => {
            if (attr[0] === 'href') {
              href = attr[1];
            }
          });
        } else if (type === 'link_close') {
          if (!href || href === '#') {
            const detail = `No empty links`;
            addError(onError, lineNumber, detail);
          } else {
            const isRelative = href.startsWith('./') || href.startsWith('../');
            const isAnchor = href.startsWith('#') || href.startsWith('./#');

            if (isRelative && !isAnchor) {
              // The md file(except index.md) would be compiled into $name/index.html by MKDocs,
              //   so the relative link of a doc would be prefixed with '../'.
              // For example, a Markdown Doc named voice/ringout.md which refs an doc in ../basics/code-samples.md
              //   the link should be `../../basics/code-samples/`
              let formattedHref;

              href = href.replace(/#.*/, '');

              // index.md DOES NOT generate subdirectory
              // AND link direct to .md does not need to prefix with '../'
              if (path.basename(docURL.href) !== 'index.md' && !href.endsWith('.md')) {
                href = href.replace('../', '');
              }

              if (href === '') {
                formattedHref = './index.md';
                const linkDocURL = new URL(formattedHref, docURL);

                if (!fs.existsSync(linkDocURL)) {
                  const detail = `Not Exist: "${path.relative(docURL.href, linkDocURL.href)}"`;
                  addError(onError, lineNumber, detail);
                }
              } else {
                href = href.replace(/\/$/, '');
                const linkDocURL = new URL(href.endsWith('.md') ? href : `${href}.md`, docURL);  // ringout.md
                const linkDocIndexURL = new URL(`${href}/index.md`, docURL);  // ringout/index.md

                if (!(fs.existsSync(linkDocURL) || fs.existsSync(linkDocIndexURL))) {
                  console.log(href, linkDocURL.href);
                  const detail = `Not Exist: "${path.relative(docURL.href, linkDocURL.href)}"`;
                  addError(onError, lineNumber, detail);
                }
              }
            }
          }
        }
      });
    });
  }
};
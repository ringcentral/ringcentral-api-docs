const { pathToFileURL } = require('url');
const fs = require('fs');
const path = require('path');
const { addError } = require('../helpers');

module.exports = {
  "names": ["DPW003"],
  "description": "Internal links",
  "tags": ['links'],
  "function": function rule(params, onError) {
    const A_PATTERN = /<a\s+[^>]+\/?>/ig;
    const A_HREF_PATTERN = /<a[^>]+href="([^">]*)"/ig;
    const docURL = pathToFileURL(params.name);

    params.tokens.filter(token => {
      return token.type === 'html_block' || token.type === 'inline';
    }).forEach(token => {
      const links = token.content.matchAll(A_PATTERN);

      for (const link of links) {
        if (link[0].search(/href/) < 0) {
          const detail = `Link's href is invalid`;
          addError(onError, token.lineNumber, detail);
        } else {
          const matches = link[0].matchAll(A_HREF_PATTERN);

          for (const match of matches) {
            // The md file (except index.md) would be compiled into $name/index.md by MKDocs,
            //   so the relative link of an image would be prefixed with '../'.
            // For example, a Markdown Doc named voice/ringout.md which refs an image in ../img/image.png
            //   the link to the img in the doc should be `<img src="../../img" />`
            let linkHref = match[1];

            if (!linkHref || linkHref === '#') {
              const detail = `Link's href is empty`;
              addError(onError, token.lineNumber, detail);
            } else {
              const isRelative = linkHref.startsWith('./') || linkHref.startsWith('../');
              const isAnchor = linkHref.startsWith('#') || linkHref.startsWith('./#');

              if (isRelative && !isAnchor) {
                linkHref = linkHref.replace(/#.*/, '');

                // index.md DOES NOT generate subdirectory
                // AND link direct to .md does not need to prefix with '../'
                if (path.basename(docURL.href) !== 'index.md' && !linkHref.endsWith('.md')) {
                  linkHref = linkHref.replace(/^\.\.\//, '');
                }

                if (linkHref === '') {
                  const formattedHref = './index.md';

                  const linkDocURL = new URL(formattedHref, docURL);

                  if (!fs.existsSync(linkDocURL)) {
                    const detail = `Not Exist: "${path.relative(docURL.href, linkDocURL.href)}"`;
                    addError(onError, lineNumber, detail);
                  }
                } else {
                  linkHref = linkHref.replace(/\/$/, '');
                  const linkFileWithExt = linkHref.endsWith('.md') ? linkHref : `${linkHref}.md`; // ringout.md
                  const linkUrl = new URL(linkFileWithExt, docURL);
                  const linkDocIndexUrl = new URL(`${linkHref}/index.md`, docURL); // ringout/index.md

                  if (!(fs.existsSync(linkUrl) || fs.existsSync(linkDocIndexUrl))) {
                    console.log(linkHref, linkFileWithExt, linkUrl.href);
                    const detail = `Not Exist: "${path.relative(docURL.href, linkUrl.href)}"`;
                    addError(onError, token.lineNumber, detail);
                  }
                }
              }
            }
          }
        }
      }
    });
  }
};
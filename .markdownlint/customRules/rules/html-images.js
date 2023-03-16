const { pathToFileURL } = require('url');
const fs = require('fs');
const path = require('path');
const { addError } = require('../helpers');

module.exports = {
  "names": ["DPW001"],
  "description": "Images validation",
  "tags": ['images'],
  "function": function rule(params, onError) {
    const IMG_PATTERN = /<img[^>]*\/?>/ig;
    const IMG_SRC_PATTERN = /<img[^>]+src="([^">]*)"/ig;
    const docURL = pathToFileURL(params.name);

    params.tokens.filter(token => {
      return token.type === 'html_block' || token.type === 'inline';
    }).forEach(token => {
      const images = token.content.matchAll(IMG_PATTERN);

      for (const image of images) {
        if (image[0].search(/src/) < 0) {
          const detail = `Image's src is invalid`;
          addError(onError, token.lineNumber, detail);
        } else {
          const matches = image[0].matchAll(IMG_SRC_PATTERN);

          for (const match of matches) {
            // The md file (except index.md) would be compiled into $name/index.md by MKDocs,
            //   so the relative link of an image would be prefixed with '../'.
            // For example, a Markdown Doc named voice/ringout.md which refs an image in ../img/image.png
            //   the link to the img in the doc should be `<img src="../../img" />`
            let imageSrc = match[1];

            // index.md DOES NOT generate subdirectory
            if (path.basename(docURL.href) !== 'index.md') {
              imageSrc = imageSrc.replace(/^\.\.\//, '');
            }

            if (!imageSrc) {
              const detail = `Image's src is empty`;
              addError(onError, token.lineNumber, detail);
            } else {
              const imageUrl = new URL(imageSrc, docURL);
            
              if (!fs.existsSync(imageUrl)) {
                const detail = `Not Exist: "${path.relative(docURL.href, imageUrl.href)}"`;
                addError(onError, token.lineNumber, detail);
              }
            }
          }
        }
      }
    });
  }
};
const { pathToFileURL } = require('url');
const fs = require('fs');
const path = require('path');
const { filterTokens, addError } = require('../helpers');

module.exports = {
  "names": ["DPW002"],
  "description": "Images validation",
  "tags": ['images', 'links'],
  "function": function rule(params, onError) {
    const docURL = pathToFileURL(params.name);

    filterTokens(params, 'inline', token => {
      token.children
          .filter(child => child.type === 'image')
          .forEach(token => {
            let imageSrc = null;

            token.attrs.forEach(attr => {
              if (attr[0] === 'src') {
                imageSrc = attr[1];
              }
            });

            if (!imageSrc) {
              const detail = `Image's src is invalid`;
              addError(onError, token.lineNumber, detail);
            } else {
              const imageUrl = new URL(imageSrc, docURL);
              
              if (!fs.existsSync(imageUrl)) {
                const detail = `Not Exist: "${path.relative(docURL.href, imageUrl.href)}"`;
                addError(onError, token.lineNumber, detail);
              }
            }
          });
    });
  }
};
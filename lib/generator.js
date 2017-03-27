'use strict';

const path = require('path');
const fs = require('fs-extra');
const ejs = require('ejs');

class Generator {
	create(params) {
		const name = params[0];
		fs.mkdirSync(name);
    // package.json
    ejs.renderFile(path.join(__dirname, 'templates/package.json'), {
			name,
    }, (err, str) => {
      if (err) throw err;
      fs.writeFile(`${name}/package.json`, str, fsErr => {
        if (fsErr) throw fsErr;
      });
		});
    // example folder
    fs.copy(
      path.join(__dirname, 'templates/examples'),
      `${name}/examples`,
      s => {
        return s !== path.join(__dirname, 'templates/examples/index.html');
      },
      fsErr => {
        if (fsErr) throw fsErr;
        ejs.renderFile(path.join(__dirname, 'templates/examples/index.html'), {
          name,
        }, (indexErr, indexStr) => {
          if (indexErr) throw indexErr;
          fs.writeFile(`${name}/examples/index.html`, indexStr, fsErr => {
            if (fsErr) throw fsErr;
          });
        })
      }
    );
    // configs, readme
    const files = [
      ['babelrc', '.babelrc'],
      ['eslintignore', '.eslintignore'],
      ['gitignore', '.gitignore'],
      ['README.md', 'README.md'],
    ];
    files.forEach((file) => {
      fs.copy(path.join(__dirname, `templates/${file[0]}`), `${name}/${file[1]}`, fsErr => {
        if (fsErr) throw fsErr;
      });
    });
	}
}

module.exports = new Generator();

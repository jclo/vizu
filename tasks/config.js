/* eslint one-var: 0 */

// -- Node modules

// -- Local modules

// -- Local constants
const name    = require('../package.json').name
    , release = require('../package.json').version
    ;

// -- Configuration file for Gulp
module.exports = {
  name,
  release,
  dist: './_dist',
  srcfile: './index.js',
  lib: './lib',
  exportname: 'Vizu',   // the name to expose outside the lib,
  debug: true,
  babel: {
    presets: ['latest'],
    plugins: ['add-module-exports'],
    env: {
      test: {
        plugins: ['istanbul'],
      },
    },
  },
  license: ['/**',
    ` * ${name} v${release}`,
    ' *',
    ' * A Javascript View library for building web and hybrid mobile apps.',
    ' * Copyright (c) 2017 Jclo <jclo@mobilabs.fr> (http://www.mobilabs.fr).',
    ' * Released under the MIT license. You may obtain a copy of the License',
    ' * at: http://www.opensource.org/licenses/mit-license.php).',
    ' */',
    ''].join('\n'),
};

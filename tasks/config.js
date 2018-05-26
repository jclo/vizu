/* eslint one-var: 0, semi-style: 0 */

// -- Node modules

// -- Local modules

// -- Local constants
const { name } = require('../package.json')
    , release  = require('../package.json').version
    ;

// -- Configuration file for Gulp
module.exports = {
  name,
  release,
  dist: './_dist',
  lib: './lib',
  // Specific to browserify:
  browserify: {
    app: './index',
    debug: false,
    exportname: 'Vizu', // Name to expose outside the lib,
  },
  babel: {
    presets: [
      ['env', {
        targets: {
          browsers: ['last 2 versions', 'ie 9'],
        },
      }],
    ],
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
    ' * Copyright (c) 2018 Jclo <jclo@mobilabs.fr> (http://www.mobilabs.fr).',
    ' * Released under the MIT license. You may obtain a copy of the License',
    ' * at: http://www.opensource.org/licenses/mit-license.php).',
    ' */',
    ''].join('\n'),
};

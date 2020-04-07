/* @flow strict */

// const config = require('./babel.config.js');

require('@babel/register');

[
  '.css',
  '.scss',
  '.sass',
  '.ttf',
  '.woff',
  '.woff2'
]
  .forEach(ext => require.extensions[ext] = () => {});

require('@babel/polyfill');

require('./server/index.js');

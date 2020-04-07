/* @flow strict */

const alias = {
  '/client': './client',
  '/DB': './server/DB',
  '/ErrorHandler': './server/ErrorHandler',
  '/Layouts': './server/Layouts',
  '/Middleware': './server/Middleware',
  '/Modules': './server/Modules',
  '/Router': './server/Router',
  '/utils': './server/utils',
  '/index': './server/index.js'
};

const plugins = [
  ['flow-react-proptypes'],
  ['@babel/plugin-transform-modules-commonjs', { allowTopLevelThis: true }],
  ['@babel/plugin-transform-runtime', { loose: true }],
  ['@babel/plugin-proposal-object-rest-spread'],
  ['@babel/plugin-proposal-decorators', { legacy: true }],
  ['@babel/plugin-proposal-class-properties', { loose: true }],
  ['module-resolver', { root: ['./'], alias }]
];

module.exports = api => {
  api.cache(true);

  const presets = [
    ['@babel/preset-env', {
      targets: {
        esmodules: true
      },
      shippedProposals: true,
      forceAllTransforms: true
    }],
    '@babel/preset-react',
    '@babel/preset-flow'
  ];

  const env = {
    test: {
      presets: ['@babel/preset-env', '@babel/preset-react'],
      plugins: ['istanbul']
    }
  };

  plugins.map(plugin => env.test.plugins.push(plugin));

  return {
    presets,
    env,
    plugins
  };
};

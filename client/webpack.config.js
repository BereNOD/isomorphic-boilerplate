const webpack = require('webpack');
const path = require('path');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { BaseHrefWebpackPlugin } = require('base-href-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WebpackMonitor = require('webpack-monitor');

module.exports = (env, argv) => {
  const plugins = [
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en/),
    new LodashModuleReplacementPlugin()
  ];

  const config = {
    context: __dirname,
    entry: ['react-hot-loader/patch', './src/index.jsx'],
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].js'
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          use: 'babel-loader',
          exclude: /node_modules/
        },
        {
          test: /\.css$/,
          use: [
            !argv.hot ? MiniCssExtractPlugin.loader : 'style-loader',
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1
              }
            },
            'postcss-loader'
          ]
        },
        {
          test: /\.scss$/,
          use: [!argv.hot ? MiniCssExtractPlugin.loader : 'style-loader', 'css-loader', 'sass-loader']
        },
        {
          test: /\.svg$/,
          use: 'file-loader'
        },
        {
          test: /\.png$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                mimetype: 'image/png'
              }
            }
          ]
        }
      ]
    },
    resolve: {
      extensions: ['.js', '.jsx'],
      alias: {
        'react-dom': '@hot-loader/react-dom'
      },
      modules: [
        path.resolve(__dirname),
        path.resolve(__dirname, 'src'),
        path.resolve(__dirname, '..', 'common'),
        'node_modules'
      ]
    },
    devServer: {
      contentBase: './dist',
      historyApiFallback: true
    },
    plugins,
    optimization: {
      runtimeChunk: 'single',
      splitChunks: {
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all'
          }
        }
      }
    }
  };

  if (argv.hot) {
    // Cannot use 'contenthash' when hot reloading is enabled.
    config.watch = true;
    config.output.filename = '[name].[hash].js';
    config.plugins.push(
      new HtmlWebpackPlugin({
        template: require('html-webpack-template'),
        inject: false,
        appMountId: 'root'
      }),
      new BaseHrefWebpackPlugin({ baseHref: '/' })
    );
  } else {
    config.plugins.push(
      new MiniCssExtractPlugin()
    );
    config.plugins.push(
      new WebpackMonitor({
        capture: true, // -> default 'true'
        target: '../WebpackMonitor/stats.json', // default -> '../monitor/stats.json'
        launch: false, // -> default 'false'
        port: 3030 // default -> 8081
      })
    );
  }

  return config;
};

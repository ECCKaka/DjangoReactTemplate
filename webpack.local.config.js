var path = require('path');
var webpack = require('webpack');
var BundleTracker = require('webpack-bundle-tracker');

module.exports = {
  context: __dirname+'/src',
  devtool: 'eval',
  entry: [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    './index'
  ],
  output: {
    path: path.resolve('./static/'),
    filename: "bundle.js",
    publicPath: 'http://localhost:3000/assets/bundles/',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new BundleTracker({filename: './webpack-stats.json'}),
    [ "@babel/plugin-proposal-decorators", { "legacy": true } ]
  ],
  resolve: {
    alias: {
      'react': path.join(__dirname+'/src', 'node_modules', 'react')
    },
    extensions: [ '.js', '.json', '.node', '.css' ],
    modulesDirectories: ["./src", "node_modules", "bower_components"]
  },
  resolveLoader: {
    'fallback': path.join(__dirname, 'node_modules')
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['babel'],
      exclude: /node_modules/,
      include: __dirname
    }, {
      test: /\.js$/,
      loaders: ['babel'],
      include: path.join(__dirname, '..', '..', 'src')
    }, {
      test: /\.css$/,
      use: [
          { loader: "style-loader" },
          { loader: "css-loader" }
        ],
      loader:'style!css!',
      loaders: ["css-loader", "style-loader"],
      include: __dirname
    }]
  }
};

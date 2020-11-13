// web/webpack.config.js

const path = require('path');
const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');

const appDirectory = path.resolve(__dirname, './');

// This is needed for webpack to compile JavaScript.
// Many OSS React Native packages are not compiled to ES5 before being
// published. If you depend on uncompiled packages they may cause webpack build
// errors. To fix this webpack can be configured to compile to the necessary
// `node_module`.
const babelLoaderConfiguration = {
  test: /\.(js)$/,
  exclude: /node_modules/,
  // Add every directory that needs to be compiled by Babel during the build.
  include: [
    path.resolve(appDirectory, 'index.web.js'),
    path.resolve(appDirectory, 'src'),
    path.resolve(appDirectory, 'node_modules/react-native-uncompiled'),
    path.resolve(appDirectory, 'node_modules/react-native-vector-icons'),
  ],
  use: {
    loader: 'babel-loader',
    options: {
      cacheDirectory: true,
      // The 'metro-react-native-babel-preset' preset is recommended to match React Native's packager
      presets: ['module:metro-react-native-babel-preset', '@babel/preset-env'],
      // Re-write paths to import only the modules needed by the app
      plugins: ['react-native-web'],
    },
  },
};

// This is needed for webpack to import static images in JavaScript files.
const imageLoaderConfiguration = {
  test: /\.(gif|jpe?g|png|svg)$/,
  use: {
    loader: 'url-loader',
    options: {
      name: '[name].[ext]',
    },
  },
};

const vectorIconsConfiguration = {
  test: /\.ttf$/,
  loader: 'url-loader', // or directly file-loader
  include: path.resolve(__dirname, 'node_modules/react-native-vector-icons'),
};

// Try the environment variable, otherwise use root
const ASSET_PATH = process.env.ASSET_PATH || '/';

module.exports = {
  devtool: 'inline-source-map',
  devServer: {
    port: 3000,
    hot: true,
    contentBase: path.resolve('dist'),
  },
  entry: [
    // load any web API polyfills
    // path.resolve(appDirectory, 'polyfills-web.js'),
    // your web-specific entry file
    path.resolve(appDirectory, 'index.web.js'),
  ],

  // configures where the build ends up
  output: {
    filename: 'bundle.web.js',
    path: path.resolve(appDirectory, 'dist'),
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.ASSET_PATH': JSON.stringify(ASSET_PATH),
    }),
    new HtmlWebPackPlugin({
      template: 'public/index.html',
      filename: './index.html',
    }),
  ],
  module: {
    rules: [
      babelLoaderConfiguration,
      imageLoaderConfiguration,
      vectorIconsConfiguration,
    ],
  },

  resolve: {
    // This will only alias the exact import "react-native"
    alias: {
      'styled-components': 'styled-components/native',
      'react-native-vector-icons': 'react-native-vector-icons/dist',
      components: path.resolve('./src/components'),
      constants: path.resolve('./src/constants'),
      helpers: path.resolve('./src/helpers'),
      'react-native$': 'react-native-web',
    },
    // If you're working on a multi-platform React Native app, web-specific
    // module implementations should be written in files using the extension
    // `.web.js`.
    extensions: ['.web.js', '.js'],
  },
};

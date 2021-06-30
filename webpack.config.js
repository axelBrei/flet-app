// web/webpack.config.js

const path = require('path');
const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const {GenerateSW, InjectManifest} = require('workbox-webpack-plugin');

const appDirectory = path.resolve(__dirname, './');
const aliasPathJoin = moduleFolders =>
  path.join(
    process.cwd(),
    '..',
    '..',
    'node_modules',
    path.join(...moduleFolders),
  );

// This is needed for webpack to compile JavaScript.
// Many OSS React Native packages are not compiled to ES5 before being
// published. If you depend on uncompiled packages they may cause webpack build
// errors. To fix this webpack can be configured to compile to the necessary
// `node_module`.
const babelLoaderConfiguration = {
  test: /\.(js)$/,
  exclude: [
    new RegExp(
      'node_modules[/\\\\](?!react-native-swipe-gestures|react-native-flipper|rn-redux-middleware-flipper|react-native-gesture-handler|react-native-calendars)',
    ),
    /^@react-native-firebase\/.*/,
    /^react-native-splash-screen\/.*/,
    path.resolve('./src/resources/fonts'),
    path.resolve('./android'),
    path.resolve('./ios'),
  ],
  // Add every directory that needs to be compiled by Babel during the build.
  include: [
    path.resolve(appDirectory, 'index.web.js'),
    path.resolve(appDirectory, 'src'),
    path.resolve(appDirectory, 'node_modules/react-native-uncompiled'),
    path.resolve(appDirectory, 'node_modules/react-native-vector-icons'),
    path.resolve(appDirectory, 'node_modules', 'react-native-gesture-handler'),
    path.resolve(appDirectory, 'node_modules/react-native-calendars'),
    path.resolve(appDirectory, 'node_modules/react-native-modalize'),
    path.resolve(appDirectory, 'node_modules/react-native-swipe-gestures'),
  ],
  use: {
    loader: 'babel-loader',
    options: {
      cacheDirectory: true,
      // The 'metro-react-native-babel-preset' preset is recommended to match React Native's packager
      presets: ['module:metro-react-native-babel-preset', '@babel/preset-env'],
      // Re-write paths to import only the modules needed by the app
      plugins: [
        'react-native-web',
        '@babel/plugin-proposal-class-properties',
        '@babel/plugin-syntax-dynamic-import',
      ],
    },
  },
};

const dotenv = require('dotenv').config({
  path: path.join(__dirname, '.env'),
});
// This is needed for webpack to import static images in JavaScript files.
const imageLoaderConfiguration = {
  test: /\.(gif|jpe?g|png)$/,
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

module.exports = env => ({
  devtool: 'inline-source-map',
  devServer: {
    port: 3000,
    ...(env.dev && {
      host: '0.0.0.0',
    }),
    hot: true,
    disableHostCheck: true,
    contentBase: path.resolve('build'),
    historyApiFallback: true,
    proxy: {
      // proxy all webpack dev-server requests starting with /observation to Spring Boot backend (localhost:8080)
      // "/observation": "http://localhost:8080",
      // changeOrigin: true,
    },
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
    path: path.resolve(appDirectory, 'build'),
    publicPath: '/',
  },
  plugins: [
    new webpack.DefinePlugin(
      !!dotenv.error
        ? {'process.env': JSON.stringify(process.env)}
        : {
            'process.env': JSON.stringify({
              ...process.env,
              ...dotenv.parsed,
            }),
          },
    ),
    new webpack.DefinePlugin({
      'process.env.ASSET_PATH': JSON.stringify(ASSET_PATH),
    }),
    new HtmlWebPackPlugin({
      template: 'public/index.html',
      // filename: './index.html',
    }),
    // PRODUCTION ONLY PLUGINS
    ...(env && (!env.dev || env.prod)
      ? [
          new CopyWebpackPlugin({
            patterns: [
              // {from: 'public/images', to: 'images'},
              {from: path.resolve(appDirectory, './public')},
            ],
          }),
          new InjectManifest({
            swSrc: path.resolve(
              appDirectory,
              './src/serviceWorkerWorkbox.web.js',
            ),
            swDest: 'service-worker.js',
            maximumFileSizeToCacheInBytes: 20 * 1024 * 1024,
          }),
        ]
      : []),
  ],
  module: {
    rules: [
      babelLoaderConfiguration,
      imageLoaderConfiguration,
      vectorIconsConfiguration,
      {
        test: /\.svg$/,
        exclude: [/resources\/map/],
        use: {
          loader: '@svgr/webpack',
          options: {
            svgoConfig: {
              plugins: [{removeViewBox: false}],
            },
          },
        },
      },
    ],
  },

  resolve: {
    // This will only alias the exact import "react-native"
    alias: {
      'styled-components': 'styled-components/native',
      'react-native-modal': path.resolve(
        './src/components/ui/Modal/index.web.js',
      ),
      'react-native-vector-icons': 'react-native-vector-icons/dist',
      components: path.resolve('./src/components'),
      constants: path.resolve('./src/constants'),
      services: path.resolve('./src/services'),
      helpers: path.resolve('./src/helpers'),
      resources: path.resolve('./src/resources'),
      '@react-native-firebase': path.resolve(
        'src',
        'services',
        'FirebaseWebService',
      ),
      'redux-store': path.resolve('./src/redux-store'),
      'react-native$': 'react-native-web',
      './ReactNativeSVG': aliasPathJoin([
        'react-native-svg',
        'lib',
        'module',
        'ReactNativeSVG.web.js',
      ]),
      'react-native-svg': 'react-native-svg-web',
      'react-native-config': path.resolve(
        './src/constants/config/Config.web.js',
      ),
    },
    // If you're working on a multi-platform React Native app, web-specific
    // module implementations should be written in files using the extension
    // `.web.js`.
    extensions: ['.web.js', '.js', '.svg'],
  },
  // external are files/modules to exlude from bundle
  externals: {
    modal: 'react-native-modal',
    fonts: './src/resources/fonts',
    android: './android',
    ios: './ios',
    '@darron1217/react-native-background-geolocation':
      '@darron1217/react-native-background-geolocation',
    '@gorhom/bottom-sheet': '@gorhom/bottom-sheet',
  },
});

/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */
const {getDefaultConfig} = require('metro-config');

const exclusionList = require('metro-config/src/defaults/exclusionList');
const path = require('path');

const ignoreTopLevelFolders = [
  // WEB DIRECTORIES
  'public',
  'build',
  'dist',
  // END WEB DIRECTORIES
  'react-native-web',
  'react-native-svg-web',
  'react-dom',
  'body-scroll-lock',
  'webpack',
  'webpack-cli',
  'webpack-dev-server',
  'workbox-precaching',
  'workbox-routing',
  'workbox-webpack-plugin',
  'babel-plugin-react-native-web',
  'copy-webpack-plugin',
  'html-webpack-plugin',
  '@svgr/webpack',
  'google-maps-react',
  'webfontloader',
  '@sentry/react',
  'fbjs',
].map(f => new RegExp(`${path.resolve(f)}/.*`));
const ignoreWebFiles = /.*\.web.js/;

module.exports = (async () => {
  const {
    resolver: {sourceExts, assetExts},
  } = await getDefaultConfig();
  return {
    transformer: {
      babelTransformerPath: require.resolve('react-native-svg-transformer'),
      getTransformOptions: async () => ({
        transform: {
          experimentalImportSupport: false,
          inlineRequires: true,
        },
      }),
    },
    resolver: {
      assetExts: [...assetExts.filter(ext => ext !== 'svg'), 'web.js'],
      sourceExts: [...sourceExts, 'svg'],
      blacklistRE: exclusionList([
        '/webpack.config.js',
        ...ignoreTopLevelFolders,
        /^firebase$/,
        ignoreWebFiles,
      ]),
    },
  };
})();

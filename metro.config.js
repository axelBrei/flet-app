/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */
const {getDefaultConfig} = require('metro-config');

const blacklist = require('metro-config/src/defaults/blacklist');
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
  'fbjs',
].map((f) => new RegExp(`${path.resolve(f)}/.*`));
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
          inlineRequires: false,
        },
      }),
    },
    resolver: {
      assetExts: [...assetExts.filter((ext) => ext !== 'svg'), 'web.js'],
      sourceExts: [...sourceExts, 'svg'],
      blacklistRE: blacklist([
        '/webpack.config.js',
        ...ignoreTopLevelFolders,
        ignoreWebFiles,
      ]),
    },
  };
})();

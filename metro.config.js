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
  'react-native-web',
  'react-native-svg-web',
  'react-dom',
  'body-scroll-lock',
].map((f) => new RegExp(`${path.resolve(f)}/.*`));

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
      assetExts: assetExts.filter((ext) => ext !== 'svg'),
      sourceExts: [...sourceExts, 'svg'],
      blacklistRE: blacklist(ignoreTopLevelFolders),
    },
  };
})();

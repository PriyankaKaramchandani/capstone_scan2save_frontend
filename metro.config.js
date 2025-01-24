const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

// Use the default configuration only once to avoid redeclaration
const defaultConfig = getDefaultConfig(__dirname);

const {
  resolver: { sourceExts, assetExts },
} = defaultConfig;

const config = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,  // Disable experimental import support
        inlineRequires: true,  // Enable inline requires for performance optimization
      },
    }),
    babelTransformerPath: require.resolve('react-native-svg-transformer'),  // If using SVGs
  },
  resolver: {
    assetExts: assetExts.filter(ext => ext !== 'svg'),  // Remove 'svg' from asset extensions
    sourceExts: [...sourceExts, 'svg', 'jsx', 'js', 'ts', 'tsx', 'png', 'jpg', 'jpeg'],  // Add 'svg' and other extensions to source extensions
  },
};

module.exports = mergeConfig(defaultConfig, config);  // Merge the configurations

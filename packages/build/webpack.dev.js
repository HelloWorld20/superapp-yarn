const TerserPlugin = require("terser-webpack-plugin");

module.exports = rawConfigs => {
  const env = process.env.NODE_ENV;
  if (!env) throw new Error("找不到环境变量");

  const configs = {
    entry: rawConfigs.entry,
    distDir: rawConfigs.distDir,
    srcDir: rawConfigs.srcDir,
    resolve: Object.assign(
      {
        extensions: [],
        alias: []
      },
      rawConfigs
    ),
    loaders: rawConfigs.loaders || [],
    plugins: rawConfigs.plugins || []
  };

  const isDev = env === "development";
  return {
    mode: isDev ? "development" : "production",
    entry: configs.entry,
    output: {
      path: configs.distDir,

      filename: `[name].[hash:10].js`
    },
    resolve: {
      extensions: [
        ".js",
        ".jsx",
        ".ts",
        ".tsx",
        ".coffee",
        ".json",
        ...configs.resolve.extensions
      ],
      alias: configs.resolve.alias
    },
    optimization: {
      minimize: isDev ? false : true,
      minimizer: [
        new TerserPlugin({
          cache: true,
          parallel: true,
          sourceMap: true,
          terserOptions: { output: { comments: false } }
        })
      ]
      // splitChunks: {
      //   cacheGroups: configs.shouldSplitVendorChunk
      //     ? {
      //         vendor: {
      //           chunks: 'initial',
      //           test: /[\\/]node_modules[\\/](?!@fe[\\/])/,
      //           name: 'vendor',
      //           enforce: true,
      //           reuseExistingChunk: true,
      //         },
      //       }
      //     : {},
      // },
      // runtimeChunk: !configs.disableManifestChunk && { name: 'manifest' },
    },

    module: {
      // 各种默认loader配置
      // 结合其他业务房配置的loader
      rules: [].concat(require("./loaders")(env, configs), configs.loaders)
    },

    plugins: [].concat(require("./plugins")(env, configs), configs.plugins),

    devServer: configs.devServer
  };
};

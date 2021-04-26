const webpackConfig = require("ww-tools-build");
const path = require("path");

const config = webpackConfig({
  entry: path.resolve(__dirname, "./src/index.tsx"),
  srcDir: path.resolve(__dirname, "src"),
  distDir: path.resolve(__dirname, "dist"),
  resolve: {
    alias: {
      'components': path.resolve(__dirname, './src/components'),
      'datas': path.resolve(__dirname, './src/datas')
    }
  },
  template: {
    source: path.resolve(__dirname, "src"),
    views: [
      {
        view: "index.html",
        chunks: ["manifest", "vendor", "index"],
      },
    ],
  },
}, path.resolve(__dirname, './config.json'));

module.exports = config;

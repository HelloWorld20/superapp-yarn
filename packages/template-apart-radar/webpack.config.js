const webpackConfig = require("ww-build");
const path = require("path");

const config = webpackConfig({
  entry: path.resolve(__dirname, "./src/index.tsx"),
  srcDir: path.resolve(__dirname, "src"),
  distDir: path.resolve(__dirname, "dist"),
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

const webpackConfig = require("ww-build");
const path = require("path");
const bb = require('@babel/preset-env');

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
});

module.exports = config;

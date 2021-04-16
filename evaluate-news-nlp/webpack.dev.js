const path = require("path");
const webpack = require("webpack");
const { merge } = require("webpack-merge");
const commanConfig = require("./webpack.common");

const devConfig = {
  mode: "development",
  stats: "verbose",
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
};

module.exports = module.exports = merge(commanConfig, devConfig);

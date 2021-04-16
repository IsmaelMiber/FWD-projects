const path = require("path");
const webpack = require("webpack");
const { merge } = require("webpack-merge");
const commanConfig = require("./webpack.common");
const TerserPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const { GenerateSW } = require("workbox-webpack-plugin");

const prodConfig = {
  mode: "production",
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({ filename: "[name].css" }),
    new GenerateSW({ clientsClaim: true, skipWaiting: true }),
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new OptimizeCSSAssetsPlugin(),
      new TerserPlugin({
        parallel: true,
        extractComments: true,
      }),
    ],
  },
};

module.exports = merge(commanConfig, prodConfig);

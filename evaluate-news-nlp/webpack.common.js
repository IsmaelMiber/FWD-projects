const path = require("path");
const webpack = require("webpack");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const DOTENVPlugin = require("dotenv-webpack");

module.exports = {
  entry: "./src/client/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[hash].js",
    library: "NLPForm",
    libraryTarget: "var",
  },
  module: {
    rules: [
      {
        test: /\.js$/i,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/client/views/index.html",
      filename: "./index.html",
    }),
    new CleanWebpackPlugin({
      cleanStaleWebpackAssets: true,
      protectWebpackAssets: false,
    }),
    new DOTENVPlugin(),
  ],
};

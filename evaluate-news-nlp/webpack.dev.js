require("dotenv").config({
  path: "./.env.dev",
});
const path = require("path");
const webpack = require("webpack");
const { merge } = require("webpack-merge");
const commanConfig = require("./webpack.common");
const { classifiyText } = require("./src/client/API/form");

const devConfig = {
  mode: "development",
  stats: "verbose",
  devtool: "source-map",
  devServer: {
    proxy: {
      "/classify": {
        target: "http://localhost:8080/classify",
        bypass: async function (req, res, proxyOptions) {
          const { query } = req;
          const { text } = query;
          const response = await classifiyText(text);

          const responseJson = await response.json();
          res.send(responseJson);
        },
      },
    },
  },
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

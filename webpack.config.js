/* eslint-disable no-param-reassign */
/* eslint-disable no-shadow */
/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");
const url = require("url");
const fs = require("fs");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const InterpolateHtmlPlugin = require("interpolate-html-plugin");
const { WebpackManifestPlugin } = require("webpack-manifest-plugin");

const isDevelopment = process.env.NODE_ENV !== "production";

// ------ taken from Create-React-App ---------------

const envPublicUrl = process.env.PUBLIC_URL;

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath);

function ensureSlash(path, needsSlash) {
  const hasSlash = path.endsWith("/");
  if (hasSlash && !needsSlash) {
    return path.substr(path, path.length - 1);
  }
  if (!hasSlash && needsSlash) {
    return `${path}/`;
  }
  return path;
}

function getPublicUrl(appPackageJson) {
  // eslint-disable-next-line global-require, import/no-dynamic-require
  return envPublicUrl || require(appPackageJson).homepage;
}

function getServedPath(appPackageJson) {
  const publicUrl = getPublicUrl(appPackageJson);
  const servedUrl =
    envPublicUrl || (publicUrl ? url.parse(publicUrl).pathname : "/");
  return ensureSlash(servedUrl, true);
}

const publicPath = isDevelopment
  ? "/"
  : getServedPath(resolveApp("package.json"));

const publicUrl = isDevelopment ? "" : publicPath.slice(0, -1);

function getClientEnvironment(publicUrl) {
  const raw = {
    NODE_ENV: process.env.NODE_ENV || "development",
    PUBLIC_URL: publicUrl,
  };

  const stringified = {
    "process.env": Object.keys(raw).reduce((env, key) => {
      env[key] = JSON.stringify(raw[key]);
      return env;
    }, {}),
  };

  return { raw, stringified };
}

const env = getClientEnvironment(publicUrl);

// -----------------------------------------------

module.exports = {
  mode: process.env.NODE_ENV,
  bail: !isDevelopment,
  devtool: isDevelopment ? "cheap-module-source-map" : "source-map",
  entry: "./src/index.tsx",
  output: {
    path: path.resolve(__dirname, "dist"),
    pathinfo: isDevelopment,
    filename: isDevelopment
      ? "static/js/bundle.js"
      : "static/js/[name].[chunkhash].js",
    chunkFilename: isDevelopment
      ? undefined
      : "static/js/[name].[chunkhash].chunk.js",

    publicPath,
  },

  devServer: {
    contentBase: "./dist",
    port: 3000,
    compress: true,
    open: true,
    historyApiFallback: true,
  },
  plugins: [
    new InterpolateHtmlPlugin(env.raw),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "public", "index.html"),
      filename: "index.html",
      inject: true,
      minify: isDevelopment
        ? undefined
        : {
            removeComments: true,
            collapseWhitespace: true,
            removeRedundantAttributes: true,
            useShortDoctype: true,
            removeEmptyAttributes: true,
            removeStyleLinkTypeAttributes: true,
            keepClosingSlash: true,
            minifyJS: true,
            minifyCSS: true,
            minifyURLs: true,
          },
    }),
    new MiniCssExtractPlugin({ filename: "static/css/[name].css" }),
    new webpack.DefinePlugin(env.stringified),
    ...(isDevelopment
      ? []
      : [
          new WebpackManifestPlugin({
            fileName: "asset-manifest.json",
          }),
        ]),
  ],
  module: {
    rules: [
      {
        test: /\.ts(x)?$/,
        loader: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  ...(isDevelopment
    ? {}
    : {
        optimization: {
          runtimeChunk: "single",
          splitChunks: {
            cacheGroups: {
              vendor: {
                test: /[\\/]node_modules[\\/]/,
                name: "vendors",
                chunks: "all",
              },
            },
          },
        },
      }),
  performance: {
    hints: isDevelopment ? false : "warning",
  },
};

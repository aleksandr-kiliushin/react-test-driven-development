const path = require("path")
const HTMLWebpackPlugin = require("html-webpack-plugin")
const webpack = require("webpack")

module.exports = {
  devServer: {
    historyApiFallback: true,
    port: 3456,
    proxy: {
      "/api": "http://localhost:3600",
    },
  },
  devtool: "source-map",
  entry: "./src/index.tsx",
  mode: process.env.MODE || "production",
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.ts(x?)$/,
        use: ["babel-loader"],
      },
      {
        test: /\.module\.css$/,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
            options: {
              modules: {
                localIdentName: "[local]___[hash:base64:5]",
              },
            },
          },
        ],
      },
      {
        test: /(?<!module)\.css$/,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
    ],
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "/",
    sourceMapFilename: "[name].js.map",
  },
  plugins: [
    new webpack.SourceMapDevToolPlugin({
      filename: "[file].map[query]",
    }),
    new webpack.EnvironmentPlugin({
      MODE: process.env.MODE,
    }),
    new HTMLWebpackPlugin({
      template: "public/index.html",
    }),
  ],
  resolve: {
    alias: {
      "#components": path.resolve(process.cwd(), "src/components"),
      "#sampleData": path.resolve(process.cwd(), "src/sampleData"),
      "#store": path.resolve(process.cwd(), "src/store"),
      "#utils": path.resolve(process.cwd(), "src/utils"),
    },
    extensions: [".css", ".js", ".ts", ".tsx"],
  },
}

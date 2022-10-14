const path = require("path");

module.exports = {
  context: path.resolve(__dirname, "src"),
  devServer: {
    contentBase: "./src",
  },
  entry: {
    main: "./app.js",
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "dist",
  },
};

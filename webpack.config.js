const path = require("path");

module.exports = {
  context: path.resolve(__dirname, "src"),
  devServer: {
    contentBase: "./src",
  },
  entry: {
    app: "./app.js",
    "pdf.worker": "pdfjs-dist/build/pdf.worker.entry.js",
  },
  output: {
    filename: "[name].bundle.js",
    path: path.join(__dirname, "dist"),
    publicPath: "dist",
  },
};

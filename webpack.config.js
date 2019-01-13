const path = require('path');

module.exports = {
  mode: "development",
  devtool: 'source-map',
  entry: "./src/index.ts",
  output: {
    filename: 'index.js',
    libraryTarget: 'umd',
    library: 'MyLib',
    umdNamedDefine: true,
    path: path.resolve(__dirname, 'dist')
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  module: {
    rules: [
      // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
      { test: /\.tsx?$/, loader: "ts-loader" }
    ]
  }
};


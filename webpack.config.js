const path = require('path');

module.exports = {
  mode: "production",
  devtool: 'source-map',
  entry: "./src/index.ts",
  output: {
    filename: 'index.js',
    library: "lambdaProxyResponses",
    libraryTarget: "umd",
    globalObject: 'this',
    umdNamedDefine: true,
    path: path.resolve(__dirname, 'dist')
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    modules: [
      "node_modules"
    ]
  },
  module: {
    rules: [
      // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
      { test: /\.tsx?$/, loader: "ts-loader" }
    ]
  }
};


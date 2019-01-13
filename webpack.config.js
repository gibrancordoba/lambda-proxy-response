const path = require('path');

module.exports = {
  entry: './src/index.ts',
  devtool: 'inline-source-map',
  mode:'development',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: [
          '/node_modules/',
          '/test/'
        ]
      }
    ]
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ]
  },
  output: {
    filename: 'index.js',
    library: 'lambda-proxy-responses',
    libraryTarget: 'commonjs',
    path: path.resolve(__dirname, 'dist')
  }
};

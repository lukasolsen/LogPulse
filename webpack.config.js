const path = require('path');
const webpack = require('webpack');

module.exports = {
  target: 'web',
  mode: 'development',
  entry: './src/index.ts',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.json', '.json5'],
  },

  optimization: {
    usedExports: true, // remove unused functions
  },
  node: {
    global: true,
    __filename: false,
    __dirname: false,
  },

  devServer: {
    static: [
      {directory: path.resolve(__dirname, 'dist')},
      {directory: path.resolve(__dirname, 'public')},
    ],
    port: 8080,
  },
};

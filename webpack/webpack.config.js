require('dotenv').config({ silent: true });

const HTMLWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
    app: [ path.resolve('src/index.jsx') ],
  },

  output: {
    path: path.resolve('build'),
    filename: '[name].[hash].js',
    chunkFilename: '[name].[chunkhash].js',
    publicPath: './',
  },

  resolve: {
    extensions: [ '.js', '.jsx' ],
  },

  plugins: [
    new webpack.EnvironmentPlugin([ 'NODE_ENV' ]),
    new HTMLWebpackPlugin({
      template: path.resolve('src/index.html'),
      favicon: './src/favicon.png',
    }),
  ],

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: { cacheDirectory: process.env.NODE_ENV === 'development' },
      },
      {
        test: /\.(jpg|png)$/,
        use: {
          loader: 'url-loader',
        },
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
    ],
  },
};

const webpack = require('webpack');
const config = require('./webpack.config');

module.exports = {
  mode: 'development',

  devtool: 'cheap-module-eval-source-map', // use eval for faster builds/poor debugging

  entry: {
    app: [ 'webpack-hot-middleware/client?reload=true', ...config.entry.app ],
  },

  resolve: config.resolve,

  output: config.output,

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    ...config.plugins,
  ],

  module: {
    rules: [
      ...config.module.rules,
      {
        test: /\.jsx?$/,
        include: /node_modules/,
        use: [ 'react-hot-loader/webpack' ],
      },
    ],
  },
};

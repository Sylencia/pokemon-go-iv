const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: [
    './src/index',
  ],
  module: {
    loaders: [
      { test: /\.js?$/, loader: 'babel', exclude: /node_modules/ },
      { test: /\.s?css$/, loader: 'style!css!sass' },
      { test: /\.json$/, loader: 'json' },
      { test: /\.png$/, loader: 'file' },
      { test: /\.modernizrrc$/, loader: 'modernizr' },
    ],
  },
  resolve: {
    extensions: ['', '.js', '.scss', '.json'],
    alias: {
      modernizr$: path.resolve(__dirname, '.modernizrrc'),
    },
  },
  output: {
    path: path.join(__dirname, '/dist'),
    publicPath: '/',
    filename: 'bundle.js',
  },
  devServer: {
    contentBase: './dist',
    hot: true,
    historyApiFallback: true,
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
    }),
  ],
};

const baseConfig = require('./webpack.config');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');

const plugins = (baseConfig.plugins || []).concat([
  new HtmlWebpackHarddiskPlugin(),
]);

module.exports = Object.assign({}, baseConfig, {
  devtool: 'source-map',
  mode: 'development',
  plugins: plugins
});
const baseConfig = require('./webpack.config');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const plugins = (baseConfig.plugins || []).concat([
  new HtmlWebpackPlugin({
    template: 'assets/index.html',
    alwaysWriteToDisk: true
  })
]);

module.exports = Object.assign({}, baseConfig, {
  mode: 'production',
  plugins: plugins,
});
const path = require('path');
const devConfig = require('./webpack.dev');

const newOutput = Object.assign({}, devConfig.output, {
  filename: "bundle.js",
  publicPath: 'http://localhost:8080/',
});

module.exports = Object.assign({}, devConfig, {
  devtool: 'inline-source-map',
  devServer: {},
}, {
  output: newOutput
});
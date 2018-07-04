const path = require('path')

const CleanWebpackPlugin = require('clean-webpack-plugin')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const merge = require('webpack-merge')

const sourceDirectory = path.resolve(__dirname, './src')
const buildDirectory = path.resolve(__dirname, './dist')

const devConfig = require('./webpack/webpack.dev.js')
const prodConfig = require('./webpack/webpack.prod.js')
const rules = require('./webpack/webpack.loaders.js')

const cssFontPlugin = new ExtractTextPlugin('./css/[name].fonts.[hash:8].css')
const scssPlugin = new ExtractTextPlugin('./css/[name].styles.[hash:8].css')


const commonConfig = {
  entry: {
    app: sourceDirectory.concat('/index.js')
  },
  output: {
    path: buildDirectory,
    publicPath: '/',
    filename: '[name].bundle.min.js'
  },
  plugins: [
    new CleanWebpackPlugin(buildDirectory),
    new HTMLWebpackPlugin({
      template: './public/index.html',
      filename: 'index.html',
      inject: 'body'
    }),
    cssFontPlugin,
    scssPlugin,
    CopyWebpackPlugin([
      { from: './public/img', to: './img' }/* ,
      {
        from: './node_modules/@coreui/react/React_Full_Project/public/img',
        to: '../node_modules/@coreui/react/React_Full_Project/img'
      } //CoreUI fix */
    ])
  ],
  module: {
    rules: [
      rules.jsRule,
      rules.scssRule(scssPlugin),
      rules.cssFontRule(cssFontPlugin),
      rules.fontRule,
      /* rules.htmlRule, */
      rules.imgRule
    ]
  }
}

module.exports = (env = {}) => {
  return merge(commonConfig, env.prod ? prodConfig : devConfig)
}
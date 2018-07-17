const path = require('path')

const webpack = require('webpack')


module.exports = {
  devtool: 'source-map',
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      parallel: 4,
      extraComments: true
    }),
    new webpack.DefinePlugin(
      { 'process.env.NODE_ENV': JSON.stringify('production') }
    )
  ]
}
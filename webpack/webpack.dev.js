const webpack = require('webpack')


module.exports =  {
  devtool: 'cheap-module-eval-source-map' || 'inline-source-map',
  devServer: {
    hot: true,
    open: true,
    historyApiFallback: true,
    //https: true,
    // contentBase: 'dist',
    port: 8080,
    host: 'localhost.dataportal.daf.teamdigitale.it'
  },
  watch: true,
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ]
}
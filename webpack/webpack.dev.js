const webpack = require('webpack')


module.exports =  {
  devtool: 'cheap-module-eval-source-map' || 'inline-source-map',
  devServer: {
    hot: true,
    open: true,
    historyApiFallback: true,
    //https: true,
    // contentBase: 'dist',
    port: 80,
<<<<<<< HEAD
    host: 'localhost.dataportal.daf.teamdigitale.test'
=======
    host: 'localhost.dataportal.daf.teamdigitale.it'
>>>>>>> 7481dc31943d8b042c0fec7e8a95b0a32b13cdbd
  },
  watch: true,
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ]
}
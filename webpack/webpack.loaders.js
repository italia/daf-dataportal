const jsRule = {
  test: /\.(js|jsx)$/,
  exclude: /node_modules|public|config/,
  /* use: [{
    loader: 'babel-loader',
    options: {
      presets: ['babel-preset-es2015', 'babel-preset-react', 'babel-preset-stage-0', 'babel-preset-env']
    }
  }] */
  loaders: [
    'babel-loader?presets[]=react,presets[]=es2015,presets[]=stage-0'
  ]

}

const scssRule = (scssPlugin) => {
  return {
    test: /\.(scss)$/,
    use: scssPlugin.extract({
      fallback: 'style-loader',
      use: [{
        loader: 'css-loader'
        // options: { alias: { '../img': '../public/img' } }
      },
      {
        loader: 'postcss-loader',
        options: {
          plugins: () => [
            require('autoprefixer')({ browsers: ['>1%', 'last 2 versions'] })
          ]
        }
      },
      { loader: 'sass-loader' }
      ]
    })
  }
}

const cssFontRule = (cssFontPlugin) => {
  return {
    test: /\.css$/,
    use: cssFontPlugin.extract({
      fallback: 'style-loader',
      use: 'css-loader'
    })
  }
}

const fontRule = {
  test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
  loader: 'file-loader',
  options: { name: './fonts/[name].[hash:8].[ext]' }
}

/* const htmlRule = {
  test: /\.html$/,
  use: [{ loader: 'html-loader', options: { minimize: true } }]
} */

const imgRule = {
  test: /\.(png|jpe?g|gif|ico)$/,
  use: [
    {
      loader: 'url-loader',
      options: {
        name: './img/[name].[hash:8].[ext]',
        limit: 10000
      }
    },
    { loader: 'img-loader' }
  ]
}


module.exports = {
  jsRule,
  scssRule,
  cssFontRule,
  fontRule,
  imgRule
}
const webpack = require('webpack');
module.exports = {
  entry: './src/twilio.config.js',
  output: {
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  resolve: {
      fallback: {
        util: require.resolve("util/")
      }
  },
  plugins: [
      new webpack.ProvidePlugin({ process: 'process' }),
  ]
}
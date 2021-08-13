// disclaimer: I did not write most of this code. It's from the below link with some modifications
// source: https://github.com/arcuri82/web_development_and_api_design/blob/master/les08/server_client_together/webpack.config.js

const path = require('path')
const TerserPlugin = require('terser-webpack-plugin')

module.exports = {
  entry: './src/client/index.jsx',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public'),
  },
  module: {
    rules: [
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        extractComments: false,
      }),
    ],
  },
}

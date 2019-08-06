const webpack = require('webpack')
const path = require('path')
const {
  CleanWebpackPlugin,
} = require('clean-webpack-plugin')

module.exports = {
  mode: 'development',
  devtool: 'eval-source-map',
  entry: {
    client: [
      '@babel/polyfill',
      'webpack-hot-middleware/client?reload=true',
      path.join(__dirname, 'src', 'client.js'),
    ],
  },
  // devServer: {
  //   contentBase: path.join(__dirname, 'build', 'public'),
  //   publicPath: '/',
  // },
  output: {
    path: path.join(__dirname, 'build', 'public'),
    publicPath: '/',
    filename: '[name].js',
  },
  context: __dirname,
  target: 'web',
  module: {
    rules: [
      {
        // Transpiles ES6-8 into ES5
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.handlebars$/,
        loader: 'handlebars-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],

    alias: {
      '@material-ui/core': '@material-ui/core/es',
    },
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
}

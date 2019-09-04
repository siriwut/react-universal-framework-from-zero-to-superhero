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
      'webpack-hot-middleware/client?reload=true&path=http://localhost:8000/__webpack_hmr',
      'react-hot-loader/patch',
      '@babel/polyfill',
      path.join(__dirname, 'src', 'client.js'),
    ],
  },
  devServer: {
    noInfo: false,
    publicPath: 'http://localhost:8000/',
    hot: true,
    inline: true,
    headers: { 'Access-Control-Allow-Origin': '*' },
  },
  output: {
    path: path.join(__dirname, 'build', 'public'),
    publicPath: 'http://localhost:8000/',
    filename: '[name].js',
  },
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
      'react-dom': '@hot-loader/react-dom',
    },
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
}

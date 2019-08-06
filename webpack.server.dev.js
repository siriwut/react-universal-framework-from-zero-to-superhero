const webpack = require('webpack')
const path = require('path')
const nodeExternals = require('webpack-node-externals')
const StartServerPlugin = require('start-server-webpack-plugin')
const {
  CleanWebpackPlugin,
} = require('clean-webpack-plugin')

module.exports = {
  mode: 'development',
  devtool: 'eval-source-map',
  entry: {
    server: [
      'webpack/hot/poll?1000',
      '@babel/polyfill',
      // 'webpack-hot-middleware/server?reload=true',
      path.join(__dirname, 'src', 'index.js'),
    ],
  },
  // devServer: {
  //   contentBase: './build',
  //   hot: true,
  //   inline: true,
  //   publicPath: '/build',
  // },
  output: {
    path: path.join(__dirname, 'build'),
    filename: '[name].js',
    publicPath: '/build',
  },
  context: __dirname,
  target: 'node',
  node: {
    // Need this when working with express, otherwise the build fails
    __dirname: false, // if you don't put this is, __dirname
    __filename: false, // and __filename return blank or /
  },
  externals: [
    nodeExternals({
      whitelist: [
        /@material-ui\/core\/*./,
        'webpack/hot/poll?1000',
      ],
    }),
  ], // Need this to avoid error when working with Express
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
  },
  plugins: [
    new CleanWebpackPlugin(),
    new StartServerPlugin({
      name: 'server.js',
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
}

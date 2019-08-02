const path = require('path')
const nodeExternals = require('webpack-node-externals')

module.exports = {
  mode: process.env.NODE_ENV || 'development',
  entry: {
    server: [
      '@babel/polyfill',
      path.join(__dirname, 'src', 'index.js'),
    ],
  },
  output: {
    path: path.join(__dirname, 'build'),
    filename: '[name].js',
  },
  target: 'node',
  node: {
    // Need this when working with express, otherwise the build fails
    __dirname: false, // if you don't put this is, __dirname
    __filename: false, // and __filename return blank or /
  },
  externals: [
    nodeExternals({
      whitelist: [/@material-ui\/core\/*./],
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
  plugins: [],
}

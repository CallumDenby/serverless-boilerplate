const path = require('path')
const nodeExternals = require('webpack-node-externals')
const slsw = require('serverless-webpack')

module.exports = {
  entry: slsw.lib.entries,
  externals: [nodeExternals()],
  mode: slsw.lib.webpack.isLocal ? 'development' : 'production',
  module: {
    rules: [{
      exclude: /node_modules/,
      include: __dirname,
      loaders: ['ts-loader'],
      test: /\.ts$/,
    }]
  },
  output: {
    filename: '[name].js',
    libraryTarget: 'commonjs',
    path: path.join(__dirname, '.webpack'),
  },
  resolve: {
    extensions: ['.ts']
  },
  target: 'node'
}

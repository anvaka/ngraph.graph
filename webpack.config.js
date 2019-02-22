const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  entry: {
    'ngraph.graph': './index.js',
    'ngraph.graph.min': './index.js'
  },
  output: {
    filename: '[name].js',
    library: 'ngraphGraph',
    libraryTarget: 'umd'
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        test: /.*\.min.*/
      })
    ]
  }
}

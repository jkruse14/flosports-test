const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './src/index.html',
  filename: 'index.html',
  inject: 'head',
  chunks:['styles','vendor','app','components'],
  chunksSortMode : function (chunk1, chunk2) {
    var orders = ['styles','vendor','app','components'];
    var order1 = orders.indexOf(chunk1.names[0]);
    var order2 = orders.indexOf(chunk2.names[0]);
    if (order1 > order2) {
      return 1;
    } else if (order1 < order2) {
      return -1;
    } else {
      return 0;
    }
  }
});

module.exports = {
  entry: {
    app: './src/index.js',
    vendor: './src/vendor.js',
    styles: './src/styles.css',
    components: './src/components.js'
  },
  output: {
    path : path.join(__dirname, '/public'),
    filename: '[name].js',
    publicPath: '/'
  },
  devtool:'source-map',
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.spec.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.html$/, loader:'html-loader', exclude: /node_modules/ },
      { test : /\.css$/, loader: 'style-loader!css-loader', exclude: /node_modules/ } // compiles Less to CSS 
    ],
    
  },
plugins : [HtmlWebpackPluginConfig, new ExtractTextPlugin("styles.css")]
}

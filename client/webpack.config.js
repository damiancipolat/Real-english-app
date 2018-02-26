const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path              = require('path');
const UglifyJSPlugin    = require('uglifyjs-webpack-plugin');
const CompressionPlugin = require("compression-webpack-plugin");
const webpack           = require("webpack");

module.exports = {
  entry: path.join(__dirname, '/src/app.jsx'),
  output: {
    path: path.join(__dirname, '../web/js'),
    filename: 'app.js',
  },
  plugins: [
        new ExtractTextPlugin('[name].css'),
        new CopyWebpackPlugin([{from:'src/assets/img',to:path.join(__dirname, '../web/img')}]),
        new webpack.optimize.UglifyJsPlugin({
          mangle: true,
          minimize:true,
          compress: {
            warnings:     false,
            pure_getters: true,
            unsafe:       true,
            unsafe_comps: true,
            screw_ie8:    true
          },
          output: {
            comments: false,
          }
        })       
  ],
  module: {
    loaders: [
      //JSX
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        include: path.join(__dirname, '/src'),
        loader: 'babel-loader',
        query: {
          presets: ["react", "es2015"]
        }
      },      
      //JS
      {
        test: /\.js$/,
        exclude: /node_modules/,
        include: path.join(__dirname, '/src'),
        loader: 'babel-loader',
        query: {
          presets: ["react", "es2015"]
        }
      },
      //CSS
      {
        test  : /\.css/, 
        loader: ExtractTextPlugin.extract({fallback:"style-loader", use:"css-loader"})
      },
      //LESS
      {
        test  : /\.less$/, 
        loader:  ExtractTextPlugin.extract({fallback:"style-loader", use:"css-loader!less-loader"})
      },
      //IMAGES
      {
        test: /\.(jpe?g|png|gif|svg|jpg)$/i,
        exclude: /node_modules/,
        include: path.join(__dirname, '/src/assets/img'),
        loader: "file?name=[path][name].[ext]&context=./img"
      },

      //URL
      {
        test: /\.(jpe?g|png|gif|svg|jpg)$/i,
        exclude: /node_modules/,
        include: path.join(__dirname, '/src/assets/img'),
        loader: "url-loader"
      }
    ]

  },
  watch: true,
  devtool: 'cheap-module-eval-source-map'
}

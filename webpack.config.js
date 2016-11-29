const webpack = require('webpack');
const path = require('path');

// settings for all environments
const commonConfig = {
  entry: './client/app.js',
  output: {
    path: './server/public',
    filename: 'bundle.js'
  },

  resolve: {
    extensions: ['.jsx', '.js', '']
  },

  module: {
    loaders: [
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        loader: 'babel',
      }
    ]
  }
};

// development settings
const devConfig = {
  devtool: 'source-map',
  devServer: {
    inline: true,
    historyApiFallback: true,
    contentBase: './server/public/'
  }
};

// production settings
const prodConfig = {
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      comments: false,
      compress: {
        warnings: false
      },
      mangle: {
        except: ['$'],
        screw_ie8: true,
        keep_fnames: true
      }
    })
  ]
};

const config = {};

// if TARGET is 'build' -> production mode
// if TARGET is 'dev' -> development mode
const TARGET = process.env.npm_lifecycle_event;

switch (TARGET) {

case 'dev' :
  Object.assign(config, commonConfig, devConfig);
  break;
default :
  Object.assign(config, commonConfig, prodConfig);
}

module.exports = config;

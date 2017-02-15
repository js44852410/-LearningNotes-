const ExtractTextPlugin = require('extract-text-webpack-plugin'); // 提取CSS到独立的文件
module.exports = {
  entry: './src/configs/main.js',
  output: {
    filename: './skin/m/js/m.js',
  },
  module: {
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue',
      },
      {
        test: /\.js$/, loader: 'babel',
      },
      {
        test: /\.png$/, loader: 'url?limit=8192',
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader'),
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader!sass-loader'),
      },
    ],
  },
  vue: {
    loaders: {
      sass: ExtractTextPlugin.extract('vue-style-loader', 'css-loader!sass-loader'),
    },
    cssModules: {
      localIdentName: '[path][name]---[local]---[hash:base64:5]',
      camelCase: true,
    }
  },
  plugins: [
    new ExtractTextPlugin('./skin/m/css/m.css', {
      allChunks: true,
    }),
  ],
};

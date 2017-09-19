'use strict'
const path = require('path')
const webpack = require('webpack')
var helper = require('./helper')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const utils = require('./utils.js')
const config = require('../config/index.js')
var vueLoaderConfig = require('./vue-loader.conf')
function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

var entrys = helper.getEntrys('./src/app')

const baseConf = {
  entry: entrys,
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    modules: [
    resolve('src'),
    resolve('node_modules')
  ],
    alias: {
      'src': resolve('./src'),
      'assets': resolve('./src/assets'),
      'components': resolve('./src/components'),
      'conf': resolve('./src/conf'),
      'vue$': resolve('./src/vueHook.js')
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        use: 'babel-loader',
        include: [resolve('src'), resolve('test'), resolve('node_modules/@zz-yp/vue-ui-lib/src')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 1000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 1000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  plugins: [
    new webpack
      .optimize
      .CommonsChunkPlugin({
        name: 'vendor',
        chunks: Object.keys(entrys),
        minChunks: function (module, count) {
          // any required modules inside node_modules are extracted to vendor
          return (module.resource && /\.js$/.test(module.resource) && module.resource.indexOf(path.join(__dirname, '../node_modules')) === 0 && count > 8)
        }
      }),
    // extract webpack runtime and module manifest to its own file in order to
    // prevent vendor hash from being updated whenever app bundle is updated
    new webpack
      .optimize
      .CommonsChunkPlugin({ name: 'manifest', chunks: ['vendor'] })
  ]
}
var pageUrl = {}
// 遍历生成HTML配置，需要入口文件名和HTML文件名相对应
var envTemp = process.env.NODE_ENV === 'production' ? 'production' : 'development'
Object
  .keys(entrys)
  .forEach(function (cur) {
    var temp = cur.split('_')
    var fileName = temp[0] + '.html'
    if (temp[1]) fileName = temp[0] + '/' + temp[1].toLowerCase() + '.html'
    // URL绝对地址
    pageUrl[cur] = config.host[envTemp].urlHost + fileName
    // html配置
    baseConf
      .plugins
      .push(
      // generate dist index.html with correct asset hash for caching. you can
      // customize output by editing /index.html see
      // https://github.com/ampedandwired/html-webpack-plugin
      new HtmlWebpackPlugin({
        filename: process.env === 'development'
          ? path.resolve(__dirname, fileName)
          : path.resolve(__dirname, '../dist/' + fileName),
        template: path.join('./src/html/', fileName),
        inject: true,
        minify: {
          removeComments: true,
          collapseWhitespace: false,
          removeAttributeQuotes: true
          // more options: https://github.com/kangax/html-minifier#options-quick-reference
        },
        // necessary to consistently work with multiple chunks via CommonsChunkPlugin
        chunksSortMode: 'dependency',
        chunks: ['manifest', 'vendor', cur]
      }))
  })

helper.setPageUrl(pageUrl)

module.exports = baseConf

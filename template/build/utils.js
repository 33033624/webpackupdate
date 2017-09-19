var path = require('path')
var config = require('../config')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
const AUTOPREFIXER_BROWSERS = ['Android >= 4', 'Chrome >= 35', 'iOS >= 7', 'Safari >= 7.1']
exports.assetsPath = function (_path) {
  var assetsSubDirectory = process.env.NODE_ENV === 'production'
    ? config.build.assetsSubDirectory
    : config.dev.assetsSubDirectory
  return path.posix.join(assetsSubDirectory, _path)
}
var isProduction = process.env.NODE_ENV === 'production'

exports.cssLoaders = function (options) {
  options = options || {}
  // generate loader string to be used with extract text plugin
  function generateLoaders (loaders) {
    var sourceLoader = loaders.map(function (loader) {
      var extraParamChar
      if (/\?/.test(loader)) {
        loader = loader.replace(/\?/, '-loader?')
        extraParamChar = '&'
      } else {
        loader = loader + '-loader'
        extraParamChar = '?'
      }
      return loader + (options.sourceMap ? extraParamChar + 'sourceMap' : '')
    }).join('!')

    // Extract CSS when that option is specified
    // (which is the case during production build)
    if (options.extract) {
      return ExtractTextPlugin.extract({
        use: sourceLoader,
        fallback: 'vue-style-loader'
      })
    } else {
      return ['vue-style-loader', sourceLoader].join('!')
    }
  }

  var scssLoader = options.vue ? ['css', 'sass'] : ['css', 'postcss', 'sass']
  scssLoader.push('sass-resources?resources=src/assets/css/flexible.scss')
  // http://vuejs.github.io/vue-loader/en/configurations/extract-css.html
  return {
    css: generateLoaders(['css']),
    postcss: generateLoaders(['css']),
    less: generateLoaders(['css', 'less']),
    sass: generateLoaders(['css', 'sass?indentedSyntax']),
    scss: generateLoaders(scssLoader),
    stylus: generateLoaders(['css', 'stylus']),
    styl: generateLoaders(['css', 'stylus'])
  }
}

// Generate loaders for standalone style files (outside of .vue)
exports.styleLoaders = function (options) {
  var output = []
  var loaders = exports.cssLoaders(options)
  for (var extension in loaders) {
    var loader = loaders[extension]
    // 增加autoprefixer 和 css压缩功能
    // @
    if (loader.indexOf('!') > -1) {
      var temp = loader.split('!')
      var tempArr = []
      temp.map(function (cur) {
        tempArr.push({
          loader: cur
        })
      })
      loader = tempArr
    }
    if (Array.isArray(loader)) {
      loader.map(function (cur) {
        if (cur.loader === 'postcss-loader') {
          cur.options = {
            plugins: function () {
              return [
                require('autoprefixer')({
                  browsers: AUTOPREFIXER_BROWSERS
                })
              ]
            }
          }
        } else if (cur.loader === 'css-loader' && isProduction) {
          cur.options = {
            minimize: true
          }
        }
      })
    }
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      loader: loader
    })
  }
  return output
}

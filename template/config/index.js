// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

module.exports = {
  host: {
    development: {
      apiHostM: '//youpin.m.58.com/',
      apiHost: '//youpin.58.com/',
      urlHost: '//m.zhuanzhuan.58.com/youpin/website/',
      wapPay: '//m.zhuanzhuan.58.com/youpin/pay/youpinpay.html',
      payHost: '//wx.zhuanzhuan.58.com/youpinpay'
    },
    test: {
      apiHostM: '//youpin.m.58.com/',
      apiHost: '//youpin.58.com/',
      urlHost: '//m.youpin.58.com/youpin/website/',
      wapPay: '//m.zhuanzhuan.58.com/youpin/pay/youpinpay.html',
      payHost: '//wx.zhuanzhuan.58.com/youpinpay'
    },
    production: {
      apiHostM: '//youpin.m.58.com/',
      apiHost: '//youpin.58.com/',
      urlHost: '//m.zhuanzhuan.58.com/youpin/website/',
      wapPay: '//m.zhuanzhuan.58.com/youpin/pay/youpinpay.html',
      payHost: '//wx.zhuanzhuan.58.com/youpinpay'
    }
  },
  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '//c.58cdn.com.cn/ypm/',
    productionSourceMap: false,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  },
  dev: {
    env: require('./dev.env'),
    autoOpenBrowser: false,
    port: 80,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/youpin/website/',
    proxyTable: {},
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false
  }
}

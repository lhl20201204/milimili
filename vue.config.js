const config = require('./src/config/network')
module.exports = {
  devServer: {
    open: true,
    port: 9999,
    // 以上的ip和端口是我们本机的;下面为需要跨域的
    proxy: { // 配置跨域
      '/api': {
        target: config.baseUrl, // 要跨域的域名 目标地址
        changeOrigin: true, // 是否开启跨域  是否更改源路径
        ws: true,
        pathRewrite: {
          '^/api': '' // /api/ / 凡是/api开头的地址都可以跨域
        }
      },
      '/test': {
        target: 'http://192.168.43.23:3000/', // 要跨域的域名 目标地址
        changeOrigin: true, // 是否开启跨域  是否更改源路径
        ws: true,
        pathRewrite: {
          '^/test': '' // /test/ / 凡是/test开头的地址都可以跨域
        }
      },
      '/socket.io': {
        target: config.socketUrl,
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/socket.io': '/socket.io'
        }
      }
    }
  }
}

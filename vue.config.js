module.exports = {
  devServer: {
      open: true,
      host: 'localhost',
      port: 8080,
      //以上的ip和端口是我们本机的;下面为需要跨域的
      proxy: {//配置跨域
        // "/api": {
        //   target: "http://localhost:80/api", //要跨域的域名 目标地址
        //   changeOrigin: true, //是否开启跨域  是否更改源路径
        //   ws: true,
        //   pathRewrite: {
        //       "^/api": ""  // /api/ / 凡是/api开头的地址都可以跨域
        //   }
        // }
      }
  }
}

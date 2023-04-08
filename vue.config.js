module.exports = {
    devServer: {
      proxy: {
        '/api': {
          target: 'http://192.168.0.7:30000',// 后端接口
          ws: true, // 代理websocked
          changeOrigin: true, // 是否跨域
          pathRewrite: {
            '^/api': ''
          }
        }
      }
    }
  }

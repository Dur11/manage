const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  //代理
  devServer: {
    proxy: {
      '/api': {
        target: 'http://192.168.1.30:88',
        changeOrigin: true,
        pathRewrite: {
          '/api': '',
        },
      },
    },
  },
})

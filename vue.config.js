module.exports = {
    pages: {
      index: {
        // page 的入口
        entry: 'demo/main.js',
        // 模板来源
        template: 'public/index.html',
        // 输出文件名
        filename: 'index.html'
      }
    },
    css:{
      extract:false
    },
    configureWebpack: (config) => {
      // 忽略打包配置
      config.externals = {
        // vue: 'Vue',
      };
    }
  }
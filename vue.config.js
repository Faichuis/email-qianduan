module.exports = {
    devServer: {
        disableHostCheck: true, // 让vue不强制要求使用host来访问
        host: '127.0.0.1',
        port: 8080,
        proxy: {
            '/api': {
                target: 'http://127.0.0.1:9999',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            },
            'baiduMapApi': {
                target: 'http://api.map.baidu.com',
                changeOrigin: true,
                pathRewrite: {
                    '/baiduMapApi': ''
                }
            }
        }
    },
    // publicPath:'/app',
    // outputDir:'dist',
    // indexPath:'index2.html',
    // lintOnSave:false,
    productionSourceMap: true,
    chainWebpack: (config) => {
        config.plugins.delete('prefetch');
    }
}
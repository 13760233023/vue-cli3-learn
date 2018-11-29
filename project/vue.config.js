// 用于做相应的merge处理
const merge = require('webpack-merge');

const configs = require('./config');

const path = require('path')

const resolve = dir => {
    return path.join(__dirname, dir)
}

const cfg = process.env.NODE_ENV === 'development' ? configs.build.env : configs.dev.env;
//当前环境
console.log(cfg);//{TYPE:'"dev"',IP:'"www.sdbs.com"'}

module.exports = {
    baseUrl: '',
    outputDir: 'output',//打包输出文件夹
    productionSourceMap: true,//生产环境下快速定位错误信息
    chainWebpack: config => {
        config.module
            .rule('images')
            .use('url-loader')
            .tap(options =>
                merge(options, {
                    limit: 5120,
                })
            ),
            config.resolve.alias
                .set('@', resolve('src'))
                .set('@com', resolve('src/components'))
                .set('@img', resolve('src/images'))
                .set('@views', resolve('src/views'))
    },

    //config参数为已经解析好的webpack配置

    configureWebpack: config => {

        //使用return一个对象会通过webpack-merge进行合并，plugins不会置空
        return {
            plugins: []
        }

    },
    devServer: {
        open: true,//是否自动打开浏览器页面
        host: 'localhost',//指定使用一个host，默认是localhost
        port: 8002,//端口地址
        https: false,//使用https提供服务

        // string | Object 代理设置
        proxy: {
            '/repos': {
                target: 'https://api.github.com',
                changeOrigin: true
                // pathRewrite: {'^/api': ''}
            }
        },
        progress: true,
        // 提供在服务器内部的其他中间件之前执行自定义中间件的能力
        before: app => {
            // `app` 是一个 express 实例
        }
    }

}





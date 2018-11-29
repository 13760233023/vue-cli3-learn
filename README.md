手摸手完成vue-cli3.0的配置
---
星号：请不要轻信vue ui（当然，有可能是我操作的问题，我的锅），为何呢，就是在我这里运行任务的时候，右侧的路由是我自己修改的一个命令vue-cli-service serve --mode stage，但是无论我怎么执行，构建的文件依然是dist、修改的环境配置依然是默认的development（后面会讲到如何配置环境变量），所以，很有必要养成在终端
（Terminal）中执行命令的习惯，这样能减少很多不必要的错误，真的！！（以上是个人见解，以及遇到错误后如何解决的小结）
>好了，还是进入正题吧！
>vue.config.js 的配置
>假如构建的项目中没有vue.config.js文件的话，那还是乖乖的创建一个吧，毕竟各种配置都在里面配！
>```
>module.exports = {
>    baseUrl: 'test',
>}
>```
>配置了baseUrl，那么npm run server打开的就不再是http://localhost:8080/,而会变成http://localhost:8080/test/
>outputDir:'mydist'
>当我们执行打包的时候，输出的文件夹就不再是默认的dist文件夹，而会变成mydist文件夹
>productionSourceMap
>该配置项用于设置是否为生产环境构建生成 source map，一般在生产环境下为了快速定位错误信息，我们都会开启 source map，当然，实际上他本身就默认开启了，所以可设置，也可不设置
>开启 source map 后，我们打包输出的文件中会包含 js 对应的 .map 文件
[JavaScript Source Map 详解](http://www.ruanyifeng.com/blog/2013/01/javascript_source_map.html)
>chainWebpack(表示并不是很理解，但是，简单配置应该还是没太大问题的)
>>查阅的解释大致是这样的，chainWebpack 配置项允许我们更细粒度的控制 webpack 的内部配置，其集成的是 webpack-chain 这一插件，该插件可以让我们能够使用链式操作来修改配置
```// 用于做相应的合并处理
const merge = require('webpack-merge');
module.exports = {
    // config 参数为已经解析好的 webpack 配置
    chainWebpack: config => {
        config.module
            .rule('images')
            .use('url-loader')
            .tap(options =>
                merge(options, {
                  limit: 5120,
                })
            )
    }   
}
```
>以上操作我们可以成功修改 webpack 中 module 项里配置 rules 规则为图片下的 url-loader 值，将其 limit 限制改为 5M

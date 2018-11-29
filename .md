手摸手完成vue-cli3.0的配置（小结）
---
星号：请不要轻信vue ui（当然，有可能是我操作的问题，我的锅[当然，中断，重新执行vue ui能解决这个问题，但是重复操作，还是不建议这么做]），为何呢，就是在我这里运行任务的时候，右侧的路由是我自己修改的一个命令vue-cli-service serve --mode stage，但是无论我怎么执行，修改的环境配置依然是默认的development（后面会讲到如何配置环境变量），所以，很有必要养成在终端（Terminal）中执行命令的习惯，这样能减少很多不必要的错误，真的！！（以上是个人见解，以及遇到错误后如何解决的小结）
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
>查阅的解释大致是这样的，chainWebpack 配置项允许我们更细粒度的控制 webpack 的内部配置，其集成的是 webpack-chain 这一插件，该插件可以让我们能够使用链式操作来修改配置
>```// 用于做相应的合并处理
>const merge = require('webpack-merge');
>module.exports = {
>    // config 参数为已经解析好的 webpack 配置
>    chainWebpack: config => {
>        config.module
>            .rule('images')
>            .use('url-loader')
>            .tap(options =>
>                merge(options, {
>                  limit: 5120,
>                })
>            )
>    }   
>}
>```
>以上操作我们可以成功修改 webpack 中 module 项里配置 rules 规则为图片下的 url-loader 值，将其 limit 限制改为 5M
>devServer
>devServer 项用于配置 webpack-dev-server 的行为，使得我们可以对本地服务器进行相应配置，我们在命令行中运行的 yarn serve 对应的命令 vue-cli-service serve 其实便是基于 webpack-dev-server 开启的一个本地服务器。
>```
>devServer: {
>        open: true, // 是否自动打开浏览器页面
>        host: '0.0.0.0', // 指定使用一个 host。默认是 localhost
>        port: 8080, // 端口地址
>        https: false, // 使用https提供服务
>        proxy: null, // string | Object 代理设置
> }
>```
env文件的介绍和环境设置
>众所周知，一般项目都会配置3种环境：开发环境、测试环境、生产环境（线上环境）
>>开发环境，就是平时开发使用的环境
>>测试环境，其实和线上环境几乎相同，当然，大多bug都是在测试环境解决
>>生产环境，正式对外发布的版本，一般都会进行优化，关掉错误报告等等
>我们可以在根目录下创建以下形式的文件进行不同环境下变量的配置：
>```
>.env                # 在所有的环境中被载入
>.env.local          # 在所有的环境中被载入，但会被 git 忽略
>.env.[mode]         # 只在指定的模式中被载入
>.env.[mode].local   # 只在指定的模式中被载入，但会被 git 忽略...
>```
>首先创建一个.env.test文件，使其只能在test环境下被加载
>>```
>>NODE_ENV=stage
>>VUE_APP_TITLE=stage mode
>>```
>在vue.config.js里面是这样访问的
>console.log(process.env.NODE_ENV);//development(在终端输出结果)
>输出的结果并不是想象中的test~
>进入下一步，来到根目录的package.json添加修改一下
>>```
>>"scripts": {
>>  "stage": "vue-cli-service serve --mode stage"
>>}
>>```
>>这个时候在终端执行npm run stage
>>可以看到，这时终端输出的信息就是想要的stage
>如果是 .env.stage.local 文件中配置成上方这样，答案便是 staging
>>.env.stage.local文件
>>```
>>NODE_ENV=staging
>>VUE_APP_TITLE=staging mode
>>VUE_APP_NAME=project
>>```
>>此刻，当我们执行npm run stage时--->想一下之前.env.stage文件中,NODE_ENV=stage,理论上输出也会是stage，然而
>>>console.log(process.env.NODE_ENV);//staging(在终端输出结果)
>>也就是说，.env.[mode].local文件的配置权重大于.env.[mode]文件
>```
>.env.[mode].local > .env.[mode] 
>```
下面讲一下额外的配置
***
>额....表示翻阅了很多资料后才发现，.env文件无法使用动态参数，这就尴尬了，因此，还是学一下vue-cli2.0的时候，弄个config文件夹吧
>>```
>>//公共变量
>>const com = {
>>    IP: JSON.stringify('xxx')
>>};
>>module.exports = {
>>    //开发环境变量
>>    dev: {
>>        env: {
>>            TYPE: JSON.stringify('dev'),
>>            ...com
>>        }
>>    },
>>    //生产环境变量
>>    build: {
>>        env: {
>>            TYPE: JSON.stringify('prod'),
>>            ...com           （ps:方便提取公共配置、即上面的定量com）
>>        }
>>    }
>>}
>>```
>回到vue.config.js文件中
>>```
>>const configs = require('./config');
>>// 根据环境判断使用哪份配置
>>const cfg = process.env.NODE_ENV === 'production' ? configs.build.env : configs.dev.env;
>>```
>有需要补充的，后期再说吧，毕竟都是参考文档和一些大神的文章，再总结一二出来的，终究有所不足，继续learning！！！

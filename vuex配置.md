vuex配置
***
>插一句，2种常用的路由懒加载的写法
>```
>import Vue from 'vue'
>import Router from 'vue-router'
>const Home = (resolve => {
>    require.ensure(['@views/Home.vue'], () => {
>        resolve(require('@views/Home.vue'))
>    })
>})
>
>Vue.use(Router)
>
>export default new Router({
>    mode: 'history',
>    routes: [
>        {
>            path: '/',
>            name: 'home',
>            component:Home
>        },
>        {
>            path: '/about',
>            name: 'about',
>            component:(resolve) => require(["@views/About.vue"], resolve),
>        }
>    ]
>})
>```
>>假如执行过程中resolve报错，请查看vue.config.js！
>进入正题(老实交代，vuex的高级用法不是太了解)
>Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式。使用cli生成的配置文件store.js中的内容：
>```
>import Vue from 'vue'
>import Vuex from 'vuex'
>Vue.use(Vuex)
>export default new Vuex.Store({
>    state: {
>
>    },
>    mutations: {
>
>    },
>    actions: {
>
>    }
>})
>```
vuex的核心主要就是state，mutations，actions，getter，具体的还是看一哈官网！
>借用大神的一句话：**我们通过 actions 提交 mutations 去 修改 state 的值并通过 getter 获取。**
>[what is Vuex?](https://vuex.vuejs.org/zh/)
>具体的目录列表如下：(可参照着看）
>```
>└── store
>    ├── index.js          # 我们组装模块并导出 store 的地方
>    ├── actions.js        # 根级别的 action
>    ├── mutations.js      # 根级别的 mutation
>    └── modules
>        └── moduleA.js    # A模块
>```
>moduleA.js
>>```
>>const moduleA = {
>>    state: {
>>        text: 'hello'
>>    },
>>    mutations: {
>>        addText (state, txt) {
>>            // 这里的 `state` 对象是模块的局部状态
>>            state.text += txt
>>        }
>>    },
>>    actions: {
>>        setText ({ commit }) {
>>            commit('addText', ' world')
>>        }
>>    },
>>    getters: {
>>        getText (state) {
>>            return state.text + '!'
>>        }
>>    }
>>}
>>export default moduleA
>>```
>导出A模块，并在index.js中引入：
>>```
>>import Vue from 'vue'
>>import Vuex from 'vuex'
>>import moduleA from './modules/moduleA.js'
>>import {mutations} from './mutations.js'
>>import actions from './actions.js'
>>
>>Vue.use(Vuex)
>>
>>export default new Vuex.Store({
>>    state:{
>>        groups:[1]
>>    },
>>    modules:{
>>        moduleA //引入A模块
>>    },
>>    actions,
>>    mutations,
>>    getters:{
>>        getGroups(state){
>>            return state.groups
>>        }
>>    }
>>})
>>```

import Vue from 'vue'
import Router from 'vue-router'

const Home = (resolve => {
    require.ensure(['@views/Home.vue'], () => {
        resolve(require('@views/Home.vue'))
    })
})

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'home',
            component:Home
        },
        {
            path: '/about',
            name: 'about',
            component:(resolve) => require(["@views/About.vue"], resolve),
        }
    ]
})





import Vue from 'vue'
import Vuex from 'vuex'
import moduleA from './modules/moduleA.js'
import {mutations} from './mutations.js'
import actions from './actions.js'

Vue.use(Vuex)

export default new Vuex.Store({
    state:{
        groups:[1]
    },
    modules:{
        moduleA //引入A模块
    },
    actions,
    mutations,
    getters:{
        getGroups(state){
            return state.groups
        }
    }
})

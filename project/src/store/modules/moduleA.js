const moduleA={
    state:{
        text:'hello'
    },
    mutations:{
        addText(state,txt){
            // 这里的 `state` 对象是模块的局部状态
            state.text+=txt
        }
    },
    getters:{
        getText (state) {
            return state.text + '!'
        }
    },
    actions:{
        setText({commit}){
            commit('addText','world')
        }
    }
}
export default moduleA

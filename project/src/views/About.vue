<template>
    <div class="about">
        <h1>{{prompt}}</h1>
        <div>
            text值为：{{getText}}
            <button type="button" @click="setText">修改text值</button>
        </div>

        <div>
            groups值为：{{getGroups}}
            <button type="button" @click="setGroup(getGroups.length + 1)">修改groups值</button>
        </div>

        <div>
            http数据：{{dataStatus}}
            <button type="button" @click="getHttpData">获取github数据</button>
        </div>
    </div>
</template>

<script>
    //mapGetters 辅助函数
    //mapGetters 辅助函数仅仅是将 store 中的 getter 映射到局部计算属性

    //mapGetters 在组件中分发
    //你在组件中使用 this.$store.dispatch('xxx') 分发 action，
    //或者使用 mapActions 辅助函数将组件的 methods 映射为 store.dispatch 调用（需要先在根节点注入 store）：

    //官方解释
    import {mapGetters, mapActions} from 'vuex'
    import {getTestData} from '../service/moduleA'

    export default {
        name: 'about',
        data() {
            return {
                prompt: 'vuex简单使用',
                dataStatus: '未获取'
            }
        },
        computed: {
            // 使用对象展开运算符将 getter 混入 computed 对象中
            ...mapGetters([
                'getText',
                'getGroups',
            ])
        },
        methods: {
            // 获取 github 数据
            getHttpData() {
                getTestData()
                    .then(response => {
                        console.log(response);
                        this.dataStatus = '获取成功'
                    })
            },
            ...mapActions([
                'setText', // 将 `this.setText()` 映射为 `this.$store.dispatch('setText')`
                'setGroup',
            ])
        }
    }
</script>

<style scoped>
    button {
        border: 1px solid #ccc;
        border-radius: 5px;
    }
</style>

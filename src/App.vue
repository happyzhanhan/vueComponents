<template>
 <div class="layout">
    <div class="layoutleft">
      <h4>组件列表</h4>
      <div v-for="item in list" :key="item.id" @click="cur = item.id" :class="{'hover': cur === item.id}">{{ item.name }}</div>
    </div>
    <div class="layoutright">
      <h4>示例：</h4>
      <component :is="list[cur].component"></component>
    </div>
  </div>
</template>

<script>
import login from './page/login.vue'
import layer from './page/layer.vue'
import color from './page/color.vue'
import loading from './page/loading.vue'
import lottie from './page/lottie.vue'
import svgLoad from './page/svgLoad.vue'

export default {
  name: 'app',
  components:{
    login, layer, color, loading, lottie, svgLoad
  },
  data () {
    return {
      // list组件列表，id必须是index下标
      list:[
        {
          id:0,
          name: '表单',
          component: 'login'
        },
        {
          id:1,
          name: '图层',
          component: 'layer'
        },
        {
          id:2,
          name: '颜色选择',
          component: 'color'
        },
        {
          id:3,
          name: 'Png序列帧',
          component: 'loading'
        },
        {
          id:4,
          name: 'lottie动画',
          component: 'lottie'
        },
        {
          id:5,
          name: 'svg动画',
          component: 'svgLoad'
        },
      ],
      cur: 0,
    }
  },
  methods:{
    commit(){
      console.log(this.init,this.init2)
    },
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
 .layout{
  display: flex;
  flex-direction: row;
  justify-content: space-around;
 }
 .layoutleft{
  padding: 30px 0;
  width: 10%;
  min-height: 90vh;
  padding-right: 20px;
  border-right: 1px solid #ddd;
  h4{
    text-align: right;
  }
  >div{
    font-size: 14px;
    line-height: 30px;
    cursor: pointer;
    text-align: right;
    &.hover, &:hover{
      color: #1676ff;
    }
  }
 }
 .layoutright{
  width: 90%;
  padding: 30px;
 }
 
</style>

<template>
 <div class='divBox'>
  <color-pick v-model="textColor" @change="(val)=>changedata('textColor', val)" title="选择颜色" :predefine="predefineColor" icon="showcolor"></color-pick>
 </div>
</template>

<script>
import colorPick from '../components/colorPick.vue';
export default {
  name: 'color',
  components: {
    colorPick
  },
  data(){
    return{
      textColor: '#000000',
      predefineColor: [ // 默认预选颜色选项
          '#FFFFFF',
          '#000000',
          '#FF0000',
          '#FFFF00',
          '#FF7A00',
          '#00FF00',
          '#00FFC6',
          '#0000FF',
          '#7E00FF',
        ],
    }
  },
  methods:{
    changedata(name, val){
      console.log(name, val)
    }
  }
}
</script>

<style scoped lang='scss'>
.showcolor{
  width: 30px;
  height: 30px;
 background: #eee;
}
</style>

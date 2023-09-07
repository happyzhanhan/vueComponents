<template>
 <div class='divBox'>
    <inputSearch :pname="msg" v-model="init"></inputSearch>
    <selectSearch :pname="msg2" v-model="init2" :options="options"></selectSearch>
    <button class="zzh-button" @click="commit">确定</button>
 </div>
</template>

<script>
import inputSearch from '../components/inputSearch'
import selectSearch from '../components/selectSearch'
export default {
  name: 'login',
  components:{
    inputSearch, selectSearch,
  },
  data () {
    return {
      msg: 'Name',
      init: '123456',
      msg2: 'sex',
      init2: '0',
      options:[{
        value: "0",
        label: "男"
      },{
        value: "1",
        label: "女"
      }],
    }
  },
  methods:{
    commit(){
      console.log(this.init,this.init2)
    },
  }
}
</script>

<style scoped lang='scss'>
 .zzh-button{
    width: 220px;
    margin-top:20px;
    cursor: pointer;
  }

</style>

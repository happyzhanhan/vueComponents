<template>
  <div id="app">
    <inputSearch :pname="msg" v-model="init"></inputSearch>
    <button class="zzh-button" @click="commit">确定</button>
  </div>
</template>

<script>
import inputSearch from './components/inputSearch'
export default {
  name: 'app',
  components:{
    inputSearch
  },
  data () {
    return {
      msg: 'Name',
      init: '123456'
    }
  },
  methods:{
    commit(){
      console.log(this.init)
    }
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
  .zzh-button{
    width: 220px;
    margin-top:20px;
    cursor: pointer;
  }
</style>

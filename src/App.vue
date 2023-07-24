<template>
  <div id="app">
    <div>
      <inputSearch :pname="msg" v-model="init"></inputSearch>
      <selectSearch :pname="msg2" v-model="init2" :options="options"></selectSearch>
      <button class="zzh-button" @click="commit">确定</button>



      <div class="classflex">
        <div class="smallLeft">
          <dragGroup v-model="groupLayer" :initId="10"></dragGroup>
        </div>

        <div class="smallright code">
          <div v-html="beautifyJson(groupLayer)"></div>
        </div>
      </div>
     

    </div>
  </div>
</template>

<script>
import inputSearch from './components/inputSearch'
import selectSearch from './components/selectSearch'
import dragGroup from './components/dragGroup'
export default {
  name: 'app',
  components:{
    inputSearch, selectSearch,dragGroup
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
      groupLayer: [
        {
          "name": "T_4",
          "id": 4,
          "icon": "zhiconfont-iconfontwenzi",
          "isEdit": 0,
          "visible": true,
          "isGroup": 0
        },
        {
          "name": "G_1",
          "id": 1,
          "visible": true,
          "isGroup": 1,
          "isClose": 0,
          "isEdit": 0,
          "links": [
            {
              "name": "T_3",
              "id": 3,
              "icon": "zhiconfont-iconfontwenzi",
              "isEdit": 0,
              "visible": true,
              "isGroup": 0
            },
            {
              "name": "T_2",
              "id": 2,
              "icon": "zhiconfont-iconfontwenzi",
              "isEdit": 0,
              "visible": true,
              "isGroup": 0
            }
          ]
        }
      ]
    }
  },
  methods:{
    commit(){
      console.log(this.init,this.init2)
    },
    beautifyJson(json) {
      if (typeof json != 'string') {
        json = JSON.stringify(json, undefined, 2);
      }
      json = json.replace(/&/g, '&').replace(/</g, '<').replace(/>/g, '>').replaceAll('{','{<br>').replaceAll('}','<br>}').replaceAll(',',',<br>');
      return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
        let cls = 'number';
        if (/^"/.test(match)) {
          if (/:$/.test(match)) {
            cls = 'key';
          } else {
            cls = 'string';
          }
        } else if (/true|false/.test(match)) {
          cls = 'boolean';
        } else if (/null/.test(match)) {
          cls = 'null';
        }
        return '<span class="' + cls + '">' + match + '</span>';
      });
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

  .smallLeft{
    width: 500px;
  }
  .classflex{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .smallright{
    width: 800px;
    height: 500px;
    padding: 10px;
    background: #eee;
    overflow-y: auto;
    text-align: left;
  }

  .code{
    .key{
      color:green;
      padding-left: 20px;
    }
    .string{
      color:blueviolet;
    }
    .boolean{
      color: brown;
    }
    .number{
      color: #408ee7;
    }
  }
</style>

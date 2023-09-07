<template>
  <div class="classflex">
    <div class="smallLeft">
      <dragGroup v-model="groupLayer" :initId="10"></dragGroup>
    </div>

    <div class="smallright code">
      <div v-html="beautifyJson(groupLayer)"></div>
    </div>
  </div>
     
</template>

<script>
import dragGroup from '../components/dragGroup'
export default {
  name: 'layer',
  components:{
    dragGroup
  },
  data () {
    return {
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

<style scoped lang='scss'>
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

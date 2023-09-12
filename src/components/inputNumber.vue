<template>
  <div>
      <b>{{name}}:</b>
      <input type="nmber" class="zzh-input" v-model="data" @change="changeData" @keyup="data=oninput(data)">
  </div>
  </template>
  
  <script>
      export default {
          name: "inputSearch",
          props: {
              pname:{
                  type:String,
                  default:'Price',
              },
              value:{
                  type:String,
                  default: ''
              }
          },
          data(){
              return{
                  name:this.pname,
                  data:this.value,
              }
          },
          watch:{
              value(newval, oldval){
                  this.data = newval;
              }
          },
          methods: {
              changeData(){
                  this.$emit('input', this.data) // 原子化组件传值props
              },
              // 数字校验超出2位数字删除重新输，不是数字或点删除重新输，首尾是点删除重新输
              oninput(num) {
                var str = num
                var len1 = str.substr(0, 1)
                var len2 = str.substr(1, 1)
                //如果第一位是0，第二位不是点，就用数字把点替换掉
                if (str.length > 1 && len1 == 0 && len2 != ".") {
                  str = str.substr(1, 1)
                }
                //第一位不能是.
                if (len1 == ".") {
                  str = ""
                }
                //限制只能输入一个小数点
                if (str.indexOf(".") != -1) {
                  var str_ = str.substr(str.indexOf(".") + 1)
                  if (str_.indexOf(".") != -1) {
                    str = str.substr(0, str.indexOf(".") + str_.indexOf(".") + 1)
                  }
                }
                //正则替换
                str = str.replace(/[^\d^\.]+/g, '') // 保留数字和小数点
                str = str.replace(/\.\d\d\d$/,'') // 小数点后只能输两位
                return str
              },
          }
      }
  </script>
  
  <style scoped>
  .zzh-input{
      outline: none;
      margin-top: 20px;
  }
  </style>
  
/*
 * @Author: zhouzhenhan 11902941+zhouzhenhan@user.noreply.gitee.com
 * @Date: 2022-05-09 19:07:14
 * @LastEditors: zhouzhenhan 11902941+zhouzhenhan@user.noreply.gitee.com
 * @LastEditTime: 2023-07-24 16:02:29
 * @FilePath: \vueComponents\src\main.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Vue from 'vue'
import App from './App.vue'

import inputSearch from '../src/components/inputSearch'
import selectSearch from '../src/components/selectSearch'
import dragGroup from '../src/components/dragGroup'

const components = [
  inputSearch, selectSearch,
]
const install = function (Vue) {
  if (install.installed) return
  // 遍历注册全局组件
  components.map(component => Vue.component(component.name, component))

  // 这一步判断window.Vue是否存在，因为直接引用vue.min.js， 它会把Vue绑到Window上，我们直接引用打包好的js才能正常跑起来。
  if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue)
  }
}
new Vue({
  el: '#app',
  render: h => h(App)
})
export default  install;

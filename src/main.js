/*
 * @Author: zhouzhenhan 11902941+zhouzhenhan@user.noreply.gitee.com
 * @Date: 2022-05-09 19:07:14
 * @LastEditors: zhouzhenhan
 * @LastEditTime: 2023-09-12 11:21:19
 * @FilePath: \vueComponents\src\main.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Vue from 'vue'
import App from './App.vue'

import inputSearch from '../src/components/inputSearch'
import selectSearch from '../src/components/selectSearch'
import dragGroup from '../src/components/dragGroup'
import colorPick from '../src/components/colorPick'
import gifLoading from '../src/components/gifLoading'
import lottie from '../src/components/lottie'
import svgLoading from '../src/components/svgLoading'
import inputNumber from '../src/components/inputNumber'

// import {inputSearch, selectSearch, dragGroup, colorPick, gifLoading, lottie, svgLoading, inputNumber} from '../src/components'

const components = [
  inputSearch, selectSearch, dragGroup, colorPick, gifLoading, lottie, svgLoading, inputNumber
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

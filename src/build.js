import inputSearch from './components/inputSearch'
import selectSearch from './components/selectSearch'
import dragGroup from './components/dragGroup'
import colorPick from './components/colorPick'
import gifLoading from './components/gifLoading'
import lottie from './components/lottie'
import svgLoading from './components/svgLoading'
import inputNumber from './components/inputNumber'
// import {inputSearch, selectSearch, dragGroup, colorPick, gifLoading, lottie, svgLoading, inputNumber} from './components'

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
export default  install;

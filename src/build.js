import inputSearch from './components/inputSearch'
import selectSearch from './components/selectSearch'

const components = [
    inputSearch, selectSearch
]
const install = function (Vue) {
    if(install.installed) return;
    components.map(component =>Vue.components(component.name, component))

    if(typeof window !=="undefined" && window.Vue){
        install(window.Vue)
    }
}
export default  install;

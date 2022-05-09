import inputSearch from './components/inputSearch'

const components = [
    inputSearch,
]
const install = function (Vue) {
    if(install.installed) return;
    components.map(component =>Vue.components(component.name, component))

    if(typeof window !=="undefined" && window.Vue){
        install(window.Vue)
    }
}
export default  install;

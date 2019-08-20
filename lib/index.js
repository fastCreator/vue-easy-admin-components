const components = []

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}
const install = function (Vue) {
  components.forEach(component => {
    Vue.component(component.name, component)
  })
}
export default {
  install
}

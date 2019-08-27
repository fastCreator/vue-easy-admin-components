import mutipityeWrap from './elpand-mutipityeWrap'
import select from './elpand-select'
import table from './elpand-table'
const components = [mutipityeWrap, select, table, ]

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}
const install = function (Vue) {
  components.forEach(component => {
    Vue.component(component.name, component)
  })
}
export default {
	mutipityeWrap, 
	select, 
	table, 
  install
}

import form from './elpand-form'
import mutipityeWrap from './elpand-mutipityeWrap'
import select from './elpand-select'
import table from './elpand-table'
const components = [form, mutipityeWrap, select, table, ]

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}
const install = function (Vue) {
  components.forEach(component => {
    Vue.component(component.name, component)
  })
}
export default {
	form, 
	mutipityeWrap, 
	select, 
	table, 
  install
}

import upload from './elpand-upload'
import address from './elpand-address'
import inputUpload from './elpand-inputUpload'
import mostSelect from './elpand-mostSelect'
import form from './elpand-form'
import mutipityeWrap from './elpand-mutipityeWrap'
import select from './elpand-select'
import table from './elpand-table'
const components = [
  upload,
  address,
  inputUpload,
  mostSelect,
  form,
  mutipityeWrap,
  select,
  table
]

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}
const install = function (Vue) {
  components.forEach(component => {
    Vue.component(component.name, component)
  })
}

export const elpandTable = table
export const elpandUpload = upload
export const elpandAddress = address
export const elpandInputUpload = inputUpload
export const elpandMostSelect = mostSelect
export const elpandForm = form
export const elpandMutipityeWrap = mutipityeWrap
export const elpandSelect = select

export default {
  install
}

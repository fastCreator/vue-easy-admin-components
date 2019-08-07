import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueRouter from 'vue-router'
import configs from './configs'
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(VueRouter)

const regex = /\.\/(.+)\/index\.vue$/

const context = require.context('../lib', true, /\.\/(.+)\/index\.vue$/)
let routes = context.keys().map(key => ({
  path: `/${key.match(regex)[1]}`,
  component: context(key).default
}))
const router = new VueRouter({
  routes
})
new Vue({
  data () {
    return {
      configs: configs
    }
  },
  computed: {
    doc () {
      return this.configs.find(it => it.path === this.$route.path)
    }
  },
  router,
  render: h => h(App)
}).$mount('#app')

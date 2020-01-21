<template>
  <div class="elpand-layoutSidebar">
    <logo v-if="logo.showLogo" v-bind="logo" :collapse="collapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="collapse"
        v-bind="menu"
        mode="vertical"
      >
        <sidebar-item
          v-for="route in navs"
          :key="route.path"
          :item="route"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>
<script>
import logo from './Logo'
import SidebarItem from './SidebarItem'
export default {
  name: 'elpand-layoutSidebar',
  components: {
    logo,
    SidebarItem
  },
  props: {
    activeMenu: {},
    collapse: {},
    navs: {},
    logo: {},
    menu: {}
  },
  data () {
    return {}
  },
  created () {
    console.log(this.navs)
  },
  methods: {}
}
</script>
<style lang="less">
.elpand-layoutSidebar {
}
</style>

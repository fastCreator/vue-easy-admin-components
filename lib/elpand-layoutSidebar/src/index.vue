<template>
  <div class="elpand-layoutSidebar">
    <logo v-if="logo.showLogo" v-bind="logo" :collapse="collapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="collapse"
        unique-opened
        v-bind="menu"
        mode="vertical"
      >
        <sidebar-item
          v-for="(route,index) in navs"
          :key="route.path"
          :item="route"
          :basePath="`${index}`"
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
    console.log(this.collapse)
    console.log(this.activeMenu)
  },
  methods: {}
}
</script>
<style lang="less">
.elpand-layoutSidebar {
}
</style>

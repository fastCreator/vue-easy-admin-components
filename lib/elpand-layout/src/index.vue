<template>
  <div class="elpand-layout">
    <elpand-layoutSidebar
      v-bind="layout.sidebar"
      :collapse="collapse"
      :navs="navs"
      :activeMenu="activeMenu"
    />
    <router-view />
  </div>
</template>

<script>
import { treeFilter } from '../../utils/commom'
import { mapState } from 'vuex'
export default {
  name: 'elpand-layout',
  data () {
    return {
      collapse: true
    }
  },
  computed: {
    ...mapState({
      layout: state => state.layout,
      resize: state => state.resize,
      navs (state) {
        return state.navs.navs
        // return treeFilter(state.navs.navs, state.permission.permission)
      }
    }),
    activeMenu() {
      return this.$route.path
    }
  },
  created () {},
  methods: {
    handleClickOutside () {}
  }
}
</script>

<style lang="scss" scoped></style>

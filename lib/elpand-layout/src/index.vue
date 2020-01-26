<template>
  <div class="elpand-layout">
    <elpand-layoutSidebar
      class="layoutSidebar"
      v-bind="layout.sidebar"
      :collapse="collapse"
      :navs="navs"
      :activeMenu="activeMenu"
      :style="{width:collapse?null:width}"
    />
    <div class="layoutRight">
      <el-button @click="toggleSidebar">切换</el-button>
      <router-view />
    </div>
  </div>
</template>

<script>
import { treeFilter } from '../../utils/commom'
import { mapState } from 'vuex'
export default {
  name: 'elpand-layout',
  props: {
    width: {
      default: '210px'
    }
  },
  data () {
    return {
      collapse: false
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
    activeMenu () {
      return this.$route.path
    }
  },
  created () { },
  methods: {
    handleClickOutside () { },
    toggleSidebar () {
      this.collapse = !this.collapse
    }
  }
}
</script>

<style lang="less">
.elpand-layout {
  display: flex;
  .elpand-layoutSidebar {
    height: 100vh;
    display: flex;
    flex-direction: column;
    .el-scrollbar {
      flex: 1;
      .scrollbar-wrapper {
        overflow-x: hidden;
        .el-scrollbar__view {
          height: 100%;
          > .el-menu {
            height: 100%;
          }
        }
      }
    }

    // .el-menu {
    //   width: 210px;
    // }
  }
}
</style>

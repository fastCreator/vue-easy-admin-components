<template>
  <div :class="{'elpand-layout':true,affixHeader:layout.setting.affixHeader,collapse:collapse}">
      <elpand-layoutSidebar
      v-bind="layout.sidebar"
      :collapse="collapse"
      :navs="navs"
      :activeMenu="activeMenu"
      @menuSelect="menuSelect"
    />
    <div class="layoutRight">
        <div class="header-container">
          <elpand-layoutHeader @toggle="handlerToggle" :collapse="collapse" :selectRouter="selectRouter"></elpand-layoutHeader>
          <TagsView v-show="layout.setting.tagsView" @changeTag="changeTag" :selectRouter="selectRouter"/>
        </div>
        <app-main :class="{tagsView:layout.setting.tagsView}" :show="show" :tags="tags"/>
    </div>
    <elpand-layoutSetting v-if="layout.setting.show"/>
  </div>
</template>

<script>
import { treeFilter } from '../../utils/commom'
import { mapState } from 'vuex'
import appMain from './appMain'
import TagsView from './TagsView/index'
export default {
  name: 'elpand-layout',
  components: {
    appMain,
    TagsView
  },
  data () {
    return {
      collapse: false,
      tags: [],
      show: true,
      selectRouter: null,
      affixHeader: false
    }
  },
  watch: {
    $route: {
      handler (n) {
        if (n.path.slice(0, 6) === '/local' && !n.meta.nav.hide) {
          this.selectRouter = n
        }
      },
      immediate: true
    },
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
    },
  },
  created () {
  },
  methods: {
    handleClickOutside () { },
    handlerToggle () {
      this.collapse = !this.collapse
    },
    changeTag (tags) {
      this.tags = tags
    },
    menuSelect () {
      this.show = false
      setTimeout(() => {
        this.show = true
      }, 0)
    }
  }
}
</script>

<style lang="less">
.elpand-layout {
  display: flex;
  &.affixHeader {
    &.collapse {
      .header-container {
        width: calc(100% - 54px);
      }
    }
    .header-container {
      z-index: 200;
      position: fixed;
      top: 0;
      width: calc(100% - 210px);
    }
    .app-main {
      padding-top: 50px;
      &.tagsView {
        padding-top: 85px;
      }
    }
  }
  &.collapse {
    .elpand-layoutSidebar {
      width: 54px;
    }
    .layoutRight {
      margin-left: 54px;
    }
  }
  .elpand-layoutSidebar-wrap {
    width: 210px;
  }
  .elpand-layoutSidebar {
    z-index: 99;
    position: fixed;
    top: 0;
    height: 100vh;
    display: flex;
    flex-direction: column;
    transition: all 0.28s;
    background-color: rgb(84, 92, 100);
    width: 210px;
    .el-scrollbar {
      flex: 1;
      .scrollbar-wrapper {
        overflow-x: hidden;
        .el-scrollbar__view {
          height: 100%;
          > .el-menu {
            height: 100%;
            width: 100%;
            border: none;
            a {
              text-decoration: none;
            }
          }
        }
      }
    }
  }
  .elpand-layoutHeader {
    height: 50px;
  }
  .layoutRight {
    transition: all 0.28s;
    flex: 1;
    position: relative;
    height: 100vh;
    margin-left: 210px;
  }
}
</style>

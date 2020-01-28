<template>
    <div class="elpand-layoutSetting">
      <div v-if="mask" class="mask" @click="toggleMask"></div>
      <div :class="{rightPanel:true,hasMask:mask}">
        <div class="icon" @click="toggleMask">
          <i :class="mask?'el-icon-close':'el-icon-setting'"></i>
        </div>
        <div class="drawer-container">
          <div>
            <h3 class="drawer-title">{{lang.title}}</h3>

            <div class="drawer-item" v-if="theme">
              <span>{{lang.theme}}</span>
              <el-select :value="theme.theme" @change="changeThem">
                <el-option
                  v-for="item in theme.list"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>

            <div class="drawer-item" v-if="lang">
              <span>{{lang.lang}}</span>
              <el-select :value="language.locale" @change="changeLang">
                <el-option
                  v-for="item in language.list"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>

            <div class="drawer-item">
              <span>{{lang.tagsView}}</span>
              <el-switch :value="layout.setting.tagsView" @change="changeSetting('tagsView',$event)"/>
            </div>

            <div class="drawer-item">
              <span>{{lang.affixHeader}}</span>
              <el-switch :value="layout.setting.affixHeader" @change="changeSetting('affixHeader',$event)"/>
            </div>

            <div class="drawer-item">
              <span>{{lang.logo}}</span>
              <el-switch :value="layout.sidebar.logo.showLogo" @change="changeLogo"/>
            </div>   

          </div>
        </div>
      </div>
    </div>
</template>
<script>
import lang from './lang.json'
import { mapState } from 'vuex'
export default {
  name: 'elpand-layoutSetting',
  data () {
    return {
      mask: false
    }
  },
  created () {
    this.lang = lang
  },
  methods: {
    toggleMask () {
      this.mask = !this.mask
    },
    changeSetting (name, v) {
      this.$store.commit('setLayoutsetting', { ...this.layout.setting, [name]: v })
    },
    changeLogo (v) {
      let o = JSON.parse(JSON.stringify(this.layout.sidebar))
      o.logo.showLogo = v
      this.$store.commit('setLayoutsidebar', o)
    },
    changeLang (v) {
      this.$store.commit('setLang', v)
    },
    changeThem (v) {
      this.$store.commit('setTheme', v)
    }
  },
  computed: {
    ...mapState({
      layout: state => state.layout,
      theme: state => state.theme,
      language: state => state.lang,
    }),
  }
}
</script>
<style lang="less">
.elpand-layoutSetting {
  .mask {
    z-index: 300;
    position: fixed;
    align-items: center;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.2);
  }
  .rightPanel {
    display: flex;
    z-index: 400;
    position: fixed;
    align-items: center;
    top: 0;
    right: -260px;
    transition: right 0.3s;
    &.hasMask {
      right: 0px;
    }
    .icon {
      background-color: rgb(24, 144, 255);
      cursor: pointer;
      width: 48px;
      height: 48px;
      border-radius: 6px 0 0 6px;
      color: #ffffff;
      line-height: 48px;
      font-size: 24px;
      text-align: center;
    }
    .drawer-container {
      width: 260px;
      height: 100vh;
      overflow: auto;
      background: #ffffff;
      padding: 24px;
      font-size: 14px;
      line-height: 1.5;
      word-wrap: break-word;
      box-sizing: border-box;
      .drawer-title {
        margin-bottom: 12px;
        color: rgba(0, 0, 0, 0.85);
        font-size: 14px;
        line-height: 22px;
      }
      .drawer-item {
        color: rgba(0, 0, 0, 0.65);
        font-size: 14px;
        padding: 12px 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .el-select {
          width: 140px;
        }
      }
    }
  }
}
</style>

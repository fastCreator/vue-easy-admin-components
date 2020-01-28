<template>
<div class="elpand-layoutHeader">
    <Hamburger @toggle="handlerToggle" :isActive="!collapse"/>
    <Breadcrumb :nav="selectRouter.meta.nav"/>
</div>
</template>
<script>
import Hamburger from './Hamburger'
import Breadcrumb from './Breadcrumb'
export default {
  name: 'elpand-layoutHeader',
  components: {
    Hamburger,
    Breadcrumb
  },
  props: {
    collapse: {},
    selectRouter: {}
  },
  data () {
    return {

    }
  },
  created () {
  },
  methods: {
    handlerToggle () {
      this.$emit('toggle')
    }
  }
}
</script>
<style lang="less">
.elpand-layoutHeader {
  height: 50px;
  display: flex;
  align-items: center;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  background: #ffffff;
}
</style>

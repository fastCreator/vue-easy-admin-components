<template>
  <el-breadcrumb separator="/" class="breadcrumb-container">
    <el-breadcrumb-item v-for="it in nav.parents" :key="it.title||it" :to="it.path">{{it.title||it}}</el-breadcrumb-item>
    <el-breadcrumb-item>{{nav.title}}</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {
  name: 'Hamburger',
  props: {
    isActive: {
      type: Boolean,
      default: false
    },
    nav: {}
  },
  data () {
    return {
    }
  },
  created () {
  },
  computed: {
  },
  methods: {
    handlerToggle () {
      this.$emit('toggle')
    }
  }
}
</script>

<style scoped>
.hamburger {
  display: inline-block;
  vertical-align: middle;
  width: 20px;
  height: 20px;
}

.hamburger.is-active {
  transform: rotate(180deg);
}
</style>

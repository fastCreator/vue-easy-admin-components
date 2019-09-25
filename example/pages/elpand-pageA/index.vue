<template>
  <div class="elpand-pageA-demo">
    <elpand-pageA v-bind="bind"></elpand-pageA>
  </div>
</template>
<script>
export default {
  data() {
    return {
      bind: {
        table: {},
        form: {
          add: {},
          send: {}
        }
      }
    }
  },
  created() {
  },
  methods: {
  }
}
</script>
<style lang="less">
.elpand-pageA-demo {
}
</style>

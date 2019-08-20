<template>
  <div class="elpand-table-demo">
    <elpand-table v-bind="bind"></elpand-table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      bind: {
        filter: [
          {
            name: '输入框',
            prop: 'input',
            tag: 'el-input'
          },
          {
            name: '输入框',
            prop: 'input',
            tag: 'elpand-select',
          }
        ],

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
.elpand-table-demo {
}
</style>

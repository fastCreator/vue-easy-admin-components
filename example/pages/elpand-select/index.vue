<template>
  <div class="elpand-select-demo">
    <elpand-select
      :options="options"
      :optionsProps="optionsProps"
      v-model="value"
    ></elpand-select>
  </div>
</template>
<script>
export default {
  data() {
    return {
      value: 'zhangsan',
      options: [
        {
          label: '张三',
          value: 'zhangsan'
        },
        {
          label: '李四',
          value: 'lisi'
        }
      ],
      optionsProps: {
        label: 'label',
        value: 'value'
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
.elpand-select-demo {
}
</style>

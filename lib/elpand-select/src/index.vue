<template functional>
  <el-select
    class="elpand-select"
    v-bind="data.attrs"
    v-on="data.on"
  >
    <el-option
      v-for="item in props.options"
      :key="item[props.optionsProps.value]"
      :label="item[props.optionsProps.label]"
      :value="item[props.optionsProps.value]"
    >
    </el-option>
  </el-select>
</template>
<script>
export default {
  name: 'elpand-select',
  props: {
    type: Array,
    options: {
      default() { return [] }
    },
    optionsProps: {
      type: Object,
      default() {
        return {
          label: 'label',
          value: 'value'
        }
      }
    }
  }
}
</script>
